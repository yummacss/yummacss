import chokidar from "chokidar";
import { build } from "./build.js";
import { loadConfig } from "../services/configLoader.js";
import { cli } from "../utils/cli-ui.js";
let currentConfig;
export async function watch() {
    const watchSpinner = cli.startSpinner("Initializing watch mode...");
    try {
        currentConfig = await loadConfig();
        watchSpinner.start("Watching for changes...");
        // Initial build
        await build(currentConfig, true);
        const watcher = chokidar.watch([
            ...currentConfig.source,
            "yumma.config.js",
            ...(currentConfig.buildOptions.reset
                ? ["yummacss.scss"]
                : ["yummacss-core.scss"]),
        ], {
            awaitWriteFinish: {
                stabilityThreshold: 200,
                pollInterval: 50
            },
            ignored: /(^|[/\\])\../,
            ignoreInitial: true,
            persistent: true,
        });
        watcher
            .on("add", (path) => handleChange(path, "added"))
            .on("change", (path) => handleChange(path, "changed"))
            .on("unlink", (path) => handleChange(path, "removed"));
        async function handleChange(path, event) {
            // cli.info(`File ${event}: ${path}`);
            await build(currentConfig, path === "yumma.config.js" || path.endsWith(".scss"));
        }
    }
    catch (error) {
        watchSpinner.fail("Watch failed!");
        cli.error(error instanceof Error ? error.message : "Unknown error occurred");
        process.exit(1);
    }
}
