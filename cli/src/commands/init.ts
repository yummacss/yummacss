import { writeFileSync } from "fs";
import { stringify } from "javascript-stringify";
import { ConfigSchema, configName } from "../config/schema.js";
import { message } from "../utils/message.js";
import { cli } from "../utils/status.js";

function generateConfig(): { filename: string; content: string } {
  const z = ConfigSchema.parse({});

  return {
    filename: configName,
    content: `export default ${stringify(z, null, 2)};`,
  };
}

export function init() {
  const status = cli.progress("Initializing config...");

  try {
    const { filename, content } = generateConfig();
    writeFileSync(filename, content);
    status.succeed(message.init.success);
  } catch (error) {
    status.fail(message.init.fail);
    process.exit(1);
  }
}
