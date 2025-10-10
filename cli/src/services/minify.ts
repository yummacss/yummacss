import type { Config } from "@yummacss/nitro";
import { transform } from "lightningcss";

export function minify(css: string, config: Config): string {
  const res = transform({
    filename: "style.css",
    code: Buffer.from(css),
    minify: config.buildOptions.minify,
    sourceMap: false,
  });

  return res.code.toString();
}
