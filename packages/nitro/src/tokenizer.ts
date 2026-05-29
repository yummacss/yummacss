export function tokenizer(content: string): string[] {
	const tokens = new Set<string>();

	// generic class attributes
	const classRegexes = [
		/class(?:Name)?=["']([^"']+)["']/g,
		/class(?:Name)?=\{["']([^"']+)["']\}/g,
		/class(?:Name)?=\{`([^`]+)`\}/g,
	];

	// template literals
	const templateRegexes = [/`([^`]+)`/g, /"([^"]+)"/g, /'([^']+)'/g];

	// cva (class variance authority)
	const cvaRegexes = [
		/cva\s*\(\s*["'`]([^"'`]+)["'`]/g,
		/:\s*["'`]([^"'`]+)["'`]/g,
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
				const individualClasses = classString.split(/\s+/).filter((cls) => {
					const clean = cls.replace(/^@+/, "");
					return clean && /^[a-z]/.test(clean) && clean.includes("-");
				});

				individualClasses.forEach((cls) => {
					tokens.add(cls);
				});
			}
			match = regex.exec(content);
		}
	}

	return Array.from(tokens);
}
