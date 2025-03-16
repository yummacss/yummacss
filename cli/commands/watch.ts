import chokidar from "chokidar";
import { build } from "./build.js";
import { loadConfig } from "../services/configLoader.js";
import type { YummaConfig } from "../config/defaultConfig.js";

let currentConfig: YummaConfig;
let watchedFiles: string[] = [];

export async function watch() {
  try {
    currentConfig = await loadConfig();
    console.log("🚀 Watching for changes...\n");

    // Initial build
    await build(currentConfig, true);

    // Set up watcher
    const watcher = chokidar.watch(
      [
        ...currentConfig.source,
        "yumma.config.js",
        ...(currentConfig.buildOptions.reset
          ? ["yummacss.scss"]
          : ["yummacss-core.scss"]),
      ],
      {
        ignored: /(^|[/\\])\../, // ignore dotfiles
        persistent: true,
      }
    );

    watcher
      .on("change", async (path) => handleChange(path, "changed"))
      .on("add", async (path) => handleChange(path, "added"))
      .on("unlink", async (path) => handleChange(path, "removed"));

    async function handleChange(path: string, event: string) {
      console.log(`🔍 ${event}: ${path}`);
      console.time("🔄 Rebuild time");

      const configChanged = path === "yumma.config.js";
      const scssChanged = path.endsWith(".scss");

      await build(currentConfig, configChanged || scssChanged);

      console.timeEnd("🔄 Rebuild time");
      console.log("\n👀 Watching for changes...\n");
    }
  } catch (error) {
    console.error("❌ Watch failed:", error);
    process.exit(1);
  }
}
