import { transform } from "lightningcss";
import type { InternalConfig } from "../config/defaultConfig.js";

export function minifyCSS(css: string, config: InternalConfig): string {
  try {
    const result = transform({
      filename: "style.css",
      code: Buffer.from(css),
      minify: config.buildOptions.minify,
      sourceMap: false,
    });

    return result.code.toString();
  } catch (error) {
    console.error("Minification error:", error);
    throw error;
  }
}
