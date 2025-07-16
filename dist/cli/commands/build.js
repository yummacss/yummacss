import { writeFileSync } from "fs";
import { compileSCSS } from "../services/scssCompiler.js";
import { purgeCSS } from "../services/purgeService.js";
import { minifyCSS } from "../services/minifyService.js";
import { loadConfig } from "../services/configLoader.js";
import { cli } from "../utils/cli-ui.js";
import { messages } from "../lang.js";
let cache = {};
export async function build(existingConfig, forceRebuild = false) {
    const buildSpinner = cli.startSpinner(messages.build.start);
    const startTime = Date.now();
    try {
        const config = existingConfig || (await loadConfig());
        const configHash = JSON.stringify(config);
        const configChanged = cache.configHash !== configHash;
        let css;
        if (forceRebuild || configChanged || !cache.css) {
            buildSpinner.text = messages.build.compiling;
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
            buildSpinner.text = messages.build.usingCache;
        }
        buildSpinner.text = messages.build.purging;
        const purgedCSS = await purgeCSS(css, config);
        buildSpinner.text = messages.build.minifying;
        const finalCSS = minifyCSS(purgedCSS, config);
        writeFileSync(config.output, finalCSS);
        buildSpinner.succeed(messages.build.success(Date.now() - startTime, config.output));
    }
    catch (error) {
        buildSpinner.fail(messages.build.fail);
        cli.error(error instanceof Error ? error.message : messages.common.unknownError);
        process.exit(1);
    }
}
