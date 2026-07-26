import { getHoverMarkdown, parseUtility } from "@yummacss/intellisense";
import { describe, expect, it } from "vitest";

describe("parseUtility", () => {
	it("splits colon variants", () => {
		expect(parseUtility("h:m-4")).toEqual({
			variants: ["h"],
			baseUtility: "m-4",
		});
		expect(parseUtility("@sm:d-f")).toEqual({
			variants: ["@sm"],
			baseUtility: "d-f",
		});
	});

	it("keeps `::` on pseudo elements so they stay distinguishable", () => {
		// `a` is `:active` as a pseudo class and `:after` as a pseudo element -
		// dropping the separator would make them indistinguishable.
		expect(parseUtility("s::bg-red")).toEqual({
			variants: ["s::"],
			baseUtility: "bg-red",
		});
		expect(parseUtility("a::c-red").variants).toEqual(["a::"]);
		expect(parseUtility("a:c-red").variants).toEqual(["a"]);
	});

	it("splits the opacity suffix off the base utility", () => {
		expect(parseUtility("bg-blue/50")).toEqual({
			variants: ["50"],
			baseUtility: "bg-blue",
		});
	});

	it("normalises negative values to their map key", () => {
		expect(parseUtility("m--4").baseUtility).toBe("m-4");
		expect(parseUtility("mx--4").baseUtility).toBe("mx-4");
		// A single dash is an ordinary value and must be left alone.
		expect(parseUtility("m-4").baseUtility).toBe("m-4");
	});

	it("handles variants and suffixes combined", () => {
		expect(parseUtility("@sm:h:m--4")).toEqual({
			variants: ["@sm", "h"],
			baseUtility: "m-4",
		});
		expect(parseUtility("h:s::bg-blue/50")).toEqual({
			variants: ["h", "s::", "50"],
			baseUtility: "bg-blue",
		});
	});
});

describe("getHoverMarkdown", () => {
	const shapes: [string, string][] = [
		["m-4", "plain utility"],
		["m--4", "negative value"],
		["h:m-4", "pseudo class"],
		["s::bg-red", "pseudo element"],
		["bg-blue/50", "opacity suffix"],
		["@sm:d-f", "media query"],
		["h:bg-blue/50", "pseudo class + opacity"],
		["@sm:h:m--4", "media + pseudo + negative"],
		["cs-s", "corner-shape"],
	];

	for (const [cls, label] of shapes) {
		it(`produces hover content for ${label} (${cls})`, () => {
			expect(getHoverMarkdown(cls)).toBeTruthy();
		});
	}

	it("describes each variant kind correctly", () => {
		expect(getHoverMarkdown("h:m-4")).toContain("**Pseudo:** `:hover`");
		expect(getHoverMarkdown("s::bg-red")).toContain(
			"**Pseudo element:** `::selection`",
		);
		expect(getHoverMarkdown("bg-blue/50")).toContain("**Opacity:** `50%`");
		expect(getHoverMarkdown("@sm:d-f")).toContain("**Media:**");
	});

	it("does not report a pseudo element as its same-named pseudo class", () => {
		expect(getHoverMarkdown("a::c-red")).toContain(
			"**Pseudo element:** `:after`",
		);
		expect(getHoverMarkdown("a:c-red")).toContain("**Pseudo:** `:active`");
	});

	it("still rejects genuinely unknown variants and utilities", () => {
		expect(getHoverMarkdown("@foobar:d-f")).toBeNull();
		expect(getHoverMarkdown("zz-999")).toBeNull();
		expect(getHoverMarkdown("zz::d-f")).toBeNull();
	});
});
