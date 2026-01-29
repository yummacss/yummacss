# AGENTS.md

This file provides context for AI coding agents working on this codebase.

## Project Overview

Yumma CSS is a **utility-first CSS framework** that uses short, intuitive, abbreviated class names to style HTML elements. Unlike Tailwind CSS, Yumma CSS uses highly abbreviated prefixes to minimize typing while maintaining expressiveness.

**Key Principles:**
- Abbreviated prefixes (e.g., `d-f` instead of `flex`, `jc-c` instead of `justify-center`)
- Numeric scale system based on 0.25rem multiplier
- Directional suffixes for spacing and positioning
- Responsive design with breakpoint prefixes
- Pseudo-class variants for interactivity

---

## Core Naming Convention

### Pattern Structure

```
[variant:][prefix]-[value]
[pseudo-element]::[prefix]-[value]
```

**Examples:**
- `m-4` -> `margin: 1rem`
- `p-2` -> `padding: 0.5rem`
- `bg-blue` -> `background-color: #3575dd`
- `md:d-f` -> `display: flex` at medium breakpoint
- `h:bg-blue-8` -> darker blue background on hover
- `a::bg-red` -> red background on `::after` element
- `m--4` -> `margin: -1rem` (negative utility)

### Numeric Scale System

Numbers multiply a base value of **0.25rem**:

| Value | Result    |
| ----- | --------- |
| `0`   | `0rem`    |
| `1`   | `0.25rem` |
| `2`   | `0.5rem`  |
| `4`   | `1rem`    |
| `8`   | `2rem`    |
| `16`  | `4rem`    |

**Range:** Most spacing utilities support `0-100`.

### Directional Suffixes

| Suffix | Meaning                   |
| ------ | ------------------------- |
| `t`    | top                       |
| `r`    | right                     |
| `b`    | bottom                    |
| `l`    | left                      |
| `x`    | horizontal (left + right) |
| `y`    | vertical (top + bottom)   |

**Examples:**
- `mt-4` -> `margin-top: 1rem`
- `px-2` -> `padding-inline: 0.5rem` (Logical Property)
- `my-8` -> `margin-block: 2rem` (Logical Property)

---

## Layout & Box Model

### Display

| Class    | CSS                     |
| -------- | ----------------------- |
| `d-b`    | `display: block`        |
| `d-f`    | `display: flex`         |
| `d-g`    | `display: grid`         |
| `d-i`    | `display: inline`       |
| `d-ib`   | `display: inline-block` |
| `d-if`   | `display: inline-flex`  |
| `d-none` | `display: none`         |

### Width & Height

| Pattern             | Description                |
| ------------------- | -------------------------- |
| `w-[0-100]`         | Width in rem (times 0.25)  |
| `h-[0-100]`         | Height in rem (times 0.25) |
| `w-px` / `h-px`     | 1px                        |
| `w-full` / `h-full` | 100%                       |
| `w-half` / `h-half` | 50%                        |
| `w-auto` / `h-auto` | auto                       |
| `w-vw` / `h-vh`     | 100vw / 100vh              |
| `w-dvw` / `h-dvh`   | 100dvw / 100dvh            |
| `w-s` / `h-s`       | stretch                    |
| `w-sm` / `h-sm`     | 40rem                      |
| `w-md` / `h-md`     | 48rem                      |
| `w-lg` / `h-lg`     | 64rem                      |
| `w-xl` / `h-xl`     | 80rem                      |
| `w-xxl` / `h-xxl`   | 96rem                      |

### Min/Max Width & Height

- `min-w-[0-100]`, `max-w-[0-100]`
- `min-h-[0-100]`, `max-h-[0-100]`
- Also supports: `full`, `half`, `sm`, `md`, `lg`, `xl`, `xxl`

### Dimension (Width + Height Together)

| Pattern                | Description                |
| ---------------------- | -------------------------- |
| `d-[0-100]`            | Sets both width and height |
| `d-px`                 | 1px for both               |
| `d-full`               | 100% for both              |
| `d-dvw`                | 100dvw for both            |
| `d-sm` through `d-xxl` | Breakpoint sizes for both  |
| `min-d-[0-100]`        | Min-width and min-height   |
| `max-d-[0-100]`        | Max-width and max-height   |

### Padding

| Pattern       | Description                |
| ------------- | -------------------------- |
| `p-[0-100]`   | All sides                  |
| `p-px`        | 1px all sides              |
| `pt-[0-100]`  | Top                        |
| `pr-[0-100]`  | Right                      |
| `pb-[0-100]`  | Bottom                     |
| `pl-[0-100]`  | Left                       |
| `px-[0-100]`  | `padding-inline` (Logical) |
| `py-[0-100]`  | `padding-block` (Logical)  |
| `pbs-[0-100]` | `padding-block-start`      |
| `pbe-[0-100]` | `padding-block-end`        |
| `pis-[0-100]` | `padding-inline-start`     |
| `pie-[0-100]` | `padding-inline-end`       |

### Margin

| Pattern       | Description               |
| ------------- | ------------------------- |
| `m-[0-100]`   | All sides                 |
| `m-px`        | 1px all sides             |
| `m-auto`      | auto (for centering)      |
| `mt-[0-100]`  | Top                       |
| `mr-[0-100]`  | Right                     |
| `mb-[0-100]`  | Bottom                    |
| `ml-[0-100]`  | Left                      |
| `mx-[0-100]`  | `margin-inline` (Logical) |
| `my-[0-100]`  | `margin-block` (Logical)  |
| `mbs-[0-100]` | `margin-block-start`      |
| `mbe-[0-100]` | `margin-block-end`        |
| `mis-[0-100]` | `margin-inline-start`     |
| `mie-[0-100]` | `margin-inline-end`       |

### Box Sizing

| Class   | CSS                       |
| ------- | ------------------------- |
| `bs-bb` | `box-sizing: border-box`  |
| `bs-cb` | `box-sizing: content-box` |

---

## Flexbox

### Container

| Class   | CSS                              |
| ------- | -------------------------------- |
| `d-f`   | `display: flex`                  |
| `fd-r`  | `flex-direction: row`            |
| `fd-c`  | `flex-direction: column`         |
| `fd-rr` | `flex-direction: row-reverse`    |
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
| `jc-c`  | `justify-content: center`        |
| `jc-fs` | `justify-content: flex-start`    |
| `jc-fe` | `justify-content: flex-end`      |
| `jc-sb` | `justify-content: space-between` |
| `jc-sa` | `justify-content: space-around`  |
| `jc-se` | `justify-content: space-evenly`  |

### Align Items

| Class   | CSS                       |
| ------- | ------------------------- |
| `ai-c`  | `align-items: center`     |
| `ai-fs` | `align-items: flex-start` |
| `ai-fe` | `align-items: flex-end`   |
| `ai-st` | `align-items: stretch`    |
| `ai-b`  | `align-items: baseline`   |

### Align Content

| Class   | CSS                            |
| ------- | ------------------------------ |
| `ac-c`  | `align-content: center`        |
| `ac-fs` | `align-content: flex-start`    |
| `ac-fe` | `align-content: flex-end`      |
| `ac-sb` | `align-content: space-between` |
| `ac-sa` | `align-content: space-around`  |
| `ac-se` | `align-content: space-evenly`  |

### Align Self

| Class     | CSS                      |
| --------- | ------------------------ |
| `as-auto` | `align-self: auto`       |
| `as-c`    | `align-self: center`     |
| `as-fs`   | `align-self: flex-start` |
| `as-fe`   | `align-self: flex-end`   |
| `as-st`   | `align-self: stretch`    |

### Flex Properties

| Class        | CSS                 |
| ------------ | ------------------- |
| `f-1`        | `flex: 1 1 0%`      |
| `f-2`        | `flex: 2 2 0%`      |
| `f-auto`     | `flex: 1 1 auto`    |
| `f-none`     | `flex: none`        |
| `fg-[0-8]`   | `flex-grow`         |
| `fs-[0-8]`   | `flex-shrink`       |
| `fb-[0-100]` | `flex-basis` in rem |

### Order

| Class       | CSS                    |
| ----------- | ---------------------- |
| `or-l`      | `order: -9999` (first) |
| `or-[0-10]` | `order: 0-10`          |
| `or-f`      | `order: 9999` (last)   |

---

## Grid

### Container

| Class        | CSS                                     |
| ------------ | --------------------------------------- |
| `d-g`        | `display: grid`                         |
| `gtc-[1-16]` | `grid-template-columns: repeat(n, 1fr)` |
| `gtr-[1-16]` | `grid-template-rows: repeat(n, 1fr)`    |

### Gap

| Class        | CSS          |
| ------------ | ------------ |
| `g-[0-100]`  | `gap` in rem |
| `g-px`       | `gap: 1px`   |
| `cg-[0-100]` | `column-gap` |
| `rg-[0-100]` | `row-gap`    |

### Grid Item Placement

| Class         | CSS                 |
| ------------- | ------------------- |
| `gc-s-[1-16]` | Grid column span    |
| `gr-s-[1-16]` | Grid row span       |
| `gcs-[1-16]`  | `grid-column-start` |
| `gce-[1-16]`  | `grid-column-end`   |
| `grs-[1-16]`  | `grid-row-start`    |
| `gre-[1-16]`  | `grid-row-end`      |

### Grid Auto Flow

| Class      | CSS                       |
| ---------- | ------------------------- |
| `gaf-r`    | `grid-auto-flow: row`     |
| `gaf-c`    | `grid-auto-flow: column`  |
| `gaf-d`    | `grid-auto-flow: dense`   |
| `gac-auto` | `grid-auto-columns: auto` |
| `gar-auto` | `grid-auto-rows: auto`    |

### Place Items / Content / Self

| Class     | CSS                            |
| --------- | ------------------------------ |
| `pi-c`    | `place-items: center`          |
| `pi-s`    | `place-items: start`           |
| `pi-e`    | `place-items: end`             |
| `pi-st`   | `place-items: stretch`         |
| `pc-c`    | `place-content: center`        |
| `pc-s`    | `place-content: start`         |
| `pc-e`    | `place-content: end`           |
| `pc-sb`   | `place-content: space-between` |
| `ps-auto` | `place-self: auto`             |
| `ps-c`    | `place-self: center`           |
| `ps-s`    | `place-self: start`            |
| `ps-e`    | `place-self: end`              |

### Justify/Align Items & Self

| Class     | CSS                     |
| --------- | ----------------------- |
| `ji-c`    | `justify-items: center` |
| `ji-s`    | `justify-items: start`  |
| `ji-e`    | `justify-items: end`    |
| `js-auto` | `justify-self: auto`    |
| `js-c`    | `justify-self: center`  |
| `js-s`    | `justify-self: start`   |
| `js-e`    | `justify-self: end`     |

---

## Positioning

### Position Type

| Class  | CSS                  |
| ------ | -------------------- |
| `p-r`  | `position: relative` |
| `p-a`  | `position: absolute` |
| `p-f`  | `position: fixed`    |
| `p-st` | `position: sticky`   |
| `p-s`  | `position: static`   |

### Position Values

| Pattern      | Description         | Range        |
| ------------ | ------------------- | ------------ |
| `t-[0-100]`  | `top`               | 0-100 in rem |
| `r-[0-100]`  | `right`             | 0-100 in rem |
| `b-[0-100]`  | `bottom`            | 0-100 in rem |
| `l-[0-100]`  | `left`              | 0-100 in rem |
| `i-[0-100]`  | `inset` (all sides) | 0-100 in rem |
| `ix-[0-100]` | Inset horizontal    | 0-100 in rem |
| `iy-[0-100]` | Inset vertical      | 0-100 in rem |

**Special values:**
- `t-full`, `r-full`, `b-full`, `l-full`, `i-full` -> 100%
- `t-half`, `r-half`, `b-half`, `l-half`, `i-half` -> 50%
- `t-auto`, `r-auto`, `b-auto`, `l-auto`, `i-auto` -> `auto`

### Z-Index

| Class                  | CSS             |
| ---------------------- | --------------- |
| `zi-0` through `zi-90` | Steps of 10     |
| `zi-auto`              | `z-index: auto` |

### Float & Clear

| Class     | CSS            |
| --------- | -------------- |
| `fl-l`    | `float: left`  |
| `fl-r`    | `float: right` |
| `fl-none` | `float: none`  |
| `cl-l`    | `clear: left`  |
| `cl-r`    | `clear: right` |
| `cl-b`    | `clear: both`  |
| `cl-none` | `clear: none`  |

### Overflow

| Class                    | CSS                   |
| ------------------------ | --------------------- |
| `o-auto`                 | `overflow: auto`      |
| `o-h`                    | `overflow: hidden`    |
| `o-v`                    | `overflow: visible`   |
| `o-s`                    | `overflow: scroll`    |
| `o-c`                    | `overflow: clip`      |
| `o-x-[auto\|h\|v\|s\|c]` | `overflow-x` variants |
| `o-y-[auto\|h\|v\|s\|c]` | `overflow-y` variants |

### Visibility

| Class | CSS                    |
| ----- | ---------------------- |
| `v-v` | `visibility: visible`  |
| `v-h` | `visibility: hidden`   |
| `v-c` | `visibility: collapse` |

### Object Fit & Position

| Class     | CSS                       |
| --------- | ------------------------- |
| `of-c`    | `object-fit: cover`       |
| `of-f`    | `object-fit: fill`        |
| `of-none` | `object-fit: none`        |
| `of-sd`   | `object-fit: scale-down`  |
| `op-c`    | `object-position: center` |
| `op-t`    | `object-position: top`    |
| `op-b`    | `object-position: bottom` |
| `op-l`    | `object-position: left`   |
| `op-r`    | `object-position: right`  |

### Aspect Ratio

| Class     | CSS                  |
| --------- | -------------------- |
| `ar-auto` | `aspect-ratio: auto` |
| `ar-1/1`  | `aspect-ratio: 1/1`  |
| `ar-16/9` | `aspect-ratio: 16/9` |
| `ar-4/3`  | `aspect-ratio: 4/3`  |

### Columns & Isolation

| Class      | CSS                  |
| ---------- | -------------------- |
| `c-[1-16]` | `columns`            |
| `is-auto`  | `isolation: auto`    |
| `is-i`     | `isolation: isolate` |

---

## Colors

### Color Palette

Yumma CSS includes **13 color families**:

`red`, `orange`, `yellow`, `green`, `teal`, `cyan`, `blue`, `indigo`, `violet`, `pink`, `slate`, `gray`, `silver`

**Shade System:**
- `[color]-1` through `[color]-6` -> Lighter shades
- `[color]` -> Base color
- `[color]-7` through `[color]-12` -> Darker shades

**Special colors:**
- `black`, `white`, `transparent`, `current`

### Color Properties

| Prefix         | CSS Property            |
| -------------- | ----------------------- |
| `bg-[color]`   | `background-color`      |
| `c-[color]`    | `color` (text color)    |
| `bc-[color]`   | `border-color`          |
| `bc-t-[color]` | `border-top-color`      |
| `bc-r-[color]` | `border-right-color`    |
| `bc-b-[color]` | `border-bottom-color`   |
| `bc-l-[color]` | `border-left-color`     |
| `oc-[color]`   | `outline-color`         |
| `ac-[color]`   | `accent-color`          |
| `cc-[color]`   | `caret-color`           |
| `tdc-[color]`  | `text-decoration-color` |
| `f-[color]`    | `fill` (SVG)            |
| `s-[color]`    | `stroke` (SVG)          |

**Examples:**
- `bg-blue` -> Blue background
- `bg-blue-3` -> Light blue background
- `c-red-10` -> Dark red text
- `bc-gray` -> Gray border

### Opacity Variants

All color utilities support opacity using the `/` syntax:

```
[color-utility]/[0-95]
```

**Opacity steps:** 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95

**Examples:**
- `bg-indigo/5` -> Indigo background at 5% opacity
- `bg-blue-6/50` -> Blue-6 background at 50% opacity
- `bc-indigo-6/10` -> Indigo-6 border at 10% opacity
- `c-red/25` -> Red text at 25% opacity

---

## Borders

### Border Width

| Pattern     | Description     |
| ----------- | --------------- |
| `bw-[0-8]`  | All sides in px |
| `bw-px`     | 1px             |
| `btw-[0-8]` | Top             |
| `brw-[0-8]` | Right           |
| `bbw-[0-8]` | Bottom          |
| `blw-[0-8]` | Left            |

### Border Style

| Class     | CSS                    |
| --------- | ---------------------- |
| `bs-s`    | `border-style: solid`  |
| `bs-d`    | `border-style: dashed` |
| `bs-none` | `border-style: none`   |

### Border Radius

| Pattern       | Description                   |
| ------------- | ----------------------------- |
| `br-[0-8]`    | All corners (rem times  0.25) |
| `br-pill`     | `9999px` (pill shape)         |
| `br-full`     | `100%`                        |
| `br-half`     | `50%`                         |
| `br-t-[0-8]`  | Top corners                   |
| `br-r-[0-8]`  | Right corners                 |
| `br-b-[0-8]`  | Bottom corners                |
| `br-l-[0-8]`  | Left corners                  |
| `br-tl-[0-8]` | Top-left                      |
| `br-tr-[0-8]` | Top-right                     |
| `br-br-[0-8]` | Bottom-right                  |
| `br-bl-[0-8]` | Bottom-left                   |

### Border Collapse & Spacing

| Class      | CSS                         |
| ---------- | --------------------------- |
| `bc-c`     | `border-collapse: collapse` |
| `bc-s`     | `border-collapse: separate` |
| `bs-[0-8]` | `border-spacing`            |

---

## Typography

### Font Family

| Class  | CSS                                  |
| ------ | ------------------------------------ |
| `ff-s` | `font-family: system-ui, sans-serif` |
| `ff-m` | `font-family: monospace`             |
| `ff-c` | `font-family: Charter` (serif)       |

### Font Size

| Class    | Size     |
| -------- | -------- |
| `fs-xs`  | 0.75rem  |
| `fs-sm`  | 0.875rem |
| `fs-md`  | 1rem     |
| `fs-lg`  | 1.125rem |
| `fs-xl`  | 1.25rem  |
| `fs-xxl` | 1.5rem   |
| `fs-3xl` | 1.875rem |
| `fs-4xl` | 2.25rem  |
| `fs-5xl` | 3rem     |
| `fs-6xl` | 3.75rem  |
| `fs-7xl` | 4.5rem   |
| `fs-8xl` | 6rem     |
| `fs-9xl` | 8rem     |

### Font Weight

`fw-100` through `fw-900` (in steps of 100)

### Font Style

| Class  | CSS                  |
| ------ | -------------------- |
| `fs-n` | `font-style: normal` |
| `fs-i` | `font-style: italic` |

### Text Alignment

| Class  | CSS                   |
| ------ | --------------------- |
| `ta-l` | `text-align: left`    |
| `ta-c` | `text-align: center`  |
| `ta-r` | `text-align: right`   |
| `ta-j` | `text-align: justify` |
| `ta-s` | `text-align: start`   |
| `ta-e` | `text-align: end`     |

### Text Decoration

| Class             | CSS                                  |
| ----------------- | ------------------------------------ |
| `td-none`         | `text-decoration: none`              |
| `td-u`            | `text-decoration: underline`         |
| `tdl-u`           | `text-decoration-line: underline`    |
| `tdl-o`           | `text-decoration-line: overline`     |
| `tdl-lt`          | `text-decoration-line: line-through` |
| `tds-s`           | `text-decoration-style: solid`       |
| `tds-d`           | `text-decoration-style: dashed`      |
| `tds-w`           | `text-decoration-style: wavy`        |
| `tdt-[0-4]`       | `text-decoration-thickness` in px    |
| `tdt-auto`        | `text-decoration-thickness: auto`    |
| `tuo-[0,1,2,4,8]` | `text-underline-offset` in px        |
| `tuo-auto`        | `text-underline-offset: auto`        |

### Text Transform

| Class  | CSS                          |
| ------ | ---------------------------- |
| `tt-u` | `text-transform: uppercase`  |
| `tt-l` | `text-transform: lowercase`  |
| `tt-c` | `text-transform: capitalize` |
| `tt-n` | `text-transform: none`       |

### Line Height

| Class  | Value |
| ------ | ----- |
| `lh-1` | 1     |
| `lh-2` | 1.25  |
| `lh-3` | 1.375 |
| `lh-4` | 1.5   |
| `lh-5` | 1.625 |
| `lh-6` | 2     |

### Letter Spacing

| Class  | Value    |
| ------ | -------- |
| `ls-0` | 0em      |
| `ls-1` | -0.05em  |
| `ls-2` | -0.025em |
| `ls-3` | 0.025em  |
| `ls-4` | 0.05em   |
| `ls-5` | 0.1em    |

### Text Wrap & White Space

| Class   | CSS                     |
| ------- | ----------------------- |
| `tw-w`  | `text-wrap: wrap`       |
| `tw-n`  | `text-wrap: nowrap`     |
| `tw-b`  | `text-wrap: balance`    |
| `tw-p`  | `text-wrap: pretty`     |
| `ws-n`  | `white-space: normal`   |
| `ws-nw` | `white-space: nowrap`   |
| `ws-p`  | `white-space: pre`      |
| `ws-pl` | `white-space: pre-line` |
| `ws-pw` | `white-space: pre-wrap` |

### Text Overflow

| Class  | CSS                       |
| ------ | ------------------------- |
| `to-c` | `text-overflow: clip`     |
| `to-e` | `text-overflow: ellipsis` |

### List Styles

| Class   | CSS                            |
| ------- | ------------------------------ |
| `lst-d` | `list-style-type: disc`        |
| `lst-c` | `list-style-type: circle`      |
| `lst-s` | `list-style-type: square`      |
| `lsp-i` | `list-style-position: inside`  |
| `lsp-o` | `list-style-position: outside` |

### Tab Size

`ts-[1-8]` -> `tab-size: 1-8`

### Vertical Align

| Class   | CSS                        |
| ------- | -------------------------- |
| `va-t`  | `vertical-align: top`      |
| `va-m`  | `vertical-align: middle`   |
| `va-b`  | `vertical-align: bottom`   |
| `va-bl` | `vertical-align: baseline` |

### Writing Mode

| Class    | CSS                           |
| -------- | ----------------------------- |
| `wm-htb` | `writing-mode: horizontal-tb` |
| `wm-vrl` | `writing-mode: vertical-rl`   |
| `wm-vlr` | `writing-mode: vertical-lr`   |

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
| `bp-c`  | `background-position: center`       |
| `bp-t`  | `background-position: top`          |
| `bp-r`  | `background-position: right`        |
| `bp-b`  | `background-position: bottom`       |
| `bp-l`  | `background-position: left`         |
| `bp-lt` | `background-position: left top`     |
| `bp-rt` | `background-position: right top`    |
| `bp-rb` | `background-position: right bottom` |
| `bp-lb` | `background-position: left bottom`  |

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

### Opacity

`o-[0-100]` (in steps of 10) -> `opacity: 0-1`

Example: `o-50` -> `opacity: 0.5`

### Box Shadow

| Class      | Description |
| ---------- | ----------- |
| `bsh-none` | No shadow   |
| `bsh-xs`   | Extra small |
| `bsh-sm`   | Small       |
| `bsh-md`   | Medium      |
| `bsh-lg`   | Large       |
| `bsh-xl`   | Extra large |

### Blur (Filter)

| Class      | CSS                  |
| ---------- | -------------------- |
| `f-b-none` | `filter: blur(0)`    |
| `f-b-xs`   | `filter: blur(4px)`  |
| `f-b-sm`   | `filter: blur(8px)`  |
| `f-b-md`   | `filter: blur(16px)` |
| `f-b-lg`   | `filter: blur(32px)` |
| `f-b-xl`   | `filter: blur(64px)` |

### Backdrop Blur

| Class       | CSS                           |
| ----------- | ----------------------------- |
| `bf-b-none` | `backdrop-filter: blur(0)`    |
| `bf-b-xs`   | `backdrop-filter: blur(4px)`  |
| `bf-b-sm`   | `backdrop-filter: blur(8px)`  |
| `bf-b-md`   | `backdrop-filter: blur(16px)` |
| `bf-b-lg`   | `backdrop-filter: blur(32px)` |
| `bf-b-xl`   | `backdrop-filter: blur(64px)` |

### Grayscale

`f-g-[0-100]` (in steps of 10) -> `filter: grayscale(0-100%)`

---

## Transforms

### Rotate

`t-r-[0-360]` (in steps of 5) -> `transform: rotate(Xdeg)`

Example: `t-r-45` -> `transform: rotate(45deg)`

### Scale

| Pattern        | Description         |
| -------------- | ------------------- |
| `t-s-[0-100]`  | Scale (steps of 10) |
| `t-sx-[0-100]` | Scale X             |
| `t-sy-[0-100]` | Scale Y             |
| `t-tx-[0-100]` | Translate X in rem  |
| `t-ty-[0-100]` | Translate Y in rem  |

**Translate specials:** `t-tx-half` (50%), `t-tx-full` (100%), `t-ty-half`, `t-ty-full`

Example: `t-s-50` -> `transform: scale(50%)`

### Skew

`t-sk-[1,2,3,6,12]`, `t-skx-[1,2,3,6,12]`, `t-sky-[1,2,3,6,12]`

### Transform Origin

| Class    | CSS                              |
| -------- | -------------------------------- |
| `t-o-c`  | `transform-origin: center`       |
| `t-o-t`  | `transform-origin: top`          |
| `t-o-tr` | `transform-origin: top right`    |
| `t-o-r`  | `transform-origin: right`        |
| `t-o-br` | `transform-origin: bottom right` |
| `t-o-b`  | `transform-origin: bottom`       |
| `t-o-bl` | `transform-origin: bottom left`  |
| `t-o-l`  | `transform-origin: left`         |
| `t-o-tl` | `transform-origin: top left`     |

---

## Interactivity

### Cursor

| Class    | CSS                     |
| -------- | ----------------------- |
| `c-auto` | `cursor: auto`          |
| `c-d`    | `cursor: default`       |
| `c-p`    | `cursor: pointer`       |
| `c-w`    | `cursor: wait`          |
| `c-t`    | `cursor: text`          |
| `c-m`    | `cursor: move`          |
| `c-na`   | `cursor: not-allowed`   |
| `c-none` | `cursor: none`          |
| `c-h`    | `cursor: help`          |
| `c-pr`   | `cursor: progress`      |
| `c-zi`   | `cursor: zoom-in`       |
| `c-zo`   | `cursor: zoom-out`      |
| `c-cm`   | `cursor: context-menu`  |
| `c-cl`   | `cursor: cell`          |
| `c-vt`   | `cursor: vertical-text` |
| `c-al`   | `cursor: alias`         |
| `c-co`   | `cursor: copy`          |
| `c-g`    | `cursor: grab`          |
| `c-gr`   | `cursor: grabbing`      |
| `c-as`   | `cursor: all-scroll`    |
| `c-er`   | `cursor: ew-resize`     |
| `c-nr`   | `cursor: ns-resize`     |
| `c-cr`   | `cursor: col-resize`    |

### Touch Action

| Class     | CSS                        |
| --------- | -------------------------- |
| `ta-auto` | `touch-action: auto`       |
| `ta-none` | `touch-action: none`       |
| `ta-px`   | `touch-action: pan-x`      |
| `ta-py`   | `touch-action: pan-y`      |
| `ta-pl`   | `touch-action: pan-left`   |
| `ta-pr`   | `touch-action: pan-right`  |
| `ta-pt`   | `touch-action: pan-up`     |
| `ta-pb`   | `touch-action: pan-down`   |
| `ta-p`    | `touch-action: pinch-zoom` |

### Pointer Events

| Class     | CSS                    |
| --------- | ---------------------- |
| `pe-auto` | `pointer-events: auto` |
| `pe-none` | `pointer-events: none` |

### User Select

| Class     | CSS                 |
| --------- | ------------------- |
| `us-auto` | `user-select: auto` |
| `us-none` | `user-select: none` |
| `us-t`    | `user-select: text` |
| `us-a`    | `user-select: all`  |

### Resize

| Class    | CSS                  |
| -------- | -------------------- |
| `r-none` | `resize: none`       |
| `r-v`    | `resize: vertical`   |
| `r-h`    | `resize: horizontal` |
| `r-b`    | `resize: both`       |

### Appearance

| Class    | CSS                |
| -------- | ------------------ |
| `a-auto` | `appearance: auto` |
| `a-none` | `appearance: none` |

### Scroll Behavior

| Class     | CSS                       |
| --------- | ------------------------- |
| `sb-auto` | `scroll-behavior: auto`   |
| `sb-s`    | `scroll-behavior: smooth` |

### Scroll Snap

| Class      | CSS                                |
| ---------- | ---------------------------------- |
| `sst-none` | `scroll-snap-type: none`           |
| `sst-x-m`  | `scroll-snap-type: x mandatory`    |
| `sst-y-m`  | `scroll-snap-type: y mandatory`    |
| `sst-x-p`  | `scroll-snap-type: x proximity`    |
| `sst-y-p`  | `scroll-snap-type: y proximity`    |
| `sst-b-m`  | `scroll-snap-type: both mandatory` |
| `ssa-s`    | `scroll-snap-align: start`         |
| `ssa-c`    | `scroll-snap-align: center`        |
| `ssa-e`    | `scroll-snap-align: end`           |
| `ssa-none` | `scroll-snap-align: none`          |
| `sss-n`    | `scroll-snap-stop: normal`         |
| `sss-a`    | `scroll-snap-stop: always`         |

### Scroll Margin & Padding

**Scroll Margin:** `sm-[0-100]`, `smt-`, `smr-`, `smb-`, `sml-`, `smx-`, `smy-`

**Scroll Padding:** `sp-[0-100]`, `spt-`, `spr-`, `spb-`, `spl-`, `spx-`, `spy-`

---

## Outline

### Outline Width

`ow-[0-4]` -> `outline-width` in px

### Outline Style

| Class     | CSS                     |
| --------- | ----------------------- |
| `os-s`    | `outline-style: solid`  |
| `os-d`    | `outline-style: dashed` |
| `os-none` | `outline-style: none`   |

### Outline Offset

`oo-[0-4]` -> `outline-offset` in px

---

## SVG

| Pattern     | CSS               |
| ----------- | ----------------- |
| `sw-[0-4]`  | `stroke-width`    |
| `f-[color]` | `fill: [color]`   |
| `s-[color]` | `stroke: [color]` |

---

## Table

| Class     | CSS                    |
| --------- | ---------------------- |
| `cs-t`    | `caption-side: top`    |
| `cs-b`    | `caption-side: bottom` |
| `tl-auto` | `table-layout: auto`   |
| `tl-f`    | `table-layout: fixed`  |

---

## Responsive Design

### Breakpoints

| Prefix | Media Query                | Pixels |
| ------ | -------------------------- | ------ |
| `pc:`  | `@media (pointer: coarse)` | Touch  |
| `sm:`  | `@media (width >= 40rem)`  | 640px  |
| `md:`  | `@media (width >= 48rem)`  | 768px  |
| `lg:`  | `@media (width >= 64rem)`  | 1024px |
| `xl:`  | `@media (width >= 80rem)`  | 1280px |
| `xxl:` | `@media (width >= 96rem)`  | 1536px |

**Usage:**
```html
<!-- Hidden by default, visible on medium screens -->
<div class="d-none md:d-b">Content</div>

<!-- Full width on mobile, half on large screens -->
<div class="w-full lg:w-half">Content</div>

<!-- Progressive padding -->
<div class="p-2 md:p-4 lg:p-8">Content</div>
```

---

## Pseudo-Class Variants

| Prefix | Pseudo-class     |
| ------ | ---------------- |
| `h:`   | `:hover`         |
| `f:`   | `:focus`         |
| `fv:`  | `:focus-visible` |
| `fw:`  | `:focus-within`  |
| `a:`   | `:active`        |

---

## Pseudo-Element Variants

| Prefix | Pseudo-element  |
| ------ | --------------- |
| `a::`  | `::after`       |
| `b::`  | `::before`      |
| `p::`  | `::placeholder` |
| `s::`  | `::selection`   |

**Usage:**
```html
<!-- Content before element -->
<div class="b::c-red">Required</div>

<!-- Selection color -->
<div class="s::bg-blue s::c-white">Selectable text</div>
```

**Usage:**
```html
<!-- Background changes on hover -->
<button class="bg-blue h:bg-blue-8">Hover me</button>

<!-- Focus ring -->
<input class="c-gray f:c-blue">

<!-- Active state -->
<button class="bg-indigo h:bg-indigo-7 a:bg-indigo-9">Press me</button>
```

---

## Common Patterns

### Centering Content

```html
<!-- Flexbox center -->
<div class="d-f jc-c ai-c">Centered</div>

<!-- Grid center -->
<div class="d-g pi-c">Centered</div>

<!-- Horizontal center with margin -->
<div class="mx-auto">Centered</div>
```

### Card Component

```html
<div class="bg-white br-2 bs-md p-6">
  <h2 class="fs-xl fw-700 mb-2">Card Title</h2>
  <p class="c-gray">Card content</p>
</div>
```

### Responsive Grid

```html
<div class="d-g gtc-1 md:gtc-2 lg:gtc-3 g-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Button Styles

```html
<!-- Primary -->
<button class="bg-blue c-white px-4 py-2 br-1 h:bg-blue-8">
  Click me
</button>

<!-- Outline -->
<button class="bg-transparent bc-blue-2 bs-s c-blue px-4 py-2 br-1 h:bg-blue-1">
  Outline
</button>
```

### Sticky Header

```html
<header class="p-st t-0 bg-white bs-sm zi-50">
  <nav class="max-w-xl mx-auto px-4">Navigation</nav>
</header>
```

### Overlay

```html
<div class="p-f i-0 bg-black o-50 zi-40"></div>
```

### Image with Aspect Ratio

```html
<img src="image.jpg" class="w-full ar-16/9 of-c" alt="...">
```

### Truncate Text

```html
<p class="to-e o-h ws-nw">
  This text will be truncated with ellipsis
</p>
```

### Modal Dialog

```html
<div class="p-f i-0 d-f jc-c ai-c bg-black o-50 zi-50">
  <div class="bg-white br-2 p-8 max-w-md w-full">
    <h2 class="fs-xl fw-700 mb-4">Modal Title</h2>
    <p class="mb-6">Content</p>
    <button class="bg-blue c-white px-4 py-2 br-1">Close</button>
  </div>
</div>
```

---

## ⚠️ Critical Distinctions & Common Mistakes

### Prefix Disambiguation

Some prefixes are used for multiple properties. **Context determines meaning:**

| Prefix | With Number/Size               | With Letter Abbreviation |
| ------ | ------------------------------ | ------------------------ |
| `bw-`  | Border width (`bw-2`)          | —                        |
| `bs-`  | Border spacing (`bs-2`)        | Border style (`bs-s`)    |
| `bsh-` | Box shadow (`bsh-md`)          | —                        |
| `is-`  | Isolation (`is-i`)             | —                        |
| `o-`   | Opacity (`o-50`)               | Overflow (`o-h`)         |
| `p-`   | Padding (`p-4`)                | Position (`p-a`)         |
| `c-`   | Text color (`c-blue`)          | Cursor (`c-p`)           |
| `f-`   | Flex (`f-1`) / Fill (`f-blue`) | Filter blur (`f-b-sm`)   |

### Common Mistakes to Avoid

| ❌ Wrong         | ✅ Correct   | Reason                       |
| --------------- | ----------- | ---------------------------- |
| `gap-4`         | `g-4`       | Gap uses abbreviated prefix  |
| `jc-center`     | `jc-c`      | Use abbreviated values       |
| `flex-col`      | `fd-c`      | Flex-direction: column       |
| `bg-blue-500`   | `bg-blue-5` | Must include color name      |
| `md-d-f`        | `md:d-f`    | Use colon separator          |
| `hover:bg-blue` | `h:bg-blue` | Abbreviated hover prefix     |
| `text-red`      | `c-red`     | Text color uses `c-` prefix  |
| `m-negative-1`  | `m--1`      | Use double dash for negative |

---

## Quick Reference

### Spacing Scale

| Value | rem     | Pixels |
| ----- | ------- | ------ |
| 0     | 0       | 0      |
| 1     | 0.25rem | 4px    |
| 2     | 0.5rem  | 8px    |
| 3     | 0.75rem | 12px   |
| 4     | 1rem    | 16px   |
| 5     | 1.25rem | 20px   |
| 6     | 1.5rem  | 24px   |
| 8     | 2rem    | 32px   |
| 10    | 2.5rem  | 40px   |
| 12    | 3rem    | 48px   |
| 16    | 4rem    | 64px   |

### Font Size Scale

| Class    | rem      | Pixels |
| -------- | -------- | ------ |
| `fs-xs`  | 0.75rem  | 12px   |
| `fs-sm`  | 0.875rem | 14px   |
| `fs-md`  | 1rem     | 16px   |
| `fs-lg`  | 1.125rem | 18px   |
| `fs-xl`  | 1.25rem  | 20px   |
| `fs-xxl` | 1.5rem   | 24px   |
| `fs-3xl` | 1.875rem | 30px   |
| `fs-4xl` | 2.25rem  | 36px   |
| `fs-5xl` | 3rem     | 48px   |

---

## Summary

Yumma CSS uses a consistent, abbreviated naming pattern:

1. **Prefixes** are short (1-3 characters) representing CSS properties
2. **Values** are either numeric scales or abbreviated keywords
3. **Directional suffixes** (t, r, b, l, x, y) modify spatial properties
4. **Responsive prefixes** (sm:, md:, lg:, xl:, xxl:) apply at breakpoints
5. **Pseudo-class prefixes** (h:, f:, a:) apply for states
6. **Opacity variants** use `/[0-95]` syntax for color utilities

When in doubt, remember:
- Numbers usually mean spacing (times 0.25rem)
- Single letters are abbreviations (c = center, s = start, e = end)
- Colors always include the color name
- Use colons for variants: `md:d-f`, `h:bg-blue`
