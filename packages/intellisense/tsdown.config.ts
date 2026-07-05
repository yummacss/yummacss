import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	entry: [
		"src/index.ts",
		"src/adapters/lsp.ts",
		"src/adapters/monaco.ts",
		"src/adapters/vscode.ts",
	],
	format: ["esm"],
	minify: true,
	target: "es2020",
	external: ["vscode"],
});
