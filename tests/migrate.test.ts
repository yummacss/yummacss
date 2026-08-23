import { coreUtils } from "@yummacss/core";
import { describe, expect, it } from "vitest";
import { migrateClass } from "../packages/cli/src/services/migrate";
import { rewriteSource } from "../packages/cli/src/services/rewrite";

function migrated(className: string): string {
	const result = migrateClass(className);
	if (!result.ok) throw new Error(`${className}: ${result.reason}`);
	return result.className;
}

describe("migrateClass", () => {
	it("moves the property/value separator to a colon", () => {
		expect(migrated("d-f")).toBe("d:f");
		expect(migrated("ta-c")).toBe("ta:c");
		expect(migrated("m-4")).toBe("m:4");
	});

	it("keeps the dash inside a value, so shades survive", () => {
		expect(migrated("bg-red-1")).toBe("bg:red-1");
		expect(migrated("c-blue-4")).toBe("c:blue-4");
	});

	it("splits on the prefix rather than the first dash", () => {
		// `max-h` is a prefix containing a dash; splitting on the first one
		// would produce `max:h-52`.
		expect(migrated("max-h-52")).toBe("max-h:52");
		expect(migrated("min-w-12")).toBe("min-w:12");
	});

	it("prefers the longer prefix only when its value matches", () => {
		// `bs` is four utilities & `bs-o` is a fifth, so the split is decided
		// by which reading has a real value behind it.
		expect(migrated("bs-o-sm")).toBe("bs-o:sm");
		expect(migrated("bs-i-sm")).toBe("bs-i:sm");
		expect(migrated("bs-1")).toBe("bs:1");
		expect(migrated("bs-none")).toBe("bs:none");
	});

	it("turns the double hyphen into a signed value", () => {
		expect(migrated("m--4")).toBe("m:-4");
		expect(migrated("mt--12")).toBe("mt:-12");
	});

	it("leaves variant prefixes in front", () => {
		expect(migrated("h:bg-red-1")).toBe("h:bg:red-1");
		expect(migrated("@sm:m-4")).toBe("@sm:m:4");
		expect(migrated("@sm:h:m-4")).toBe("@sm:h:m:4");
	});

	it("keeps the pseudo element separator", () => {
		expect(migrated("b::c-red-1")).toBe("b::c:red-1");
		expect(migrated("s::bg-blue-2")).toBe("s::bg:blue-2");
	});

	it("renames the disabled variant, which display now needs", () => {
		expect(migrated("d:m-4")).toBe("di:m:4");
		// Still the display utility, not the variant.
		expect(migrated("d-f")).toBe("d:f");
	});

	it("carries the opacity suffix through untouched", () => {
		expect(migrated("bg-blue-5/50")).toBe("bg:blue-5/50");
		expect(migrated("h:c-red-1/25")).toBe("h:c:red-1/25");
	});

	it("spells out none & auto where they were abbreviated", () => {
		expect(migrated("tt-n")).toBe("tt:none");
		expect(migrated("tl-a")).toBe("tl:auto");
	});

	it("refuses anything it does not recognize", () => {
		expect(migrateClass("flex-center").ok).toBe(false);
		expect(migrateClass("my-custom-class").ok).toBe(false);
	});

	it("resolves every class the framework can generate", () => {
		const failures: string[] = [];

		for (const utility of Object.values(coreUtils())) {
			for (const value of Object.keys(utility.values)) {
				if (value === "") continue;
				const className = `${utility.prefix}-${value}`;
				if (!migrateClass(className).ok) failures.push(className);
			}
		}

		expect(failures).toEqual([]);
	});
});

describe("rewriteSource", () => {
	it("rewrites class attributes and nothing else", () => {
		const source = [
			'const label = "m-4 is not a class here";',
			'<div className="d-f m-4">',
		].join("\n");

		const { content } = rewriteSource(source);

		expect(content).toContain('const label = "m-4 is not a class here";');
		expect(content).toContain('<div className="d:f m:4">');
	});

	it("handles cn, clsx and cva call sites", () => {
		const { content } = rewriteSource('cn("d-f ai-c")');
		expect(content).toBe('cn("d:f ai:c")');
	});

	it("preserves whitespace between classes", () => {
		const { content } = rewriteSource('<div className="d-f   m-4">');
		expect(content).toBe('<div className="d:f   m:4">');
	});

	it("leaves a runtime expression alone and reports it", () => {
		const source = "<div className={`p-4 ${size}`}>";
		const { content, skipped } = rewriteSource(source);

		expect(content).toBe("<div className={`p:4 ${size}`}>");
		expect(skipped.get("${size}")).toBe("built at runtime");
	});

	it("reports an unknown class without changing it", () => {
		const { content, skipped } = rewriteSource(
			'<div className="d-f brand-logo">',
		);

		expect(content).toBe('<div className="d:f brand-logo">');
		expect(skipped.get("brand-logo")).toBe("not a known utility");
	});

	it("counts only the classes that changed", () => {
		const { migrated } = rewriteSource('<div className="d-f m-4 brand-logo">');
		expect(migrated).toBe(2);
	});

	it("reaches classes wrapped in quotes inside a template literal", () => {
		const source = '<div className={`p-4 ${open ? "ro-45 c-white" : "ro-0"}`}>';
		const { content } = rewriteSource(source);

		// The ternary branches are real classes wearing punctuation. Leaving
		// them would strand them on v3 without saying so.
		expect(content).toBe(
			'<div className={`p:4 ${open ? "ro:45 c:white" : "ro:0"}`}>',
		);
	});

	it("is a no-op on a file with no classes", () => {
		const source = "export const x = 1;\n";
		expect(rewriteSource(source).content).toBe(source);
	});
});
