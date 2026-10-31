// what /docs/brand shows and offers, for the page and for its Markdown twin

export const BRAND_PRODUCTS = {
	yumma: "Yumma",
	yummacss: "Yumma CSS",
	yummaui: "Yumma UI",
} as const;

/** `yumma` is the mark both products share; the others are each product's logo. */
export type BrandProduct = keyof typeof BRAND_PRODUCTS;

export const BRAND_VARIANTS = [
	{ label: "Light", suffix: "", page: "#ffffff" },
	{ label: "Dark", suffix: "-dark", page: "#000000" },
] as const;

export const BRAND_COLORS = [
	{ name: "Pale indigo", hex: "#bec6f2" },
	{ name: "Indigo", hex: "#4c5fc7" },
	{ name: "Ink", hex: "#2b2b2b" },
] as const;

/** Every file an entry offers: the mark on its tile and without it, or a logo, light and dark. */
export const brandFiles = (product: BrandProduct) =>
	BRAND_VARIANTS.flatMap((variant) =>
		product === "yumma"
			? [
					{
						variant: variant.label,
						label: `${variant.label}, on its tile`,
						base: `yumma-tile${variant.suffix}`,
					},
					{
						variant: variant.label,
						label: `${variant.label}, without the tile`,
						base: `yumma-mark${variant.suffix}`,
					},
				]
			: [
					{
						variant: variant.label,
						label: variant.label,
						base: `${product}${variant.suffix}`,
					},
				],
	);
