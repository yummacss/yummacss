import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts", "src/browser.ts"],
	clean: true,
	dts: true,
	format: ["esm"],
	minify: true,
});
