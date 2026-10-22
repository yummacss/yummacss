const COVERS = {
  css: { light: "/og.png", dark: "/og-dark.png", alt: "Yumma CSS" },
  ui: { light: "/ui-og.png", dark: "/ui-og-dark.png", alt: "Yumma UI" },
};

/** A product's cover, in the reader's colour scheme. */
export default function Cover({ product }: { product: keyof typeof COVERS }) {
  const cover = COVERS[product];
  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={cover.dark} />
      <img
        src={cover.light}
        alt={cover.alt}
        width={1200}
        height={630}
        className="d:b w:100% h:auto mb:4 bc:border bg:surface bw:1"
      />
    </picture>
  );
}
