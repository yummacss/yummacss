/**
 * Where a string literal sits, which is what decides whether a caller may
 * rewrite it. Scanning can read them all; the codemod writes files back, so it
 * only touches the ones it can prove are class strings.
 */
export type ClassStringContext = "attribute" | "call" | "property" | "bare";

export interface ClassString {
	/**
	 * The literal's raw span, with `${...}` expressions blanked to spaces so
	 * `start` + an index into `value` is still an offset into the source.
	 */
	value: string;
	/** Offset of the first character inside the quotes. */
	start: number;
	/** Offset of the closing quote. */
	end: number;
	quote: '"' | "'" | "`";
	context: ClassStringContext;
}

const ATTRIBUTE = /class(?:Name)?\s*=\s*\{?\s*$/;
const CALL = /\b(?:cn|clsx|classnames|cva|twMerge)\s*\(\s*$/;
const PROPERTY = /[\w"'`\])]\s*[:?]\s*$/;

/**
 * Every string literal in a file, in source order.
 *
 * Written as a character walk rather than a list of regexes because a regex
 * pairs quotes across the whole file: one `""` inverts the pairing and every
 * literal after it is read as the code between two strings instead. See the
 * `empty literal` fixture.
 */
export function extractClassStrings(content: string): ClassString[] {
	const found: ClassString[] = [];
	const length = content.length;
	let index = 0;

	while (index < length) {
		const char = content[index];

		if (char === "/" && content[index + 1] === "*") {
			const close = content.indexOf("*/", index + 2);
			index = close === -1 ? length : close + 2;
			continue;
		}

		// `https://` and `and//or` are not comments, and skipping to the end of
		// the line on one would swallow every literal after it.
		if (
			char === "/" &&
			content[index + 1] === "/" &&
			content[index - 1] !== ":" &&
			content[index - 1] !== "/"
		) {
			const newline = content.indexOf("\n", index);
			index = newline === -1 ? length : newline;
			continue;
		}

		if (char === '"' || char === "'" || char === "`") {
			const literal = read(content, index, char);
			if (literal) {
				found.push({
					value: literal.value,
					start: index + 1,
					end: literal.end,
					quote: char,
					context: contextOf(content, index),
				});
				found.push(...literal.nested);
				index = literal.end + 1;
				continue;
			}
		}

		index++;
	}

	return found.sort((a, b) => a.start - b.start);
}

function read(
	content: string,
	open: number,
	quote: string,
): { value: string; end: number; nested: ClassString[] } | null {
	const chars: string[] = [];
	const nested: ClassString[] = [];
	let index = open + 1;

	while (index < content.length) {
		const char = content[index] as string;

		if (char === "\\") {
			chars.push(char, content[index + 1] ?? "");
			index += 2;
			continue;
		}

		if (quote === "`" && char === "$" && content[index + 1] === "{") {
			const from = index;
			let depth = 1;
			index += 2;
			while (index < content.length && depth > 0) {
				if (content[index] === "{") depth++;
				else if (content[index] === "}") depth--;
				index++;
			}
			// Blanked, not dropped, so an index into `value` is still an offset
			// into the source. The literals inside it are recovered below.
			chars.push(" ".repeat(index - from));
			continue;
		}

		if (char === quote) {
			// Literals nest, and a backtick is the one that can hold them: a
			// ternary inside `${}` is where conditional classes live, and in MDX
			// a run of prose between two backticks holds whole code samples.
			if (quote === "`") {
				const inner = open + 1;
				for (const literal of extractClassStrings(
					content.slice(inner, index),
				)) {
					nested.push({
						...literal,
						start: literal.start + inner,
						end: literal.end + inner,
					});
				}
			}
			return { value: chars.join(""), end: index, nested };
		}

		// Only a template literal survives a newline. Anything else was never a
		// literal - a JSX apostrophe, a stray quote - so the damage stops here
		// instead of running to the end of the file.
		if (char === "\n" && quote !== "`") return null;

		chars.push(char);
		index++;
	}

	return null;
}

function contextOf(content: string, open: number): ClassStringContext {
	const before = content.slice(Math.max(0, open - 64), open);
	if (ATTRIBUTE.test(before)) return "attribute";
	if (CALL.test(before)) return "call";
	if (PROPERTY.test(before)) return "property";
	return "bare";
}
