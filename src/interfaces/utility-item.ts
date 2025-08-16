export interface UtilityItem {
  prefix: string;
  properties: string[];
  slug: string;
  values: { [key: string]: string };
}

export interface UtilityMap {
  [key: string]: UtilityItem;
}
