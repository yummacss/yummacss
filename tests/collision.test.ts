import type { Utility } from "@yummacss/core";
import { coreUtils } from "@yummacss/core";
import { generator } from "@yummacss/nitro";
import { describe, expect, it } from "vite-plus/test";
import { merge } from "yummacss/merge";

describe("Check for class name collisions", () => {
	it("should not have any class name collisions", () => {
		const utils = coreUtils();
		const classMap = new Map<string, string[]>();
		const collisions: Array<{ class: string; utilities: string[] }> = [];

		for (const [utilityName, utility] of Object.entries(utils)) {
			const { prefix, values } = utility as Utility;

			for (const [valueSuffix, _cssValue] of Object.entries(values)) {
				const className =
					valueSuffix === "base" || valueSuffix === ""
						? prefix
						: `${prefix}:${valueSuffix}`;

				if (!classMap.has(className)) {
					classMap.set(className, []);
				}
				const utilities = classMap.get(className);
				if (utilities) {
					utilities.push(utilityName);
				}
			}
		}

		for (const [className, utilities] of classMap.entries()) {
			if (utilities.length > 1) {
				collisions.push({ class: className, utilities });
			}
		}

		if (collisions.length > 0) {
			const report = collisions
				.map(
					(c) =>
						`  - "${c.class}" conflicts between: ${c.utilities.join(", ")}`,
				)
				.join("\n");

			throw new Error(
				`Found ${collisions.length} class name collision(s):\n${report}`,
			);
		}

		expect(collisions).toHaveLength(0);
	});
});

describe("Check function values on shared prefixes", () => {
	it("gives var() to one utility, and merge agrees", () => {
		const utils = Object.values(coreUtils()) as Utility[];
		const shared = [...new Set(utils.map((u) => u.prefix))].filter(
			(prefix) => utils.filter((u) => u.prefix === prefix).length > 1,
		);
		expect(shared).toContain("s");

		for (const prefix of shared) {
			const rule = generator(new Set([`${prefix}:var(--x)`]), {
				buildOptions: { reset: false },
			} as never);
			const property = /([a-z-]+): var\(--x\)/.exec(rule)?.[1];
			const owner = utils.find(
				(u) => u.prefix === prefix && u.properties[0] === property,
			);
			const named = Object.keys(owner?.values ?? {})[0];

			// var() goes to the utility with the most values, and s:var() is a scale
			const most = utils
				.filter((u) => u.prefix === prefix)
				.sort(
					(a, b) => Object.keys(b.values).length - Object.keys(a.values).length,
				)[0];
			expect(owner?.slug, prefix).toBe(prefix === "s" ? "scale" : most?.slug);

			// a later named class of the same utility covers the var() class
			expect(merge(`${prefix}:var(--x) ${prefix}:${named}`), prefix).toBe(
				`${prefix}:${named}`,
			);
		}
	});
});
