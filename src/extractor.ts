import { readFileSync } from "node:fs";
import { globby } from "globby";

export async function extractor(patterns: string[]): Promise<Set<string>> {
	const files = await globby(patterns);
	const classSet = new Set<string>();

	for (const file of files) {
		try {
			const content = readFileSync(file, "utf-8");
			const tokens = extractTokens(content);
			tokens.forEach((token) => {
				classSet.add(token);
			});
		} catch {}
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
		let match: RegExpExecArray | null;
		match = regex.exec(content);
		while (match !== null) {
			const classString = match[1];
			if (classString) {
				const individualClasses = classString
					.split(/\s+/)
					.filter((cls) => cls && /^[a-z]/.test(cls) && cls.includes("-"));

				individualClasses.forEach((cls) => {
					tokens.add(cls);
				});
			}
			match = regex.exec(content);
		}
	}

	return Array.from(tokens);
}
