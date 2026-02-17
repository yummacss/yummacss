import { defineConfig } from "tsdown";

export default defineConfig({
	banner: { js: "#!/usr/bin/env node" },
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	minify: true,
	target: "es2020",
});
