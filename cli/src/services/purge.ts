import { globby } from "globby";
import { PurgeCSS } from "purgecss";
import { Config } from "../config/schema.js";

export async function purge(
  css: string,
  config: Config
): Promise<string> {
  const res = await new PurgeCSS().purge({
    content: await globby(config.source),
    css: [{ raw: css }],
    defaultExtractor: (content) => {
      return content.match(/[\w-/\\:]+/g) || [];
    },
  });

  return res[0].css;
}
