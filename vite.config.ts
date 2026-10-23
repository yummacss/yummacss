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
		jsPlugins: [
			{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
			{ name: "yummacss", specifier: "@yummacss/lint" },
		],
		rules: { "vite-plus/prefer-vite-plus-imports": "error" },
		overrides: [
			{
				files: ["apps/yummacss.com/**"],
				rules: {
					// the site's own stylesheet defines it
					"yummacss/no-unknown-classes": [
						"error",
						{ allow: ["footer-version"] },
					],
					"yummacss/no-inline-styles": "error",
				},
			},
			{
				// the preview renderer reads inline styles only, and the mark matches the
				// brand files, whose translucent light-dark() colors a color pair cannot hold
				files: [
					"apps/yummacss.com/src/components/og-image.tsx",
					"apps/yummacss.com/src/components/icons/yummacss-mark.tsx",
				],
				rules: { "yummacss/no-inline-styles": "off" },
			},
		],
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
