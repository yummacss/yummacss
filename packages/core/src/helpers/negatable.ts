/**
 * CSS properties that accept a negative value.
 *
 * Keyed on the property, not the utility: legality is a fact about CSS, so a
 * new utility mapping onto `margin-inline` inherits the right answer. Grid
 * line numbers and `scale` are legal despite looking wrong.
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
