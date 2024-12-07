import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

export async function loadConfig() {
  const configPath = path.resolve(process.cwd(), "yummacss.config.js");

  if (!fs.existsSync(configPath)) {
    console.error("The yummacss.config.js file is missing.");
    process.exit(1);
  }

  try {
    const importedConfig = await import(pathToFileURL(configPath).href);
    return importedConfig.config;
  } catch (err) {
    console.error("Error loading yummacss.config.js:", err);
    process.exit(1);
  }
}
