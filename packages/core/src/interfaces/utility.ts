import type { Variants } from "./variants";

export interface Utility {
	readonly prefix: string;
	readonly properties: readonly string[];
	readonly slug: string;
	readonly values: { readonly [key: string]: string };
	readonly variants?: Variants;
	/** Wraps a `var()` or math function value the way `values` are written, such as `translateX()` around a length. */
	readonly wrap?: (value: string) => string;
	/** Set to `false` to leave `var()` and math function values to another utility sharing the prefix. */
	readonly functions?: false;
}

export interface Utilities {
	readonly [key: string]: Utility;
}
