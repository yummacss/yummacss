export function tokenizer(content: string): string[] {
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

	// cva (class variance authority)
	const cvaRegexes = [
		/cva\s*\(\s*["'`]([^"'`]+)["'`]/g,
		/:\s*["'`]([^"'`]*\b[a-z]+-[a-z0-9-]+[^"'`]*)["'`]/g,
	];

	// cn utility
	const cnRegexes = [
		/\bcn\s*\(\s*["'`]([^"'`]+)["'`]/g,
		/\bcn\s*\(\s*\{\s*["'`]([^"'`]+)["'`]\s*:/g,
	];

	// clsx and classnames
	const clsxRegexes = [
		/clsx\s*\(\s*["'`]([^"'`]+)["'`]/g,
		/classnames\s*\(\s*["'`]([^"'`]+)["'`]/g,
		/clsx\s*\(\s*\{\s*["'`]([^"'`]+)["'`]\s*:/g,
		/classnames\s*\(\s*\{\s*["'`]([^"'`]+)["'`]\s*:/g,
	];

	const allRegexes = [
		...classRegexes,
		...templateRegexes,
		...cvaRegexes,
		...cnRegexes,
		...clsxRegexes,
	];

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
