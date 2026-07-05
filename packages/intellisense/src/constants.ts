/**
 * Language identifiers where Yumma CSS features (completion, hover,
 * diagnostics, color decorators, sorting) apply. Shared across every
 * editor integration (VS Code, Monaco, the language server) so the
 * supported-language list only exists once.
 */
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

/**
 * Matches class/className attribute values across all supported syntaxes:
 *
 *   class="..."         className="..."
 *   class='...'         className='...'
 *   className={'...'}   className={"..."}
 *   className={`...`}   - including those with ${} expressions
 *
 * Capture groups:
 *   [1] quote char for "..." / '...'
 *   [2] content for "..." / '...'
 *   [3] quote char for {`...`} / {"..."}
 *   [4] content for {'...'} / {"..."}
 *   [5] content for {`...`} (may include ${} expressions)
 */
export const CLASS_ATTR_REGEX =
	/(?:class(?:Name)?)\s*=\s*(?:(["'])([^"']+)\1|\{(["'])([^"']+)\3\}|\{`([^`]*)`\})/g;

/**
 * Extracts the class string content from a CLASS_ATTR_REGEX match.
 * Strips ${...} expressions from template literals, keeping only static class names.
 * Returns null if the match is empty.
 */
export function extractClassContent(match: RegExpExecArray): string | null {
	const content = match[2] ?? match[4] ?? match[5] ?? null;
	if (!content) return null;
	// Strip ${...} expressions from template literals (capture group 5)
	if (match[5] !== undefined) {
		return content
			.replace(/\$\{[^}]*\}/g, "")
			.replace(/\s+/g, " ")
			.trim();
	}
	return content;
}
