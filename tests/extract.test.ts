import { extractClassStrings, tokenizer } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

describe("extractClassStrings", () => {
	it("should keep reading literals after an empty one", () => {
		// The 3.29 regex tokenizer paired quotes across the whole file, so `""`
		// inverted the pairing and everything after it was lost. This is
		// `registry/ui/accordion.tsx` reduced to the two lines that mattered.
		const source = [
			"const SHAPES = {",
			'\tsquare: { item: "", trigger: "br-none" },',
			"};",
			"const rootClasses = [",
			'\t"d-f fd-c w-100% max-w-96",',
			"];",
		].join("\n");

		expect(tokenizer(source)).toEqual(
			expect.arrayContaining(["br-none", "d-f", "fd-c", "w-100%", "max-w-96"]),
		);
	});

	it("should not let a quote in a comment shift the literals after it", () => {
		const source = [
			"// the trigger's own padding, not the item's",
			'const classes = "p-4 bg-red";',
			'/* a " in a block comment */',
			'const more = "c-white";',
		].join("\n");

		expect(tokenizer(source)).toEqual(
			expect.arrayContaining(["p-4", "bg-red", "c-white"]),
		);
	});

	it("should stop an unterminated quote at the end of its line", () => {
		const source = ["<p>don't</p>", '<div className="d-f g-2" />'].join("\n");

		expect(tokenizer(source)).toEqual(expect.arrayContaining(["d-f", "g-2"]));
	});

	it("should blank interpolations without moving the offsets after them", () => {
		const source = 'const c = `d-f ${open ? "o-100" : "o-0"} ai-c`;';
		const [literal] = extractClassStrings(source).filter(
			(l) => l.quote === "`",
		);

		expect(literal?.value).toContain("d-f");
		expect(literal?.value).toContain("ai-c");
		expect(literal?.value).not.toContain("open");
		expect(source.slice(literal!.start, literal!.end)).toHaveLength(
			literal!.value.length,
		);
	});

	it("should label where each literal sits", () => {
		const source = [
			'<div className="d-f" />;',
			'const s = clsx("g-2");',
			'const map = { rounded: "br-lg" };',
			'const bare = "p-4";',
		].join("\n");

		const byValue = new Map(
			extractClassStrings(source).map((l) => [l.value, l.context]),
		);

		expect(byValue.get("d-f")).toBe("attribute");
		expect(byValue.get("g-2")).toBe("call");
		expect(byValue.get("br-lg")).toBe("property");
		expect(byValue.get("p-4")).toBe("bare");
	});

	it("should read a multi-interpolation template literal", () => {
		// Three `${}` in one literal is what produced `"className={\`d-f"` and
		// `"o-60\""` from the old scanner.
		const source =
			"className={`d-f ${a ? \"ai-c\" : \"\"} ${b} ${c ? 'jc-sb' : ''} o-60`}";

		expect(tokenizer(source)).toEqual(expect.arrayContaining(["d-f", "o-60"]));
		expect(tokenizer(source).some((t) => t.includes("`"))).toBe(false);
	});
});
