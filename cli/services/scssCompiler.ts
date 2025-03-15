import * as sass from "sass";
import type { YummaConfig } from "../config/defaultConfig.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, "../../..");

export async function compileSCSS(config: YummaConfig): Promise<string> {
  const scssFile = config.buildOptions.reset
    ? "yummacss.scss"
    : "yummacss-core.scss";

  try {
    const result = await sass.compileAsync(join(packageRoot, "src", scssFile), {
      style: "expanded",
      loadPaths: [join(packageRoot, "src")],
    });

    return result.css;
  } catch (error) {
    console.error("SCSS compilation error:", error);
    throw error;
  }
}
