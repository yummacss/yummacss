import { PurgeCSS } from "purgecss";
import { YummaConfig } from "../config/defaultConfig.js";

export async function purgeCSS(
  css: string,
  config: YummaConfig
): Promise<string> {
  const purgeCSSResult = await new PurgeCSS().purge({
    content: config.source,
    css: [
      {
        raw: css,
      },
    ],
  });

  return purgeCSSResult[0].css;
}
