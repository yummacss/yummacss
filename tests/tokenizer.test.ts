import { tokenizer } from "@yummacss/nitro/browser";
import { describe, expect, it } from "vitest";

const classes = (source: string, filename = "file.tsx") =>
	tokenizer(source, filename);

describe("Tokenizer", () => {
	describe("quote pairing", () => {
		it("does not lose classes after an empty string literal", () => {
			const found = classes(
				`const a = ["p:4", flag ? "g:2" : "", "m:8"].filter(Boolean);`,
			);
			expect(found).toContain("p:4");
			expect(found).toContain("g:2");
			expect(found).toContain("m:8");
		});

		it("survives many empty literals, odd and even", () => {
			const found = classes(`
				const rootClasses = [
					"d:f fd:c w:100% max-w:96",
					bordered ? "g:2" : "",
					subtle ? "br:lg" : "",
					ghost ? "blw:2 pl:4" : "",
					isOpen ? "blc:indigo-5" : "blc:silver-3",
				].filter(Boolean).join(" ");
			`);
			for (const c of [
				"d:f",
				"max-w:96",
				"g:2",
				"br:lg",
				"blw:2",
				"blc:indigo-5",
				"blc:silver-3",
			]) {
				expect(found).toContain(c);
			}
		});

		it("is not blinded by a regex literal containing quotes", () => {
			const found = classes(`
				const meta = /"([^"]+)"/g;
				const LINE_CLASSES = "d:b mx:-4 px:4";
			`);
			expect(found).toContain("d:b");
			expect(found).toContain("mx:-4");
			expect(found).toContain("px:4");
		});

		it("still reads a division as division", () => {
			const found = classes(`const half = total / 2;\nconst c = "p:4";`);
			expect(found).toContain("p:4");
		});

		it("handles escaped quotes inside a string", () => {
			const found = classes(`const a = "say \\"hi\\"";\nconst b = "m:2";`);
			expect(found).toContain("m:2");
		});
	});

	describe("comments", () => {
		it("is not desynced by a quote in a line comment", () => {
			const found = classes(`
				// the reader's own copy
				const a = "p:6";
			`);
			expect(found).toContain("p:6");
		});

		it("is not desynced by quotes in a block comment", () => {
			const found = classes(`
				/** e.g. \`"@sm:d:b" "@md:d:b"\` returns ["@sm:d:b"] */
				const a = "g:3";
			`);
			expect(found).toContain("g:3");
		});

		it("does not collect class names out of comments", () => {
			const found = classes(`
				// a header reading \`m-4 m-8 m-12\` suggests m-23 is not a class
				/** Commented-out markup: <div className="d:none" /> */
				const a = "p:2";
			`);
			expect(found).toContain("p:2");
			for (const c of ["m:4", "m:8", "m:12", "m:23", "d:none"]) {
				expect(found).not.toContain(c);
			}
		});
	});

	describe("template literals", () => {
		it("reads static chunks and nested strings across interpolations", () => {
			const found = classes(
				'const c = `d:f ai:c ${open ? "o:100" : "o:0"} px:1 ${big ? "w:8" : "w:4"} tp:a`;',
			);
			for (const c of [
				"d:f",
				"ai:c",
				"o:100",
				"o:0",
				"px:1",
				"w:8",
				"w:4",
				"tp:a",
			]) {
				expect(found).toContain(c);
			}
		});

		it("does not emit fragments of surrounding syntax", () => {
			const found = classes('<div className={`d:f ${x ? "o:60" : ""}`} />');
			expect(found).toContain("d:f");
			expect(found).toContain("o:60");
			for (const token of found) {
				expect(token).not.toMatch(/[<>"'`={}();,]/);
			}
		});

		it("handles a nested object inside an interpolation", () => {
			const found = classes(
				'const c = `p:4 ${map[{ a: 1 }.a] ? "bg:red" : "bg:blue"} m:2`;',
			);
			expect(found).toContain("p:4");
			expect(found).toContain("bg:red");
			expect(found).toContain("m:2");
		});
	});

	describe("class attributes", () => {
		it("reads class and className, quoted and braced", () => {
			const found = classes(`
				<a class="c:blue" />
				<b className="d:b" />
				<c className={"g:2"} />
			`);
			expect(found).toEqual(expect.arrayContaining(["c:blue", "d:b", "g:2"]));
		});

		it("keeps variant and opacity syntax intact", () => {
			const found = classes(
				`<div className="@sm:d:b h:bg:red/50 fv:oo:2 mx:-4 bg:accent-dim/10" />`,
			);
			for (const c of [
				"@sm:d:b",
				"h:bg:red/50",
				"fv:oo:2",
				"mx:-4",
				"bg:accent-dim/10",
			]) {
				expect(found).toContain(c);
			}
		});
	});

	describe("non-JavaScript input", () => {
		it("bounds an unbalanced quote to its own line", () => {
			const found = classes(
				`Here's a paragraph about it.\n\n<div className="d:g gtc:12" />\n`,
				"page.mdx",
			);
			expect(found).toContain("d:g");
			expect(found).toContain("gtc:12");
		});

		it("reads classes out of a fenced example", () => {
			const found = classes(
				'```jsx\n<div className="cs:ld ta:c">Hello</div>\n```\n',
				"page.mdx",
			);
			expect(found).toContain("cs:ld");
			expect(found).toContain("ta:c");
		});

		it("defaults to the safe path when no filename is given", () => {
			expect(tokenizer(`<div class="p:4" />`)).toContain("p:4");
		});
	});
});
