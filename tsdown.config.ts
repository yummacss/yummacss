import { defineConfig } from "tsdown";

export default defineConfig({
	banner: { js: "#!/usr/bin/env node" },
	entry: ["cli/src/index.ts"],
	format: ["esm"],
	minify: true,
	target: "es2020",
});
