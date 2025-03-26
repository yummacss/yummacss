export interface ColorUtilityItem {
  prefix: string;
  properties: string[];
  slug: string;
  values: { [key: string]: string };
}

export interface ColorUtilityMap {
  [key: string]: ColorUtilityItem;
}
