import { join } from "node:path";
import yummacss from "@yummacss/vite";
import { describe, expect, it } from "vitest";

const fixtureDir = join(__dirname, "fixtures", "plugin-app");

type TransformResult = { code: string; map: null } | undefined;

async function createPlugin(options = {}) {
	const plugin = yummacss(options) as any;
	await plugin.configResolved({ root: fixtureDir });
	return plugin;
}

function transform(
	plugin: any,
	code: string,
	id: string,
): Promise<TransformResult> {
	const context = {
		meta: { watchMode: false },
		addWatchFile: () => {},
	};
	return plugin.transform.call(context, code, id);
}

describe("@yummacss/vite", () => {
	it("should replace the @yummacss; marker in CSS modules", async () => {
		const plugin = await createPlugin();
		const result = await transform(plugin, "@yummacss;", "/app/main.css");

		expect(result).toBeDefined();
		expect(result?.code).not.toContain("@yummacss");
		expect(result?.code).toContain(".d\\:f");
		expect(result?.code).toContain(".bg\\:red-5");
		expect(result?.code).toContain(".c\\:white");
		expect(result?.map).toBeNull();
	});

	it("should preserve surrounding CSS", async () => {
		const plugin = await createPlugin();
		const result = await transform(
			plugin,
			"body { margin: 0; }\n@yummacss;",
			"/app/main.css",
		);

		expect(result?.code).toContain("body { margin: 0; }");
		expect(result?.code).toContain(".d\\:f");
	});

	it("should handle CSS ids with query strings", async () => {
		const plugin = await createPlugin();
		const result = await transform(
			plugin,
			"@yummacss;",
			"/app/main.css?direct",
		);

		expect(result?.code).toContain(".d\\:f");
	});

	it("should ignore non-CSS modules", async () => {
		const plugin = await createPlugin();
		const result = await transform(
			plugin,
			'const marker = "@yummacss;";',
			"/app/main.ts",
		);

		expect(result).toBeUndefined();
	});

	it("should ignore CSS without the marker", async () => {
		const plugin = await createPlugin();
		const result = await transform(
			plugin,
			".plain { color: blue; }",
			"/app/main.css",
		);

		expect(result).toBeUndefined();
	});

	it("should accept an inline config", async () => {
		const plugin = await createPlugin({
			config: {
				source: ["src/**/*.tsx"],
				safelist: ["c:black"],
				normalize: false,
			},
		});
		const result = await transform(plugin, "@yummacss;", "/app/main.css");

		expect(result?.code).toContain(".c\\:black");
		expect(result?.code).toContain(".d\\:f");
	});
});
