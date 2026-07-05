import { join } from "node:path";
import { extractClasses, validate } from "@yummacss/canon";
import { validateClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const fixtureDir = join(__dirname, "fixtures", "canon-app");

describe("validateClasses (nitro)", () => {
	it("should accept classes the generator understands", () => {
		const { valid, invalid } = validateClasses(
			["d-f", "@sm:d-b", "h:bg-red-5", "m--4", "bg-blue-5/50", "c-white"],
			{},
		);

		expect(invalid).toEqual([]);
		expect(valid).toHaveLength(6);
	});

	it("should reject Tailwind syntax and unknown classes", () => {
		const { invalid } = validateClasses(
			["gap-4", "items-center", "flex-col", "docs-card"],
			{},
		);

		expect(invalid).toEqual(["gap-4", "items-center", "flex-col", "docs-card"]);
	});

	it("should treat safelist entries as valid", () => {
		const { valid, invalid } = validateClasses(["bg-page/90"], {
			safelist: ["bg-page/90"],
		});

		expect(valid).toEqual(["bg-page/90"]);
		expect(invalid).toEqual([]);
	});

	it("should accept custom theme colors", () => {
		const { invalid } = validateClasses(["bg-brand-5", "c-brand"], {
			theme: { colors: { brand: "#9333ea" } },
		});

		expect(invalid).toEqual([]);
	});

	it("should enforce prefixes", () => {
		const config = { prefix: "ui-" };

		expect(validateClasses(["ui-d-f"], config).valid).toEqual(["ui-d-f"]);
		expect(validateClasses(["d-f"], config).invalid).toEqual(["d-f"]);
	});
});

describe("extractClasses (canon)", () => {
	it("should only extract from class attribute contexts", () => {
		const classes = extractClasses(
			'const s = "not-a-class"; <div className="d-f p-4">, cn("m-2 c-white")',
		);

		expect(classes.has("d-f")).toBe(true);
		expect(classes.has("p-4")).toBe(true);
		expect(classes.has("m-2")).toBe(true);
		expect(classes.has("c-white")).toBe(true);
		expect(classes.has("not-a-class")).toBe(false);
	});

	it("should skip template literal expressions", () => {
		const classes = extractClasses(
			`<div className={\`d-f \${isActive ? 'bg-red-5' : ''} p-4\`}>`,
		);

		expect(classes.has("d-f")).toBe(true);
		expect(classes.has("p-4")).toBe(true);
	});
});

describe("validate (canon)", () => {
	it("should report unknown classes with their files", async () => {
		const result = await validate({ cwd: fixtureDir });

		expect(result.files).toBe(2);
		const invalidNames = result.invalid.map((entry) => entry.className);
		expect(invalidNames).toEqual(["docs-card", "gap-4", "items-center"]);

		const gap = result.invalid.find((entry) => entry.className === "gap-4");
		expect(gap?.files).toHaveLength(1);
		expect(gap?.files[0]?.endsWith("Bad.tsx")).toBe(true);
		expect(gap?.suggestion).toBe("g-4");
	});

	it("should not report valid classes, variants, or safelist entries", async () => {
		const result = await validate({ cwd: fixtureDir });
		const invalidNames = result.invalid.map((entry) => entry.className);

		for (const cls of ["d-f", "@sm:d-b", "h:bg-red-5", "m--4", "c-white"]) {
			expect(invalidNames).not.toContain(cls);
		}
	});

	it("should skip allowlisted classes", async () => {
		const result = await validate({
			cwd: fixtureDir,
			allowlist: ["docs-card"],
		});

		const invalidNames = result.invalid.map((entry) => entry.className);
		expect(invalidNames).toEqual(["gap-4", "items-center"]);
	});
});
