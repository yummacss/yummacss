export interface Utility {
  prefix: string;
  properties: string[];
  slug: string;
  values: { [key: string]: string };
}

export interface Utilities {
  [key: string]: Utility;
}
