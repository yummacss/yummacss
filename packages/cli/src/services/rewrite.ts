import { extractClassStrings } from "@yummacss/nitro";
import { migrateClass } from "./migrate.js";

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

const INTERPOLATION = /\$\{[^}]*\}/g;

/**
 * Rewrites v3 class names in place.
 *
 * A class attribute or a `cn`/`clsx`/`cva` argument is a class list by
 * construction, so every token in it is migrated and anything unknown is
 * reported. Everywhere else - an object value, a bare literal - the file is
 * only written back when *every* token is a known utility, because this
 * writes over someone's source and `"m-4 is not a class here"` is a sentence.
 */
export function rewriteSource(content: string): RewriteResult {
	const edits: Edit[] = [];
	const skipped = new Map<string, string>();
	let migrated = 0;

	for (const literal of extractClassStrings(content)) {
		const declared =
			literal.context === "attribute" || literal.context === "call";
		const tokens = [...literal.value.matchAll(/\S+/g)];
		if (tokens.length === 0) continue;

		const results = tokens.map((token) => ({
			token: token[0],
			start: literal.start + (token.index ?? 0),
			result: migrateClass(token[0]),
		}));

		if (!declared && results.some(({ result }) => !result.ok)) continue;

		if (declared) {
			// `${}` is blanked out of `value`, so the raw span is where a runtime
			// expression can still be seen and reported.
			for (const [expression] of content
				.slice(literal.start, literal.end)
				.matchAll(INTERPOLATION)) {
				skipped.set(expression, "built at runtime");
			}
		}

		for (const { token, start, result } of results) {
			if (!result.ok) {
				skipped.set(token, result.reason);
				continue;
			}
			if (!result.changed) continue;
			migrated++;
			edits.push({ start, end: start + token.length, text: result.className });
		}
	}

	// Last edit first, so earlier offsets stay valid.
	edits.sort((a, b) => b.start - a.start);

	let output = content;
	for (const edit of edits) {
		output = output.slice(0, edit.start) + edit.text + output.slice(edit.end);
	}

	return { content: output, migrated, skipped };
}
