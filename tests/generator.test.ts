import { coreUtils } from "@yummacss/core";
import {
	type Config,
	ConfigSchema,
	generator,
	validateClasses,
} from "@yummacss/nitro";
import { describe, expect, it } from "vitest";
import { normalizeCSS } from "../packages/nitro/src/normalize";
import { tokenizer } from "../packages/nitro/src/tokenizer";

const css = (classNames: string | string[], theme?: Config["theme"]) =>
	generator(new Set([classNames].flat()), {
		buildOptions: { reset: false },
		theme,
	} as never);

const invalid = (classNames: string[], theme?: Config["theme"]) =>
	validateClasses(classNames, { theme } as never).invalid;

const parses = (theme: Config["theme"]) =>
	ConfigSchema.safeParse({ theme }).success;

const mediaPrefixes = () =>
	(coreUtils().display.variants?.mediaQueries ?? []).map((q) => q.prefix);

describe("breakpoints", () => {
	it("has a query for every t-shirt width alias", () => {
		const widths = (coreUtils().display.variants?.mediaQueries ?? [])
			.filter((query) => query.value.startsWith("@media (min-width"))
			.map((query) => query.prefix);

		expect(widths).toEqual(["xs", "sm", "md", "lg", "xl", "xxl"]);
	});

	it("emits xs at 32rem", () => {
		expect(css("@xs:d:f")).toContain("@media (min-width: 32rem)");
		expect(css("@xs:d:f")).toContain(".\\@xs\\:d\\:f");
	});

	it("emits the queries widest last", () => {
		const order = [
			...css(["@xxl:d:g", "@xs:d:f", "@sm:d:b"]).matchAll(
				/min-width: (\d+)rem/g,
			),
		].map((m) => Number(m[1]));

		expect(order).toEqual([...order].sort((a, b) => a - b));
	});

	it("emits a single query flat", () => {
		expect(css("@md:d:f")).toMatch(
			/^@media \(min-width: 48rem\) \{\n {2}\.\\@md\\:d\\:f/m,
		);
	});

	it("nests stacked queries rather than dropping one", () => {
		expect(css("@sm:@lg:bg:red")).toMatch(
			/@media \(min-width: 40rem\) \{\n {2}@media \(min-width: 64rem\) \{\n {4}\.\\@sm\\:\\@lg\\:bg\\:red/,
		);
	});

	it("groups a stack the same whichever order it is written in", () => {
		const out = css(["@sm:@lg:d:f", "@lg:@sm:d:b"]);

		expect(out.match(/@media \(min-width: 40rem\) \{/g)).toHaveLength(1);
	});
});

describe("container queries", () => {
	it("wraps @c:sm: in a container query at the sm width", () => {
		expect(css("@c:sm:fs:xl")).toContain("@container (min-width: 40rem)");
		expect(css("@c:sm:fs:xl")).toContain(".\\@c\\:sm\\:fs\\:xl");
	});

	it("follows a configured screen", () => {
		expect(css("@c:3xl:d:g", { screens: { "3xl": "112rem" } })).toContain(
			"@container (min-width: 112rem)",
		);
	});

	it("marks the container with ct:", () => {
		expect(css("ct:is")).toContain("container-type: inline-size;");
	});

	it("is valid, and a bare @c: is not", () => {
		expect(invalid(["@c:md:h:o:0", "@c:fs:xl"])).toEqual(["@c:fs:xl"]);
	});
});

describe("prefers-reduced-motion", () => {
	it("wraps the rule in the reduce query", () => {
		const out = css("@prm:tp:none");

		expect(out).toContain("@media (prefers-reduced-motion: reduce)");
		expect(out).toContain(".\\@prm\\:tp\\:none");
		expect(out).toContain("transition-property: none");
	});

	it("stacks with a pseudo class", () => {
		expect(css("@prm:h:o:0")).toContain(
			"@media (prefers-reduced-motion: reduce)",
		);
		expect(css("@prm:h:o:0")).toContain(":hover");
	});

	it("leaves an unprefixed class alone", () => {
		expect(css("tp:none")).not.toContain("prefers-reduced-motion");
	});

	it("sits beside pointer as the non-width queries", () => {
		expect(mediaPrefixes()).toEqual(expect.arrayContaining(["prm", "pc"]));
	});

	it("refuses an unknown at-rule and a bracket in a class name", () => {
		expect(invalid(["@prm:tp:none", "@zz:tp:none", "[data-open]:o-0"])).toEqual(
			["@zz:tp:none", "[data-open]:o-0"],
		);
	});
});

describe("@starting-style", () => {
	it("wraps the rule in a starting-style block", () => {
		expect(css("@st:o:0")).toMatch(
			/@starting-style \{\n {2}\.\\@st\\:o\\:0 \{\n {4}opacity: 0;/,
		);
	});

	it("stacks with a pseudo class", () => {
		expect(css("@st:h:o:0")).toContain("@starting-style");
		expect(css("@st:h:o:0")).toContain(":hover");
	});

	it("nests inside a breakpoint", () => {
		expect(css("@md:@st:o:0")).toMatch(
			/@media \(min-width: 48rem\) \{\n {2}@starting-style \{\n {4}\.\\@md\\:\\@st\\:o\\:0/,
		);
	});

	it("is valid", () => {
		expect(invalid(["@st:o:0"])).toEqual([]);
	});
});

describe("CSS functions", () => {
	it.each([
		["max-h:calc(100dvh-5rem)", "max-height: calc(100dvh - 5rem);"],
		["max-w:clamp(40rem,80vw,96rem)", "max-width: clamp(40rem,80vw,96rem);"],
		["w:min(100%,calc(100vw-2rem))", "width: min(100%,calc(100vw - 2rem));"],
		[
			"h:var(--accordion-panel-height)",
			"height: var(--accordion-panel-height);",
		],
		[
			"w:calc(100%-var(--gutter-size))",
			"width: calc(100% - var(--gutter-size));",
		],
		["w:max(min-content,10rem)", "width: max(min-content,10rem);"],
		["m:calc(-1*var(--gap))", "margin: calc(-1*var(--gap));"],
		["c:var(--brand)", "color: var(--brand);"],
		["max-h:calc(100dvh-5rem)", ".max-h\\:calc\\(100dvh-5rem\\)"],
	])("%s writes %s", (className, expected) => {
		expect(css(className)).toContain(expected);
	});

	it("refuses math where a length makes no sense, and unknown functions", () => {
		const classes = ["d:calc(1+1)", "w:attr(width)", "w:calc(100%", "w:37px"];

		expect(invalid(classes)).toEqual(classes);
	});

	it("is found in source, and a call in code is not", () => {
		expect(
			tokenizer(
				'<div className="p:4 max-h:calc(100dvh-5rem) w:min(100%,calc(100vw-2rem))" />',
				"a.tsx",
			),
		).toEqual([
			"p:4",
			"max-h:calc(100dvh-5rem)",
			"w:min(100%,calc(100vw-2rem))",
		]);
		expect(tokenizer("const x = foo(a:b)", "a.ts")).toEqual([]);
	});
});

describe("opacity suffix", () => {
	const mix = (percent: number) =>
		new RegExp(
			`background-color:\\s*color-mix\\(in srgb, #[0-9a-f]{6} ${percent}%, transparent\\);`,
			"i",
		);

	it("wraps a color in color-mix() rather than appending hex alpha", () => {
		const out = css("bg:blue/50");

		expect(out).toContain(".bg\\:blue\\/50");
		expect(out).toMatch(mix(50));
		expect(out).not.toMatch(/#[0-9a-f]{8}\b/i);
	});

	it("emits 0% rather than collapsing to a bare color", () => {
		expect(css("bg:blue/0")).toMatch(mix(0));
	});

	it("composes with variants", () => {
		expect(css("h:bg:blue/50")).toContain(":hover");
		expect(css("h:bg:blue/50")).toMatch(mix(50));
	});

	it("leaves a value that is not a color untouched", () => {
		expect(css("m:4/50")).not.toContain("color-mix");
	});

	it("applies to light-dark() colors", () => {
		expect(
			css("bg:surface/50", {
				colors: { surface: { light: "#ffffff", dark: "#111214" } },
			}),
		).toContain(
			"color-mix(in srgb, light-dark(#ffffff, #111214) 50%, transparent)",
		);
	});
});

describe("transitions", () => {
	it("tp:c carries the painted colors but not outline-color", () => {
		const out = css("tp:c");

		for (const property of [
			"color",
			"background-color",
			"border-color",
			"text-decoration-color",
			"fill",
			"stroke",
		]) {
			expect(out).toContain(property);
		}
		expect(out).not.toContain("outline-color");
	});

	it("tp:a is every property", () => {
		expect(css("tp:a")).toContain("transition-property: all");
	});

	it("tp:t covers the standalone transform properties", () => {
		expect(css("tp:t")).toContain(
			"transition-property: transform, translate, scale, rotate",
		);
	});
});

describe("theme.fonts", () => {
	const fonts = { display: '"Esteban", serif', m: "ui-monospace, monospace" };

	it("generates ff:<name>, replacing a default it collides with", () => {
		expect(css("ff:display", { fonts })).toContain(
			'font-family: "Esteban", serif;',
		);
		expect(css("ff:m", { fonts })).toContain(
			"font-family: ui-monospace, monospace;",
		);
	});

	it("is valid only when configured", () => {
		expect(invalid(["ff:display"], { fonts })).toEqual([]);
		expect(invalid(["ff:display"])).toEqual(["ff:display"]);
	});

	it("refuses a name that is not lower case", () => {
		expect(parses({ fonts: { Display: "serif" } })).toBe(false);
	});
});

describe("theme.keyframes", () => {
	const keyframes = {
		spin: "to { rotate: 360deg; }",
		"fade-in": "from { opacity: 0; }",
	};

	it("emits the keyframes a class uses, and only those", () => {
		const out = css("an:spin", { keyframes });

		expect(out).toContain("animation-name: spin;");
		expect(out).toContain("@keyframes spin {\n  to { rotate: 360deg; }\n}");
		expect(out).not.toContain("fade-in");
	});

	it("emits them once, whatever the variants", () => {
		const out = css(["an:spin", "@md:an:spin", "h:an:spin"], { keyframes });

		expect(out.match(/@keyframes spin/g)).toHaveLength(1);
	});

	it("is valid only when configured", () => {
		expect(invalid(["an:fade-in"], { keyframes })).toEqual([]);
		expect(invalid(["an:fade-in"])).toEqual(["an:fade-in"]);
	});

	it("ships none of its own, and refuses none as a name", () => {
		expect(css("an:none")).toContain("animation-name: none;");
		expect(css("an:none")).not.toContain("@keyframes");
		expect(parses({ keyframes: { none: "to {}" } })).toBe(false);
	});

	it.each([
		["adu:250", "animation-duration: 250ms;"],
		["ad:100", "animation-delay: 100ms;"],
		["atf:l", "animation-timing-function: linear;"],
		["aic:inf", "animation-iteration-count: infinite;"],
	])("%s writes %s", (className, expected) => {
		expect(css(className)).toContain(expected);
	});
});

describe("theme.states", () => {
	const states = { closing: "[data-ending-style]", open: "[open]" };

	it("appends the configured selector", () => {
		const out = css("closing:o:0", { states });

		expect(out).toContain(".closing\\:o\\:0[data-ending-style]");
		expect(out).toContain("opacity: 0");
	});

	it("stacks with a pseudo class and an at-rule", () => {
		const out = css("@md:h:open:bg:red", { states });

		expect(out).toContain("@media (min-width: 48rem)");
		expect(out).toContain(":hover[open]");
	});

	it("sits under stacked at-rules", () => {
		expect(css("@md:@prm:closing:o:0", { states })).toMatch(
			/@media \(min-width: 48rem\) \{\n {2}@media \(prefers-reduced-motion: reduce\) \{\n {4}\.[^{]*\[data-ending-style\] \{/,
		);
	});

	it("is valid only when configured, and ships none of its own", () => {
		expect(invalid(["closing:o:0"], { states })).toEqual([]);
		expect(invalid(["closing:o:0"])).toEqual(["closing:o:0"]);
		expect(css("open:o:0")).not.toContain("[open]");
	});

	it.each([
		[{ closing: "[data-ending-style]" }, true],
		[{ target: ":target" }, true],
		[{ h: "[data-hovering]" }, false],
		[{ o: "[data-open]" }, false],
		[{ bg: "[data-open]" }, false],
		[{ closing: "data-ending-style" }, false],
		[{ Closing: "[data-ending-style]" }, false],
	])("the schema takes %o: %s", (entry, ok) => {
		expect(parses({ states: entry })).toBe(ok);
	});
});

describe("normalize", () => {
	it("gives form controls the surrounding font, size included", () => {
		const rule = /button, input, optgroup, select, textarea \{([^}]*)\}/.exec(
			normalizeCSS,
		)?.[1];

		expect(rule).toContain("font: inherit;");
	});
});
