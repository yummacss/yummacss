import {
	colorTheme,
	mediaQueries,
	pseudoClasses,
	pseudoElements,
} from "@yummacss/core";
import { UI_ORIGIN } from "./hosts";

export const SITE = "https://yummacss.com";

/** The syntax, as `/llms.txt` and `/agents.md` both teach it. */
export const SYNTAX = [
	"- A class is property initials, a colon, value initials: `d:f` is `display: flex`, `jc:sb` is `justify-content: space-between`.",
	"- Numbers and scales keep their position: `p:4` is `padding: 1rem` (one step is 0.25rem), `fs:lg`, `fw:600`. `none` and `auto` stay whole: `d:none`.",
	"- Variants go first, each followed by a colon: `h:bg:indigo-7` on hover, `@md:d:f` from the md breakpoint, `b::c:indigo` on `::before`. They stack: `@sm:h:bg:red`.",
	"- Opacity follows a slash: `bg:red-5/50`. A negative value takes a minus after the colon: `ml:-4`.",
	"- There are no arbitrary values: `w:37px` is not a class. A value off the scale is a CSS function with no spaces: `max-h:calc(100dvh-5rem)`, `w:var(--width)`.",
	"- Yumma is a name, not a theme. There is no `yum-` prefix and no dash between property and value.",
];

/** Classes in the 3.x dash form, the sign that a project needs migrating. */
export const LEGACY = ["d-f", "p-4", "bg-red-5", "m--4"];

const code = (items: readonly string[]) =>
	items.map((item) => `\`${item}\``).join(", ");

/** Yumma UI components whose source shows classes combining, each at `/components/<id>.md` on yummaui.com. */
export const EXAMPLES = [
	{
		id: "button",
		shows:
			"variants, sizes and shapes as class maps, hover, a focus outline, opacity, and `merge` for overrides",
	},
	{
		id: "field",
		shows:
			"a label, input and message stacked with flex, with border, outline and icon colors for its error and success states",
	},
	{
		id: "tabs",
		shows:
			"a sliding indicator positioned under the selected tab, with a transition that can be turned off",
	},
	{
		id: "dialog",
		shows:
			"an overlay and a popup that animate with `opening:` and `closing:`, and `@prm:tp:none` for reduced motion",
	},
];

const list = (
	items: readonly { prefix: string; value: string }[],
	before: string,
	after: string,
) =>
	items
		.map(({ prefix, value }) => `\`${before}${prefix}${after}\` ${value}`)
		.join(", ");

const breakpoints = mediaQueries.filter(({ value }) =>
	value.startsWith("@media (min-width"),
);
const containers = mediaQueries.filter(({ value }) =>
	value.startsWith("@container"),
);
const atRules = mediaQueries.filter(
	(query) => !breakpoints.includes(query) && !containers.includes(query),
);

/** The rules file a project adds for its coding agents, served at `/agents.md`. */
export function agentRules(): string {
	return [
		"# Yumma CSS",
		"",
		`This project styles with Yumma CSS (${SITE}). Write its classes, not another library's, and check them before you finish.`,
		"",
		"## Migrating From 3.x",
		"",
		`Check the version before anything else. The project is on 3.x if \`yummacss\` in \`package.json\` is below \`4\`, or if its classes put a dash between property and value: ${code(LEGACY)}.`,
		"",
		"- Stop before the task and tell the user. A 3.x build generates no 4.x class, so nothing below works until the project is migrated.",
		"- Do not rewrite classes by hand, and do not take `yummacss lint` suggestions one at a time: on a 3.x project it reports nearly every class. The codemod rewrites them all, reading `yummacss.config.mjs` for custom colors and breakpoints.",
		"- Migrate as its own change, in this order:",
		"  1. `pnpm dlx yummacss migrate --dry-run`, then `pnpm dlx yummacss migrate`.",
		'  2. Rewrite by hand only what it lists under "Left alone": classes built at runtime, and the same classes in a `safelist`.',
		"  3. Update `yummacss` and its `@yummacss/` packages to the latest version, all the same. `@yummacss/canon` is `@yummacss/lint`, so a script that runs `yummacss-canon` runs `yummacss lint`. Remove a package that has no 4.x release.",
		"  4. Build, then `pnpm dlx yummacss lint`.",
		"",
		"## Syntax",
		"",
		...SYNTAX,
		"",
		"## Values",
		"",
		"- Spacing and sizing run from `0` to `384`, in steps of 0.25rem: `w:96` is `24rem`. Percentages and viewport units are values too: `w:100%`, `h:dvh`.",
		`- Colors: ${Object.keys(colorTheme).join(", ")}, plus \`white\`, \`black\` and \`transparent\`. Each has a base and twelve shades: \`1\` to \`6\` lighter, \`7\` to \`12\` darker, as in \`bg:indigo\`, \`bg:indigo-2\`, \`c:slate-10\`.`,
		`- Breakpoints, from that width up: ${list(breakpoints, "@", ":")}.`,
		`- Container queries, on a child of an element with \`ct:is\`: ${list(containers, "@", ":")}.`,
		`- Other at-rules: ${list(atRules, "@", ":")}.`,
		`- States: ${list(pseudoClasses, "", ":")}.`,
		`- Pseudo-elements: ${list(pseudoElements, "", "::")}.`,
		"- Colors, breakpoints and states the project adds live in `yummacss.config.mjs` under `theme`. Read it before using a name that is not listed here.",
		"",
		"## Examples",
		"",
		"Yumma UI components are written in these classes. Read one before building something similar:",
		"",
		...EXAMPLES.map(
			({ id, shows }) => `- ${UI_ORIGIN}/components/${id}.md: ${shows}.`,
		),
		"",
		"`opening:` and `closing:` are states a project declares under `theme.states`, as the Yumma UI installation page shows. Check `yummacss.config.mjs` before using them.",
		"",
		"## Check",
		"",
		"- After editing classes, run `pnpm dlx yummacss lint`. It lists every class Yumma CSS does not generate, with the closest one that exists. Use the suggestion; do not keep a class it reports.",
		"- In a project that uses Oxlint, the `@yummacss/lint` rules report the same in the editor, and `no-inline-styles` names the class for a property set in `style`.",
		`- Every utility has a page named after its CSS property, as plain text: ${SITE}/docs/justify-content.md. The index is ${SITE}/llms.txt.`,
		"",
	].join("\n");
}
