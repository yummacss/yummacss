import type { Utility } from "@yummacss/core";
import { coreUtils } from "@yummacss/core";
import { describe, expect, it } from "vitest";

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
