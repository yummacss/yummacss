#!/usr/bin/env node

const { program } = require("commander");
const { PurgeCSS } = require("purgecss");
const fs = require("fs");
const path = require("path");
const configPath = path.resolve(process.cwd(), "yummacss.config.js");
const stylesPath = path.resolve(__dirname, "dist", "yumma.min.css");

if (!fs.existsSync(configPath)) {
  console.error("The yummacss.config.js file is missing.");
  process.exit(1);
}

const config = require(configPath);
const contentPath = config.content;
const outputPath = config.output;

if (contentPath.length === 0 || !outputPath) {
  console.error("The yummacss.config.js file is misconfigured.");
  process.exit(1);
}

async function purgeCSS() {
  try {
    const res = await new PurgeCSS().purge({
      content: contentPath,
      css: [stylesPath],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    });
    fs.writeFileSync(outputPath, res[0].css, "utf-8");
    console.log(`The ${outputPath} has been rebuilt`);
  } catch (err) {
    console.error("Purge process failed due to:", err);
  }
}

program
  .command("build")
  .description("Remove unused CSS classes from content files.")
  .action(() => {
    purgeCSS();
  });

program.parse(process.argv);
