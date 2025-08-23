import { writeFileSync } from "fs";
import type { Config } from "../config/schema.js";
import { compile } from "../services/compiler.js";
import { loadConfig } from "../services/loader.js";
import { minify } from "../services/minify.js";
import { purge } from "../services/purge.js";
import { message } from "../utils/message.js";
import { cli } from "../utils/status.js";
import { getCache, setCache, configChanged } from "../services/cache.js";

export async function build(
  existingConfig?: Config,
  forceRebuild = false
) {
  const status = cli.progress(message.build.start);
  const startTime = Date.now();

  try {
    const config = existingConfig || (await loadConfig());
    const cache = getCache();
    const hasConfigChanged = configChanged(config);

    let css: string;
    if (forceRebuild || hasConfigChanged || !cache.css) {
      const res = await compile(config);
      css = res.css;
      setCache({
        configHash: JSON.stringify(config),
        css: res.css,
        dependencies: res.dependencies,
      });
    } else {
      css = cache.css;
    }

    const purgedCSS = await purge(css, config);
    const finalCSS = minify(purgedCSS, config);
    writeFileSync(config.output, finalCSS);

    status.succeed(
      message.build.success(Date.now() - startTime, config.output)
    );
    
  } catch (error) {
    status.fail(message.build.fail);
    process.exit(1);
  }
}