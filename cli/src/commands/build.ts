import { writeFileSync } from "fs";
import { loadConfig } from "../config/loader.js";
import type { InternalConfig } from "../config/template.js";
import { compile } from "../services/compiler.js";
import { minify } from "../services/minify.js";
import { purge } from "../services/purge.js";
import { msg } from "../utils/message.js";
import { cli } from "../utils/status.js";

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
  const buildSpinner = cli.startSpinner(msg.build.start);
  const startTime = Date.now();

  try {
    const config = existingConfig || (await loadConfig());
    const configHash = JSON.stringify(config);
    const configChanged = cache.configHash !== configHash;

    let css: string;
    if (forceRebuild || configChanged || !cache.css) {
      buildSpinner.text = msg.build.compiling;
      const res = await compile(config);
      css = res.css;
      cache = {
        css: res.css,
        dependencies: res.dependencies,
        configHash,
      };
    } else {
      css = cache.css;
      buildSpinner.text = msg.build.usingCache;
    }

    buildSpinner.text = msg.build.purging;
    const purgedCSS = await purge(css, config);

    buildSpinner.text = msg.build.minifying;
    const finalCSS = minify(purgedCSS, config);

    writeFileSync(config.output, finalCSS);

    buildSpinner.succeed(
      msg.build.success(Date.now() - startTime, config.output)
    );
  } catch (error) {
    buildSpinner.fail(msg.build.fail);
    cli.error(error instanceof Error ? error.message : msg.common.unknownError);
    process.exit(1);
  }
}
