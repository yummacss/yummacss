import type { Variants } from "./variants";

export interface Utility {
	readonly prefix: string;
	readonly properties: readonly string[];
	readonly slug: string;
	readonly values: { readonly [key: string]: string };
	readonly variants?: Variants;
}

export interface Utilities {
	readonly [key: string]: Utility;
}
