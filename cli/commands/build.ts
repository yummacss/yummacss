import { writeFileSync } from "fs";
import { compileSCSS } from "../services/scssCompiler.js";
import { purgeCSS } from "../services/purgeService.js";
import { minifyCSS } from "../services/minifyService.js";
import { loadConfig } from "../services/configLoader.js";
import type { YummaConfig } from "../config/defaultConfig.js";

export async function build(existingConfig?: YummaConfig) {
  try {
    console.time("⏱️ Total build time");
    const config = existingConfig || (await loadConfig());

    console.time("🔨 SCSS compilation");
    const compiledCSS = await compileSCSS(config);
    console.timeEnd("🔨 SCSS compilation");

    console.time("🧹 CSS purging");
    const purgedCSS = await purgeCSS(compiledCSS, config);
    console.timeEnd("🧹 CSS purging");

    console.time("💎 CSS minification");
    const finalCSS = minifyCSS(purgedCSS, config);
    console.timeEnd("💎 CSS minification");

    writeFileSync(config.output, finalCSS);
    console.timeEnd("⏱️ Total build time");
    console.log("\n✅ Build completed successfully!\n");
  } catch (error) {
    console.error("\n❌ Build failed:", error);
    process.exit(1);
  }
}
