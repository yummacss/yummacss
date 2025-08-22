import { join } from "path";
import { pathToFileURL } from "url";
import { ConfigSchema, Config, configName } from "../config/schema.js";
import { cli } from "../utils/status.js";
import { message } from "../utils/message.js";

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
    if (error instanceof Error) {
      cli.error(message.config.fail);
    }
    throw error;
  }
}
