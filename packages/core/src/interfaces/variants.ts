export interface PseudoClass {
	readonly prefix: string;
	readonly value: string;
}

export interface PseudoElement {
	readonly prefix: string;
	readonly value: string;
}

export interface MediaQuery {
	readonly prefix: string;
	readonly value: string;
}

export interface ContainerQuery {
	readonly prefix: string;
	readonly value: string;
}

export interface Opacity {
	readonly prefix: string;
	readonly value: string;
}

export interface Variants {
	readonly pseudoClasses?: readonly PseudoClass[];
	readonly pseudoElements?: readonly PseudoElement[];
	readonly mediaQueries?: readonly MediaQuery[];
	readonly containerQueries?: readonly ContainerQuery[];
	readonly opacity?: readonly Opacity[];
}
