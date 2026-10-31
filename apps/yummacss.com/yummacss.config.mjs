import { defineConfig } from "yummacss";

export default defineConfig({
	source: ["./src/**/*.{ts,tsx,mdx,mjs}"],
	theme: {
		colors: {
			"accent-dim": { light: "#8892c2", dark: "#9aa5ef" },
			"diff-add": { light: "#2e7d5b", dark: "#a8e1ad" },
			"diff-remove": { light: "#a8372b", dark: "#e1a8a8" },
			accent: { light: "#4c5fc7", dark: "#bec6f2" },
			// indigo in both schemes, where accent turns pale in the dark
			brand: "#4c5fc7",
			// the logo's two squares
			"mark-back": "#bec6f2",
			"mark-front": "#4c5fc7",
			border: { light: "#dde1eb", dark: "#232741" },
			code: { light: "#3e4a80", dark: "#dda2f6" },
			ink: { light: "#14171f", dark: "#ffffff" },
			hover: { light: "#eef0f6", dark: "#131521" },
			page: { light: "#f7f8fb", dark: "#151724" },
			press: { light: "#e5e8f0", dark: "#0f111b" },
			surface: { light: "#ffffff", dark: "#1a1d2e" },
			warning: { light: "#b4581a", dark: "#f0b27a" },
		},
		fonts: {
			body: '"iA Writer Quattro", sans-serif',
			display: "var(--font-geist-serif-square), serif",
			system: "system-ui, sans-serif",
		},
		// base ui related
		states: {
			closing: "[data-ending-style]",
			hovering: "[data-hovering]",
			opening: "[data-starting-style]",
			scrolling: "[data-scrolling]",
			swiping: "[data-swiping]",
		},
		easings: {
			"out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
		},
		keyframes: {
			spin: "to { rotate: 360deg; }",
		},
	},
});
