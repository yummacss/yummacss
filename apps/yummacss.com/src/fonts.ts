import localFont from "next/font/local";

/** The body face's regular weight, preloaded so the first paint does not rewrap when it lands. */
export const quattro = localFont({
	src: "../node_modules/@fontsource/ia-writer-quattro/files/ia-writer-quattro-latin-400-normal.woff2",
	weight: "400",
	style: "normal",
	declarations: [{ prop: "font-family", value: "iA Writer Quattro" }],
	adjustFontFallback: false,
});

/** Its italic and bold faces, fetched only when text uses them. */
export const quattroStyles = localFont({
	src: [
		{
			path: "../node_modules/@fontsource/ia-writer-quattro/files/ia-writer-quattro-latin-400-italic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "../node_modules/@fontsource/ia-writer-quattro/files/ia-writer-quattro-latin-700-normal.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../node_modules/@fontsource/ia-writer-quattro/files/ia-writer-quattro-latin-700-italic.woff2",
			weight: "700",
			style: "italic",
		},
	],
	declarations: [{ prop: "font-family", value: "iA Writer Quattro" }],
	adjustFontFallback: false,
	preload: false,
});
