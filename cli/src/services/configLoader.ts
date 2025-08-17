import { join } from "path";
import { pathToFileURL } from "url";
import {
  InternalConfig,
  ConfigSchema,
  defaultBuildOptions
} from "../config/defaultConfig.js";

export async function loadConfig(): Promise<InternalConfig> {
  const configPath = join(process.cwd(), "yumma.config.js");
  const configUrl = pathToFileURL(configPath).href;

  try {
    const { default: userConfig } = (await import(configUrl)) as {
      default: unknown;
    };

    // Validate user config with Zod schema
    const validatedConfig = ConfigSchema.parse(userConfig);

    // Apply defaults for optional fields
    const internalConfig: InternalConfig = {
      source: validatedConfig.source,
      output: validatedConfig.output,
      buildOptions: {
        reset: validatedConfig.buildOptions?.reset ?? defaultBuildOptions.reset,
        minify: validatedConfig.buildOptions?.minify ?? defaultBuildOptions.minify,
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
