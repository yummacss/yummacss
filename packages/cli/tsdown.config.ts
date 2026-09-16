import { defineConfig } from "tsdown";

export default defineConfig([
	{
		banner: { js: "#!/usr/bin/env node" },
		entry: ["src/cli.ts"],
		format: ["esm"],
		minify: true,
		target: "es2020",
	},
	{
		dts: true,
		entry: ["src/index.ts", "src/merge.ts"],
		format: ["esm"],
		minify: true,
		target: "es2020",
	},
]);
