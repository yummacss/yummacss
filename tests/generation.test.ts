import { coreUtils } from "@yummacss/core";
import { generator } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

describe("Utility Generation", () => {
	const utils = coreUtils();
	const config = {
		buildOptions: { reset: false },
	};

	it("should generate all core utilities and their variants", () => {
		for (const [utilityName, utility] of Object.entries(utils)) {
			const { prefix, values, variants } = utility;

			// 1. Test base values
			for (const [valueSuffix, _cssValue] of Object.entries(values)) {
				const className =
					valueSuffix === "base" || valueSuffix === ""
						? prefix
						: `${prefix}-${valueSuffix}`;

				const usedClasses = new Set([className]);
				const css = generator(usedClasses, config as any);

				expect(
					css,
					`Utility ${utilityName} for class ${className} failed to generate`,
				).toContain(
					`.${className.replace(/:/g, "\\:").replace(/\//g, "\\/").replace(/%/g, "\\%")}`,
				);
			}

			// 2. Test variants (pick one of each type if they exist)
			if (variants) {
				const sampleValueSuffix = Object.keys(values)[0];
				const baseClass =
					sampleValueSuffix === "base" || sampleValueSuffix === ""
						? prefix
						: `${prefix}-${sampleValueSuffix}`;

				// Media Queries
				if (variants.mediaQueries && variants.mediaQueries.length > 0) {
					const mq = variants.mediaQueries[0];
					if (mq) {
						const className = `${mq.prefix}:${baseClass}`;
						const usedClasses = new Set([className]);
						const css = generator(usedClasses, config as any);
						expect(
							css,
							`Media query variant ${mq.prefix} for ${baseClass} failed`,
						).toContain(mq.value);
						expect(css).toContain(
							`.${className.replace(/:/g, "\\:").replace(/\//g, "\\/").replace(/%/g, "\\%")}`,
						);
					}
				}

				// Pseudo Classes
				if (variants.pseudoClasses && variants.pseudoClasses.length > 0) {
					const pc = variants.pseudoClasses[0];
					if (pc) {
						const className = `${pc.prefix}:${baseClass}`;
						const usedClasses = new Set([className]);
						const css = generator(usedClasses, config as any);
						expect(
							css,
							`Pseudo class variant ${pc.prefix} for ${baseClass} failed`,
						).toContain(`${pc.value}`);
						expect(css).toContain(
							`.${className.replace(/:/g, "\\:").replace(/\//g, "\\/").replace(/%/g, "\\%")}`,
						);
					}
				}

				// Pseudo Elements
				if (variants.pseudoElements && variants.pseudoElements.length > 0) {
					const pe = variants.pseudoElements[0];
					if (pe) {
						const className = `${pe.prefix}::${baseClass}`;
						const usedClasses = new Set([className]);
						const css = generator(usedClasses, config as any);
						expect(
							css,
							`Pseudo element variant ${pe.prefix} for ${baseClass} failed`,
						).toContain(`${pe.value}`);
						expect(css).toContain(
							`.${className.replace(/:/g, "\\:").replace(/\//g, "\\/").replace(/%/g, "\\%")}`,
						);
					}
				}

				// Opacity
				if (variants.opacity && variants.opacity.length > 0) {
					const op = variants.opacity[0];
					if (op) {
						const className = `${baseClass}/${op.prefix}`;
						const usedClasses = new Set([className]);
						const css = generator(usedClasses, config as any);
						expect(
							css,
							`Opacity variant ${op.prefix} for ${baseClass} failed`,
						).toContain(
							`.${className.replace(/:/g, "\\:").replace(/\//g, "\\/").replace(/%/g, "\\%")}`,
						);
					}
				}
			}
		}
	});
});
