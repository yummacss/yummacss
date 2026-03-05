/**
 * Matches class/className attribute values across all supported syntaxes:
 *
 *   class="..."         className="..."
 *   class='...'         className='...'
 *   className={'...'}   className={"..."}
 *   className={`...`}   — only when there are no ${} expressions inside
 *
 * Capture groups:
 *   [1] quote char for "..." / '...'
 *   [2] content for "..." / '...'
 *   [3] quote char for {`...`} / {"..."}
 *   [4] content for {'...'} / {"..."}
 *   [5] content for {`...`}
 */
export const CLASS_ATTR_REGEX =
	/(?:class(?:Name)?)\s*=\s*(?:(["'])([^"']+)\1|\{(["'])([^"']+)\3\}|\{`([^`$]*)`\})/g;

/**
 * Extracts the class string content from a CLASS_ATTR_REGEX match.
 * Returns null if the match is empty or dynamic (should never happen with the regex).
 */
export function extractClassContent(match: RegExpExecArray): string | null {
	return match[2] ?? match[4] ?? match[5] ?? null;
}
