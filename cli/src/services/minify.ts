import { transform } from "lightningcss";
import type { InternalConfig } from "../config/template.js";
import { msg } from "../utils/message.js";
import { cli } from "../utils/status.js";

export function minify(css: string, config: InternalConfig): string {
  try {
    const result = transform({
      filename: "style.css",
      code: Buffer.from(css),
      minify: config.buildOptions.minify,
      sourceMap: false,
    });

    return result.code.toString();
  } catch (error) {
    cli.error(error instanceof Error ? error.message : msg.common.unknownError);
    throw error;
  }
}
