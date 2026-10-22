import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { extractProperties } from "./src/utils/doc-properties";
import { UI_ORIGIN } from "./src/utils/hosts";

// Yumma UI lives on its own site; every address it had here goes there
const GUIDES = ["installation", "configuration", "customization"];

const uiRedirects = [
  // every install and yummaui.json names the registry here
  {
    source: "/ui/registry/:path*",
    destination: `${UI_ORIGIN}/ui/registry/:path*`,
    permanent: true,
  },
  {
    source: "/ui/r/:path*",
    destination: `${UI_ORIGIN}/ui/registry/:path*`,
    permanent: true,
  },
  // pages that moved before the split
  {
    source: "/components/cli",
    destination: `${UI_ORIGIN}/docs/configuration`,
    permanent: true,
  },
  {
    source: "/ui/theming",
    destination: `${UI_ORIGIN}/docs/customization`,
    permanent: true,
  },
  ...GUIDES.flatMap((slug) =>
    ["/components", "/ui/components", "/ui"].map((base) => ({
      source: `${base}/${slug}`,
      destination: `${UI_ORIGIN}/docs/${slug}`,
      permanent: true,
    })),
  ),
  ...["/components", "/ui/components", "/ui"].flatMap((base) => [
    {
      source: base,
      destination: `${UI_ORIGIN}/docs/installation`,
      permanent: true,
    },
    {
      source: `${base}/:path*`,
      destination: `${UI_ORIGIN}/components/:path*`,
      permanent: true,
    },
  ]),
];

const docsRedirects = [
  {
    source: "/docs/lint",
    destination: "/docs/configuration#lint",
    permanent: true,
  },
  // the plugin & core pages folded into Installation
  {
    source: "/docs/vite",
    destination: "/docs/installation#using-vite",
    permanent: true,
  },
  {
    source: "/docs/postcss",
    destination: "/docs/installation#using-nextjs",
    permanent: true,
  },
  {
    source: "/docs/core",
    destination: "/docs/installation#reading-the-utilities",
    permanent: true,
  },
  // no landing page: the site opens on Installation
  {
    source: "/",
    destination: "/docs/installation",
    permanent: false,
  },
  {
    source: "/brand",
    destination: "/docs/brand",
    permanent: true,
  },
  {
    source: "/docs",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/docs/base-styles",
    destination: "/docs/normalize",
    permanent: true,
  },
  {
    source: "/docs/naming",
    destination: "/docs/naming-convention",
    permanent: true,
  },
  {
    source: "/docs/runtime",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/docs/cdn",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/docs/ide-support",
    destination: "/docs/canon",
    permanent: true,
  },
  {
    source: "/docs/intellisense",
    destination: "/docs/canon",
    permanent: true,
  },
  {
    source: "/docs/packages",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/blog/yummacss-intellisense",
    destination: "/docs/canon",
    permanent: true,
  },
  {
    source: "/docs/colours",
    destination: "/docs/color-system",
    permanent: true,
  },
  {
    source: "/docs/colors",
    destination: "/docs/color-system",
    permanent: true,
  },
  {
    source: "/docs/colors.md",
    destination: "/docs/color-system.md",
    permanent: true,
  },
  {
    source: "/docs/gtc",
    destination: "/docs/grid-template-columns",
    permanent: true,
  },
  {
    source: "/docs/gtr",
    destination: "/docs/grid-template-rows",
    permanent: true,
  },
  {
    source: "/docs/grid-column-span",
    destination: "/docs/grid-column",
    permanent: true,
  },
  {
    source: "/docs/grid-row-span",
    destination: "/docs/grid-row",
    permanent: true,
  },
];

const DOCS_DIR = join(process.cwd(), "src/content/docs");

function mergedPageRedirects() {
  const files = readdirSync(DOCS_DIR).filter((f) => f.endsWith(".mdx"));
  const pages = new Set(files.map((f) => f.replace(/\.mdx$/, "")));

  return files.flatMap((file) => {
    const root = file.replace(/\.mdx$/, "");
    const content = readFileSync(join(DOCS_DIR, file), "utf8");
    return extractProperties(content)
      .filter(({ name }) => !pages.has(name))
      .map(({ name, anchor }) => ({
        source: `/docs/${name}`,
        destination: `/docs/${root}#${anchor}`,
        permanent: true,
      }));
  });
}

const mergedRedirects = mergedPageRedirects();

const RELEASE_TAG = "https://github.com/yummacss/yummacss/releases/tag";

const removedReleasePosts = [
  "0.1.0",
  "1.1.0",
  "1.2.0",
  "2.1.0",
  "3.1.0",
  "3.2.0",
  "3.3.0",
  "3.4.0",
  "3.5.0",
  "3.6.0",
  "3.7.0",
  "3.9.0",
  "3.10.0",
  "3.11.0",
  "3.15.0",
  "3.16.0",
  "3.20.0",
  "3.21.0",
  "3.22.0",
  "3.23.0",
  "3.26.0",
];

const RELEASES = "https://github.com/yummacss/yummacss/releases";

// the blog is gone and release notes live on GitHub; the notes, "Releases".
const blogRedirects = [
  {
    source: "/blog/v0",
    destination: `${RELEASE_TAG}/v0.1.0`,
    permanent: true,
  },
  {
    source: "/blog/v1",
    destination: `${RELEASE_TAG}/v1.2.0`,
    permanent: true,
  },
  {
    source: "/blog/v2",
    destination: `${RELEASE_TAG}/v2.1.0`,
    permanent: true,
  },
  ...removedReleasePosts.map((version) => ({
    source: `/blog/yummacss-${version}`,
    destination: `${RELEASE_TAG}/v${version}`,
    permanent: true,
  })),
  ...[
    ["/blog/yummacss-1.0", "1.0.0"],
    ["/blog/yummacss-2.0", "2.0.0"],
    ["/blog/v3", "3.0.0"],
    ["/blog/yummacss-3.0", "3.0.0"],
    ...["1.0.0", "2.0.0", "3.0.0", "3.29.0", "4.0.0", "4.2.0", "4.3.0"].map(
      (version) => [`/blog/yummacss-${version}`, version],
    ),
  ].map(([source, version]) => ({
    source,
    destination: `${RELEASE_TAG}/v${version}`,
    permanent: true,
  })),
  {
    source: "/blog/hello-yumma-ui",
    destination: "https://github.com/yummacss/yummaui/releases",
    permanent: true,
  },
  {
    source: "/blog/:path*",
    destination: RELEASES,
    permanent: true,
  },
];

export const redirects = [
  ...docsRedirects,
  ...mergedRedirects,
  ...blogRedirects,
  ...uiRedirects,
];
