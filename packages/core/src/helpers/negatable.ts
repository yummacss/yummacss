/**
 * Which CSS properties accept a negative value.
 *
 * A leading `-` used to be applied to any utility whose value started with a
 * digit, with no notion of whether the property would accept the result. That
 * produced `width: -.25rem`, `padding: -.25rem`, `border-radius: -9999px`,
 * `line-height: -1` and 67 others, all of which a parser discards - so the
 * declaration vanished and the class silently did nothing.
 *
 * The list is keyed on the property rather than on the utility on purpose.
 * Legality is a fact about CSS, so a new utility mapping onto `margin-inline`
 * inherits the right answer instead of needing someone to remember a flag.
 *
 * Two entries look wrong and are not. Negative integers are legal grid line
 * numbers - they count back from the end of the explicit grid - and negative
 * `scale` mirrors rather than failing.
 */
const NEGATABLE = new Set<string>([
	// Box model
	"margin",
	"margin-block",
	"margin-block-end",
	"margin-block-start",
	"margin-bottom",
	"margin-inline",
	"margin-inline-end",
	"margin-inline-start",
	"margin-left",
	"margin-right",
	"margin-top",
	"flex-basis",

	// Positioning
	"bottom",
	"inset",
	"inset-block",
	"inset-block-end",
	"inset-block-start",
	"inset-inline",
	"inset-inline-end",
	"inset-inline-start",
	"left",
	"right",
	"top",
	"z-index",

	// Scrolling
	"scroll-margin",
	"scroll-margin-block",
	"scroll-margin-block-end",
	"scroll-margin-block-start",
	"scroll-margin-bottom",
	"scroll-margin-inline",
	"scroll-margin-inline-end",
	"scroll-margin-inline-start",
	"scroll-margin-left",
	"scroll-margin-right",
	"scroll-margin-top",

	// Text
	"letter-spacing",
	"text-indent",
	"text-underline-offset",
	"vertical-align",
	"word-spacing",

	// Transform and transition
	"rotate",
	"scale",
	"transform",
	"translate",
	"transition-delay",
	"animation-delay",

	// Layout
	"order",
	"outline-offset",
	"background-position",

	// Negative integers are line numbers counted from the end of the grid.
	"grid-column-end",
	"grid-column-start",
	"grid-row-end",
	"grid-row-start",
]);

/**
 * True when every property a utility writes accepts a negative value. A
 * utility that writes more than one - `ix` writes `left` and `right` - is
 * negatable only if all of them are.
 */
export function acceptsNegative(properties: readonly string[]): boolean {
	return properties.length > 0 && properties.every((p) => NEGATABLE.has(p));
}
