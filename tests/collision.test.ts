import type { Utility } from "@yummacss/core";
import { coreUtils } from "@yummacss/core";
import { describe, expect, it } from "vitest";

describe("Check for class name collisions", () => {
	it("should not have any class name collisions", () => {
		const utils = coreUtils();
		const classMap = new Map<string, string[]>();
		const collisions: Array<{ class: string; utilities: string[] }> = [];

		// build a map of all possible class names (prefix-value combinations)
		for (const [utilityName, utility] of Object.entries(utils)) {
			const { prefix, values } = utility as Utility;

			for (const [valueSuffix, _cssValue] of Object.entries(values)) {
				// generate the actual class name
				const className =
					valueSuffix === "base" || valueSuffix === ""
						? prefix
						: `${prefix}:${valueSuffix}`;

				// track which utilities generate this class name
				if (!classMap.has(className)) {
					classMap.set(className, []);
				}
				const utilities = classMap.get(className);
				if (utilities) {
					utilities.push(utilityName);
				}
			}
		}

		// find collisions (where multiple utilities generate the same class)
		for (const [className, utilities] of classMap.entries()) {
			if (utilities.length > 1) {
				collisions.push({ class: className, utilities });
			}
		}

		// report collisions if found
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

		// if no collisions, test passes
		expect(collisions).toHaveLength(0);
	});
});
