import { existsSync, readFileSync, writeFileSync } from "fs";
import { ConfigSchema, configName } from "../config/schema.js";
import { message } from "../utils/message.js";
import { cli } from "../utils/status.js";

function detectModule(): "esm" | "cjs" {
  try {
    if (existsSync("package.json")) {
      const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
      return pkg.type === "module" ? "esm" : "cjs";
    }
  } catch (error) {
    cli.error(message.common.unknownError);
  }
  return "cjs";
}

function generateConfig(): { filename: string; content: string } {
  const z = ConfigSchema.parse({});

  const moduleSystem = detectModule();

  if (moduleSystem === "esm") {
    return {
      filename: configName,
      content: `export default ${JSON.stringify(z, null, 2)};`,
    };
  } else {
    return {
      filename: configName,
      content: `module.exports = ${JSON.stringify(z, null, 2)};`,
    };
  }
}

export function init() {
  const init = cli.progress(message.init.start);

  try {
    const { filename, content } = generateConfig();
    writeFileSync(filename, content);

    init.succeed(message.init.success);
  } catch (error) {
    init.fail(message.init.fail);
    cli.error(message.common.unknownError);
    process.exit(1);
  }
}
