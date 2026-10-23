import path from "node:path";
import { defineConfig } from "vite-plus";

// format & lint for every package and the site; each package's own config packs it
export default defineConfig({
	fmt: {
		useTabs: true,
		printWidth: 80,
		// the site's pages hold fences the build fills in
		ignorePatterns: ["**/*.mdx"],
	},
	lint: {
		// sample projects the lint tests run oxlint on
		ignorePatterns: ["tests/fixtures/**"],
		jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
		rules: { "vite-plus/prefer-vite-plus-imports": "error" },
		options: { typeAware: true, typeCheck: true },
	},
	test: {
		globals: true,
		environment: "node",
		// the site runs its own tests, test:site
		exclude: ["**/node_modules/**", "apps/**"],
	},
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./packages/core/src"),
			"@yummacss/core": path.resolve(
				import.meta.dirname,
				"./packages/core/src",
			),
			yummacss: path.resolve(import.meta.dirname, "./packages/cli/src"),
			"@yummacss/nitro": path.resolve(
				import.meta.dirname,
				"./packages/nitro/src",
			),
			"@yummacss/lint": path.resolve(
				import.meta.dirname,
				"./packages/lint/src",
			),
			"@yummacss/postcss": path.resolve(
				import.meta.dirname,
				"./packages/postcss/src",
			),
			"@yummacss/vite": path.resolve(
				import.meta.dirname,
				"./packages/vite/src",
			),
		},
	},
});
