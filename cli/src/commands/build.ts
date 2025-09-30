import type { Config } from "@/config/schema";
import { configChanged, getCache, setCache } from "@/services/cache";
import { compiler } from "@/services/compiler";
import { loadConfig } from "@/services/loader";
import { minify } from "@/services/minify";
import { message } from "@/utils/message";
import { cli } from "@/utils/status";
import { writeFileSync } from "fs";

export async function build(existingConfig?: Config, forceRebuild = false) {
  const status = cli.progress(message.build.start);
  const startTime = Date.now();

  try {
    const config = existingConfig || (await loadConfig());
    const cache = getCache();
    const hasConfigChanged = configChanged(config);

    let css: string;
    if (forceRebuild || hasConfigChanged || !cache.css) {
      const res = await compiler(config);
      css = res.css;
      setCache({
        configHash: JSON.stringify(config),
        css: res.css,
        dependencies: res.dependencies,
      });
    } else {
      css = cache.css;
    }

    const finalCSS = minify(css, config);
    writeFileSync(config.output, finalCSS);

    status.succeed(
      message.build.success(Date.now() - startTime, config.output)
    );
  } catch (error) {
    status.fail(message.build.fail);
    process.exit(1);
  }
}
