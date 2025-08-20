import { join } from "path";
import { pathToFileURL } from "url";
import { ConfigSchema } from "../config/schema.js";
import { defaultConfig, InternalConfig } from "../config/template.js";

export async function loadConfig(): Promise<InternalConfig> {
  const path = join(process.cwd(), "yumma.config.js");
  const url = pathToFileURL(path).href;

  try {
    const { default: userConfig } = (await import(url)) as {
      default: unknown;
    };

    const validatedConfig = ConfigSchema.parse(userConfig);

    const ic: InternalConfig = {
      source: validatedConfig.source,
      output: validatedConfig.output,
      buildOptions: {
        reset:
          validatedConfig.buildOptions?.reset ??
          defaultConfig.buildOptions.reset,
        minify:
          validatedConfig.buildOptions?.minify ??
          defaultConfig.buildOptions.reset,
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
