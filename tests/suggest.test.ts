import { suggestClasses } from "@yummacss/nitro";
import { describe, expect, it } from "vitest";

const suggest = (className: string) =>
	suggestClasses([className], {}).get(className);

describe("Suggestions", () => {
	// the whole point of the 4.0 suggester: a class typed the 3.x way gets its
	// 4.0 answer. gap-4 passed on its own because the prefix shortens too.
	it.each([
		["p-4", "p:4"],
		["m-8", "m:8"],
		["px-4", "px:4"],
		["d-f", "d:f"],
		["c-white", "c:white"],
		["bg-red-5", "bg:red-5"],
		["fw-600", "fw:600"],
		["jc-c", "jc:c"],
		["ai-c", "ai:c"],
	])("answers %s with %s when only the separator changed", (from, to) => {
		expect(suggest(from)).toBe(to);
	});

	it.each([
		["gap-4", "g:4"],
		["gap-8", "g:8"],
	])("answers %s with %s when the prefix changed too", (from, to) => {
		expect(suggest(from)).toBe(to);
	});

	it.each([
		["tt-n", "tt:none"],
		["tl-a", "tl:auto"],
	])("answers %s with %s when 4.0 renamed the value", (from, to) => {
		expect(suggest(from)).toBe(to);
	});

	it("stays quiet for a class nothing is close to", () => {
		expect(suggest("zzz:9")).toBeUndefined();
		expect(suggest("qqqq-1")).toBeUndefined();
	});
});
