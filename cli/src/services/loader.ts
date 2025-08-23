import { join } from "path";
import { pathToFileURL } from "url";
import { ConfigSchema, Config, configName } from "../config/schema.js";
import { cli } from "../utils/status.js";
import { message } from "../utils/message.js";
import { existsSync } from "fs";
import { z } from "zod";

export async function loadConfig(): Promise<Config> {
  const path = join(process.cwd(), configName);
  const url = pathToFileURL(path).href;

  try {
    const { default: userConfig } = (await import(url)) as {
      default: Config;
    };

    const config = ConfigSchema.parse(userConfig);
    return config;
  } catch (error) {
    if (!existsSync(configName)) {
      const status = cli.progress(message.init.notFound);
      status.warn(message.init.notFound);
      process.exit(1);
    } else if (error instanceof z.ZodError) {
      const status = cli.progress(message.init.invalid);
      status.fail(message.init.invalid);
      process.exit(1);
    }
    throw error;
  }
}
