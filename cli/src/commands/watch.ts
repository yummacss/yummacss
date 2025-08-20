import chok from "chokidar";
import { globby } from "globby";
import { loadConfig } from "../config/loader.js";
import type { InternalConfig } from "../config/template.js";
import { msg } from "../utils/message.js";
import { cli } from "../utils/status.js";
import { build } from "./build.js";

let currentConfig: InternalConfig;
let buildTimeout: NodeJS.Timeout | null = null;
let changedFiles = new Set<string>();

export async function watch() {
  const watchSpinner = cli.startSpinner(msg.watch.start);

  try {
    currentConfig = await loadConfig();

    await build(currentConfig, true);

    const files = await globby(currentConfig.source);
    const watcher = chok.watch(files, {
      awaitWriteFinish: {
        pollInterval: 50,
        stabilityThreshold: 200,
      },
      ignored: /(^|[/\\])\../,
      ignoreInitial: true,
      persistent: true,
    });

    watcher
      .on("add", (path) => handleChange(path, "added"))
      .on("change", (path) => handleChange(path, "changed"))
      .on("unlink", (path) => handleChange(path, "removed"));

    function handleChange(path: string, event: string) {
      changedFiles.add(path);

      if (buildTimeout) {
        clearTimeout(buildTimeout);
      }

      buildTimeout = setTimeout(async () => {
        if (changedFiles.size > 0) {
          await build(currentConfig, true);

          changedFiles.clear();
        }
        buildTimeout = null;
      }, 500); // 500ms
    }
  } catch (error) {
    watchSpinner.fail(msg.watch.fail);
    cli.error(error instanceof Error ? error.message : msg.common.unknownError);
    process.exit(1);
  }
}
