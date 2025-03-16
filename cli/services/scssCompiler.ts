import * as sass from "sass-embedded";
import type { YummaConfig } from "../config/defaultConfig.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, "../../..");

export async function compileSCSS(config: YummaConfig): Promise<{
  css: string;
  dependencies: string[];
}> {
  const scssFile = config.buildOptions.reset
    ? "yummacss.scss"
    : "yummacss-core.scss";

  try {
    const result = await sass.compileAsync(join(packageRoot, "src", scssFile), {
      style: "expanded",
      loadPaths: [join(packageRoot, "src")],
      importers: [
        {
          findFileUrl(url) {
            return new URL(url, `file://${join(packageRoot, "src/")}`);
          },
        },
      ],
    });

    return {
      css: result.css,
      dependencies: result.loadedUrls
        .filter((url) => url.protocol === "file:")
        .map((url) => fileURLToPath(url)),
    };
  } catch (error) {
    console.error("SCSS compilation error:", error);
    throw error;
  }
}
