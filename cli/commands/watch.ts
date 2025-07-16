import chok from "chokidar";
import { build } from "./build.js";
import { loadConfig } from "../services/configLoader.js";
import type { YummaConfig } from "../config/defaultConfig.js";
import { cli } from "../lib/cli-ui.js";
import { globby } from "globby";
import { messages } from "../lib/cli-lang.js";

let currentConfig: YummaConfig;
let buildTimeout: NodeJS.Timeout | null = null;
let changedFiles = new Set<string>();

export async function watch() {
  const watchSpinner = cli.startSpinner(messages.watch.start);

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
    watchSpinner.fail(messages.watch.fail);
    cli.error(
      error instanceof Error ? error.message : messages.common.unknownError
    );
    process.exit(1);
  }
}
