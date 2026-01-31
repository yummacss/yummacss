import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
	},
	resolve: {
		alias: {
			"@yummacss/core": path.resolve(__dirname, "./packages/core/src"),
			"@yummacss/nitro": path.resolve(__dirname, "./packages/nitro/src"),
			"@": path.resolve(__dirname, "./packages/core/src"),
		},
	},
});
