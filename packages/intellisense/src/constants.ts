export const SUPPORTED_LANGUAGES: string[] = [
	"astro",
	"ejs",
	"haml",
	"handlebars",
	"hbs",
	"html",
	"jade",
	"javascript",
	"javascriptreact",
	"liquid",
	"mdx",
	"php",
	"svelte",
	"twig",
	"typescript",
	"typescriptreact",
	"vue",
];

export const CLASS_ATTR_REGEX =
	/(?:class(?:Name)?)\s*=\s*(?:(["'])([^"']+)\1|\{(["'])([^"']+)\3\}|\{`([^`]*)`\})/g;

export function extractClassContent(match: RegExpExecArray): string | null {
	const content = match[2] ?? match[4] ?? match[5] ?? null;
	if (!content) return null;
	if (match[5] !== undefined) {
		return content
			.replace(/\$\{[^}]*\}/g, "")
			.replace(/\s+/g, " ")
			.trim();
	}
	return content;
}
