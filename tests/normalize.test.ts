import { normalizeCSS } from "../packages/nitro/src/normalize";
import { describe, expect, it } from "vitest";

describe("normalize", () => {
	it("gives form controls the surrounding font, size included", () => {
		const rule = /button, input, optgroup, select, textarea \{([^}]*)\}/.exec(
			normalizeCSS,
		)?.[1];

		expect(rule).toContain("font: inherit;");
	});
});
