import fs from "fs";
import path from "path";
import { PurgeCSS } from "purgecss";

export async function purgeCSS(content, outputPath) {
  try {
    console.log("Purging unused CSS...");
    const purgeResult = await new PurgeCSS().purge({
      content: content,
      css: [outputPath],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    });

    const purgedOutputPath = path.resolve(process.cwd(), outputPath);
    fs.writeFileSync(purgedOutputPath, purgeResult[0].css, "utf-8");
    console.log(`Purged CSS written to ${purgedOutputPath}`);
  } catch (err) {
    console.error("CSS purge failed:", err);
    process.exit(1);
  }
}
