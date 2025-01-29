import fs from "fs";
import * as sass from "sass";
import CleanCSS from "clean-css";

export async function buildCSS(config, scssEntryPoint, outputPath) {
  const { core, minify } = config.capabilities;

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
