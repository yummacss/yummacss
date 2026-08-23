import { coreUtils } from "@yummacss/core";
import { generator } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

describe("Utility Generation", () => {
	const utils = coreUtils();
	const config = {
		buildOptions: { reset: false },
	};

	// Explicit timeout: this walks every utility, every value & every variant,
	// which lands around 4.8s against vitest's 5000ms default - so it passed or
	// failed on machine speed. `pnpm test` gates the publish workflow, and a
	// coin-flip failure there blocks a release for no reason.
	it(
		"should generate all core utilities and their variants",
		{ timeout: 30000 },
		() => {
			for (const [utilityName, utility] of Object.entries(utils)) {
				const { prefix, values, variants } = utility;

				// 1. Test base values
				for (const [valueSuffix, _cssValue] of Object.entries(values)) {
					const className =
						valueSuffix === "base" || valueSuffix === ""
							? prefix
							: `${prefix}:${valueSuffix}`;

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
							: `${prefix}:${sampleValueSuffix}`;

					// Media Queries
					if (variants.mediaQueries && variants.mediaQueries.length > 0) {
						const mq = variants.mediaQueries[0];
						if (mq) {
							const className = `@${mq.prefix}:${baseClass}`;
							const usedClasses = new Set([className]);
							const css = generator(usedClasses, config as any);
							expect(
								css,
								`Media query variant ${mq.prefix} for ${baseClass} failed`,
							).toContain(mq.value);
							expect(css).toContain(
								`.${className.replace(/@/g, "\\@").replace(/:/g, "\\:").replace(/\//g, "\\/").replace(/%/g, "\\%")}`,
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
		},
	);
});

describe("Negative value handling", () => {
	const config = { buildOptions: { reset: false } };

	it("should negate plain numeric values", () => {
		const css = generator(new Set(["m:-4"]), config as any);
		expect(css).toContain(".m\\:-4");
		expect(css).toMatch(/margin:\s*-1rem;/);
	});

	it("should negate the number inside a function-wrapped transform value, not the whole string", () => {
		const skewY = generator(new Set(["tsy:-6"]), config as any);
		expect(skewY).toContain(".tsy\\:-6");
		expect(skewY).toMatch(/transform:\s*skewY\(-6deg\);/);
		expect(skewY).not.toContain("-skewY(6deg)");

		const skewX = generator(new Set(["tsx:-3"]), config as any);
		expect(skewX).toMatch(/transform:\s*skewX\(-3deg\);/);
	});

	it("should leave non-numeric values unchanged", () => {
		const css = generator(new Set(["d:-f"]), config as any);
		// "d:f" has no negatable form - "d:-f" should not match any rule
		expect(css).not.toContain("display: -flex");
	});
});
