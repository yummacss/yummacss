import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	entry: ["src/index.ts", "src/adapters/monaco.ts"],
	format: ["esm"],
	minify: true,
	target: "es2020",
});
