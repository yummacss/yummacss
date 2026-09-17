const NEGATABLE = new Set<string>([
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

	"letter-spacing",
	"text-indent",
	"text-underline-offset",
	"vertical-align",
	"word-spacing",

	"rotate",
	"scale",
	"transform",
	"translate",
	"transition-delay",
	"animation-delay",

	"order",
	"outline-offset",
	"background-position",

	"grid-column-end",
	"grid-column-start",
	"grid-row-end",
	"grid-row-start",
]);

/**
 * Whether every one of these properties takes a negative value, which is what
 * makes `m:-4` a margin and `w:-1` not a class at all.
 */
export function acceptsNegative(properties: readonly string[]): boolean {
	return properties.length > 0 && properties.every((p) => NEGATABLE.has(p));
}
