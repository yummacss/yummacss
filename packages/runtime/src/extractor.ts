export function extractor(root: HTMLElement = document.body): Set<string> {
	const classSet = new Set<string>();
	const elements = root.querySelectorAll("[class]");

	for (const element of elements) {
		const classList = element.getAttribute("class");
		if (!classList) continue;

		const classes = classList.split(/\s+/).filter((cls) => {
			return cls && /^[a-z]/.test(cls) && cls.includes("-");
		});

		for (const cls of classes) {
			classSet.add(cls);
		}
	}

	return classSet;
}
