import { writeFileSync } from "fs";
import { compileSCSS } from "../services/scssCompiler.js";
import { purgeCSS } from "../services/purgeService.js";
import { minifyCSS } from "../services/minifyService.js";
import { loadConfig } from "../services/configLoader.js";
import { cli } from "../utils/cli-ui.js";
let cache = {};
export async function build(existingConfig, forceRebuild = false) {
    const buildSpinner = cli.startSpinner("Starting build process...");
    const startTime = Date.now();
    try {
        const config = existingConfig || (await loadConfig());
        const configHash = JSON.stringify(config);
        const configChanged = cache.configHash !== configHash;
        let css;
        if (forceRebuild || configChanged || !cache.css) {
            buildSpinner.text = "Compiling SCSS...";
            const result = await compileSCSS(config);
            css = result.css;
            cache = {
                css: result.css,
                dependencies: result.dependencies,
                configHash,
            };
        }
        else {
            css = cache.css;
            buildSpinner.text = "Using cached SCSS...";
        }
        buildSpinner.text = "Purging unused styles...";
        const purgedCSS = await purgeCSS(css, config);
        buildSpinner.text = "Minifying CSS...";
        const finalCSS = minifyCSS(purgedCSS, config);
        writeFileSync(config.output, finalCSS);
        buildSpinner.succeed("Build completed successfully!");
        cli.success(`Styles written to: ${config.output}`);
        cli.info(`Total time: ${Date.now() - startTime}ms`);
    }
    catch (error) {
        buildSpinner.fail("Build failed!");
        cli.error(error instanceof Error ? error.message : "Unknown error occurred");
        process.exit(1);
    }
}
