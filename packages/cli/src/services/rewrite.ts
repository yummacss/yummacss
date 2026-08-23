import { migrateClass } from "./migrate.js";

/**
 * Only class attribute contexts are rewritten.
 *
 * The generator's tokenizer also matches every bare string literal in a file,
 * which is safe when it is collecting class names & destructive here: this
 * writes the file back, so a match on an unrelated string would corrupt it.
 * These are canon's narrower patterns.
 */
const CLASS_CONTEXTS = [
	/class(?:Name)?\s*=\s*["']([^"']+)["']/g,
	/class(?:Name)?=\{["']([^"']+)["']\}/g,
	/class(?:Name)?=\{`([^`]+)`\}/g,
	/\b(?:cn|clsx|classnames|cva)\s*\(\s*["'`]([^"'`]+)["'`]/g,
];

/**
 * Quotes & braces that wrap a class inside a bigger expression.
 *
 * `className={`p-4 ${open ? "ro-45" : "ro-0"}`}` splits on whitespace into
 * tokens like `"ro-45` and `"ro-0"}`. Those are real classes wearing
 * punctuation, and leaving them alone would quietly strand them on v3.
 */
const WRAPPERS = /^([`"'{([]*)(.*?)([`"'})\],;]*)$/;

export interface RewriteResult {
	content: string;
	/** Class names actually changed. */
	migrated: number;
	/** Tokens left alone, mapped to why. */
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

					// A class assembled at runtime cannot be read statically, so it
					// is left exactly as written & reported instead.
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

	// Last edit first, so earlier offsets stay valid. Overlaps are dropped
	// rather than applied twice, which happens when two patterns match the
	// same attribute.
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
