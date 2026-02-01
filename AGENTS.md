# Yumma CSS - AI/LLM Agent Guide

This document provides **complete reference** for using Yumma CSS utility classes. Yumma CSS is an atomic CSS framework with abbreviated class names.

---

## Syntax Pattern

```
{prefix}-{value}
```

**With variants:**
```
{variant}:{prefix}-{value}
```

**Examples:**
- `bg-red-5` → `background-color: #e63946`
- `h:bg-blue-5` → On hover: `background-color: #2563eb`
- `sm:d-f` → At 640px+: `display: flex`

---

## Responsive Variants (Media Queries)

| Prefix | Breakpoint                        |
| ------ | --------------------------------- |
| `pc:`  | `pointer: coarse` (touch devices) |
| `sm:`  | `width >= 40rem` (640px)          |
| `md:`  | `width >= 48rem` (768px)          |
| `lg:`  | `width >= 64rem` (1024px)         |
| `xl:`  | `width >= 80rem` (1280px)         |
| `xxl:` | `width >= 96rem` (1536px)         |

---

## Pseudo-Class Variants

| Prefix | Selector         |
| ------ | ---------------- |
| `a:`   | `:active`        |
| `c:`   | `:checked`       |
| `d:`   | `:disabled`      |
| `e:`   | `:empty`         |
| `f:`   | `:focus`         |
| `fc:`  | `:first-child`   |
| `fv:`  | `:focus-visible` |
| `fw:`  | `:focus-within`  |
| `h:`   | `:hover`         |
| `i:`   | `:invalid`       |
| `in:`  | `:indeterminate` |
| `lc:`  | `:last-child`    |
| `nc:`  | `:nth-child`     |
| `r:`   | `:required`      |
| `ro:`  | `:read-only`     |
| `v:`   | `:valid`         |

---

## Pseudo-Element Variants

| Prefix | Selector        |
| ------ | --------------- |
| `::a:` | `::after`       |
| `::b:` | `::before`      |
| `::p:` | `::placeholder` |
| `::s:` | `::selection`   |

---

## Color System

### Available Colors
`red`, `orange`, `yellow`, `lime`, `mint`, `green`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `lavender`, `magenta`, `pink`, `coral`, `zinc`, `gray`, `slate`, `silver`

### Color Shades
Each color has shades `1-9` (1 = lightest, 5 = base, 9 = darkest)

### Special Colors
- `black` → `#000000`
- `white` → `#ffffff`
- `transparent` → `transparent`
- `current` → `currentColor`

### Color Utilities

| Property                | Prefix  | Example                 |
| ----------------------- | ------- | ----------------------- |
| `background-color`      | `bg-`   | `bg-blue-5`, `bg-red-3` |
| `color`                 | `c-`    | `c-white`, `c-gray-7`   |
| `border-color`          | `bc-`   | `bc-slate-4`            |
| `border-bottom-color`   | `bc-b-` | `bc-b-red-5`            |
| `border-left-color`     | `bc-l-` | `bc-l-blue-5`           |
| `border-right-color`    | `bc-r-` | `bc-r-green-5`          |
| `border-top-color`      | `bc-t-` | `bc-t-yellow-5`         |
| `accent-color`          | `ac-`   | `ac-blue-5`             |
| `caret-color`           | `cc-`   | `cc-red-5`              |
| `outline-color`         | `oc-`   | `oc-blue-5`             |
| `text-decoration-color` | `tdc-`  | `tdc-red-5`             |
| `fill`                  | `f-`    | `f-blue-5`              |
| `stroke`                | `s-`    | `s-red-5`               |

---

## Box Model

### Dimension (Height + Width)

| Property        | Prefix   | Values                                                                                                                             |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `dimension`     | `d-`     | `0-100` (×0.25rem), `auto`, `full`, `half`, `dvh`, `dvw`, `vh`, `vw`, `fc`, `max`, `min`, `px`, `s`, `sm`, `md`, `lg`, `xl`, `xxl` |
| `max-dimension` | `max-d-` | Same as dimension                                                                                                                  |
| `min-dimension` | `min-d-` | Same as dimension                                                                                                                  |

### Height

| Property     | Prefix   | Values                                                                                                                             |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `height`     | `h-`     | `0-100` (×0.25rem), `auto`, `full`, `half`, `dvh`, `dvw`, `vh`, `vw`, `fc`, `max`, `min`, `px`, `s`, `sm`, `md`, `lg`, `xl`, `xxl` |
| `max-height` | `max-h-` | Same as height                                                                                                                     |
| `min-height` | `min-h-` | Same as height                                                                                                                     |

### Width

| Property    | Prefix   | Values                                                                                                                             |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `width`     | `w-`     | `0-100` (×0.25rem), `auto`, `full`, `half`, `dvh`, `dvw`, `vh`, `vw`, `fc`, `max`, `min`, `px`, `s`, `sm`, `md`, `lg`, `xl`, `xxl` |
| `max-width` | `max-w-` | Same as width                                                                                                                      |
| `min-width` | `min-w-` | Same as width                                                                                                                      |

### Margin

| Property              | Prefix | Values                           |
| --------------------- | ------ | -------------------------------- |
| `margin`              | `m-`   | `0-100` (×0.25rem), `auto`, `px` |
| `margin-top`          | `mt-`  | Same                             |
| `margin-right`        | `mr-`  | Same                             |
| `margin-bottom`       | `mb-`  | Same                             |
| `margin-left`         | `ml-`  | Same                             |
| `margin-x` (inline)   | `mx-`  | Same                             |
| `margin-y` (block)    | `my-`  | Same                             |
| `margin-block-start`  | `mbs-` | Same                             |
| `margin-block-end`    | `mbe-` | Same                             |
| `margin-inline-start` | `mis-` | Same                             |
| `margin-inline-end`   | `mie-` | Same                             |

**Negative margins:** Use `m--{value}` syntax (e.g., `m--4` for negative margin)

### Padding

| Property               | Prefix | Values                           |
| ---------------------- | ------ | -------------------------------- |
| `padding`              | `p-`   | `0-100` (×0.25rem), `auto`, `px` |
| `padding-top`          | `pt-`  | Same                             |
| `padding-right`        | `pr-`  | Same                             |
| `padding-bottom`       | `pb-`  | Same                             |
| `padding-left`         | `pl-`  | Same                             |
| `padding-x` (inline)   | `px-`  | Same                             |
| `padding-y` (block)    | `py-`  | Same                             |
| `padding-block-start`  | `pbs-` | Same                             |
| `padding-block-end`    | `pbe-` | Same                             |
| `padding-inline-start` | `pis-` | Same                             |
| `padding-inline-end`   | `pie-` | Same                             |

### Box Sizing

| Class   | CSS                       |
| ------- | ------------------------- |
| `bs-bb` | `box-sizing: border-box`  |
| `bs-cb` | `box-sizing: content-box` |

---

## Flexbox

### Display

| Class  | CSS                    |
| ------ | ---------------------- |
| `d-f`  | `display: flex`        |
| `d-if` | `display: inline-flex` |

### Flex Direction

| Class   | CSS                              |
| ------- | -------------------------------- |
| `fd-r`  | `flex-direction: row`            |
| `fd-rr` | `flex-direction: row-reverse`    |
| `fd-c`  | `flex-direction: column`         |
| `fd-cr` | `flex-direction: column-reverse` |

### Flex Wrap

| Class   | CSS                       |
| ------- | ------------------------- |
| `fw-w`  | `flex-wrap: wrap`         |
| `fw-nw` | `flex-wrap: nowrap`       |
| `fw-wr` | `flex-wrap: wrap-reverse` |

### Justify Content

| Class   | CSS                              |
| ------- | -------------------------------- |
| `jc-fs` | `justify-content: flex-start`    |
| `jc-fe` | `justify-content: flex-end`      |
| `jc-c`  | `justify-content: center`        |
| `jc-sb` | `justify-content: space-between` |
| `jc-sa` | `justify-content: space-around`  |
| `jc-se` | `justify-content: space-evenly`  |
| `jc-st` | `justify-content: stretch`       |
| `jc-n`  | `justify-content: normal`        |

### Align Items

| Class   | CSS                       |
| ------- | ------------------------- |
| `ai-fs` | `align-items: flex-start` |
| `ai-fe` | `align-items: flex-end`   |
| `ai-c`  | `align-items: center`     |
| `ai-b`  | `align-items: baseline`   |
| `ai-st` | `align-items: stretch`    |

### Align Content

| Class   | CSS                            |
| ------- | ------------------------------ |
| `ac-fs` | `align-content: flex-start`    |
| `ac-fe` | `align-content: flex-end`      |
| `ac-c`  | `align-content: center`        |
| `ac-sb` | `align-content: space-between` |
| `ac-sa` | `align-content: space-around`  |
| `ac-se` | `align-content: space-evenly`  |
| `ac-st` | `align-content: stretch`       |
| `ac-b`  | `align-content: baseline`      |
| `ac-n`  | `align-content: normal`        |

### Align Self

| Class     | CSS                      |
| --------- | ------------------------ |
| `as-auto` | `align-self: auto`       |
| `as-fs`   | `align-self: flex-start` |
| `as-fe`   | `align-self: flex-end`   |
| `as-c`    | `align-self: center`     |
| `as-b`    | `align-self: baseline`   |
| `as-st`   | `align-self: stretch`    |

### Justify Items

| Class   | CSS                      |
| ------- | ------------------------ |
| `ji-s`  | `justify-items: start`   |
| `ji-e`  | `justify-items: end`     |
| `ji-c`  | `justify-items: center`  |
| `ji-st` | `justify-items: stretch` |

### Justify Self

| Class     | CSS                     |
| --------- | ----------------------- |
| `js-auto` | `justify-self: auto`    |
| `js-s`    | `justify-self: start`   |
| `js-e`    | `justify-self: end`     |
| `js-c`    | `justify-self: center`  |
| `js-st`   | `justify-self: stretch` |

### Flex

| Class    | CSS              |
| -------- | ---------------- |
| `f-1`    | `flex: 1 1 0%`   |
| `f-2`    | `flex: 2 2 0%`   |
| `f-3`    | `flex: 3 3 0%`   |
| `f-4`    | `flex: 4 4 0%`   |
| `f-5`    | `flex: 5 5 0%`   |
| `f-6`    | `flex: 6 6 0%`   |
| `f-auto` | `flex: 1 1 auto` |
| `f-none` | `flex: none`     |

### Flex Basis

| Prefix | Values                                     |
| ------ | ------------------------------------------ |
| `fb-`  | `0-100` (×0.25rem), `auto`, `full`, `half` |

### Flex Grow/Shrink

| Property      | Prefix | Values   |
| ------------- | ------ | -------- |
| `flex-grow`   | `fg-`  | `0`, `1` |
| `flex-shrink` | `fs-`  | `0`, `1` |

### Order

| Class             | CSS                       |
| ----------------- | ------------------------- |
| `or-l`            | `order: -9999` (first)    |
| `or-0` to `or-10` | `order: 0` to `order: 10` |
| `or-f`            | `order: 9999` (last)      |

---

## Grid

### Display

| Class  | CSS                    |
| ------ | ---------------------- |
| `d-g`  | `display: grid`        |
| `d-ig` | `display: inline-grid` |

### Grid Template Columns/Rows

| Property                | Prefix | Values |
| ----------------------- | ------ | ------ |
| `grid-template-columns` | `gtc-` | `1-16` |
| `grid-template-rows`    | `gtr-` | `1-16` |

Example: `gtc-3` → `grid-template-columns: repeat(3, minmax(0, 1fr))`

### Grid Column/Row Span

| Property             | Prefix  | Values |
| -------------------- | ------- | ------ |
| `grid-column` (span) | `gc-s-` | `1-16` |
| `grid-row` (span)    | `gr-s-` | `1-16` |

Example: `gc-s-2` → `grid-column: span 2 / span 2`

### Grid Column/Row Start/End

| Property            | Prefix | Values |
| ------------------- | ------ | ------ |
| `grid-column-start` | `gcs-` | `1-16` |
| `grid-column-end`   | `gce-` | `1-16` |
| `grid-row-start`    | `grs-` | `1-16` |
| `grid-row-end`      | `gre-` | `1-16` |

### Grid Auto Flow

| Class    | CSS                            |
| -------- | ------------------------------ |
| `gaf-r`  | `grid-auto-flow: row`          |
| `gaf-c`  | `grid-auto-flow: column`       |
| `gaf-d`  | `grid-auto-flow: dense`        |
| `gaf-rd` | `grid-auto-flow: row dense`    |
| `gaf-cd` | `grid-auto-flow: column dense` |

### Grid Auto Columns/Rows

| Property            | Prefix | Values               |
| ------------------- | ------ | -------------------- |
| `grid-auto-columns` | `gac-` | `auto`, `min`, `max` |
| `grid-auto-rows`    | `gar-` | `auto`, `min`, `max` |

### Gap

| Property     | Prefix | Values                   |
| ------------ | ------ | ------------------------ |
| `gap`        | `g-`   | `0-100` (×0.25rem), `px` |
| `column-gap` | `cg-`  | Same                     |
| `row-gap`    | `rg-`  | Same                     |

### Place Content

| Class   | CSS                            |
| ------- | ------------------------------ |
| `pc-s`  | `place-content: start`         |
| `pc-e`  | `place-content: end`           |
| `pc-c`  | `place-content: center`        |
| `pc-b`  | `place-content: baseline`      |
| `pc-sb` | `place-content: space-between` |
| `pc-sa` | `place-content: space-around`  |
| `pc-se` | `place-content: space-evenly`  |
| `pc-st` | `place-content: stretch`       |

### Place Items

| Class   | CSS                     |
| ------- | ----------------------- |
| `pi-s`  | `place-items: start`    |
| `pi-e`  | `place-items: end`      |
| `pi-c`  | `place-items: center`   |
| `pi-b`  | `place-items: baseline` |
| `pi-st` | `place-items: stretch`  |

### Place Self

| Class     | CSS                   |
| --------- | --------------------- |
| `ps-auto` | `place-self: auto`    |
| `ps-s`    | `place-self: start`   |
| `ps-e`    | `place-self: end`     |
| `ps-c`    | `place-self: center`  |
| `ps-st`   | `place-self: stretch` |

---

## Positioning

### Position

| Class  | CSS                  |
| ------ | -------------------- |
| `p-s`  | `position: static`   |
| `p-r`  | `position: relative` |
| `p-a`  | `position: absolute` |
| `p-f`  | `position: fixed`    |
| `p-st` | `position: sticky`   |

### Top/Right/Bottom/Left

| Property  | Prefix | Values                                     |
| --------- | ------ | ------------------------------------------ |
| `top`     | `t-`   | `0-100` (×0.25rem), `auto`, `full`, `half` |
| `right`   | `r-`   | Same                                       |
| `bottom`  | `b-`   | Same                                       |
| `left`    | `l-`   | Same                                       |
| `inset`   | `i-`   | Same                                       |
| `inset-x` | `ix-`  | Same                                       |
| `inset-y` | `iy-`  | Same                                       |

### Z-Index

| Class             | CSS                                         |
| ----------------- | ------------------------------------------- |
| `zi-auto`         | `z-index: auto`                             |
| `zi-0` to `zi-90` | `z-index: 0` to `z-index: 90` (steps of 10) |

### Display

| Class    | CSS                     |
| -------- | ----------------------- |
| `d-b`    | `display: block`        |
| `d-i`    | `display: inline`       |
| `d-ib`   | `display: inline-block` |
| `d-f`    | `display: flex`         |
| `d-if`   | `display: inline-flex`  |
| `d-g`    | `display: grid`         |
| `d-ig`   | `display: inline-grid`  |
| `d-t`    | `display: table`        |
| `d-it`   | `display: inline-table` |
| `d-tc`   | `display: table-cell`   |
| `d-tco`  | `display: table-column` |
| `d-tr`   | `display: table-row`    |
| `d-fr`   | `display: flow-root`    |
| `d-none` | `display: none`         |

### Float

| Class     | CSS                   |
| --------- | --------------------- |
| `fl-l`    | `float: left`         |
| `fl-r`    | `float: right`        |
| `fl-none` | `float: none`         |
| `fl-is`   | `float: inline-start` |
| `fl-ie`   | `float: inline-end`   |

### Clear

| Class     | CSS                   |
| --------- | --------------------- |
| `cl-l`    | `clear: left`         |
| `cl-r`    | `clear: right`        |
| `cl-b`    | `clear: both`         |
| `cl-none` | `clear: none`         |
| `cl-is`   | `clear: inline-start` |
| `cl-ie`   | `clear: inline-end`   |

### Visibility

| Class | CSS                    |
| ----- | ---------------------- |
| `v-v` | `visibility: visible`  |
| `v-h` | `visibility: hidden`   |
| `v-c` | `visibility: collapse` |

### Overflow

| Class      | CSS                   |
| ---------- | --------------------- |
| `o-auto`   | `overflow: auto`      |
| `o-h`      | `overflow: hidden`    |
| `o-v`      | `overflow: visible`   |
| `o-s`      | `overflow: scroll`    |
| `o-c`      | `overflow: clip`      |
| `o-x-auto` | `overflow-x: auto`    |
| `o-x-h`    | `overflow-x: hidden`  |
| `o-x-v`    | `overflow-x: visible` |
| `o-x-s`    | `overflow-x: scroll`  |
| `o-x-c`    | `overflow-x: clip`    |
| `o-y-auto` | `overflow-y: auto`    |
| `o-y-h`    | `overflow-y: hidden`  |
| `o-y-v`    | `overflow-y: visible` |
| `o-y-s`    | `overflow-y: scroll`  |
| `o-y-c`    | `overflow-y: clip`    |

### Object Fit

| Class     | CSS                      |
| --------- | ------------------------ |
| `of-c`    | `object-fit: cover`      |
| `of-f`    | `object-fit: fill`       |
| `of-none` | `object-fit: none`       |
| `of-sd`   | `object-fit: scale-down` |

### Object Position

| Class   | CSS                             |
| ------- | ------------------------------- |
| `op-b`  | `object-position: bottom`       |
| `op-c`  | `object-position: center`       |
| `op-l`  | `object-position: left`         |
| `op-lb` | `object-position: left bottom`  |
| `op-lt` | `object-position: left top`     |
| `op-r`  | `object-position: right`        |
| `op-rb` | `object-position: right bottom` |
| `op-rt` | `object-position: right top`    |
| `op-t`  | `object-position: top`          |

### Aspect Ratio

| Class     | CSS                  |
| --------- | -------------------- |
| `ar-auto` | `aspect-ratio: auto` |
| `ar-1/1`  | `aspect-ratio: 1/1`  |
| `ar-16/9` | `aspect-ratio: 16/9` |
| `ar-9/16` | `aspect-ratio: 9/16` |
| `ar-4/3`  | `aspect-ratio: 4/3`  |
| `ar-3/4`  | `aspect-ratio: 3/4`  |
| `ar-3/2`  | `aspect-ratio: 3/2`  |
| `ar-2/3`  | `aspect-ratio: 2/3`  |
| `ar-2/1`  | `aspect-ratio: 2/1`  |
| `ar-1/2`  | `aspect-ratio: 1/2`  |
| `ar-5/4`  | `aspect-ratio: 5/4`  |
| `ar-4/5`  | `aspect-ratio: 4/5`  |
| `ar-7/5`  | `aspect-ratio: 7/5`  |
| `ar-5/7`  | `aspect-ratio: 5/7`  |
| `ar-21/9` | `aspect-ratio: 21/9` |
| `ar-9/21` | `aspect-ratio: 9/21` |

### Isolation

| Class     | CSS                  |
| --------- | -------------------- |
| `is-auto` | `isolation: auto`    |
| `is-i`    | `isolation: isolate` |

### Columns

| Prefix | Values |
| ------ | ------ |
| `c-`   | `1-16` |

Example: `c-3` → `columns: 3`

---

## Typography

### Font Family

| Class  | CSS                                                |
| ------ | -------------------------------------------------- |
| `ff-d` | `font-family: system-ui, ...` (default sans-serif) |
| `ff-m` | `font-family: ui-monospace, ...` (monospace)       |
| `ff-s` | `font-family: 'Iowan Old Style', ...` (serif)      |

### Font Size

| Class    | CSS                   |
| -------- | --------------------- |
| `fs-xs`  | `font-size: 0.75rem`  |
| `fs-sm`  | `font-size: 0.875rem` |
| `fs-md`  | `font-size: 1rem`     |
| `fs-lg`  | `font-size: 1.125rem` |
| `fs-xl`  | `font-size: 1.25rem`  |
| `fs-xxl` | `font-size: 1.5rem`   |
| `fs-3xl` | `font-size: 1.875rem` |
| `fs-4xl` | `font-size: 2.25rem`  |
| `fs-5xl` | `font-size: 3rem`     |
| `fs-6xl` | `font-size: 3.75rem`  |
| `fs-7xl` | `font-size: 4.5rem`   |
| `fs-8xl` | `font-size: 6rem`     |
| `fs-9xl` | `font-size: 8rem`     |

### Font Style

| Class  | CSS                  |
| ------ | -------------------- |
| `fs-i` | `font-style: italic` |
| `fs-n` | `font-style: normal` |

### Font Weight

| Class                | CSS                                      |
| -------------------- | ---------------------------------------- |
| `fw-100` to `fw-900` | `font-weight: 100` to `font-weight: 900` |

### Text Align

| Class   | CSS                        |
| ------- | -------------------------- |
| `ta-l`  | `text-align: left`         |
| `ta-r`  | `text-align: right`        |
| `ta-c`  | `text-align: center`       |
| `ta-j`  | `text-align: justify`      |
| `ta-ja` | `text-align: justify-all`  |
| `ta-s`  | `text-align: start`        |
| `ta-e`  | `text-align: end`          |
| `ta-mp` | `text-align: match-parent` |

### Text Transform

| Class  | CSS                          |
| ------ | ---------------------------- |
| `tt-u` | `text-transform: uppercase`  |
| `tt-l` | `text-transform: lowercase`  |
| `tt-c` | `text-transform: capitalize` |
| `tt-n` | `text-transform: none`       |

### Text Decoration

| Class              | CSS                                       |
| ------------------ | ----------------------------------------- |
| `td-none`          | `text-decoration: none`                   |
| `td-u`             | `text-decoration: underline`              |
| `tdl-u`            | `text-decoration-line: underline`         |
| `tdl-lt`           | `text-decoration-line: line-through`      |
| `tdl-o`            | `text-decoration-line: overline`          |
| `tdl-none`         | `text-decoration-line: none`              |
| `tds-s`            | `text-decoration-style: solid`            |
| `tds-d`            | `text-decoration-style: dashed`           |
| `tds-w`            | `text-decoration-style: wavy`             |
| `tdt-0` to `tdt-4` | `text-decoration-thickness: 0px` to `4px` |
| `tdt-auto`         | `text-decoration-thickness: auto`         |
| `tdt-ff`           | `text-decoration-thickness: from-font`    |

### Text Underline Offset

| Class      | CSS                           |
| ---------- | ----------------------------- |
| `tuo-auto` | `text-underline-offset: auto` |
| `tuo-0`    | `text-underline-offset: 0px`  |
| `tuo-1`    | `text-underline-offset: 1px`  |
| `tuo-2`    | `text-underline-offset: 2px`  |
| `tuo-4`    | `text-underline-offset: 4px`  |
| `tuo-8`    | `text-underline-offset: 8px`  |

### Line Height

| Class  | CSS                  |
| ------ | -------------------- |
| `lh-1` | `line-height: 1`     |
| `lh-2` | `line-height: 1.25`  |
| `lh-3` | `line-height: 1.375` |
| `lh-4` | `line-height: 1.5`   |
| `lh-5` | `line-height: 1.625` |
| `lh-6` | `line-height: 2`     |

### Letter Spacing

| Class  | CSS                        |
| ------ | -------------------------- |
| `ls-0` | `letter-spacing: 0em`      |
| `ls-1` | `letter-spacing: -0.05em`  |
| `ls-2` | `letter-spacing: -0.025em` |
| `ls-3` | `letter-spacing: 0.025em`  |
| `ls-4` | `letter-spacing: 0.05em`   |
| `ls-5` | `letter-spacing: 0.1em`    |

### Text Wrap

| Class  | CSS                  |
| ------ | -------------------- |
| `tw-w` | `text-wrap: wrap`    |
| `tw-n` | `text-wrap: nowrap`  |
| `tw-b` | `text-wrap: balance` |
| `tw-p` | `text-wrap: pretty`  |

### Text Overflow

| Class  | CSS                       |
| ------ | ------------------------- |
| `to-c` | `text-overflow: clip`     |
| `to-e` | `text-overflow: ellipsis` |

### Text Indent

| Class  | CSS                    |
| ------ | ---------------------- |
| `ti-0` | `text-indent: 0px`     |
| `ti-1` | `text-indent: 1px`     |
| `ti-2` | `text-indent: 0.25rem` |
| `ti-3` | `text-indent: 0.5rem`  |
| `ti-4` | `text-indent: 0.75rem` |

### White Space

| Class   | CSS                         |
| ------- | --------------------------- |
| `ws-n`  | `white-space: normal`       |
| `ws-nw` | `white-space: nowrap`       |
| `ws-p`  | `white-space: pre`          |
| `ws-pl` | `white-space: pre-line`     |
| `ws-pw` | `white-space: pre-wrap`     |
| `ws-bs` | `white-space: break-spaces` |

### Overflow Wrap

| Class   | CSS                         |
| ------- | --------------------------- |
| `ow-n`  | `overflow-wrap: normal`     |
| `ow-bw` | `overflow-wrap: break-word` |

### Vertical Align

| Class   | CSS                           |
| ------- | ----------------------------- |
| `va-ba` | `vertical-align: baseline`    |
| `va-t`  | `vertical-align: top`         |
| `va-m`  | `vertical-align: middle`      |
| `va-b`  | `vertical-align: bottom`      |
| `va-tt` | `vertical-align: text-top`    |
| `va-tb` | `vertical-align: text-bottom` |
| `va-s`  | `vertical-align: sub`         |
| `va-su` | `vertical-align: super`       |

### List Style

| Class   | CSS                            |
| ------- | ------------------------------ |
| `lst-d` | `list-style-type: disc`        |
| `lst-c` | `list-style-type: circle`      |
| `lst-s` | `list-style-type: square`      |
| `lsp-i` | `list-style-position: inside`  |
| `lsp-o` | `list-style-position: outside` |

### Tab Size

| Class  | CSS           |
| ------ | ------------- |
| `ts-0` | `tab-size: 0` |
| `ts-2` | `tab-size: 2` |
| `ts-4` | `tab-size: 4` |
| `ts-8` | `tab-size: 8` |

### Writing Mode

| Class    | CSS                           |
| -------- | ----------------------------- |
| `wm-htb` | `writing-mode: horizontal-tb` |
| `wm-vlr` | `writing-mode: vertical-lr`   |
| `wm-vrl` | `writing-mode: vertical-rl`   |
| `wm-slr` | `writing-mode: sideways-lr`   |
| `wm-srl` | `writing-mode: sideways-rl`   |

---

## Borders

### Border Radius

| Property                     | Prefix   | Values            |
| ---------------------------- | -------- | ----------------- |
| `border-radius`              | `br-`    | `0-16` (×0.25rem) |
| `border-top-radius`          | `br-t-`  | Same              |
| `border-bottom-radius`       | `br-b-`  | Same              |
| `border-left-radius`         | `br-l-`  | Same              |
| `border-right-radius`        | `br-r-`  | Same              |
| `border-top-left-radius`     | `br-tl-` | Same              |
| `border-top-right-radius`    | `br-tr-` | Same              |
| `border-bottom-left-radius`  | `br-bl-` | Same              |
| `border-bottom-right-radius` | `br-br-` | Same              |

### Border Width

| Property              | Prefix | Values     |
| --------------------- | ------ | ---------- |
| `border-width`        | `bw-`  | `0-4` (px) |
| `border-top-width`    | `btw-` | Same       |
| `border-right-width`  | `brw-` | Same       |
| `border-bottom-width` | `bbw-` | Same       |
| `border-left-width`   | `blw-` | Same       |

### Border Style

| Class     | CSS                    |
| --------- | ---------------------- |
| `bs-none` | `border-style: none`   |
| `bs-s`    | `border-style: solid`  |
| `bs-d`    | `border-style: dashed` |

### Border Collapse

| Class  | CSS                         |
| ------ | --------------------------- |
| `bc-c` | `border-collapse: collapse` |
| `bc-s` | `border-collapse: separate` |

### Border Spacing

| Prefix | Values            |
| ------ | ----------------- |
| `bs-`  | `0-16` (×0.25rem) |

---

## Outline

### Outline Width

| Prefix | Values     |
| ------ | ---------- |
| `ow-`  | `0-4` (px) |

### Outline Style

| Class     | CSS                     |
| --------- | ----------------------- |
| `os-none` | `outline-style: none`   |
| `os-s`    | `outline-style: solid`  |
| `os-d`    | `outline-style: dashed` |

### Outline Offset

| Prefix | Values     |
| ------ | ---------- |
| `oo-`  | `0-4` (px) |

---

## Background

### Background Attachment

| Class  | CSS                             |
| ------ | ------------------------------- |
| `ba-f` | `background-attachment: fixed`  |
| `ba-l` | `background-attachment: local`  |
| `ba-s` | `background-attachment: scroll` |

### Background Clip

| Class   | CSS                            |
| ------- | ------------------------------ |
| `bc-bb` | `background-clip: border-box`  |
| `bc-pb` | `background-clip: padding-box` |
| `bc-cb` | `background-clip: content-box` |
| `bc-t`  | `background-clip: text`        |

### Background Origin

| Class   | CSS                              |
| ------- | -------------------------------- |
| `bo-bb` | `background-origin: border-box`  |
| `bo-pb` | `background-origin: padding-box` |
| `bo-cb` | `background-origin: content-box` |

### Background Position

| Class   | CSS                                 |
| ------- | ----------------------------------- |
| `bp-b`  | `background-position: bottom`       |
| `bp-c`  | `background-position: center`       |
| `bp-l`  | `background-position: left`         |
| `bp-lb` | `background-position: left bottom`  |
| `bp-lt` | `background-position: left top`     |
| `bp-r`  | `background-position: right`        |
| `bp-rb` | `background-position: right bottom` |
| `bp-rt` | `background-position: right top`    |
| `bp-t`  | `background-position: top`          |

### Background Repeat

| Class   | CSS                            |
| ------- | ------------------------------ |
| `br-r`  | `background-repeat: repeat`    |
| `br-nr` | `background-repeat: no-repeat` |
| `br-rx` | `background-repeat: repeat-x`  |
| `br-ry` | `background-repeat: repeat-y`  |
| `br-ro` | `background-repeat: round`     |
| `br-s`  | `background-repeat: space`     |

### Background Size

| Class     | CSS                        |
| --------- | -------------------------- |
| `bs-auto` | `background-size: auto`    |
| `bs-c`    | `background-size: cover`   |
| `bs-co`   | `background-size: contain` |

---

## Effects

### Box Shadow

| Class      | CSS                                      |
| ---------- | ---------------------------------------- |
| `bsh-none` | `box-shadow: none`                       |
| `bsh-xs`   | `box-shadow: 1px 3px 5px -3px #0000001a` |
| `bsh-sm`   | `box-shadow: 1px 3px 5px -2px #0000001a` |
| `bsh-md`   | `box-shadow: 1px 3px 5px -1px #0000001a` |
| `bsh-lg`   | `box-shadow: 1px 3px 5px 1px #0000001a`  |
| `bsh-xl`   | `box-shadow: 1px 3px 5px 2px #0000001a`  |

### Opacity

| Class            | CSS                                        |
| ---------------- | ------------------------------------------ |
| `o-0` to `o-100` | `opacity: 0` to `opacity: 1` (steps of 10) |

### Blur

| Property                  | Prefix  | Values        |
| ------------------------- | ------- | ------------- |
| `filter: blur()`          | `f-b-`  | `0-16` (×4px) |
| `backdrop-filter: blur()` | `bf-b-` | `0-16` (×4px) |

### Grayscale

| Class                | CSS                                                                |
| -------------------- | ------------------------------------------------------------------ |
| `f-g-0` to `f-g-100` | `filter: grayscale(0%)` to `filter: grayscale(100%)` (steps of 10) |

---

## Transforms

### Rotate

| Prefix | Values                  |
| ------ | ----------------------- |
| `ro-`  | `0-360` (steps of 5deg) |

Example: `ro-45` → `rotate: 45deg`

### Scale

| Class                  | CSS                                                   |
| ---------------------- | ----------------------------------------------------- |
| `t-s-0` to `t-s-100`   | `transform: scale(0%)` to `scale(100%)` (steps of 10) |
| `t-sx-0` to `t-sx-100` | `transform: scaleX(0%)` to `scaleX(100%)`             |
| `t-sy-0` to `t-sy-100` | `transform: scaleY(0%)` to `scaleY(100%)`             |

### Skew

| Class     | CSS                                 |
| --------- | ----------------------------------- |
| `t-sk-1`  | `transform: skew(1deg)`             |
| `t-sk-2`  | `transform: skew(2deg)`             |
| `t-sk-3`  | `transform: skew(3deg)`             |
| `t-sk-6`  | `transform: skew(6deg)`             |
| `t-sk-12` | `transform: skew(12deg)`            |
| `t-skx-*` | `transform: skewX(*)` (same values) |
| `t-sky-*` | `transform: skewY(*)` (same values) |

### Translate

| Property     | Prefix  | Values                             |
| ------------ | ------- | ---------------------------------- |
| `translateX` | `t-tx-` | `0-100` (×0.25rem), `half`, `full` |
| `translateY` | `t-ty-` | `0-100` (×0.25rem), `half`, `full` |

### Transform Origin

| Class    | CSS                              |
| -------- | -------------------------------- |
| `t-o-c`  | `transform-origin: center`       |
| `t-o-t`  | `transform-origin: top`          |
| `t-o-b`  | `transform-origin: bottom`       |
| `t-o-l`  | `transform-origin: left`         |
| `t-o-r`  | `transform-origin: right`        |
| `t-o-tl` | `transform-origin: top left`     |
| `t-o-tr` | `transform-origin: top right`    |
| `t-o-bl` | `transform-origin: bottom left`  |
| `t-o-br` | `transform-origin: bottom right` |

---

## Transitions

### Transition Property

| Class     | CSS                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------- |
| `tp-none` | `transition-property: none`                                                                       |
| `tp-a`    | `transition-property: all`                                                                        |
| `tp-c`    | `transition-property: color, background-color, border-color, text-decoration-color, fill, stroke` |
| `tp-o`    | `transition-property: opacity`                                                                    |
| `tp-t`    | `transition-property: transform`                                                                  |
| `tp-bs`   | `transition-property: box-shadow`                                                                 |

### Transition Duration

| Prefix | Values                   |
| ------ | ------------------------ |
| `tdu-` | `0-1000` (steps of 50ms) |

Example: `tdu-150` → `transition-duration: 150ms`

### Transition Delay

| Prefix | Values                   |
| ------ | ------------------------ |
| `td-`  | `0-1000` (steps of 50ms) |

Example: `td-100` → `transition-delay: 100ms`

### Transition Timing Function

| Class    | CSS                                       |
| -------- | ----------------------------------------- |
| `ttf-l`  | `transition-timing-function: linear`      |
| `ttf-ei` | `transition-timing-function: ease-in`     |
| `ttf-eo` | `transition-timing-function: ease-out`    |
| `ttf-io` | `transition-timing-function: ease-in-out` |

---

## Interactivity

### Cursor

| Class     | CSS                     |
| --------- | ----------------------- |
| `c-auto`  | `cursor: auto`          |
| `c-d`     | `cursor: default`       |
| `c-p`     | `cursor: pointer`       |
| `c-w`     | `cursor: wait`          |
| `c-t`     | `cursor: text`          |
| `c-m`     | `cursor: move`          |
| `c-h`     | `cursor: help`          |
| `c-na`    | `cursor: not-allowed`   |
| `c-none`  | `cursor: none`          |
| `c-g`     | `cursor: grab`          |
| `c-gr`    | `cursor: grabbing`      |
| `c-ch`    | `cursor: crosshair`     |
| `c-zi`    | `cursor: zoom-in`       |
| `c-zo`    | `cursor: zoom-out`      |
| `c-c`     | `cursor: cell`          |
| `c-a`     | `cursor: alias`         |
| `c-co`    | `cursor: copy`          |
| `c-cm`    | `cursor: context-menu`  |
| `c-vt`    | `cursor: vertical-text` |
| `c-pr`    | `cursor: progress`      |
| `c-as`    | `cursor: all-scroll`    |
| `c-cr`    | `cursor: col-resize`    |
| `c-rs`    | `cursor: row-resize`    |
| `c-nr`    | `cursor: n-resize`      |
| `c-sr`    | `cursor: s-resize`      |
| `c-er`    | `cursor: ew-resize`     |
| `c-wr`    | `cursor: w-resize`      |
| `c-nsr`   | `cursor: ns-resize`     |
| `c-nwr`   | `cursor: nw-resize`     |
| `c-ner`   | `cursor: ne-resize`     |
| `c-swr`   | `cursor: sw-resize`     |
| `c-ser`   | `cursor: se-resize`     |
| `c-neswr` | `cursor: nesw-resize`   |
| `c-nwser` | `cursor: nwse-resize`   |

### Pointer Events

| Class     | CSS                    |
| --------- | ---------------------- |
| `pe-none` | `pointer-events: none` |
| `pe-auto` | `pointer-events: auto` |

### User Select

| Class     | CSS                 |
| --------- | ------------------- |
| `us-none` | `user-select: none` |
| `us-t`    | `user-select: text` |
| `us-a`    | `user-select: all`  |
| `us-auto` | `user-select: auto` |

### Resize

| Class    | CSS                  |
| -------- | -------------------- |
| `r-none` | `resize: none`       |
| `r-b`    | `resize: both`       |
| `r-h`    | `resize: horizontal` |
| `r-v`    | `resize: vertical`   |

### Appearance

| Class    | CSS                |
| -------- | ------------------ |
| `a-none` | `appearance: none` |
| `a-auto` | `appearance: auto` |

### Field Sizing

| Class  | CSS                     |
| ------ | ----------------------- |
| `fs-f` | `field-sizing: fixed`   |
| `fs-c` | `field-sizing: content` |

### Touch Action

| Class     | CSS                          |
| --------- | ---------------------------- |
| `ta-auto` | `touch-action: auto`         |
| `ta-none` | `touch-action: none`         |
| `ta-m`    | `touch-action: manipulation` |
| `ta-px`   | `touch-action: pan-x`        |
| `ta-py`   | `touch-action: pan-y`        |
| `ta-pu`   | `touch-action: pan-up`       |
| `ta-pd`   | `touch-action: pan-down`     |
| `ta-pl`   | `touch-action: pan-left`     |
| `ta-pr`   | `touch-action: pan-right`    |
| `ta-pz`   | `touch-action: pinch-zoom`   |

### Scroll Behavior

| Class     | CSS                       |
| --------- | ------------------------- |
| `sb-auto` | `scroll-behavior: auto`   |
| `sb-s`    | `scroll-behavior: smooth` |

### Scroll Margin

| Property                     | Prefix  | Values             |
| ---------------------------- | ------- | ------------------ |
| `scroll-margin`              | `sm-`   | `0-100` (×0.25rem) |
| `scroll-margin-top`          | `smt-`  | Same               |
| `scroll-margin-right`        | `smr-`  | Same               |
| `scroll-margin-bottom`       | `smb-`  | Same               |
| `scroll-margin-left`         | `sml-`  | Same               |
| `scroll-margin-x`            | `smx-`  | Same               |
| `scroll-margin-y`            | `smy-`  | Same               |
| `scroll-margin-inline-start` | `smis-` | Same               |
| `scroll-margin-inline-end`   | `smie-` | Same               |

### Scroll Padding

| Property                      | Prefix  | Values             |
| ----------------------------- | ------- | ------------------ |
| `scroll-padding`              | `sp-`   | `0-100` (×0.25rem) |
| `scroll-padding-top`          | `spt-`  | Same               |
| `scroll-padding-right`        | `spr-`  | Same               |
| `scroll-padding-bottom`       | `spb-`  | Same               |
| `scroll-padding-left`         | `spl-`  | Same               |
| `scroll-padding-x`            | `spx-`  | Same               |
| `scroll-padding-y`            | `spy-`  | Same               |
| `scroll-padding-inline-start` | `spis-` | Same               |
| `scroll-padding-inline-end`   | `spie-` | Same               |

### Scroll Snap

| Class      | CSS                                |
| ---------- | ---------------------------------- |
| `ssa-none` | `scroll-snap-align: none`          |
| `ssa-s`    | `scroll-snap-align: start`         |
| `ssa-e`    | `scroll-snap-align: end`           |
| `ssa-c`    | `scroll-snap-align: center`        |
| `sss-n`    | `scroll-snap-stop: normal`         |
| `sss-a`    | `scroll-snap-stop: always`         |
| `sst-none` | `scroll-snap-type: none`           |
| `sst-x-m`  | `scroll-snap-type: x mandatory`    |
| `sst-x-p`  | `scroll-snap-type: x proximity`    |
| `sst-y-m`  | `scroll-snap-type: y mandatory`    |
| `sst-y-p`  | `scroll-snap-type: y proximity`    |
| `sst-b-m`  | `scroll-snap-type: both mandatory` |

---

## SVG

### Stroke Width

| Class  | CSS                 |
| ------ | ------------------- |
| `sw-0` | `stroke-width: 0`   |
| `sw-2` | `stroke-width: 0.2` |
| `sw-4` | `stroke-width: 0.4` |
| `sw-6` | `stroke-width: 0.6` |
| `sw-8` | `stroke-width: 0.8` |
| `sw-1` | `stroke-width: 1`   |

---

## Table

### Table Layout

| Class  | CSS                   |
| ------ | --------------------- |
| `tl-a` | `table-layout: auto`  |
| `tl-f` | `table-layout: fixed` |

### Caption Side

| Class  | CSS                    |
| ------ | ---------------------- |
| `cs-t` | `caption-side: top`    |
| `cs-b` | `caption-side: bottom` |

---

## Common Patterns

### Centering with Flexbox
```html
<div class="d-f jc-c ai-c">Centered content</div>
```

### Responsive Grid
```html
<div class="d-g gtc-1 sm:gtc-2 lg:gtc-4 g-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Card with Shadow
```html
<div class="bg-white br-2 bsh-md p-4">Card content</div>
```

### Button with Hover
```html
<button class="bg-blue-5 h:bg-blue-6 c-white px-4 py-2 br-1 c-p">
  Click me
</button>
```

### Smooth Transition
```html
<div class="tp-a tdu-150 ttf-io h:t-s-105">
  Hover to scale
</div>
```

### Truncate Text
```html
<p class="to-e ws-nw o-h">Long text that will be truncated...</p>
```

### Sticky Header
```html
<header class="p-st t-0 bg-white zi-50">Sticky header</header>
```

### Hidden on Mobile
```html
<div class="d-none sm:d-b">Only visible on sm+ screens</div>
```
