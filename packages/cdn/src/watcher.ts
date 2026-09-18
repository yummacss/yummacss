export function watcher(
	target: HTMLElement,
	callback: () => void,
): MutationObserver {
	const observer = new MutationObserver((mutations) => {
		let shouldUpdate = false;

		for (const mutation of mutations) {
			if (
				mutation.type === "attributes" &&
				mutation.attributeName === "class"
			) {
				shouldUpdate = true;
				break;
			}

			if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
				shouldUpdate = true;
				break;
			}
		}

		if (shouldUpdate) {
			callback();
		}
	});

	observer.observe(target, {
		attributes: true,
		attributeFilter: ["class"],
		childList: true,
		subtree: true,
	});

	return observer;
}
