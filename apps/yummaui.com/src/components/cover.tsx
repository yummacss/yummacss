/** The site's cover, in the reader's colour scheme. */
export default function Cover() {
  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet="/og-dark.png" />
      <img
        src="/og.png"
        alt="Yumma UI"
        width={1200}
        height={630}
        className="d:b w:100% h:auto mb:4 bc:border bg:surface bw:1"
      />
    </picture>
  );
}
