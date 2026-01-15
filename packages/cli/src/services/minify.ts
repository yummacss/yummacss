import type { Config } from "@yummacss/nitro";
import { transform } from "lightningcss";

export function minify(css: string, config: Config): string {
	const res = transform({
		code: Buffer.from(css),
		filename: "style.css",
		minify: config.buildOptions.minify,
		sourceMap: false,
	});

	return res.code.toString();
}
