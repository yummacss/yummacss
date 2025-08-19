import { existsSync, readFileSync, writeFileSync } from "fs";
import { ConfigSchema, defaultConfig } from "../config/defaultConfig.js";
import { messages } from "../utils/lang.js";
import { ui } from "../utils/ui.js";

function detectModuleSystem(): "esm" | "cjs" {
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

function generateConfigFromSchema(): { filename: string; content: string } {
  const validatedConfig = ConfigSchema.parse(defaultConfig);

  const moduleSystem = detectModuleSystem();

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
  const init = ui.startSpinner(messages.init.start);

  try {
    const { filename, content } = generateConfigFromSchema();
    writeFileSync(filename, content);

    init.succeed(messages.init.success);
  } catch (error) {
    init.fail(messages.init.fail);
    ui.error(
      error instanceof Error ? error.message : messages.common.unknownError
    );
    process.exit(1);
  }
}
