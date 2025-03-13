import { writeFileSync } from "fs";
import { compileSCSS } from "../services/scssCompiler.js";
import { purgeCSS } from "../services/purgeService.js";
import { pathToFileURL } from "url";
import { join } from "path";
export async function build(existingConfig) {
    try {
        const config = existingConfig || await (async () => {
            const configPath = join(process.cwd(), "yumma.config.js");
            const configUrl = pathToFileURL(configPath).href;
            const { default: config } = await import(configUrl);
            return config;
        })();
        console.log("Compiling SCSS...");
        const css = await compileSCSS(config);
        console.log("Purging unused styles...");
        const purgedCSS = await purgeCSS(css, config);
        console.log("Writing output...");
        writeFileSync(config.output, purgedCSS);
        console.log("Build completed successfully!");
    }
    catch (error) {
        console.error("Build failed:", error);
        process.exit(1);
    }
}
