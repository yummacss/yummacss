/**
 * Class extraction.
 *
 * This used to be a list of regexes, one of which matched every bare string
 * literal as `/"([^"]+)"/g`. `[^"]+` is one-or-more, so an empty literal `""`
 * could not match: the regex backtracked and began its next match on the
 * *second* quote of that pair, and from there it captured the code between
 * strings rather than the strings. Every later class in the file was lost
 * until another `""` re-synced the pairing, which is why classes from the same
 * string literal disagreed with each other and why "position in the file"
 * looked like it mattered. A regex literal or a quote inside a comment did the
 * same thing.
 *
 * Pairing quotes without knowing what a string is cannot be made correct, so
 * this lexes instead. JavaScript-family files get a real scanner that knows
 * about comments, escapes, template literals and regex literals. Everything
 * else - `.mdx` above all, which is not JavaScript and where a lone apostrophe
 * in prose is normal - gets a line-scoped pass, so a stray quote can only cost
 * the rest of its own line instead of the rest of the file.
 */

const JS_EXTENSIONS = /\.(?:[cm]?[jt]sx?)$/;

/** A `/` here opens a regex literal rather than dividing. */
const REGEX_ALLOWED_BEFORE = new Set([
	"=",
	"(",
	",",
	":",
	"[",
	"!",
	"&",
	"|",
	"?",
	"{",
	"}",
	";",
	"\n",
	"+",
	"-",
	"*",
	"%",
	"<",
	">",
	"~",
	"^",
]);

/** Punctuation that no class name contains, so a token carrying it is debris. */
const NOT_IN_A_CLASS = /[<>"'`=(){};,\\]/;

function addClasses(source: string, into: Set<string>): void {
	for (const raw of source.split(/\s+/)) {
		if (!raw || NOT_IN_A_CLASS.test(raw)) continue;
		const clean = raw.replace(/^@+/, "");
		if (clean && /^[a-z]/.test(clean) && clean.includes("-")) into.add(raw);
	}
}

/**
 * Lexes JavaScript, TypeScript and JSX, emitting the contents of every string
 * literal and every static chunk of every template literal. Comments and regex
 * literals are skipped rather than read, which is the whole point: most of the
 * class-shaped debris the old regexes collected (`biome-ignore`, `hand-written`,
 * and prose like `m-23` out of a sentence about the scale) lived in comments.
 */
function lexJs(content: string, into: Set<string>): void {
	const n = content.length;
	// Depth of `${}` interpolations, so a `}` knows whether it closes one.
	const templateStack: number[] = [];
	let i = 0;
	let lastSignificant = "\n";

	while (i < n) {
		const c = content[i];

		// Comments.
		if (c === "/" && content[i + 1] === "/") {
			while (i < n && content[i] !== "\n") i++;
			continue;
		}
		if (c === "/" && content[i + 1] === "*") {
			i += 2;
			while (i < n && !(content[i] === "*" && content[i + 1] === "/")) i++;
			i += 2;
			continue;
		}

		// Regex literal. Only where a value cannot already have ended, otherwise
		// this is division and skipping to the next `/` would swallow real code.
		if (c === "/" && REGEX_ALLOWED_BEFORE.has(lastSignificant)) {
			i++;
			let inClass = false;
			while (i < n) {
				const r = content[i];
				if (r === "\\") {
					i += 2;
					continue;
				}
				if (r === "[") inClass = true;
				else if (r === "]") inClass = false;
				else if (r === "/" && !inClass) {
					i++;
					break;
				} else if (r === "\n") break;
				i++;
			}
			lastSignificant = "/";
			continue;
		}

		// Quoted strings.
		if (c === '"' || c === "'") {
			const quote = c;
			let value = "";
			i++;
			while (i < n) {
				const s = content[i];
				if (s === "\\") {
					value += content[i + 1] ?? "";
					i += 2;
					continue;
				}
				if (s === quote) {
					i++;
					break;
				}
				if (s === "\n") break;
				value += s;
				i++;
			}
			addClasses(value, into);
			lastSignificant = quote;
			continue;
		}

		// Template literals. Static chunks are classes; `${}` returns to code,
		// so strings nested inside an interpolation are found by this same loop.
		if (c === "`") {
			let value = "";
			i++;
			while (i < n) {
				const t = content[i];
				if (t === "\\") {
					value += content[i + 1] ?? "";
					i += 2;
					continue;
				}
				if (t === "`") {
					i++;
					break;
				}
				if (t === "$" && content[i + 1] === "{") {
					addClasses(value, into);
					value = "";
					templateStack.push(0);
					i += 2;
					break;
				}
				value += t;
				i++;
			}
			addClasses(value, into);
			lastSignificant = "`";
			continue;
		}

		if (templateStack.length > 0) {
			if (c === "{") templateStack[templateStack.length - 1]++;
			else if (c === "}") {
				if (templateStack[templateStack.length - 1] === 0) {
					// Closes the interpolation; resume the template literal.
					templateStack.pop();
					let value = "";
					i++;
					while (i < n) {
						const t = content[i];
						if (t === "\\") {
							value += content[i + 1] ?? "";
							i += 2;
							continue;
						}
						if (t === "`") {
							i++;
							break;
						}
						if (t === "$" && content[i + 1] === "{") {
							addClasses(value, into);
							value = "";
							templateStack.push(0);
							i += 2;
							break;
						}
						value += t;
						i++;
					}
					addClasses(value, into);
					lastSignificant = "`";
					continue;
				}
				templateStack[templateStack.length - 1]--;
			}
		}

		if (!/\s/.test(c)) lastSignificant = c;
		else if (c === "\n") lastSignificant = "\n";
		i++;
	}
}

const CLASS_ATTR =
	/class(?:Name)?\s*=\s*(?:"([^"]*)"|'([^']*)'|\{?`([^`]*)`\}?)/g;
const QUOTED = /"([^"]*)"|'([^']*)'|`([^`]*)`/g;

/**
 * Everything that is not JavaScript, `.mdx` chiefly. Each line is scanned on
 * its own so an unbalanced quote - an apostrophe in a sentence, a lone backtick
 * opening a fence - costs that line and nothing after it.
 */
function lexGeneric(content: string, into: Set<string>): void {
	for (const line of content.split("\n")) {
		for (const m of line.matchAll(CLASS_ATTR)) {
			addClasses(m[1] ?? m[2] ?? m[3] ?? "", into);
		}
		for (const m of line.matchAll(QUOTED)) {
			addClasses(m[1] ?? m[2] ?? m[3] ?? "", into);
		}
	}
}

/**
 * @param filename Used only to choose a strategy. Omitted means the
 * conservative line-scoped pass, which is correct for any input.
 */
export function tokenizer(content: string, filename?: string): string[] {
	const tokens = new Set<string>();
	if (filename && JS_EXTENSIONS.test(filename)) lexJs(content, tokens);
	else lexGeneric(content, tokens);
	return Array.from(tokens);
}
