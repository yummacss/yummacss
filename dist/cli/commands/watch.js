import chok from "chokidar";
import { build } from "./build.js";
import { loadConfig } from "../services/configLoader.js";
import { cli } from "../utils/cli-ui.js";
import { globby } from "globby";
import { messages } from "../lang.js";
let currentConfig;
let buildTimeout = null;
let changedFiles = new Set();
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
        function handleChange(path, event) {
            // Add to batch of changed files
            changedFiles.add(path);
            // Clear existing timeout and set a new one
            if (buildTimeout) {
                clearTimeout(buildTimeout);
            }
            buildTimeout = setTimeout(async () => {
                // Only build if there are actually changed files
                if (changedFiles.size > 0) {
                    await build(currentConfig, true);
                    // Clear the batch after building
                    changedFiles.clear();
                }
                buildTimeout = null;
            }, 500); // 500ms debounce
        }
    }
    catch (error) {
        watchSpinner.fail(messages.watch.fail);
        cli.error(error instanceof Error ? error.message : messages.common.unknownError);
        process.exit(1);
    }
}
