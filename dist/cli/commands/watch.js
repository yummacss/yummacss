import chokidar from "chokidar";
import { build } from "./build.js";
import { loadConfig } from "../services/configLoader.js";
export async function watch() {
    try {
        const config = await loadConfig();
        console.log("🚀 Watching for changes...\n");
        chokidar
            .watch([...config.source, "yumma.config.js"])
            .on("all", async (event, path) => {
            console.log(`🔍 Detected change in: ${path}`);
            console.time("🔄 Rebuild time");
            await build(config).catch(() => { });
            console.timeEnd("🔄 Rebuild time");
            console.log("\n👀 Watching for changes...\n");
        });
    }
    catch (error) {
        console.error("❌ Watch failed:", error);
        process.exit(1);
    }
}
