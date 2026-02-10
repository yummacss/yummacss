import {
	mediaQueries as mq,
	opacity as op,
	pseudoClasses as pc,
	pseudoElements as pe,
} from "./defaults/variants";

export const mediaQueries = mq;
export const opacity = op;
export const pseudoClasses = pc;
export const pseudoElements = pe;

// literal types
export type MediaQueryPrefix = (typeof mq)[number]["prefix"];
export type OpacityPrefix = (typeof op)[number]["prefix"];
export type PseudoClassPrefix = (typeof pc)[number]["prefix"];
export type PseudoElementPrefix = (typeof pe)[number]["prefix"];

export type VariantPrefix =
	| MediaQueryPrefix
	| OpacityPrefix
	| PseudoClassPrefix
	| PseudoElementPrefix;
