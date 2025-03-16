import { writeFileSync } from "fs";
import { compileSCSS } from "../services/scssCompiler.js";
import { purgeCSS } from "../services/purgeService.js";
import { minifyCSS } from "../services/minifyService.js";
import { loadConfig } from "../services/configLoader.js";
import type { YummaConfig } from "../config/defaultConfig.js";

type BuildCache = {
  css?: string;
  dependencies?: string[];
  configHash?: string;
};

let cache: BuildCache = {};

export async function build(
  existingConfig?: YummaConfig,
  forceRebuild = false
) {
  try {
    console.time("⏱️ Total build time");
    const config = existingConfig || (await loadConfig());

    // Config change detection
    const configHash = JSON.stringify(config);
    const configChanged = cache.configHash !== configHash;

    // Recompile SCSS only if needed
    let css: string;
    if (forceRebuild || configChanged || !cache.css) {
      console.time("🔨 SCSS compilation");
      const result = await compileSCSS(config);
      css = result.css;
      cache = {
        css: result.css,
        dependencies: result.dependencies,
        configHash,
      };
      console.timeEnd("🔨 SCSS compilation");
    } else {
      css = cache.css;
      console.log("♻️ Using cached SCSS compilation");
    }

    // Always purge and minify
    console.time("🧹 CSS purging");
    const purgedCSS = await purgeCSS(css, config);
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
