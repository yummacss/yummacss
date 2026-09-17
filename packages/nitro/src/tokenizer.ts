const JS_EXTENSIONS = /\.(?:[cm]?[jt]sx?)$/;

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

const NOT_IN_A_CLASS = /[<>"'`=(){};,\\]/;

function addClasses(source: string, into: Set<string>): void {
	for (const raw of source.split(/\s+/)) {
		if (!raw || NOT_IN_A_CLASS.test(raw)) continue;
		const clean = raw.replace(/^@+/, "");
		if (clean && /^[a-z]/.test(clean) && clean.includes(":")) into.add(raw);
	}
}

function lexJs(content: string, into: Set<string>): void {
	const n = content.length;
	const templateStack: number[] = [];
	let i = 0;
	let lastSignificant = "\n";

	while (i < n) {
		const c = content[i] ?? "";

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
			const top = templateStack.length - 1;
			if (c === "{") templateStack[top] = (templateStack[top] ?? 0) + 1;
			else if (c === "}") {
				if (templateStack[top] === 0) {
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
				templateStack[top] = (templateStack[top] ?? 0) - 1;
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

export function tokenizer(content: string, filename?: string): string[] {
	const tokens = new Set<string>();
	if (filename && JS_EXTENSIONS.test(filename)) lexJs(content, tokens);
	else lexGeneric(content, tokens);
	return Array.from(tokens);
}
