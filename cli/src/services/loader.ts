import { join } from "path";
import { pathToFileURL } from "url";
import { ConfigSchema } from "../config/schema.js";
import {
  configName,
  defaultConfig,
  InternalConfig,
} from "../config/template.js";

export async function loadConfig(): Promise<InternalConfig> {
  const path = join(process.cwd(), configName);
  const url = pathToFileURL(path).href;

  try {
    const { default: userConfig } = (await import(url)) as {
      default: unknown;
    };

    const z = ConfigSchema.parse(userConfig);

    const ic: InternalConfig = {
      source: z.source,
      output: z.output,
      buildOptions: {
        reset: z.buildOptions?.reset ?? defaultConfig.buildOptions.reset,
        minify: z.buildOptions?.minify ?? defaultConfig.buildOptions.reset,
      },
    };

    return ic;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Config validation failed: ${error.message}`);
    }
    throw error;
  }
}
