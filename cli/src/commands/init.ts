import { existsSync, readFileSync, writeFileSync } from "fs";
import { ConfigSchema } from "../config/schema.js";
import { defaultConfig } from "../config/template.js";
import { msg } from "../utils/message.js";
import { cli } from "../utils/status.js";

function detectModule(): "esm" | "cjs" {
  try {
    if (existsSync("package.json")) {
      const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));
      return packageJson.type === "module" ? "esm" : "cjs";
    }
  } catch (error) {
    // if we can't read package.json, default to cjs
    console.error("Failed to read package.json:", error);
  }
  return "cjs";
}

function generateConfig(): { filename: string; content: string } {
  const validatedConfig = ConfigSchema.parse(defaultConfig);

  const moduleSystem = detectModule();

  if (moduleSystem === "esm") {
    return {
      filename: "yumma.config.js",
      content: `export default ${JSON.stringify(validatedConfig, null, 2)};`,
    };
  } else {
    return {
      filename: "yumma.config.js",
      content: `module.exports = ${JSON.stringify(validatedConfig, null, 2)};`,
    };
  }
}

export function init() {
  const init = cli.startSpinner(msg.init.start);

  try {
    const { filename, content } = generateConfig();
    writeFileSync(filename, content);

    init.succeed(msg.init.success);
  } catch (error) {
    init.fail(msg.init.fail);
    cli.error(error instanceof Error ? error.message : msg.common.unknownError);
    process.exit(1);
  }
}
