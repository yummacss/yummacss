import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const oxlint = resolve(__dirname, "../node_modules/.bin/oxlint");
const plugin = resolve(__dirname, "../packages/lint/src/index.ts");

interface Message {
	message: string;
	line: number;
	column: number;
}

// runs the plugin the way a project does: Oxlint loading it as a JS plugin
function lint(code: string, rules: Record<string, unknown>): Message[] {
	const dir = mkdtempSync(join(tmpdir(), "yummacss-lint-"));
	try {
		writeFileSync(join(dir, "row.jsx"), code);
		writeFileSync(
			join(dir, ".oxlintrc.json"),
			JSON.stringify({ plugins: [], jsPlugins: [plugin], rules }),
		);
		let output: string;
		try {
			output = execFileSync(
				oxlint,
				["-c", ".oxlintrc.json", "--format", "json", "row.jsx"],
				{ cwd: dir, encoding: "utf8" },
			);
		} catch (error) {
			output = (error as { stdout: string }).stdout;
		}
		const { diagnostics } = JSON.parse(output) as {
			diagnostics: {
				message: string;
				code: string;
				labels: { span: { line: number; column: number } }[];
			}[];
		};
		return diagnostics
			.filter((d) => d.code.startsWith("yummacss("))
			.map((d) => ({ message: d.message, ...d.labels[0].span }))
			.sort((a, b) => a.line - b.line || a.column - b.column)
			.map(({ message, line, column }) => ({ message, line, column }));
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

const named = (messages: Message[]) =>
	messages.map((m) => m.message.split("`")[1]);

describe("yummacss/no-unknown-classes", () => {
	it("should report a class Yumma CSS does not generate, with the closest one", () => {
		const messages = lint('const a = <div className="d:f ai:c bg:redd-5" />;', {
			"yummacss/no-unknown-classes": "error",
		});

		expect(messages.map((m) => m.message)).toEqual([
			"`bg:redd-5` is not a Yumma CSS class, so it generates no CSS. Did you mean `bg:red-5`?",
		]);
	});

	it("should read ternaries, template chunks and class functions", () => {
		const messages = lint(
			"const a = <span className={on ? 'c:indigo fw:600' : 'fw:66'} />;\n" +
				// biome-ignore lint/suspicious/noTemplateCurlyInString: JSX source under test
				"const b = <kbd className={`px:2 ${x} zz:9`} />;\n" +
				"const c = cn('d:f', on && 'qq:1', ['p:4', 'xx:2'], { 'yy:3': on });",
			{ "yummacss/no-unknown-classes": "error" },
		);

		expect(named(messages)).toEqual(["fw:66", "zz:9", "qq:1", "xx:2", "yy:3"]);
	});

	it("should read merge only when it comes from yummacss/merge", () => {
		const messages = lint(
			"import { merge as m } from 'yummacss/merge';\n" +
				"import merge from 'lodash.merge';\n" +
				"m('p:4 qq:1');\n" +
				"merge({}, { notAClass: 1 });",
			{ "yummacss/no-unknown-classes": "error" },
		);

		expect(named(messages)).toEqual(["qq:1"]);
	});

	it("should accept variants, opacity, negatives and allowed names", () => {
		const messages = lint(
			'const a = <div className="@sm:d:b h:bg:red-5 bg:blue-5/50 m:-4 site-logo editor-root" />;',
			{
				"yummacss/no-unknown-classes": [
					"error",
					{ allow: ["site-logo", "editor-*"] },
				],
			},
		);

		expect(messages).toEqual([]);
	});

	it("should fill a custom message", () => {
		const messages = lint('const a = <i className="bg:redd-5" />;', {
			"yummacss/no-unknown-classes": [
				"error",
				{ message: "{{className}} is wrong, try {{suggestions}}." },
			],
		});

		expect(messages.map((m) => m.message)).toEqual([
			"bg:redd-5 is wrong, try bg:red-5.",
		]);
	});

	it("should leave other attributes alone", () => {
		const messages = lint('const a = <a href="not-a-class" />;', {
			"yummacss/no-unknown-classes": "error",
		});

		expect(messages).toEqual([]);
	});
});

describe("yummacss/no-inline-styles", () => {
	it("should report each inline property, naming the class that writes it", () => {
		const messages = lint(
			'const a = <div style={{ display: "flex", justifyContent: "space-between", width: "37px", "--gap": "4px" }} />;',
			{ "yummacss/no-inline-styles": "error" },
		);

		expect(messages.map((m) => m.message)).toEqual([
			"`display: flex` is set inline. Use `d:f` instead.",
			"`justify-content: space-between` is set inline. Use `jc:sb` instead.",
			"`width: 37px` is set inline. Use a class from the scale, or pass a value that changes at runtime through a custom property.",
		]);
	});

	it("should skip allowed properties", () => {
		const messages = lint(
			'const a = <div style={{ width: "37px", gridTemplateAreas: "a b" }} />;',
			{
				"yummacss/no-inline-styles": ["error", { allow: ["width", "grid-*"] }],
			},
		);

		expect(messages).toEqual([]);
	});
});
