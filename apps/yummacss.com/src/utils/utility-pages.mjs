// one row per utility page, rendered by the docs route (the notes, "Utility pages")

/**
 * @typedef {object} UtilityPage
 * @property {string} slug The address, `/docs/<slug>`.
 * @property {string} [title] Defaults to the slug in Title Case.
 * @property {string} description
 * @property {string | string[]} [reference] The property, or several sharing one scale. Defaults to the slug.
 * @property {string[]} [tables] One Reference table per property, in place of `reference`.
 * @property {boolean} [negative] Its Variants list negative values.
 * @property {string} [baseline] The web-features path. Defaults to `css.properties.<first property>`.
 * @property {string} [since] The minor it arrived in.
 */

/** @type {Record<string, UtilityPage[]>} */
export const UTILITY_PAGES = {
  animation: [
    {
      slug: "animation-delay",
      description: "Set how long an animation waits before it starts.",
      since: "4.2",
    },
    {
      slug: "animation-duration",
      description: "Set how long one cycle of an animation takes.",
      since: "4.2",
    },
    {
      slug: "animation-iteration-count",
      description: "Set how many times an animation runs.",
      since: "4.2",
    },
  ],
  background: [
    {
      slug: "background-attachment",
      description: "Set the scroll behavior for background images.",
    },
    {
      slug: "background-clip",
      description: "Set the background image extent within an element.",
    },
    {
      slug: "background-origin",
      description:
        "Set the background positioning area relative to borders, padding & content.",
    },
    {
      slug: "background-position",
      description: "Set the background image position within an element.",
    },
    {
      slug: "background-repeat",
      description: "Set the repeat behavior for background images.",
    },
    {
      slug: "background-size",
      description: "Set the background image size within an element.",
    },
  ],
  border: [
    {
      slug: "border-collapse",
      description: "Set the collapsing behavior for table borders.",
    },
    {
      slug: "border-radius",
      description: "Set the radius for element borders.",
      reference: [
        "border-radius",
        "border-block-end-radius",
        "border-block-start-radius",
        "border-bottom-left-radius",
        "border-bottom-radius",
        "border-bottom-right-radius",
        "border-end-end-radius",
        "border-end-start-radius",
        "border-inline-end-radius",
        "border-inline-start-radius",
        "border-left-radius",
        "border-right-radius",
        "border-start-end-radius",
        "border-start-start-radius",
        "border-top-left-radius",
        "border-top-radius",
        "border-top-right-radius",
      ],
    },
    {
      slug: "border-spacing",
      description: "Set the distance between table borders.",
    },
    { slug: "border-style", description: "Set the style for element borders." },
    {
      slug: "border-width",
      description: "Set the width for element borders.",
      reference: [
        "border-width",
        "border-block-end-width",
        "border-block-start-width",
        "border-block-width",
        "border-bottom-width",
        "border-inline-end-width",
        "border-inline-start-width",
        "border-inline-width",
        "border-left-width",
        "border-right-width",
        "border-top-width",
      ],
    },
    {
      slug: "corner-shape",
      description: "Set the shape for element corners.",
      reference: [
        "corner-shape",
        "corner-block-end-shape",
        "corner-block-start-shape",
        "corner-bottom-left-shape",
        "corner-bottom-right-shape",
        "corner-bottom-shape",
        "corner-end-end-shape",
        "corner-end-start-shape",
        "corner-inline-end-shape",
        "corner-inline-start-shape",
        "corner-left-shape",
        "corner-right-shape",
        "corner-start-end-shape",
        "corner-start-start-shape",
        "corner-top-left-shape",
        "corner-top-right-shape",
        "corner-top-shape",
      ],
    },
  ],
  boxModel: [
    {
      slug: "aspect-ratio",
      description: "Set the aspect ratio of an element.",
    },
    {
      slug: "block-size",
      description: "Set an element's logical block size.",
      reference: ["block-size", "max-block-size", "min-block-size"],
    },
    {
      slug: "box-sizing",
      description: "Set the box sizing model for an element.",
    },
    {
      slug: "height",
      description: "Set the height for an element.",
      reference: ["height", "max-height", "min-height"],
    },
    {
      slug: "inline-size",
      description: "Set an element's logical inline size.",
      reference: ["inline-size", "max-inline-size", "min-inline-size"],
    },
    {
      slug: "margin",
      description: "Set the margin for an element.",
      reference: [
        "margin",
        "margin-block",
        "margin-block-end",
        "margin-block-start",
        "margin-bottom",
        "margin-inline",
        "margin-inline-end",
        "margin-inline-start",
        "margin-left",
        "margin-right",
        "margin-top",
      ],
      negative: true,
    },
    {
      slug: "padding",
      description: "Set the padding for an element.",
      reference: [
        "padding",
        "padding-block",
        "padding-block-end",
        "padding-block-start",
        "padding-bottom",
        "padding-inline",
        "padding-inline-end",
        "padding-inline-start",
        "padding-left",
        "padding-right",
        "padding-top",
      ],
    },
    {
      slug: "width",
      description: "Set the width for an element.",
      reference: ["width", "max-width", "min-width"],
    },
  ],
  color: [
    {
      slug: "accent-color",
      description: "Set the accent color for form controls.",
    },
    {
      slug: "background-color",
      description: "Set the background color for an element.",
    },
    {
      slug: "border-color",
      description: "Set the color for element borders.",
      reference: [
        "border-color",
        "border-bottom-color",
        "border-left-color",
        "border-right-color",
        "border-top-color",
      ],
    },
    {
      slug: "caret-color",
      description: "Set the color for text input cursors.",
    },
    { slug: "color", description: "Set the text color for an element." },
    {
      slug: "color-scheme",
      description: "Set which color schemes an element can be rendered in.",
    },
    { slug: "fill", description: "Set the fill color for SVG elements." },
    {
      slug: "outline-color",
      description: "Set the color for an element's outline.",
    },
    { slug: "stroke", description: "Set the stroke color for SVG elements." },
    {
      slug: "text-decoration-color",
      description: "Set the color for text decorations.",
    },
  ],
  effect: [
    {
      slug: "backdrop-blur",
      description: "Set the backdrop blur filter for an element.",
      baseline: "css.properties.backdrop-filter",
    },
    {
      slug: "backdrop-grayscale",
      description: "Apply a grayscale filter to the area behind an element.",
      baseline: "css.properties.backdrop-filter",
    },
    {
      slug: "blur",
      description: "Set the blur filter for an element.",
      baseline: "css.properties.filter",
    },
    {
      slug: "box-shadow",
      description: "Set the box shadow for an element.",
      tables: ["box-shadow-outset", "box-shadow-inset"],
      baseline: "css.properties.box-shadow",
    },
    {
      slug: "grayscale",
      description: "Set the grayscale filter for an element.",
      baseline: "css.properties.filter",
    },
    {
      slug: "mix-blend-mode",
      description:
        "Set how an element's content should blend with the background of its parent.",
    },
    { slug: "opacity", description: "Set the opacity for an element." },
  ],
  flexbox: [
    {
      slug: "align-content",
      description: "Set row alignment in multi-row Flex & Grid containers.",
    },
    {
      slug: "align-items",
      description: "Set item alignment along a container's cross axis.",
    },
    {
      slug: "align-self",
      description:
        "Set individual item alignment along a container's cross axis.",
    },
    { slug: "flex", description: "Set how flex items grow & shrink." },
    { slug: "flex-basis", description: "Set the initial size for flex items." },
    {
      slug: "flex-direction",
      description: "Set the direction for flex items.",
    },
    {
      slug: "flex-grow",
      description: "Set how flex items grow to fill available space.",
    },
    {
      slug: "flex-shrink",
      description: "Set how flex items shrink to fit the container.",
    },
    {
      slug: "flex-wrap",
      description: "Set how flex items wrap in a container.",
    },
    {
      slug: "justify-content",
      description: "Set item alignment along a container's main axis.",
    },
    {
      slug: "justify-items",
      description: "Set item alignment along a container's inline axis.",
    },
    {
      slug: "justify-self",
      description:
        "Set individual item alignment along a container's inline axis.",
    },
    {
      slug: "order",
      description: "Set the order for flex & grid items.",
      negative: true,
    },
  ],
  font: [
    { slug: "font-size", description: "Set the font size for an element." },
    { slug: "font-style", description: "Set the font style for an element." },
    {
      slug: "font-variant-numeric",
      description: "Set how numbers are drawn for an element.",
      since: "4.8",
    },
  ],
  grid: [
    {
      slug: "column-gap",
      description: "Set the spacing between columns in a grid layout.",
    },
    { slug: "gap", description: "Set the spacing between flex & grid items." },
    {
      slug: "grid-auto-columns",
      description: "Set the size of implicitly-created grid columns.",
    },
    {
      slug: "grid-auto-flow",
      description: "Set how items are automatically placed in a grid.",
    },
    {
      slug: "grid-auto-rows",
      description: "Set the size of implicitly-created grid rows.",
    },
    {
      slug: "grid-column",
      description: "Set the size & position of items across grid columns.",
      reference: ["grid-column", "grid-column-end", "grid-column-start"],
    },
    {
      slug: "grid-row",
      description: "Set the size & position of items across grid rows.",
      reference: ["grid-row", "grid-row-end", "grid-row-start"],
    },
    {
      slug: "grid-template-columns",
      description: "Set the columns for a grid layout.",
    },
    {
      slug: "grid-template-rows",
      description: "Set the rows for a grid layout.",
    },
    {
      slug: "place-content",
      description: "Set the content justification & alignment simultaneously.",
    },
    {
      slug: "place-items",
      description: "Set item justification & alignment simultaneously.",
    },
    {
      slug: "place-self",
      description:
        "Set individual item justification & alignment simultaneously.",
    },
    {
      slug: "row-gap",
      description: "Set the spacing between rows in a grid layout.",
    },
  ],
  interactivity: [
    {
      slug: "appearance",
      description: "Set the appearance for native form controls.",
    },
    {
      slug: "cursor",
      description: "Set the cursor style when hovering over an element.",
    },
    {
      slug: "field-sizing",
      description: "Set how form fields size themselves based on content.",
    },
    {
      slug: "overscroll-behavior",
      description: "Set the browser's scroll overflow behavior.",
      reference: [
        "overscroll-behavior",
        "overscroll-behavior-block",
        "overscroll-behavior-inline",
        "overscroll-behavior-x",
        "overscroll-behavior-y",
      ],
    },
    {
      slug: "pointer-events",
      description: "Set how an item responds to pointer events.",
    },
    { slug: "resize", description: "Set how an element can be resized." },
    {
      slug: "scroll-behavior",
      description: "Set the scroll behavior for internal navigation.",
    },
    {
      slug: "scroll-margin",
      description: "Set the scroll margin for snapping & alignment.",
      reference: [
        "scroll-margin",
        "scroll-margin-bottom",
        "scroll-margin-inline-end",
        "scroll-margin-inline-start",
        "scroll-margin-left",
        "scroll-margin-right",
        "scroll-margin-top",
        "scroll-margin-x",
        "scroll-margin-y",
      ],
      negative: true,
    },
    {
      slug: "scroll-padding",
      description: "Set the scroll padding for snapping & alignment.",
      reference: [
        "scroll-padding",
        "scroll-padding-bottom",
        "scroll-padding-inline-end",
        "scroll-padding-inline-start",
        "scroll-padding-left",
        "scroll-padding-right",
        "scroll-padding-top",
        "scroll-padding-x",
        "scroll-padding-y",
      ],
    },
    {
      slug: "scroll-snap-align",
      description: "Set the snap alignment of an element.",
    },
    {
      slug: "scroll-snap-stop",
      description: "Set the scroll snap skipping behavior.",
    },
    {
      slug: "scroll-snap-type",
      description: "Set the scroll snap direction & strictness.",
    },
    {
      slug: "touch-action",
      description: "Set how touch gestures are handled by an element.",
    },
    {
      slug: "user-select",
      description: "Set the ability for users to select text in an element.",
    },
  ],
  layout: [
    {
      slug: "clear",
      description:
        "Set how an element behaves in relation to floating elements.",
    },
    {
      slug: "container-type",
      description: "Make an element a container its children can query.",
      since: "4.2",
    },
    { slug: "display", description: "Set the display box type of an element." },
    {
      slug: "float",
      description: "Set how an element floats within its container.",
    },
    {
      slug: "isolation",
      description: "Set whether an element must create a new stacking context.",
    },
    {
      slug: "table-layout",
      description: "Set the table cell layout algorithm.",
    },
  ],
  outline: [
    {
      slug: "outline-offset",
      description: "Set the offset for an element's outline.",
      negative: true,
    },
    {
      slug: "outline-style",
      description: "Set the style for an element's outline.",
    },
    {
      slug: "outline-width",
      description: "Set the width for an element's outline.",
    },
  ],
  positioning: [
    {
      slug: "bottom",
      description: "Set the bottom placement of positioned elements.",
      negative: true,
    },
    {
      slug: "inset",
      description: "Set the placement of positioned elements.",
      reference: ["inset", "inset-x", "inset-y"],
      negative: true,
    },
    {
      slug: "left",
      description: "Set the left placement of positioned elements.",
      negative: true,
    },
    {
      slug: "object-fit",
      description: "Set how to resize the content of a replaced element.",
    },
    {
      slug: "object-position",
      description: "Set how to position the container's content.",
    },
    {
      slug: "overflow",
      description: "Set how content overflows its container.",
      reference: ["overflow", "overflow-x", "overflow-y"],
    },
    { slug: "position", description: "Set the positioning of an element." },
    {
      slug: "right",
      description: "Set the right placement of positioned elements.",
      negative: true,
    },
    {
      slug: "top",
      description: "Set the top placement of positioned elements.",
      negative: true,
    },
    {
      slug: "visibility",
      description: "Set whether an element is visible or hidden.",
    },
    {
      slug: "z-index",
      title: "Z-Index",
      description: "Set the stack order for an element.",
      negative: true,
    },
  ],
  text: [
    {
      slug: "letter-spacing",
      description: "Set the letter spacing for an element.",
      negative: true,
    },
    { slug: "line-height", description: "Set the line height of an element." },
    {
      slug: "list-style-position",
      description: "Set the position of the list item marker.",
    },
    { slug: "list-style-type", description: "Set the marker style of a list." },
    {
      slug: "overflow-wrap",
      description: "Set how words wrap when they overflow their container.",
    },
    {
      slug: "text-align",
      description: "Set the horizontal alignment of text.",
    },
    {
      slug: "text-decoration",
      description: "Set the appearance of decorative lines on text.",
    },
    {
      slug: "text-decoration-line",
      description: "Set the type of decorative lines used on text.",
    },
    {
      slug: "text-decoration-style",
      description: "Set the style of decorative lines on text.",
    },
    {
      slug: "text-decoration-thickness",
      description: "Set the thickness of decorative lines on text.",
    },
    {
      slug: "text-indent",
      description: "Set the indentation of the first line of text.",
      negative: true,
    },
    {
      slug: "text-orientation",
      description: "Set the orientation of text characters.",
    },
    {
      slug: "text-overflow",
      description: "Set how overflowing text is signaled to the user.",
    },
    { slug: "text-transform", description: "Set the capitalization of text." },
    {
      slug: "text-underline-offset",
      description: "Set the offset of a text underline.",
      negative: true,
    },
    { slug: "text-wrap", description: "Set how text wraps within an element." },
    {
      slug: "vertical-align",
      description:
        "Set the vertical alignment of an inline or table-cell element.",
    },
    {
      slug: "white-space",
      description: "Set how white space & line wrapping are handled.",
    },
    {
      slug: "word-break",
      description:
        "Specify how words should break when reaching the edge of a line.",
    },
    {
      slug: "writing-mode",
      description:
        "Set whether lines of text are laid out horizontally or vertically.",
    },
  ],
  transform: [
    {
      slug: "rotate",
      description: "Set the rotation for an element.",
      negative: true,
    },
    {
      slug: "scale",
      description: "Set the scale for an element.",
      reference: ["scale", "scale-x", "scale-y"],
      negative: true,
    },
    {
      slug: "scale-z",
      description: "Set the depth scale for an element.",
      negative: true,
      baseline: "css.properties.scale",
    },
    {
      slug: "skew",
      description: "Set the skew for an element.",
      reference: ["skew", "skew-x", "skew-y"],
      negative: true,
      baseline: "css.properties.transform",
    },
    {
      slug: "transform-origin",
      description: "Set the origin point for transformations.",
    },
    {
      slug: "translate",
      description: "Set the translation for an element.",
      reference: ["translate", "translate-x", "translate-y"],
      negative: true,
    },
  ],
  transition: [
    {
      slug: "transition-delay",
      description: "Set the delay before a transition effect starts.",
    },
    {
      slug: "transition-duration",
      description: "Set the amount of time a transition takes to complete.",
    },
    {
      slug: "transition-property",
      description: "Set which properties have a transition effect.",
    },
  ],
};

const titleOf = (slug) =>
  slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

/** Every utility page, with its defaults filled in. */
export const utilityPages = Object.entries(UTILITY_PAGES).flatMap(
  ([category, pages]) =>
    pages.map((page) => {
      const tables = page.tables ? page.tables : [page.reference ?? page.slug];
      const first = [tables[0]].flat()[0];
      return {
        ...page,
        category,
        title: page.title ?? titleOf(page.slug),
        tables,
        variants: first,
        baseline: page.baseline ?? `css.properties.${first}`,
      };
    }),
);

/** The page's body as MDX, which search & the `.md` route read. */
export function utilityBody(page) {
  const reference = page.tables.map((table) =>
    Array.isArray(table)
      ? `<Reference category="${page.category}" names={${JSON.stringify(table).replace(/","/g, '", "')}} />`
      : `<Reference category="${page.category}" name="${table}" />`,
  );
  return [
    `<Baseline path="${page.baseline}" />`,
    "",
    ...reference.flatMap((line) => [line, ""]),
    "## Variants",
    "",
    `<Variants category="${page.category}" name="${page.variants}"${page.negative ? " negative" : ""} />`,
    "",
  ].join("\n");
}

/** The whole page as an MDX file would hold it, for the copy tests. */
export function utilitySource(page) {
  return [
    "---",
    `title: ${page.title}`,
    `description: ${JSON.stringify(page.description)}`,
    ...(page.since ? [`since: "${page.since}"`] : []),
    "---",
    "",
    utilityBody(page),
  ].join("\n");
}
