import type { Config } from "@/config/schema";
import { extractor } from "./extractor.js";
import { generator } from "./generator.js";

export async function compiler(config: Config): Promise<{
  css: string;
  dependencies: string[];
}> {
  const usedClasses = await extractor(config.source);
  const css = generator(usedClasses, config);

  return {
    css,
    dependencies: config.source,
  };
}
