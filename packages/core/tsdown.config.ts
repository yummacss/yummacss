import { defineConfig } from "tsdown";

export default defineConfig({
	format: ["esm"],
	minify: true,
	target: "es2020",
});
