import { join } from "node:path";
import yummacss from "@yummacss/postcss";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

const fixtureDir = join(__dirname, "fixtures", "plugin-app");

function run(css: string, options = {}) {
	return postcss([yummacss({ cwd: fixtureDir, ...options })]).process(css, {
		from: join(fixtureDir, "in.css"),
	});
}

describe("@yummacss/postcss", () => {
	it("should replace the @yummacss; marker with generated CSS", async () => {
		const result = await run("@yummacss;");

		expect(result.css).not.toContain("@yummacss");
		expect(result.css).toContain(".d-f");
		expect(result.css).toContain(".ai-c");
		expect(result.css).toContain(".bg-red-5");
		expect(result.css).toContain(".p-4");
		expect(result.css).toContain(".m-2");
		// safelist entry from the fixture config
		expect(result.css).toContain(".c-white");
	});

	it("should preserve surrounding CSS", async () => {
		const result = await run("body { margin: 0; }\n@yummacss;\n.after { color: red; }");

		expect(result.css).toContain("body { margin: 0; }");
		expect(result.css).toContain(".after { color: red; }");
		expect(result.css).toContain(".d-f");
	});

	it("should register file, config, and directory dependencies", async () => {
		const result = await run("@yummacss;");

		const dependencies = result.messages.filter(
			(message) => message.type === "dependency",
		);
		const dirDependencies = result.messages.filter(
			(message) => message.type === "dir-dependency",
		);

		const files = dependencies.map((message) => message.file as string);
		expect(files).toContain(join(fixtureDir, "yumma.config.mjs"));
		expect(files.some((file) => file.endsWith("App.tsx"))).toBe(true);
		expect(files.some((file) => file.endsWith("Button.tsx"))).toBe(true);

		expect(dirDependencies).toHaveLength(1);
		expect(dirDependencies[0]?.dir).toBe(join(fixtureDir, "src"));
		expect(dirDependencies[0]?.glob).toBe("**/*.tsx");
	});

	it("should pass through CSS without the marker untouched", async () => {
		const input = ".plain { color: blue; }";
		const result = await run(input);

		expect(result.css).toBe(input);
		expect(result.messages).toHaveLength(0);
	});

	it("should accept an inline config", async () => {
		const result = await run("@yummacss;", {
			config: {
				source: ["src/**/*.tsx"],
				safelist: ["c-black"],
				normalize: false,
			},
		});

		expect(result.css).toContain(".c-black");
		expect(result.css).toContain(".d-f");
		// no config file dependency for inline configs
		const files = result.messages
			.filter((message) => message.type === "dependency")
			.map((message) => message.file as string);
		expect(files).not.toContain(join(fixtureDir, "yumma.config.mjs"));
	});
});
