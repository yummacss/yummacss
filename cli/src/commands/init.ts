import { ConfigSchema, configName } from "@/config/schema";
import { message } from "@/utils/message";
import { cli } from "@/utils/status";
import { writeFileSync } from "fs";
import stringifyObject from "stringify-object";

function generateConfig(): { filename: string; content: string } {
  const z = ConfigSchema.parse({});

  return {
    filename: configName,
    content: `export default ${stringifyObject(z, {
      indent: "  ",
      singleQuotes: false,
    })};`,
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
