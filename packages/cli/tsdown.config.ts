import { defineConfig } from "tsdown";

// Two configs because the shebang belongs on the CLI alone. `merge` is imported
// by application code, and a `#!` line has no business in a browser bundle.
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
