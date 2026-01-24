import type { Variants } from "./variants";

export interface Utility {
	prefix: string;
	properties: string[];
	slug: string;
	values: { [key: string]: string };
	variants?: Variants;
}

export interface Utilities {
	[key: string]: Utility;
}
