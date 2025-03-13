import * as sass from "sass";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, "../../..");
export async function compileSCSS(config) {
    const scssFile = config.buildOptions.reset
        ? "yummacss.scss"
        : "yummacss-core.scss";
    try {
        const scssPath = join(packageRoot, "src", scssFile);
        const result = await sass.compileAsync(scssPath, {
            style: config.buildOptions.minify ? "compressed" : "expanded",
            loadPaths: [join(packageRoot, "src")],
        });
        return result.css;
    }
    catch (error) {
        console.error("SCSS compilation error:", error);
        throw error;
    }
}
