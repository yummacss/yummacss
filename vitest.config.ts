import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./packages/core/src"),
			"@yummacss/core": path.resolve(__dirname, "./packages/core/src"),
			"@yummacss/nitro": path.resolve(__dirname, "./packages/nitro/src"),
			"@yummacss/canon": path.resolve(__dirname, "./packages/canon/src"),
			"@yummacss/postcss": path.resolve(__dirname, "./packages/postcss/src"),
			"@yummacss/vite": path.resolve(__dirname, "./packages/vite/src"),
		},
	},
});
