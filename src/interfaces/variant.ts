export interface PseudoClass {
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
  mediaQueries?: MediaQuery[];
  opacity?: Opacity[];
}
