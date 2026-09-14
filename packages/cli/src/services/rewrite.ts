import { migrateClass } from "./migrate.js";

const CLASS_CONTEXTS = [
	/class(?:Name)?\s*=\s*["']([^"']+)["']/g,
	/class(?:Name)?=\{["']([^"']+)["']\}/g,
	/class(?:Name)?=\{`([^`]+)`\}/g,
	/\b(?:cn|clsx|classnames|cva)\s*\(\s*["'`]([^"'`]+)["'`]/g,
];

const WRAPPERS = /^([`"'{([]*)(.*?)([`"'})\],;]*)$/;

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

export function rewriteSource(content: string): RewriteResult {
	const edits: Edit[] = [];
	const skipped = new Map<string, string>();
	let migrated = 0;

	for (const regex of CLASS_CONTEXTS) {
		regex.lastIndex = 0;

		for (const match of content.matchAll(regex)) {
			const value = match[1];
			if (value === undefined || match.index === undefined) continue;

			const offset = match[0].indexOf(value);
			if (offset < 0) continue;

			const rewritten = value
				.split(/(\s+)/)
				.map((token) => {
					if (!token.trim()) return token;

					if (token.includes("${")) {
						skipped.set(token, "built at runtime");
						return token;
					}

					const [, open = "", core = "", close = ""] =
						WRAPPERS.exec(token) ?? [];
					if (!core) return token;

					const result = migrateClass(core);
					if (!result.ok) {
						skipped.set(token, result.reason);
						return token;
					}

					if (result.changed) migrated++;
					return `${open}${result.className}${close}`;
				})
				.join("");

			if (rewritten !== value) {
				edits.push({
					start: match.index + offset,
					end: match.index + offset + value.length,
					text: rewritten,
				});
			}
		}
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
