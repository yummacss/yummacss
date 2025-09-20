import { readFileSync } from "fs";
import { globby } from "globby";

export async function extractor(patterns: string[]): Promise<Set<string>> {
  const files = await globby(patterns);
  const classSet = new Set<string>();

  for (const file of files) {
    try {
      const content = readFileSync(file, "utf-8");
      const tokens = extractTokens(content);
      tokens.forEach((token) => classSet.add(token));
    } catch (error) {
      // skip if can't read
      continue;
    }
  }

  return classSet;
}

// we will probably isolate this into its own package later
function extractTokens(content: string): string[] {
  const tokens = new Set<string>();

  // generic class attributes
  const classRegexes = [
    /class(?:Name)?=["']([^"']+)["']/g,
    /class(?:Name)?=\{["']([^"']+)["']\}/g,
    /class(?:Name)?=\{`([^`]+)`\}/g,
  ];

  // template literals
  const templateRegexes = [
    /`[^`]*\b([a-z]+-[a-z0-9-]+)\b[^`]*`/g,
    /"[^"]*\b([a-z]+-[a-z0-9-]+)\b[^"]*"/g,
    /'[^']*\b([a-z]+-[a-z0-9-]+)\b[^']*'/g,
  ];

  const allRegexes = [...classRegexes, ...templateRegexes];

  for (const regex of allRegexes) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const classString = match[1];
      if (classString) {
        const individualClasses = classString
          .split(/\s+/)
          .filter((cls) => cls && /^[a-z]/.test(cls) && cls.includes("-"));

        individualClasses.forEach((cls) => tokens.add(cls));
      }
    }
  }

  return Array.from(tokens);
}
