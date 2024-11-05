#!/usr/bin/env node

const { program } = require("commander");
const { PurgeCSS } = require("purgecss");
const fs = require("fs");
const path = require("path");

const configPath = path.resolve(process.cwd(), "yummacss.config.js");
const cssFilePath = path.resolve(__dirname, "dist", "yumma.min.css");

if (!fs.existsSync(configPath)) {
  console.error("Error: Your yummacss.config.js could not be found.");
  process.exit(1);
}

const config = require(configPath);
const contentPaths = config.content;
const outputFilePath = config.output;

if (contentPaths.length === 0 || !outputFilePath) {
  console.error(
    "Error: Your 'yummacss.config.js' file is incomplete. See the documentation for info: https://yummacss.com/docs/configuration"
  );
  process.exit(1);
}

async function purgeCSS() {
  try {
    const purgeCSSRes = await new PurgeCSS().purge({
      content: contentPaths,
      css: [cssFilePath],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    });
    fs.writeFileSync(outputFilePath, purgeCSSRes[0].css, "utf-8");
    console.log(`Purged CSS file created at ${outputFilePath}`);
  } catch (err) {
    console.error("Error during CSS purging:", err);
  }
}

program
  .command("build")
  .description("Optimizes CSS file based on your markup.")
  .action(() => {
    purgeCSS();
  });

program.parse(process.argv);
