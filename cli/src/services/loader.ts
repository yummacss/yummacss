import { join } from "path";
import { pathToFileURL } from "url";
import { ConfigSchema, Config, configName } from "../config/schema.js";

export async function loadConfig(): Promise<Config> {
  const path = join(process.cwd(), configName);
  const url = pathToFileURL(path).href;

  try {
    const { default: userConfig } = (await import(url)) as {
      default: unknown;
    };

    const config = ConfigSchema.parse(userConfig);
    return config;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Config validation failed: ${error.message}`);
    }
    throw error;
  }
}
