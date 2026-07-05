import { findUnknownClasses } from "@yummacss/intellisense";
import { describe, expect, it } from "vitest";

describe("findUnknownClasses", () => {
	it("should flag classes that are not part of the canon", () => {
		const unknown = findUnknownClasses(
			'<div className="d-f gap-4 items-center p-4">',
		);

		expect(unknown.map((u) => u.className)).toEqual(["gap-4", "items-center"]);
	});

	it("should suggest the closest valid class", () => {
		const unknown = findUnknownClasses('<div className="gap-4 cp z-10">');

		const byName = new Map(unknown.map((u) => [u.className, u.suggestion]));
		expect(byName.get("gap-4")).toBe("g-4");
		expect(byName.get("cp")).toBe("c-p");
		expect(byName.get("z-10")).toBe("zi-10");
	});

	it("should preserve variants and opacity in suggestions", () => {
		const unknown = findUnknownClasses(
			'<div className="@sm:gap-4 h:gap-4 c-whte/50 gap-4/50">',
		);

		const byName = new Map(unknown.map((u) => [u.className, u.suggestion]));
		expect(byName.get("@sm:gap-4")).toBe("@sm:g-4");
		expect(byName.get("h:gap-4")).toBe("h:g-4");
		// Opacity is preserved where it is valid (colors)...
		expect(byName.get("c-whte/50")).toBe("c-white/50");
		// ...and dropped where it is not - "g-4/50" would itself be
		// flagged, so the suggestion falls back to the bare class.
		expect(byName.get("gap-4/50")).toBe("g-4");
	});

	it("should report accurate positions", () => {
		const text = 'const a = 1;\n<div className="d-f gap-4">';
		const [unknown] = findUnknownClasses(text);

		expect(unknown?.line).toBe(1);
		const line = text.split("\n")[1] ?? "";
		expect(line.slice(unknown?.startIndex, unknown?.endIndex)).toBe("gap-4");
	});

	it("should understand variants, opacity, and negative values", () => {
		const unknown = findUnknownClasses(
			'<div className="@sm:d-b h:bg-red-5 m--4 bg-blue-5/50">',
		);

		expect(unknown).toEqual([]);
	});

	it("should respect prefix, safelist, and theme from the config", () => {
		const config = {
			prefix: "ui-",
			safelist: ["docs-container"],
			theme: { colors: { brand: "#9333ea" } },
		};

		const unknown = findUnknownClasses(
			'<div className="ui-d-f ui-bg-brand-5 docs-container d-f">',
			config,
		);

		// d-f is unprefixed, so it is not canon in a prefixed project.
		expect(unknown.map((u) => u.className)).toEqual(["d-f"]);
	});

	it("should not flag mid-typing fragments", () => {
		const unknown = findUnknownClasses('<div className="d-f bg- h: m--">');

		expect(unknown).toEqual([]);
	});

	it("should skip template literal expressions", () => {
		const unknown = findUnknownClasses(
			"<div className={`d-f ${isOpen ? 'gap-4' : ''} p-4`}>",
		);

		// The ternary branches are expressions - only static classes are
		// validated, and gap-4 sits inside the stripped expression.
		expect(unknown).toEqual([]);
	});

	it("should ignore strings outside class attributes", () => {
		const unknown = findUnknownClasses('const s = "gap-4 items-center";');

		expect(unknown).toEqual([]);
	});
});
