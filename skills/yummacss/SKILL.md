---
name: yummacss
description: Write Yumma CSS classes and use Yumma UI components correctly. Use when a project depends on `yummacss`, has a `yumma.config.mjs`, or uses classes such as `d:f`, `p:4`, `bg:indigo-7` or `h:bg:red`. Triggers on "Yumma CSS", "Yumma UI", "yummacss", "yummaui", "style this with Yumma", "add a Yumma UI component", "migrate Yumma CSS from 3.x", "yummacss lint", and on editing `className` in a project that styles with Yumma CSS.
license: MIT
---

# Yumma CSS

Yumma CSS is an atomic CSS framework whose classes are property initials and value initials: `d:f` is `display: flex`. Yumma UI is a set of components written in those classes, copied into a project with `npx yummaui add <component>`.

## Read the live rules first

The rules change with each release, so fetch them before writing classes:

- `https://www.yummacss.com/agents.md`: the syntax, every value scale, the breakpoints and states, and how to migrate a 3.x project.
- `https://www.yummacss.com/docs/<css-property>.md`: one utility, named after its CSS property, for example `https://www.yummacss.com/docs/justify-content.md`.
- `https://www.yummacss.com/llms.txt`: the index of every page, Yumma UI included.
- `https://www.yummaui.com/components/<component>.md`: a Yumma UI component, its props and its source.

If they cannot be fetched, the rules below hold for every 4.x release.

## Syntax

- A class is property initials, a colon, value initials: `d:f` is `display: flex`, `jc:sb` is `justify-content: space-between`.
- Scales keep their number: `p:4` is `padding: 1rem`, one step being 0.25rem. Sizes and weights use their names and numbers: `fs:lg`, `fw:600`. `none` and `auto` stay whole: `d:none`.
- Variants come first, each followed by a colon, and stack: `h:bg:indigo-7` on hover, `@md:d:f` from the md breakpoint, `@sm:h:bg:red`, `b::c:indigo` on `::before`.
- Opacity follows a slash: `bg:red-5/50`. A negative value takes a minus after the colon: `ml:-4`.
- There are no arbitrary values: `w:37px` is not a class. A value off the scale is a CSS function with no spaces: `max-h:calc(100dvh-5rem)`, `w:var(--width)`.
- Colors have a base and twelve shades, `1` to `6` lighter and `7` to `12` darker: `bg:indigo`, `bg:indigo-2`, `c:slate-10`.
- A class with a dash between property and value, such as `d-f` or `p-4`, is 3.x. Stop and tell the user the project needs migrating; `agents.md` gives the steps.

## The config

`yumma.config.mjs` holds what a project adds under `theme`: colors, breakpoints, fonts, states such as `opening:`, easings for `ttf:` and `atf:`, and keyframes for `an:`. Read it before using a name the live rules do not list.

## Yumma UI

- Install a component with `npx yummaui add <component>`. The first run sets up Yumma CSS and writes the states, easings and keyframes the components animate with.
- An installed component is a file the project owns. Change its classes there, or pass `className`, which `merge` folds in last.
- Before building something a component already does, read its `.md` page.

## Check

Run `npx yummacss lint` after editing classes. It lists every class Yumma CSS does not generate, with the closest one that does. Use the suggestion, and do not keep a class it reports.
