export interface SidebarSection {
  title: string;
  items: string[];
}

/** The guides, under `/docs`; every other page is a component under `/components`. */
export const GUIDES = ["installation", "configuration", "customization"];

export const sidebarConfig: SidebarSection[] = [
  {
    title: "Get Started",
    items: GUIDES,
  },
  {
    title: "Forms",
    items: [
      "autocomplete",
      "checkbox",
      "checkbox-group",
      "combobox",
      "file-upload",
      "field",
      "number-field",
      "otp-field",
      "radio",
      "select",
      "slider",
      "switch",
      "textarea",
      "toggle",
      "toggle-group",
    ],
  },
  {
    title: "Display",
    items: [
      "accordion",
      "avatar",
      "avatar-stack",
      "badge",
      "breadcrumb",
      "kbd",
      "meter",
      "preview-card",
      "progress",
      "scroll-area",
      "separator",
    ],
  },
  {
    title: "Interactive",
    items: ["button", "button-group", "context-menu", "menu", "menubar"],
  },
  {
    title: "Navigation",
    items: ["file-tree", "navigation-menu", "tabs", "toolbar"],
  },
  {
    title: "Overlays",
    items: ["alert-dialog", "dialog", "drawer", "popover", "toast", "tooltip"],
  },
  {
    title: "Application UI",
    items: [
      "empty-state",
      "onboarding",
      "rating",
      "skeleton",
      "storage-bar",
      "theme-switcher",
    ],
  },
  {
    title: "Blocks",
    items: ["inline-icon-heading"],
  },
];
