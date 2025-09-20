import { getAllUtils, type Utilities, type Utility } from "@yummacss/api";
import type { Config } from "../config/schema.js";
import { BASE_CSS } from "../styles/base.js";

export function generator(usedClasses: Set<string>, config: Config): string {
  const cssBlocks: string[] = [];

  if (config.buildOptions.reset) {
    cssBlocks.push(BASE_CSS);
  }

  const util = generateUtil(usedClasses);
  if (util) {
    cssBlocks.push(util);
  }

  return cssBlocks.join("\n\n");
}

function generateUtil(usedClasses: Set<string>): string {
  const all = getAllUtils();
  const cssRules: string[] = [];
  const processedClasses = new Set<string>();

  for (const className of usedClasses) {
    if (processedClasses.has(className)) continue;

    const rule = generateCSSRule(className, all);
    if (rule) {
      cssRules.push(rule);
      processedClasses.add(className);
    }
  }

  return cssRules.join("\n");
}

function tryGenerateRule(className: string, util: Utility): string | null {
  const { prefix, properties, values } = util;

  if (!className.startsWith(prefix + "-")) return null;

  const valuePart = className.slice(prefix.length + 1);
  const cssValue = values[valuePart];

  if (!cssValue) return null;

  const declarations = properties
    .map((prop) => `  ${prop}: ${cssValue};`)
    .join("\n");

  return `.${className} {\n${declarations}\n}`;
}

function generateCSSRule(className: string, utils: Utilities): string | null {
  for (const [_, util] of Object.entries(utils)) {
    const rule = tryGenerateRule(className, util);
    if (rule) return rule;
  }
  return null;
}
