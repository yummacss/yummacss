import { join } from "path";
import { pathToFileURL } from "url";
import {
  ConfigSchema,
  defaultConfig,
  InternalConfig,
} from "../config/defaultConfig.js";

export async function loadConfig(): Promise<InternalConfig> {
  const configPath = join(process.cwd(), "yumma.config.js");
  const configUrl = pathToFileURL(configPath).href;

  try {
    const { default: userConfig } = (await import(configUrl)) as {
      default: unknown;
    };

    const validatedConfig = ConfigSchema.parse(userConfig);

    const internalConfig: InternalConfig = {
      source: validatedConfig.source,
      output: validatedConfig.output,
      buildOptions: {
        reset: validatedConfig.buildOptions?.reset ?? defaultConfig.buildOptions.reset,
        minify:
          validatedConfig.buildOptions?.minify ?? defaultConfig.buildOptions.reset,
      },
    };

    return internalConfig;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Config validation failed: ${error.message}`);
    }
    throw error;
  }
}
