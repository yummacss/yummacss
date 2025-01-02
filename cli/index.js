import { fileURLToPath } from "url";
import path from "path";
import { loadConfig } from "./config.js";
import { buildCSS } from "./build.js";
import { purgeCSS } from "./purge.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runBuild() {
  console.log("Starting the build process...");

  const config = await loadConfig();
  const { content, output, capabilities } = config;

  // console.log("Configuration:", config);

  if (!output) {
    throw new Error("Output path is not defined.");
  }

  const scssEntryPoint = capabilities.core
    ? path.resolve(__dirname, "../src/yummacss.scss")
    : path.resolve(__dirname, "../src/coreless.scss");

  const outputPath = path.resolve(process.cwd(), output);

  if (!scssEntryPoint || !outputPath) {
    throw new Error("Invalid entry point or output path.");
  }

  await buildCSS(config, scssEntryPoint, outputPath);

  if (content && content.length > 0) {
    await purgeCSS(content, outputPath);
  } else {
    console.log("No content files specified.");
  }
}
