import { defineConfig } from "tsdown";

export default defineConfig({
	external: ["tinycolor2"],
	format: ["esm", "cjs"],
	minify: true,
	target: "es2020",
});
