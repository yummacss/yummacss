#!/usr/bin/env node

import { program } from "commander";
import { PurgeCSS } from "purgecss";
import fs from "fs";
import path from "path";
import sass from "sass";
import CleanCSS from "clean-css";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(process.cwd(), "yummacss.config.js");

if (!fs.existsSync(configPath)) {
  console.error("The yummacss.config.js file is missing.");
  process.exit(1);
}

let config;

try {
  const importedConfig = await import(pathToFileURL(configPath).href);
  config = importedConfig.config;
} catch (err) {
  console.error("Error loading yummacss.config.js:", err);
  process.exit(1);
}

const { content = [], output = "yumma.css", capabilities = {} } = config;
const { core = true, minify = true } = capabilities;

const outputPath = path.resolve(process.cwd(), output);
const scssEntryPoint = core
  ? path.resolve(__dirname, "../src/index.scss")
  : path.resolve(__dirname, "../src/coreless.scss");

if (content.length === 0 || !output) {
  console.error("The yummacss.config.js file is misconfigured.");
  process.exit(1);
}

async function buildCSS() {
  try {
    console.log("Compiling SCSS...");
    const result = sass.compile(scssEntryPoint, { quietDeps: !core });
    let css = result.css;

    if (minify) {
      console.log("Minifying CSS...");
      const minified = new CleanCSS().minify(css);
      if (minified.errors.length > 0) {
        throw new Error(minified.errors.join("\n"));
      }
      css = minified.styles;
    }

    console.log(`Writing CSS to ${outputPath}`);
    fs.writeFileSync(outputPath, css, "utf-8");
  } catch (err) {
    console.error("CSS build failed:", err);
    process.exit(1);
  }
}

async function purgeCSS() {
  try {
    console.log("Purging unused CSS...");
    const purgeResult = await new PurgeCSS().purge({
      content: content,
      css: [outputPath],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    });

    const purgedOutputPath = path.resolve(process.cwd(), output);
    fs.writeFileSync(purgedOutputPath, purgeResult[0].css, "utf-8");
    console.log(`Purged CSS written to ${purgedOutputPath}`);
  } catch (err) {
    console.error("CSS purge failed:", err);
    process.exit(1);
  }
}

program
  .command("build")
  .description("Build and optimize CSS based on your configuration.")
  .action(async () => {
    try {
      await buildCSS();

      if (content.length > 0) {
        await purgeCSS();
      } else {
        console.log(
          "Skipping CSS purge: no content files specified in the configuration."
        );
      }
    } catch (err) {
      console.error("Build process failed:", err);
    }
  });

program.parse(process.argv);
