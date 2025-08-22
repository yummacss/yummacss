import { join } from "path";
import { pathToFileURL } from "url";
import { ConfigSchema } from "../config/schema.js";
import {
  configName,
  InternalConfig,
} from "../config/template.js";

export async function loadConfig(): Promise<InternalConfig> {
  const path = join(process.cwd(), configName);
  const url = pathToFileURL(path).href;

  try {
    const { default: userConfig } = (await import(url)) as {
      default: unknown;
    };

    const config = ConfigSchema.parse(userConfig);
    return config as InternalConfig;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Config validation failed: ${error.message}`);
    }
    throw error;
  }
}
