import plugin from "@yummacss/lint/plugin";
import { Linter } from "eslint";
import { describe, expect, it } from "vitest";

function lint(code: string, rules: Linter.RulesRecord) {
	const linter = new Linter({ configType: "flat" });
	return linter.verify(
		code,
		[
			{
				files: ["**/*.jsx"],
				languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
				plugins: { yummacss: plugin as never },
				rules,
			},
		],
		"row.jsx",
	);
}

describe("yummacss/canon", () => {
	it("should report a class that is not canon, with a suggestion", () => {
		const messages = lint('const a = <div className="d:f ai:c bg:redd-5" />;', {
			"yummacss/canon": "error",
		});

		expect(messages.map((m) => m.message)).toEqual([
			"`bg:redd-5` is not a Yumma CSS class. Did you mean `bg:red-5`?",
		]);
	});

	it("should read both branches of a ternary and every template chunk", () => {
		const messages = lint(
			"const a = <span className={on ? 'c:indigo fw:600' : 'fw:66'} />;\n" +
				// biome-ignore lint/suspicious/noTemplateCurlyInString: JSX source under test
				"const b = <kbd className={`px:2 ${x} zz:9`} />;",
			{ "yummacss/canon": "error" },
		);

		expect(messages.map((m) => [m.line, m.message.split("`")[1]])).toEqual([
			[1, "fw:66"],
			[2, "zz:9"],
		]);
	});

	it("should accept variants, opacity, negatives and the allow option", () => {
		const messages = lint(
			'const a = <div className="@sm:d:b h:bg:red-5 bg:blue-5/50 m:-4 site-logo" />;',
			{ "yummacss/canon": ["error", { allow: ["site-logo"] }] },
		);

		expect(messages).toEqual([]);
	});

	it("should leave other attributes alone", () => {
		const messages = lint('const a = <a href="not-a-class" />;', {
			"yummacss/canon": "error",
		});

		expect(messages).toEqual([]);
	});
});

describe("yummacss/prefer-class", () => {
	it("should name the class for an inline style core already writes", () => {
		const messages = lint(
			'const a = <div style={{ display: "flex", justifyContent: "space-between", width: "37px" }} />;',
			{ "yummacss/prefer-class": "warn" },
		);

		expect(messages.map((m) => m.message)).toEqual([
			"`display: flex` is `d:f`.",
			"`justify-content: space-between` is `jc:sb`.",
		]);
	});
});
