// what /docs/brand shows and offers, for the page and for its Markdown twin

export const BRAND_PRODUCTS = {
  yummacss: "Yumma CSS",
  yummaui: "Yumma UI",
} as const;

export type BrandProduct = keyof typeof BRAND_PRODUCTS;

export const BRAND_VARIANTS = [
  { label: "Light", suffix: "", page: "#f7f8fb" },
  { label: "Dark", suffix: "-dark", page: "#151724" },
] as const;

export const BRAND_COLORS = [
  { name: "Accent", hex: "#4c5fc7" },
  { name: "Accent on dark", hex: "#bec6f2" },
  { name: "Ink", hex: "#14171f" },
  { name: "Page", hex: "#f7f8fb" },
] as const;

/** Every file a product offers: on the tile and without it, light and dark. */
export const brandFiles = (product: BrandProduct) =>
  BRAND_VARIANTS.flatMap((variant) => [
    {
      label: `${variant.label}, on its tile`,
      base: `${product}${variant.suffix}`,
    },
    {
      label: `${variant.label}, without the tile`,
      base: `${product}-mark${variant.suffix}`,
    },
  ]);
