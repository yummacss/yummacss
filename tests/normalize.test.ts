import { describe, expect, it } from "vite-plus/test";
import { normalizeCSS } from "../packages/nitro/src/normalize";

// [ids, classes, elements] for the selector forms the reset uses
const specificity = (selector: string): [number, number, number] => {
	const s = selector.replace(/:where\((?:[^()]|\([^()]*\))*\)/g, "");
	const ids = (s.match(/#[\w-]+/g) ?? []).length;
	const classes = (
		s.match(/\.[\w-]+|\[[^\]]*\]|(?<!:):(?!is\(|not\()[\w-]+/g) ?? []
	).length;
	const elements = (s.match(/(?:^|[\s>+~(,])[a-z][\w-]*/g) ?? []).length;
	return [ids, classes, elements];
};

const selectors = [...normalizeCSS.matchAll(/([^{}]+)\{/g)].flatMap(
	([, list = ""]) =>
		list
			.trim()
			.split(/,(?![^(]*\))/)
			.map((s) => s.trim()),
);

describe("Normalize", () => {
	it("never outranks a single utility class", () => {
		const above = selectors.filter((s) => {
			const [ids, classes, elements] = specificity(s);
			return ids > 0 || classes > 1 || (classes === 1 && elements > 0);
		});
		expect(above).toEqual([]);
	});
});
