import { createValues } from "@/helpers/create-values";
import { gap } from "../variables";

export const gapValues: Record<string, string> = {
	...createValues({
		base: gap,
		unit: "rem",
		min: 0,
		max: 384,
	}),
	px: "1px",
};

export const spanValues: Record<string, string> = {
	"1": "span 1 / span 1",
	"2": "span 2 / span 2",
	"3": "span 3 / span 3",
	"4": "span 4 / span 4",
	"5": "span 5 / span 5",
	"6": "span 6 / span 6",
	"7": "span 7 / span 7",
	"8": "span 8 / span 8",
	"9": "span 9 / span 9",
	"10": "span 10 / span 10",
	"11": "span 11 / span 11",
	"12": "span 12 / span 12",
	"13": "span 13 / span 13",
	"14": "span 14 / span 14",
	"15": "span 15 / span 15",
	"16": "span 16 / span 16",
};

export const repeatValues: Record<string, string> = {
	"1": "repeat(1, minmax(0, 1fr))",
	"2": "repeat(2, minmax(0, 1fr))",
	"3": "repeat(3, minmax(0, 1fr))",
	"4": "repeat(4, minmax(0, 1fr))",
	"5": "repeat(5, minmax(0, 1fr))",
	"6": "repeat(6, minmax(0, 1fr))",
	"7": "repeat(7, minmax(0, 1fr))",
	"8": "repeat(8, minmax(0, 1fr))",
	"9": "repeat(9, minmax(0, 1fr))",
	"10": "repeat(10, minmax(0, 1fr))",
	"11": "repeat(11, minmax(0, 1fr))",
	"12": "repeat(12, minmax(0, 1fr))",
	"13": "repeat(13, minmax(0, 1fr))",
	"14": "repeat(14, minmax(0, 1fr))",
	"15": "repeat(15, minmax(0, 1fr))",
	"16": "repeat(16, minmax(0, 1fr))",
	s: "subgrid",
};

export const gridAutoValues: Record<string, string> = {
	auto: "auto",
	max: "max-content",
	min: "min-content",
};

export const gridValues: Record<string, string> = {
	...createValues({
		base: 1,
		min: 1,
		max: 16,
	}),
};
