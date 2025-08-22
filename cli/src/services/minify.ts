import { transform } from "lightningcss";
import type { Config } from "../config/schema.js";
import { message } from "../utils/message.js";
import { cli } from "../utils/status.js";

export function minify(css: string, config: Config): string {
  try {
    const res = transform({
      filename: "style.css",
      code: Buffer.from(css),
      minify: config.buildOptions.minify,
      sourceMap: false,
    });

    return res.code.toString();
  } catch (error) {
    cli.error(
      error instanceof Error ? error.message : message.common.unknownError
    );
    throw error;
  }
}
