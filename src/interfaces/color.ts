export interface Color {
  prefix: string;
  properties: string[];
  slug: string;
  values: { [key: string]: string };
}

export interface Colors {
  [key: string]: Color;
}
