#!/usr/bin/env node

const { program } = require("commander");
const { PurgeCSS } = require("purgecss");
const CleanCSS = require("clean-css");
const fs = require("fs");
const path = require("path");

const configPath = path.resolve(process.cwd(), "yummacss.config.js");
const cssFilePath = path.resolve(__dirname, "dist", "yumma.css");

if (!fs.existsSync(configPath)) {
  console.error("Error: Your yummacss.config.js could not be found.");
  process.exit(1);
}

const config = require(configPath);
const contentPaths = config.content;
const outputFilePath = config.output;

const capabilities = {
  core: true,
  minify: false,
  ...config.capabilities,
};

if (contentPaths.length === 0 || !outputFilePath) {
  console.error(
    "Error: Your 'yummacss.config.js' file is incomplete. See the documentation for info: https://yummacss.com/docs/configuration"
  );
  process.exit(1);
}

async function purgeCSS() {
  try {
    const purgeResult = await new PurgeCSS().purge({
      content: contentPaths,
      css: [cssFilePath],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    });

    let cssContent = purgeResult[0].css;

    fs.writeFileSync(outputFilePath, cssContent, "utf-8");
    console.log(`Purged CSS file created at ${outputFilePath}`);

    if (capabilities.minify) {
      const minifiedCSS = new CleanCSS().minify(cssContent).styles;
      const minifiedOutputPath = outputFilePath.replace(".css", ".min.css");
      fs.writeFileSync(minifiedOutputPath, minifiedCSS, "utf-8");
      console.log(`Minified CSS file created at ${minifiedOutputPath}`);
    }
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
