import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { merge } from "yummacss/merge";
import {
	buildMap,
	format,
	render,
} from "../packages/cli/scripts/generate-merge-map.mjs";

describe("merge", () => {
	it("lets the last class win", () => {
		expect(merge("c-white c-accent")).toBe("c-accent");
		expect(merge("bg-indigo bg-red-5")).toBe("bg-red-5");
		expect(merge("px-8 p-4")).toBe("p-4");
	});

	// px says nothing about the block axis.
	it("keeps a class the later one does not fully cover", () => {
		expect(merge("p-4 px-8")).toBe("p-4 px-8");
		expect(merge("m-2 mx-4")).toBe("m-2 mx-4");
		// mx and my cover every side.
		expect(merge("m-2 mx-4 my-6")).toBe("mx-4 my-6");
	});

	// `c` is color and cursor. A prefix-only map eats the colour.
	it("tells apart utilities that share a prefix", () => {
		expect(merge("c-slate-10 c-p")).toBe("c-slate-10 c-p");
		expect(merge("p-4 p-a")).toBe("p-4 p-a");
		expect(merge("c-white c-p c-accent")).toBe("c-p c-accent");
	});

	it("keeps variants apart", () => {
		expect(merge("h:c-white c-accent")).toBe("h:c-white c-accent");
		expect(merge("h:c-white h:c-accent")).toBe("h:c-accent");
		expect(merge("sm:px-4 px-8")).toBe("sm:px-4 px-8");
	});

	it("passes through anything it does not recognise", () => {
		expect(merge("my-own-class c-accent")).toBe("my-own-class c-accent");
	});

	it("takes the arguments a className prop arrives in", () => {
		expect(merge("d-f ai-c", false, undefined, "c-accent")).toBe(
			"d-f ai-c c-accent",
		);
		expect(merge("", null)).toBe("");
		expect(merge("  d-f   ai-c  ")).toBe("d-f ai-c");
	});

	it("leaves a class list with no conflicts alone", () => {
		const classes = "d-f ai-c jc-c g-2 p-4 br-lg bw-1 fs-sm fw-500";
		expect(merge(classes)).toBe(classes);
	});

	it("has a merge-map that is current with core", () => {
		const onDisk = readFileSync(
			join(__dirname, "../packages/cli/src/merge-map.ts"),
			"utf-8",
		);
		expect(onDisk.trim()).toBe(format(render(buildMap())).trim());
	});
});
