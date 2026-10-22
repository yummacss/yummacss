import { GUIDES } from "./src/config/sidebar";
import { pagePath } from "./src/utils/hosts";

const uiRedirects = [
  {
    source: "/components/cli",
    destination: "/docs/configuration",
    permanent: true,
  },
  // installs before yummaui 0.6 store this address in yummaui.json
  {
    source: "/ui/r/:path*",
    destination: "/ui/registry/:path*",
    permanent: true,
  },
  {
    source: "/ui/theming",
    destination: "/docs/customization",
    permanent: true,
  },
  {
    source: "/ui/components",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/components",
    destination: "/docs/installation",
    permanent: true,
  },
  {
    source: "/ui",
    destination: "/docs/installation",
    permanent: true,
  },
  ...[
    "installation",
    "customization",
    "accordion",
    "autocomplete",
    "avatar",
    "button",
    "checkbox",
    "collapsible",
    "combobox",
    "context-menu",
    "dialog",
    "input",
    "menu",
    "menubar",
    "meter",
    "navigation-menu",
    "number-field",
    "popover",
    "preview-card",
    "progress",
    "radio",
    "select",
    "separator",
    "slider",
    "switch",
    "tabs",
    "toggle",
    "toolbar",
    "tooltip",
  ].map((slug) => ({
    source: `/ui/${slug}`,
    destination: pagePath(slug),
    permanent: true,
  })),
];

const removedComponents = [
  {
    source: "/components/collapsible",
    destination: "/components/accordion",
    permanent: true,
  },
  {
    source: "/components/command-palette",
    destination: "/components/combobox",
    permanent: true,
  },
  // the pages lived under /ui before they moved to their own domain
  ...GUIDES.map((slug) => ({
    source: `/ui/components/${slug}`,
    destination: `/docs/${slug}`,
    permanent: true,
  })),
  {
    source: "/ui/components/:slug",
    destination: "/components/:slug",
    permanent: true,
  },
];

export const redirects = [
  {
    source: "/",
    destination: "/docs/installation",
    permanent: false,
  },
  {
    source: "/docs",
    destination: "/docs/installation",
    permanent: true,
  },
  // the guides sat beside the components before they moved to /docs
  ...GUIDES.flatMap((slug) => [
    {
      source: `/components/${slug}`,
      destination: `/docs/${slug}`,
      permanent: true,
    },
    {
      source: `/components/${slug}.md`,
      destination: `/docs/${slug}.md`,
      permanent: true,
    },
  ]),
  ...uiRedirects,
  ...removedComponents,
];
