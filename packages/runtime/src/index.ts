import { baseStyles, generator } from "@yummacss/nitro/browser";
import { extractor } from "./extractor";
import { watcher } from "./watcher";

class YummaCSS {
	private styleElement: HTMLStyleElement | null = null;
	private observer: MutationObserver | null = null;
	private processedClasses = new Set<string>();
	private resetInjected = false;

	public init(): void {
		this.injectReset();
		this.process();
		this.startWatching();
	}

	private process(): void {
		const classes = extractor(document.body);
		const newClasses = new Set<string>();

		for (const cls of classes) {
			if (!this.processedClasses.has(cls)) {
				newClasses.add(cls);
				this.processedClasses.add(cls);
			}
		}

		if (newClasses.size > 0) {
			const css = generator(newClasses, {
				source: [],
				output: "",
				buildOptions: { reset: false, minify: false },
			});
			this.injectCSS(css);
		}
	}

	private injectReset(): void {
		if (this.resetInjected) return;

		const resetStyle = document.createElement("style");
		resetStyle.setAttribute("data-yummacss-reset", "");
		resetStyle.textContent = baseStyles;
		document.head.appendChild(resetStyle);

		this.resetInjected = true;
	}

	private startWatching(): void {
		if (this.observer) return;

		this.observer = watcher(document.body, () => {
			this.process();
		});
	}

	private injectCSS(css: string): void {
		if (!this.styleElement) {
			this.styleElement = document.createElement("style");
			this.styleElement.setAttribute("data-yummacss", "");
			document.head.appendChild(this.styleElement);
		}

		this.styleElement.textContent += `\n${css}`;
	}
}

if (typeof window !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			const yummacss = new YummaCSS();
			yummacss.init();
		});
	} else {
		const yummacss = new YummaCSS();
		yummacss.init();
	}
}
