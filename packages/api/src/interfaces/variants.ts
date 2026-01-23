export interface PseudoClass {
	prefix: string;
	value: string;
}

export interface PseudoElement {
	prefix: string;
	value: string;
}

export interface MediaQuery {
	prefix: string;
	value: string;
}

export interface Opacity {
	prefix: string;
	value: string;
}

export interface Variants {
	pseudoClasses?: PseudoClass[];
	pseudoElements?: PseudoElement[];
	mediaQueries?: MediaQuery[];
	opacity?: Opacity[];
}
