import { migrateClass } from "./migrate.js";

const CLASS_CONTEXTS = [
	/class(?:Name)?\s*=\s*["']([^"']+)["']/g,
	/class(?:Name)?=\{["']([^"']+)["']\}/g,
	/class(?:Name)?=\{`([^`]+)`\}/g,
	/\b(?:cn|clsx|classnames|cva)\s*\(\s*["'`]([^"'`]+)["'`]/g,
];

const WRAPPERS = /^([`"'{([]*)(.*?)([`"'})\],;]*)$/;

const CLASS_SHAPED = /^@?[a-z0-9][a-z0-9:@/%._-]*$/;

const STRING_LITERAL =
	/"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'|`((?:[^`\\$]|\\.)*)`/g;

const CLASS_LIST = /^[@a-z0-9][@a-z0-9:/%.\-_ ]*$/;

const NOT_A_CLASS_LIST = /\/\/|\.[a-z]{2,}(?:$|\/)|^\.|^\//;

export interface RewriteResult {
	content: string;
	migrated: number;
	skipped: Map<string, string>;
}

interface Edit {
	start: number;
	end: number;
	text: string;
}

function migrateTokens(
	value: string,
	onSkip?: (token: string, reason: string) => void,
): { text: string; migrated: number } {
	let migrated = 0;

	const text = value
		.split(/(\s+)/)
		.map((token) => {
			if (!token.trim()) return token;

			if (token.includes("${")) {
				const opens = token.split("{").length;
				const closes = token.split("}").length;
				if (opens === closes) onSkip?.(token, "built at runtime");
				return token;
			}

			const [, open = "", core = "", close = ""] = WRAPPERS.exec(token) ?? [];
			if (!core) return token;

			const result = migrateClass(core);
			if (!result.ok) {
				if (CLASS_SHAPED.test(core) && /[a-z]/.test(core)) {
					onSkip?.(token, result.reason);
				}
				return token;
			}

			if (result.changed) migrated++;
			return `${open}${result.className}${close}`;
		})
		.join("");

	return { text, migrated };
}

export function rewriteSource(content: string): RewriteResult {
	const edits: Edit[] = [];
	const skipped = new Map<string, string>();
	let migrated = 0;

	const covered: Array<[number, number]> = [];

	for (const regex of CLASS_CONTEXTS) {
		regex.lastIndex = 0;

		for (const match of content.matchAll(regex)) {
			const value = match[1];
			if (value === undefined || match.index === undefined) continue;

			covered.push([match.index, match.index + match[0].length]);

			const offset = match[0].indexOf(value);
			if (offset < 0) continue;

			const pass = migrateTokens(value, (token, reason) =>
				skipped.set(token, reason),
			);
			const rewritten = pass.text;
			migrated += pass.migrated;

			if (rewritten !== value) {
				edits.push({
					start: match.index + offset,
					end: match.index + offset + value.length,
					text: rewritten,
				});
			}
		}
	}

	// the scanner reads every string, so a class in a styling constant or a
	// `merge()` argument has to migrate too
	STRING_LITERAL.lastIndex = 0;
	for (const match of content.matchAll(STRING_LITERAL)) {
		const value = match[1] ?? match[2] ?? match[3];
		if (value === undefined || match.index === undefined) continue;
		if (!CLASS_LIST.test(value) || NOT_A_CLASS_LIST.test(value)) continue;

		// every token has to carry a separator, or prose like "m-4 is not a
		// class here" would have its one class-shaped word rewritten
		const tokens = value.split(/\s+/).filter(Boolean);
		if (tokens.length === 0) continue;
		if (!tokens.every((token) => /[:-]/.test(token))) continue;

		const offset = match[0].indexOf(value);
		if (offset < 0) continue;

		const start = match.index + offset;
		if (covered.some(([from, to]) => start >= from && start < to)) continue;

		const pass = migrateTokens(value);
		if (pass.text === value) continue;

		migrated += pass.migrated;
		edits.push({ start, end: start + value.length, text: pass.text });
	}

	edits.sort((a, b) => b.start - a.start);

	let output = content;
	let previousStart = Number.POSITIVE_INFINITY;

	for (const edit of edits) {
		if (edit.end > previousStart) continue;
		output = output.slice(0, edit.start) + edit.text + output.slice(edit.end);
		previousStart = edit.start;
	}

	return { content: output, migrated, skipped };
}
