import { writeFileSync } from "fs";
import type { InternalConfig } from "../config/defaultConfig.js";
import { messages } from "../utils/lang.js";
import { ui } from "../utils/ui.js";
import { loadConfig } from "../services/configLoader.js";
import { minifyCSS } from "../services/minifyService.js";
import { purgeCSS } from "../services/purgeService.js";
import { compileSCSS } from "../services/scssCompiler.js";

type BuildCache = {
  css?: string;
  dependencies?: string[];
  configHash?: string;
};

let cache: BuildCache = {};

export async function build(
  existingConfig?: InternalConfig,
  forceRebuild = false
) {
  const buildSpinner = ui.startSpinner(messages.build.start);
  const startTime = Date.now();

  try {
    const config = existingConfig || (await loadConfig());
    const configHash = JSON.stringify(config);
    const configChanged = cache.configHash !== configHash;

    let css: string;
    if (forceRebuild || configChanged || !cache.css) {
      buildSpinner.text = messages.build.compiling;
      const result = await compileSCSS(config);
      css = result.css;
      cache = {
        css: result.css,
        dependencies: result.dependencies,
        configHash,
      };
    } else {
      css = cache.css;
      buildSpinner.text = messages.build.usingCache;
    }

    buildSpinner.text = messages.build.purging;
    const purgedCSS = await purgeCSS(css, config);

    buildSpinner.text = messages.build.minifying;
    const finalCSS = minifyCSS(purgedCSS, config);

    writeFileSync(config.output, finalCSS);

    buildSpinner.succeed(
      messages.build.success(Date.now() - startTime, config.output)
    );
  } catch (error) {
    buildSpinner.fail(messages.build.fail);
    ui.error(
      error instanceof Error ? error.message : messages.common.unknownError
    );
    process.exit(1);
  }
}
