// The browser entry, not the root one: this module is reachable from the
// Monaco adapter, and `@yummacss/nitro` pulls in `node:fs` via `loadConfig`
// & `scan`.
import {
	type Config,
	suggestClasses,
	validateClasses,
} from "@yummacss/nitro/browser";
import { CLASS_ATTR_REGEX, extractClassContent } from "./constants";

export interface UnknownClass {
	className: string;
	line: number;
	startIndex: number;
	endIndex: number;
	/**
	 * The closest valid class, when one exists (e.g. "g-4" for "gap-4").
	 */
	suggestion?: string;
}

// Tokens that cannot be class names (code fragments, leftovers from
// stripped template expressions) are skipped instead of flagged.
const CLASS_NAME_PATTERN = /^@?[a-z][a-zA-Z0-9@:/.%-]*$/;

// Mid-typing fragments like "bg-" or "h:" should not be flagged while
// the user is still writing the class.
const PARTIAL_PATTERN = /[-:/@]$/;

/**
 * Find classes in class attributes that are not part of the Yumma CSS
 * canon. Validity comes from the generator's own matching rules via
 * `validateClasses`, so prefix, safelist, and theme options in the
 * provided config are all understood.
 */
export function findUnknownClasses(
	text: string,
	config: Config = {},
): UnknownClass[] {
	const candidates: UnknownClass[] = [];
	const lines = text.split("\n");

	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex];
		if (!line) continue;

		const regex = new RegExp(CLASS_ATTR_REGEX.source, "g");
		let match = regex.exec(line);
		while (match !== null) {
			const classContent = extractClassContent(match);
			if (classContent) {
				let searchFrom = match.index;
				for (const className of classContent.split(/\s+/).filter(Boolean)) {
					const idx = line.indexOf(className, searchFrom);
					if (idx === -1) continue;
					searchFrom = idx + className.length;

					if (!CLASS_NAME_PATTERN.test(className)) continue;
					if (PARTIAL_PATTERN.test(className)) continue;

					candidates.push({
						className,
						line: lineIndex,
						startIndex: idx,
						endIndex: idx + className.length,
					});
				}
			}
			match = regex.exec(line);
		}
	}

	if (candidates.length === 0) return [];

	// Validate each unique class once per pass - validateClasses builds
	// the utility map, which is the expensive part.
	const unique = Array.from(new Set(candidates.map((c) => c.className)));
	const { invalid } = validateClasses(unique, config);
	const invalidSet = new Set(invalid);
	const suggestions = suggestClasses(invalid, config);

	return candidates
		.filter((c) => invalidSet.has(c.className))
		.map((c) => ({ ...c, suggestion: suggestions.get(c.className) }));
}
