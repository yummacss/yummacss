import { transform } from "lightningcss";
import type { Config } from "../config/schema.js";

export function minify(css: string, config: Config): string {
  const res = transform({
    filename: "style.css",
    code: Buffer.from(css),
    minify: config.buildOptions.minify,
    sourceMap: false,
  });

  return res.code.toString();
}
