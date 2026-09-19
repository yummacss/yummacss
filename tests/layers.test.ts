import { generator, normalizeCSS } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const config = { source: [], output: "", normalize: true } as never;

describe("Cascade layers", () => {
	it("puts the reset in a layer", () => {
		expect(normalizeCSS.startsWith("@layer yumma.reset {")).toBe(true);
		expect(normalizeCSS.trimEnd().endsWith("}")).toBe(true);
	});

	// the reset's focus rule is (0,1,1) and a utility is (0,1,0), so without the
	// layer an outline utility loses on every focused button
	it("keeps the focus reset inside the layer", () => {
		const css = generator(new Set(["oc:red"]), config);
		const close = css.indexOf("\n}\n");
		const focus = css.indexOf(":is(a, button, input, select, summary, textarea):focus");

		expect(focus).toBeGreaterThan(-1);
		expect(focus).toBeLessThan(close);
	});

	it("leaves the utilities out of it", () => {
		const css = generator(new Set(["oc:red"]), config);
		const close = css.indexOf("\n}\n");

		expect(css.indexOf(".oc\\:red")).toBeGreaterThan(close);
	});

	it("emits no layer when the reset is off", () => {
		const css = generator(new Set(["oc:red"]), {
			...config,
			normalize: false,
		});

		expect(css).not.toContain("@layer");
		expect(css).toContain(".oc\\:red");
	});
});
