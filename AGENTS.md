# Yumma CSS - AI Agent Guidelines

This document provides exhaustive rules and constraints for Any LLM/AI acting as a coding assistant in this repository. Yumma CSS is a distinct utility-first CSS framework and **does NOT use Tailwind CSS classes**.

## Core Constraints & Rules
- **NEVER use Tailwind CSS classes.** If it's a Tailwind utility, do not use it in this repository.
- **NO Arbitrary Values:** Yumma CSS does not support arbitrary values `[value]` (e.g., `w-[10px]`, `bg-[#f00]`).
- **NO Decimal Suffixes:** All spacing, sizing, and related utilities use whole numbers. Always round to the nearest whole number (e.g., instead of `w-1.5`, use `w-2`).
- **NO Gradients:** Gradients are not natively supported as utility classes.

## Variants & Modifiers
Yumma CSS provides powerful modifiers for styling states, breakpoints, negative values, and opacity.

### 1. Pseudo Classes
Prefix the utility with `[variant]:`.
- `h:` -> `:hover`
- `f:` -> `:focus`
- `fv:` -> `:focus-visible`
- `fw:` -> `:focus-within`
- `a:` -> `:active`
- `d:` -> `:disabled`
- Others: `c:` (checked), `e:` (empty), `fc:` (first-child), `lc:` (last-child), `nc:` (nth-child), `v:` (valid), `i:` (invalid), `r:` (required).
**Example:** `h:bg-red-5`

### 2. Pseudo Elements
Prefix the utility with `[variant]::`.
- `b::` -> `::before`
- `a::` -> `::after`
- `p::` -> `::placeholder`
- `s::` -> `::selection`
**Example:** `b::bg-black`

### 3. Media & Container Queries
Prefix the utility with `[variant]:` for media, `@[variant]:` for container queries.
- **Media**: `sm:`, `md:`, `lg:`, `xl:`, `xxl:`, `pc:` (pointer: coarse).
- **Container**: `@sm:`, `@md:`, `@lg:`, `@xl:`, `@xxl:`.
**Example:** `md:w-50` or `md:h:bg-blue-3`

### 4. Opacity
Append `/[value]` to the end of any color-based utility. Values range from `0` to `95` (in intervals of `5`).
**Example:** `bg-red-5/50` (applies 50% opacity to `bg-red-5`).

### 5. Negative Values
Use an extra `-` directly before numeric values, immediately attaching it to the prefix hyphen.
**Example:** `m--4` maps precisely to `margin: -1rem;`. (**DO NOT use `-m-4`**).

## Comprehensive Dictionary of Utilities
Below is an exhaustive list of every supported utility prefix and value in Yumma CSS, mapped directly to its equivalent CSS property. Use this to determine exactly what Yumma utility class maps to a specific CSS rule.

### background-attachment

| CSS Rule | Yumma Utility |
|----------|---------------|
| `background-attachment: fixed;` | `ba-f` |
| `background-attachment: local;` | `ba-l` |
| `background-attachment: scroll;` | `ba-s` |

### background-clip

| CSS Rule | Yumma Utility |
|----------|---------------|
| `background-clip: border-box;` | `bc-bb` |
| `background-clip: content-box;` | `bc-cb` |
| `background-clip: padding-box;` | `bc-pb` |
| `background-clip: text;` | `bc-t` |

### background-origin

| CSS Rule | Yumma Utility |
|----------|---------------|
| `background-origin: border-box;` | `bo-bb` |
| `background-origin: content-box;` | `bo-cb` |
| `background-origin: padding-box;` | `bo-pb` |

### background-position

| CSS Rule | Yumma Utility |
|----------|---------------|
| `background-position: bottom;` | `bp-b` |
| `background-position: center;` | `bp-c` |
| `background-position: 0;` | `bp-l` |
| `background-position: 0 100%;` | `bp-lb` |
| `background-position: 0 0;` | `bp-lt` |
| `background-position: 100%;` | `bp-r` |
| `background-position: 100% 100%;` | `bp-rb` |
| `background-position: 100% 0;` | `bp-rt` |
| `background-position: top;` | `bp-t` |

### background-repeat

| CSS Rule | Yumma Utility |
|----------|---------------|
| `background-repeat: no-repeat;` | `br-nr` |
| `background-repeat: repeat;` | `br-r` |
| `background-repeat: round;` | `br-ro` |
| `background-repeat: repeat-x;` | `br-rx` |
| `background-repeat: repeat-y;` | `br-ry` |
| `background-repeat: space;` | `br-s` |

### background-size

| CSS Rule | Yumma Utility |
|----------|---------------|
| `background-size: auto;` | `bs-auto` |
| `background-size: cover;` | `bs-c` |
| `background-size: contain;` | `bs-co` |

### border-collapse

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-collapse: collapse;` | `bc-c` |
| `border-collapse: separate;` | `bc-s` |

### border-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-radius: 0;` | `br-0` |
| `border-radius: 0.125rem;` | `br-xs` |
| `border-radius: 0.25rem;` | `br-sm` |
| `border-radius: 0.375rem;` | `br-md` |
| `border-radius: 0.5rem;` | `br-lg` |
| `border-radius: 0.75rem;` | `br-xl` |
| `border-radius: 1rem;` | `br-xxl` |
| `border-radius: 1.5rem;` | `br-3xl` |
| `border-radius: 100%;` | `br-full` |
| `border-radius: 50%;` | `br-half` |
| `border-radius: 9999px;` | `br-pill` |
| `border-radius: 1px;` | `br-px` |

### border-bottom-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-bottom-right-radius: 0;` | `bbr-0` |
| `border-bottom-right-radius: 0.125rem;` | `bbr-xs` |
| `border-bottom-right-radius: 0.25rem;` | `bbr-sm` |
| `border-bottom-right-radius: 0.375rem;` | `bbr-md` |
| `border-bottom-right-radius: 0.5rem;` | `bbr-lg` |
| `border-bottom-right-radius: 0.75rem;` | `bbr-xl` |
| `border-bottom-right-radius: 1rem;` | `bbr-xxl` |
| `border-bottom-right-radius: 1.5rem;` | `bbr-3xl` |
| `border-bottom-right-radius: 100%;` | `bbr-full` |
| `border-bottom-right-radius: 50%;` | `bbr-half` |
| `border-bottom-right-radius: 9999px;` | `bbr-pill` |
| `border-bottom-right-radius: 1px;` | `bbr-px` |

### border-left-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-top-left-radius: 0;` | `blr-0` |
| `border-top-left-radius: 0.125rem;` | `blr-xs` |
| `border-top-left-radius: 0.25rem;` | `blr-sm` |
| `border-top-left-radius: 0.375rem;` | `blr-md` |
| `border-top-left-radius: 0.5rem;` | `blr-lg` |
| `border-top-left-radius: 0.75rem;` | `blr-xl` |
| `border-top-left-radius: 1rem;` | `blr-xxl` |
| `border-top-left-radius: 1.5rem;` | `blr-3xl` |
| `border-top-left-radius: 100%;` | `blr-full` |
| `border-top-left-radius: 50%;` | `blr-half` |
| `border-top-left-radius: 9999px;` | `blr-pill` |
| `border-top-left-radius: 1px;` | `blr-px` |

### border-right-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-top-right-radius: 0;` | `brr-0` |
| `border-top-right-radius: 0.125rem;` | `brr-xs` |
| `border-top-right-radius: 0.25rem;` | `brr-sm` |
| `border-top-right-radius: 0.375rem;` | `brr-md` |
| `border-top-right-radius: 0.5rem;` | `brr-lg` |
| `border-top-right-radius: 0.75rem;` | `brr-xl` |
| `border-top-right-radius: 1rem;` | `brr-xxl` |
| `border-top-right-radius: 1.5rem;` | `brr-3xl` |
| `border-top-right-radius: 100%;` | `brr-full` |
| `border-top-right-radius: 50%;` | `brr-half` |
| `border-top-right-radius: 9999px;` | `brr-pill` |
| `border-top-right-radius: 1px;` | `brr-px` |

### border-bottom-left-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-bottom-left-radius: 0;` | `bblr-0` |
| `border-bottom-left-radius: 0.125rem;` | `bblr-xs` |
| `border-bottom-left-radius: 0.25rem;` | `bblr-sm` |
| `border-bottom-left-radius: 0.375rem;` | `bblr-md` |
| `border-bottom-left-radius: 0.5rem;` | `bblr-lg` |
| `border-bottom-left-radius: 0.75rem;` | `bblr-xl` |
| `border-bottom-left-radius: 1rem;` | `bblr-xxl` |
| `border-bottom-left-radius: 1.5rem;` | `bblr-3xl` |
| `border-bottom-left-radius: 100%;` | `bblr-full` |
| `border-bottom-left-radius: 50%;` | `bblr-half` |
| `border-bottom-left-radius: 9999px;` | `bblr-pill` |
| `border-bottom-left-radius: 1px;` | `bblr-px` |

### border-bottom-right-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-bottom-right-radius: 0;` | `bbrr-0` |
| `border-bottom-right-radius: 0.125rem;` | `bbrr-xs` |
| `border-bottom-right-radius: 0.25rem;` | `bbrr-sm` |
| `border-bottom-right-radius: 0.375rem;` | `bbrr-md` |
| `border-bottom-right-radius: 0.5rem;` | `bbrr-lg` |
| `border-bottom-right-radius: 0.75rem;` | `bbrr-xl` |
| `border-bottom-right-radius: 1rem;` | `bbrr-xxl` |
| `border-bottom-right-radius: 1.5rem;` | `bbrr-3xl` |
| `border-bottom-right-radius: 100%;` | `bbrr-full` |
| `border-bottom-right-radius: 50%;` | `bbrr-half` |
| `border-bottom-right-radius: 9999px;` | `bbrr-pill` |
| `border-bottom-right-radius: 1px;` | `bbrr-px` |

### border-top-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-top-left-radius: 0;` | `btr-0` |
| `border-top-left-radius: 0.125rem;` | `btr-xs` |
| `border-top-left-radius: 0.25rem;` | `btr-sm` |
| `border-top-left-radius: 0.375rem;` | `btr-md` |
| `border-top-left-radius: 0.5rem;` | `btr-lg` |
| `border-top-left-radius: 0.75rem;` | `btr-xl` |
| `border-top-left-radius: 1rem;` | `btr-xxl` |
| `border-top-left-radius: 1.5rem;` | `btr-3xl` |
| `border-top-left-radius: 100%;` | `btr-full` |
| `border-top-left-radius: 50%;` | `btr-half` |
| `border-top-left-radius: 9999px;` | `btr-pill` |
| `border-top-left-radius: 1px;` | `btr-px` |

### border-top-left-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-top-left-radius: 0;` | `btlr-0` |
| `border-top-left-radius: 0.125rem;` | `btlr-xs` |
| `border-top-left-radius: 0.25rem;` | `btlr-sm` |
| `border-top-left-radius: 0.375rem;` | `btlr-md` |
| `border-top-left-radius: 0.5rem;` | `btlr-lg` |
| `border-top-left-radius: 0.75rem;` | `btlr-xl` |
| `border-top-left-radius: 1rem;` | `btlr-xxl` |
| `border-top-left-radius: 1.5rem;` | `btlr-3xl` |
| `border-top-left-radius: 100%;` | `btlr-full` |
| `border-top-left-radius: 50%;` | `btlr-half` |
| `border-top-left-radius: 9999px;` | `btlr-pill` |
| `border-top-left-radius: 1px;` | `btlr-px` |

### border-top-right-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-top-right-radius: 0;` | `btrr-0` |
| `border-top-right-radius: 0.125rem;` | `btrr-xs` |
| `border-top-right-radius: 0.25rem;` | `btrr-sm` |
| `border-top-right-radius: 0.375rem;` | `btrr-md` |
| `border-top-right-radius: 0.5rem;` | `btrr-lg` |
| `border-top-right-radius: 0.75rem;` | `btrr-xl` |
| `border-top-right-radius: 1rem;` | `btrr-xxl` |
| `border-top-right-radius: 1.5rem;` | `btrr-3xl` |
| `border-top-right-radius: 100%;` | `btrr-full` |
| `border-top-right-radius: 50%;` | `btrr-half` |
| `border-top-right-radius: 9999px;` | `btrr-pill` |
| `border-top-right-radius: 1px;` | `btrr-px` |

### border-block-end-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-end-end-radius: 0;` | `bber-0` |
| `border-end-end-radius: 0.125rem;` | `bber-xs` |
| `border-end-end-radius: 0.25rem;` | `bber-sm` |
| `border-end-end-radius: 0.375rem;` | `bber-md` |
| `border-end-end-radius: 0.5rem;` | `bber-lg` |
| `border-end-end-radius: 0.75rem;` | `bber-xl` |
| `border-end-end-radius: 1rem;` | `bber-xxl` |
| `border-end-end-radius: 1.5rem;` | `bber-3xl` |
| `border-end-end-radius: 100%;` | `bber-full` |
| `border-end-end-radius: 50%;` | `bber-half` |
| `border-end-end-radius: 9999px;` | `bber-pill` |
| `border-end-end-radius: 1px;` | `bber-px` |

### border-inline-start-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-start-start-radius: 0;` | `bisr-0` |
| `border-start-start-radius: 0.125rem;` | `bisr-xs` |
| `border-start-start-radius: 0.25rem;` | `bisr-sm` |
| `border-start-start-radius: 0.375rem;` | `bisr-md` |
| `border-start-start-radius: 0.5rem;` | `bisr-lg` |
| `border-start-start-radius: 0.75rem;` | `bisr-xl` |
| `border-start-start-radius: 1rem;` | `bisr-xxl` |
| `border-start-start-radius: 1.5rem;` | `bisr-3xl` |
| `border-start-start-radius: 100%;` | `bisr-full` |
| `border-start-start-radius: 50%;` | `bisr-half` |
| `border-start-start-radius: 9999px;` | `bisr-pill` |
| `border-start-start-radius: 1px;` | `bisr-px` |

### border-inline-end-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-start-end-radius: 0;` | `bier-0` |
| `border-start-end-radius: 0.125rem;` | `bier-xs` |
| `border-start-end-radius: 0.25rem;` | `bier-sm` |
| `border-start-end-radius: 0.375rem;` | `bier-md` |
| `border-start-end-radius: 0.5rem;` | `bier-lg` |
| `border-start-end-radius: 0.75rem;` | `bier-xl` |
| `border-start-end-radius: 1rem;` | `bier-xxl` |
| `border-start-end-radius: 1.5rem;` | `bier-3xl` |
| `border-start-end-radius: 100%;` | `bier-full` |
| `border-start-end-radius: 50%;` | `bier-half` |
| `border-start-end-radius: 9999px;` | `bier-pill` |
| `border-start-end-radius: 1px;` | `bier-px` |

### border-end-start-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-end-start-radius: 0;` | `besr-0` |
| `border-end-start-radius: 0.125rem;` | `besr-xs` |
| `border-end-start-radius: 0.25rem;` | `besr-sm` |
| `border-end-start-radius: 0.375rem;` | `besr-md` |
| `border-end-start-radius: 0.5rem;` | `besr-lg` |
| `border-end-start-radius: 0.75rem;` | `besr-xl` |
| `border-end-start-radius: 1rem;` | `besr-xxl` |
| `border-end-start-radius: 1.5rem;` | `besr-3xl` |
| `border-end-start-radius: 100%;` | `besr-full` |
| `border-end-start-radius: 50%;` | `besr-half` |
| `border-end-start-radius: 9999px;` | `besr-pill` |
| `border-end-start-radius: 1px;` | `besr-px` |

### border-end-end-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-end-end-radius: 0;` | `beer-0` |
| `border-end-end-radius: 0.125rem;` | `beer-xs` |
| `border-end-end-radius: 0.25rem;` | `beer-sm` |
| `border-end-end-radius: 0.375rem;` | `beer-md` |
| `border-end-end-radius: 0.5rem;` | `beer-lg` |
| `border-end-end-radius: 0.75rem;` | `beer-xl` |
| `border-end-end-radius: 1rem;` | `beer-xxl` |
| `border-end-end-radius: 1.5rem;` | `beer-3xl` |
| `border-end-end-radius: 100%;` | `beer-full` |
| `border-end-end-radius: 50%;` | `beer-half` |
| `border-end-end-radius: 9999px;` | `beer-pill` |
| `border-end-end-radius: 1px;` | `beer-px` |

### border-block-start-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-start-start-radius: 0;` | `bbsr-0` |
| `border-start-start-radius: 0.125rem;` | `bbsr-xs` |
| `border-start-start-radius: 0.25rem;` | `bbsr-sm` |
| `border-start-start-radius: 0.375rem;` | `bbsr-md` |
| `border-start-start-radius: 0.5rem;` | `bbsr-lg` |
| `border-start-start-radius: 0.75rem;` | `bbsr-xl` |
| `border-start-start-radius: 1rem;` | `bbsr-xxl` |
| `border-start-start-radius: 1.5rem;` | `bbsr-3xl` |
| `border-start-start-radius: 100%;` | `bbsr-full` |
| `border-start-start-radius: 50%;` | `bbsr-half` |
| `border-start-start-radius: 9999px;` | `bbsr-pill` |
| `border-start-start-radius: 1px;` | `bbsr-px` |

### border-start-start-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-start-start-radius: 0;` | `bssr-0` |
| `border-start-start-radius: 0.125rem;` | `bssr-xs` |
| `border-start-start-radius: 0.25rem;` | `bssr-sm` |
| `border-start-start-radius: 0.375rem;` | `bssr-md` |
| `border-start-start-radius: 0.5rem;` | `bssr-lg` |
| `border-start-start-radius: 0.75rem;` | `bssr-xl` |
| `border-start-start-radius: 1rem;` | `bssr-xxl` |
| `border-start-start-radius: 1.5rem;` | `bssr-3xl` |
| `border-start-start-radius: 100%;` | `bssr-full` |
| `border-start-start-radius: 50%;` | `bssr-half` |
| `border-start-start-radius: 9999px;` | `bssr-pill` |
| `border-start-start-radius: 1px;` | `bssr-px` |

### border-start-end-radius

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-start-end-radius: 0;` | `bser-0` |
| `border-start-end-radius: 0.125rem;` | `bser-xs` |
| `border-start-end-radius: 0.25rem;` | `bser-sm` |
| `border-start-end-radius: 0.375rem;` | `bser-md` |
| `border-start-end-radius: 0.5rem;` | `bser-lg` |
| `border-start-end-radius: 0.75rem;` | `bser-xl` |
| `border-start-end-radius: 1rem;` | `bser-xxl` |
| `border-start-end-radius: 1.5rem;` | `bser-3xl` |
| `border-start-end-radius: 100%;` | `bser-full` |
| `border-start-end-radius: 50%;` | `bser-half` |
| `border-start-end-radius: 9999px;` | `bser-pill` |
| `border-start-end-radius: 1px;` | `bser-px` |

### border-spacing

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-spacing: 0;` | `bs-0` |
| `border-spacing: .25rem;` | `bs-1` |
| `border-spacing: .5rem;` | `bs-2` |
| `border-spacing: .75rem;` | `bs-3` |
| `border-spacing: 1rem;` | `bs-4` |
| `border-spacing: 1.25rem;` | `bs-5` |
| `border-spacing: 1.5rem;` | `bs-6` |
| `border-spacing: 1.75rem;` | `bs-7` |
| `border-spacing: 2rem;` | `bs-8` |
| `border-spacing: 1px;` | `bs-px` |

### border-style

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-style: none;` | `bs-none` |
| `border-style: dashed;` | `bs-d` |
| `border-style: solid;` | `bs-s` |

### border-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-width: 0;` | `bw-0` |
| `border-width: 1px;` | `bw-1` |
| `border-width: 2px;` | `bw-2` |
| `border-width: 3px;` | `bw-3` |
| `border-width: 4px;` | `bw-4` |
| `border-width: 5px;` | `bw-5` |
| `border-width: 6px;` | `bw-6` |
| `border-width: 7px;` | `bw-7` |
| `border-width: 8px;` | `bw-8` |

### border-bottom-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-bottom-width: 0;` | `bbw-0` |
| `border-bottom-width: 1px;` | `bbw-1` |
| `border-bottom-width: 2px;` | `bbw-2` |
| `border-bottom-width: 3px;` | `bbw-3` |
| `border-bottom-width: 4px;` | `bbw-4` |
| `border-bottom-width: 5px;` | `bbw-5` |
| `border-bottom-width: 6px;` | `bbw-6` |
| `border-bottom-width: 7px;` | `bbw-7` |
| `border-bottom-width: 8px;` | `bbw-8` |

### border-left-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-left-width: 0;` | `blw-0` |
| `border-left-width: 1px;` | `blw-1` |
| `border-left-width: 2px;` | `blw-2` |
| `border-left-width: 3px;` | `blw-3` |
| `border-left-width: 4px;` | `blw-4` |
| `border-left-width: 5px;` | `blw-5` |
| `border-left-width: 6px;` | `blw-6` |
| `border-left-width: 7px;` | `blw-7` |
| `border-left-width: 8px;` | `blw-8` |

### border-right-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-right-width: 0;` | `brw-0` |
| `border-right-width: 1px;` | `brw-1` |
| `border-right-width: 2px;` | `brw-2` |
| `border-right-width: 3px;` | `brw-3` |
| `border-right-width: 4px;` | `brw-4` |
| `border-right-width: 5px;` | `brw-5` |
| `border-right-width: 6px;` | `brw-6` |
| `border-right-width: 7px;` | `brw-7` |
| `border-right-width: 8px;` | `brw-8` |

### border-top-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-top-width: 0;` | `btw-0` |
| `border-top-width: 1px;` | `btw-1` |
| `border-top-width: 2px;` | `btw-2` |
| `border-top-width: 3px;` | `btw-3` |
| `border-top-width: 4px;` | `btw-4` |
| `border-top-width: 5px;` | `btw-5` |
| `border-top-width: 6px;` | `btw-6` |
| `border-top-width: 7px;` | `btw-7` |
| `border-top-width: 8px;` | `btw-8` |

### border-block-end-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-block-end-width: 0;` | `bbew-0` |
| `border-block-end-width: 1px;` | `bbew-1` |
| `border-block-end-width: 2px;` | `bbew-2` |
| `border-block-end-width: 3px;` | `bbew-3` |
| `border-block-end-width: 4px;` | `bbew-4` |
| `border-block-end-width: 5px;` | `bbew-5` |
| `border-block-end-width: 6px;` | `bbew-6` |
| `border-block-end-width: 7px;` | `bbew-7` |
| `border-block-end-width: 8px;` | `bbew-8` |

### border-block-start-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-block-start-width: 0;` | `bbsw-0` |
| `border-block-start-width: 1px;` | `bbsw-1` |
| `border-block-start-width: 2px;` | `bbsw-2` |
| `border-block-start-width: 3px;` | `bbsw-3` |
| `border-block-start-width: 4px;` | `bbsw-4` |
| `border-block-start-width: 5px;` | `bbsw-5` |
| `border-block-start-width: 6px;` | `bbsw-6` |
| `border-block-start-width: 7px;` | `bbsw-7` |
| `border-block-start-width: 8px;` | `bbsw-8` |

### border-inline-end-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-inline-end-width: 0;` | `biew-0` |
| `border-inline-end-width: 1px;` | `biew-1` |
| `border-inline-end-width: 2px;` | `biew-2` |
| `border-inline-end-width: 3px;` | `biew-3` |
| `border-inline-end-width: 4px;` | `biew-4` |
| `border-inline-end-width: 5px;` | `biew-5` |
| `border-inline-end-width: 6px;` | `biew-6` |
| `border-inline-end-width: 7px;` | `biew-7` |
| `border-inline-end-width: 8px;` | `biew-8` |

### border-inline-start-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-inline-start-width: 0;` | `bisw-0` |
| `border-inline-start-width: 1px;` | `bisw-1` |
| `border-inline-start-width: 2px;` | `bisw-2` |
| `border-inline-start-width: 3px;` | `bisw-3` |
| `border-inline-start-width: 4px;` | `bisw-4` |
| `border-inline-start-width: 5px;` | `bisw-5` |
| `border-inline-start-width: 6px;` | `bisw-6` |
| `border-inline-start-width: 7px;` | `bisw-7` |
| `border-inline-start-width: 8px;` | `bisw-8` |

### border-block-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-block-width: 0;` | `byw-0` |
| `border-block-width: 1px;` | `byw-1` |
| `border-block-width: 2px;` | `byw-2` |
| `border-block-width: 3px;` | `byw-3` |
| `border-block-width: 4px;` | `byw-4` |
| `border-block-width: 5px;` | `byw-5` |
| `border-block-width: 6px;` | `byw-6` |
| `border-block-width: 7px;` | `byw-7` |
| `border-block-width: 8px;` | `byw-8` |

### border-inline-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-inline-width: 0;` | `bxw-0` |
| `border-inline-width: 1px;` | `bxw-1` |
| `border-inline-width: 2px;` | `bxw-2` |
| `border-inline-width: 3px;` | `bxw-3` |
| `border-inline-width: 4px;` | `bxw-4` |
| `border-inline-width: 5px;` | `bxw-5` |
| `border-inline-width: 6px;` | `bxw-6` |
| `border-inline-width: 7px;` | `bxw-7` |
| `border-inline-width: 8px;` | `bxw-8` |

### aspect-ratio

| CSS Rule | Yumma Utility |
|----------|---------------|
| `aspect-ratio: auto;` | `ar-auto` |
| `aspect-ratio: 1;` | `ar-1/1` |
| `aspect-ratio: 1 / 2;` | `ar-1/2` |
| `aspect-ratio: 2;` | `ar-2/1` |
| `aspect-ratio: 2 / 3;` | `ar-2/3` |
| `aspect-ratio: 3 / 2;` | `ar-3/2` |
| `aspect-ratio: 3 / 4;` | `ar-3/4` |
| `aspect-ratio: 4 / 3;` | `ar-4/3` |
| `aspect-ratio: 4 / 5;` | `ar-4/5` |
| `aspect-ratio: 5 / 4;` | `ar-5/4` |
| `aspect-ratio: 5 / 7;` | `ar-5/7` |
| `aspect-ratio: 7 / 5;` | `ar-7/5` |
| `aspect-ratio: 9 / 16;` | `ar-9/16` |
| `aspect-ratio: 16 / 9;` | `ar-16/9` |
| `aspect-ratio: 21 / 9;` | `ar-21/9` |
| `aspect-ratio: 9 / 21;` | `ar-9/21` |

### box-sizing

| CSS Rule | Yumma Utility |
|----------|---------------|
| `box-sizing: border-box;` | `bs-bb` |
| `box-sizing: content-box;` | `bs-cb` |

### block-size

| CSS Rule | Yumma Utility |
|----------|---------------|
| `block-size: value;` | `ys-{0-100}` |
| `block-size: auto;` | `ys-auto` |
| `block-size: 100dvh;` | `ys-dvh` |
| `block-size: 100dvw;` | `ys-dvw` |
| `block-size: 100vh;` | `ys-vh` |
| `block-size: 100vw;` | `ys-vw` |
| `block-size: 100vi;` | `ys-vi` |
| `block-size: 100vb;` | `ys-vb` |
| `block-size: 100svh;` | `ys-svh` |
| `block-size: 100svw;` | `ys-svw` |
| `block-size: 100lvh;` | `ys-lvh` |
| `block-size: 100lvw;` | `ys-lvw` |
| `block-size: 100vmin;` | `ys-vmin` |
| `block-size: 100vmax;` | `ys-vmax` |
| `block-size: fit-content;` | `ys-fc` |
| `block-size: 100%;` | `ys-full` |
| `block-size: 50%;` | `ys-half` |
| `block-size: max-content;` | `ys-max` |
| `block-size: min-content;` | `ys-min` |
| `block-size: 1px;` | `ys-px` |
| `block-size: stretch;` | `ys-s` |
| `block-size: 40rem;` | `ys-sm` |
| `block-size: 48rem;` | `ys-md` |
| `block-size: 64rem;` | `ys-lg` |
| `block-size: 80rem;` | `ys-xl` |
| `block-size: 96rem;` | `ys-xxl` |

### height

| CSS Rule | Yumma Utility |
|----------|---------------|
| `height: value;` | `h-{0-100}` |
| `height: auto;` | `h-auto` |
| `height: 100dvh;` | `h-dvh` |
| `height: 100dvw;` | `h-dvw` |
| `height: 100vh;` | `h-vh` |
| `height: 100vw;` | `h-vw` |
| `height: 100vi;` | `h-vi` |
| `height: 100vb;` | `h-vb` |
| `height: 100svh;` | `h-svh` |
| `height: 100svw;` | `h-svw` |
| `height: 100lvh;` | `h-lvh` |
| `height: 100lvw;` | `h-lvw` |
| `height: 100vmin;` | `h-vmin` |
| `height: 100vmax;` | `h-vmax` |
| `height: fit-content;` | `h-fc` |
| `height: 100%;` | `h-full` |
| `height: 50%;` | `h-half` |
| `height: max-content;` | `h-max` |
| `height: min-content;` | `h-min` |
| `height: 1px;` | `h-px` |
| `height: stretch;` | `h-s` |
| `height: 40rem;` | `h-sm` |
| `height: 48rem;` | `h-md` |
| `height: 64rem;` | `h-lg` |
| `height: 80rem;` | `h-xl` |
| `height: 96rem;` | `h-xxl` |

### inline-size

| CSS Rule | Yumma Utility |
|----------|---------------|
| `inline-size: value;` | `xs-{0-100}` |
| `inline-size: auto;` | `xs-auto` |
| `inline-size: 100dvh;` | `xs-dvh` |
| `inline-size: 100dvw;` | `xs-dvw` |
| `inline-size: 100vh;` | `xs-vh` |
| `inline-size: 100vw;` | `xs-vw` |
| `inline-size: 100vi;` | `xs-vi` |
| `inline-size: 100vb;` | `xs-vb` |
| `inline-size: 100svh;` | `xs-svh` |
| `inline-size: 100svw;` | `xs-svw` |
| `inline-size: 100lvh;` | `xs-lvh` |
| `inline-size: 100lvw;` | `xs-lvw` |
| `inline-size: 100vmin;` | `xs-vmin` |
| `inline-size: 100vmax;` | `xs-vmax` |
| `inline-size: fit-content;` | `xs-fc` |
| `inline-size: 100%;` | `xs-full` |
| `inline-size: 50%;` | `xs-half` |
| `inline-size: max-content;` | `xs-max` |
| `inline-size: min-content;` | `xs-min` |
| `inline-size: 1px;` | `xs-px` |
| `inline-size: stretch;` | `xs-s` |
| `inline-size: 40rem;` | `xs-sm` |
| `inline-size: 48rem;` | `xs-md` |
| `inline-size: 64rem;` | `xs-lg` |
| `inline-size: 80rem;` | `xs-xl` |
| `inline-size: 96rem;` | `xs-xxl` |

### max-block-size

| CSS Rule | Yumma Utility |
|----------|---------------|
| `max-block-size: value;` | `max-ys-{0-100}` |
| `max-block-size: auto;` | `max-ys-auto` |
| `max-block-size: 100dvh;` | `max-ys-dvh` |
| `max-block-size: 100dvw;` | `max-ys-dvw` |
| `max-block-size: 100vh;` | `max-ys-vh` |
| `max-block-size: 100vw;` | `max-ys-vw` |
| `max-block-size: 100vi;` | `max-ys-vi` |
| `max-block-size: 100vb;` | `max-ys-vb` |
| `max-block-size: 100svh;` | `max-ys-svh` |
| `max-block-size: 100svw;` | `max-ys-svw` |
| `max-block-size: 100lvh;` | `max-ys-lvh` |
| `max-block-size: 100lvw;` | `max-ys-lvw` |
| `max-block-size: 100vmin;` | `max-ys-vmin` |
| `max-block-size: 100vmax;` | `max-ys-vmax` |
| `max-block-size: fit-content;` | `max-ys-fc` |
| `max-block-size: 100%;` | `max-ys-full` |
| `max-block-size: 50%;` | `max-ys-half` |
| `max-block-size: max-content;` | `max-ys-max` |
| `max-block-size: min-content;` | `max-ys-min` |
| `max-block-size: 1px;` | `max-ys-px` |
| `max-block-size: stretch;` | `max-ys-s` |
| `max-block-size: 40rem;` | `max-ys-sm` |
| `max-block-size: 48rem;` | `max-ys-md` |
| `max-block-size: 64rem;` | `max-ys-lg` |
| `max-block-size: 80rem;` | `max-ys-xl` |
| `max-block-size: 96rem;` | `max-ys-xxl` |

### max-height

| CSS Rule | Yumma Utility |
|----------|---------------|
| `max-height: value;` | `max-h-{0-100}` |
| `max-height: auto;` | `max-h-auto` |
| `max-height: 100dvh;` | `max-h-dvh` |
| `max-height: 100dvw;` | `max-h-dvw` |
| `max-height: 100vh;` | `max-h-vh` |
| `max-height: 100vw;` | `max-h-vw` |
| `max-height: 100vi;` | `max-h-vi` |
| `max-height: 100vb;` | `max-h-vb` |
| `max-height: 100svh;` | `max-h-svh` |
| `max-height: 100svw;` | `max-h-svw` |
| `max-height: 100lvh;` | `max-h-lvh` |
| `max-height: 100lvw;` | `max-h-lvw` |
| `max-height: 100vmin;` | `max-h-vmin` |
| `max-height: 100vmax;` | `max-h-vmax` |
| `max-height: fit-content;` | `max-h-fc` |
| `max-height: 100%;` | `max-h-full` |
| `max-height: 50%;` | `max-h-half` |
| `max-height: max-content;` | `max-h-max` |
| `max-height: min-content;` | `max-h-min` |
| `max-height: 1px;` | `max-h-px` |
| `max-height: stretch;` | `max-h-s` |
| `max-height: 40rem;` | `max-h-sm` |
| `max-height: 48rem;` | `max-h-md` |
| `max-height: 64rem;` | `max-h-lg` |
| `max-height: 80rem;` | `max-h-xl` |
| `max-height: 96rem;` | `max-h-xxl` |

### max-inline-size

| CSS Rule | Yumma Utility |
|----------|---------------|
| `max-inline-size: value;` | `max-xs-{0-100}` |
| `max-inline-size: auto;` | `max-xs-auto` |
| `max-inline-size: 100dvh;` | `max-xs-dvh` |
| `max-inline-size: 100dvw;` | `max-xs-dvw` |
| `max-inline-size: 100vh;` | `max-xs-vh` |
| `max-inline-size: 100vw;` | `max-xs-vw` |
| `max-inline-size: 100vi;` | `max-xs-vi` |
| `max-inline-size: 100vb;` | `max-xs-vb` |
| `max-inline-size: 100svh;` | `max-xs-svh` |
| `max-inline-size: 100svw;` | `max-xs-svw` |
| `max-inline-size: 100lvh;` | `max-xs-lvh` |
| `max-inline-size: 100lvw;` | `max-xs-lvw` |
| `max-inline-size: 100vmin;` | `max-xs-vmin` |
| `max-inline-size: 100vmax;` | `max-xs-vmax` |
| `max-inline-size: fit-content;` | `max-xs-fc` |
| `max-inline-size: 100%;` | `max-xs-full` |
| `max-inline-size: 50%;` | `max-xs-half` |
| `max-inline-size: max-content;` | `max-xs-max` |
| `max-inline-size: min-content;` | `max-xs-min` |
| `max-inline-size: 1px;` | `max-xs-px` |
| `max-inline-size: stretch;` | `max-xs-s` |
| `max-inline-size: 40rem;` | `max-xs-sm` |
| `max-inline-size: 48rem;` | `max-xs-md` |
| `max-inline-size: 64rem;` | `max-xs-lg` |
| `max-inline-size: 80rem;` | `max-xs-xl` |
| `max-inline-size: 96rem;` | `max-xs-xxl` |

### min-block-size

| CSS Rule | Yumma Utility |
|----------|---------------|
| `min-block-size: value;` | `min-ys-{0-100}` |
| `min-block-size: auto;` | `min-ys-auto` |
| `min-block-size: 100dvh;` | `min-ys-dvh` |
| `min-block-size: 100dvw;` | `min-ys-dvw` |
| `min-block-size: 100vh;` | `min-ys-vh` |
| `min-block-size: 100vw;` | `min-ys-vw` |
| `min-block-size: 100vi;` | `min-ys-vi` |
| `min-block-size: 100vb;` | `min-ys-vb` |
| `min-block-size: 100svh;` | `min-ys-svh` |
| `min-block-size: 100svw;` | `min-ys-svw` |
| `min-block-size: 100lvh;` | `min-ys-lvh` |
| `min-block-size: 100lvw;` | `min-ys-lvw` |
| `min-block-size: 100vmin;` | `min-ys-vmin` |
| `min-block-size: 100vmax;` | `min-ys-vmax` |
| `min-block-size: fit-content;` | `min-ys-fc` |
| `min-block-size: 100%;` | `min-ys-full` |
| `min-block-size: 50%;` | `min-ys-half` |
| `min-block-size: max-content;` | `min-ys-max` |
| `min-block-size: min-content;` | `min-ys-min` |
| `min-block-size: 1px;` | `min-ys-px` |
| `min-block-size: stretch;` | `min-ys-s` |
| `min-block-size: 40rem;` | `min-ys-sm` |
| `min-block-size: 48rem;` | `min-ys-md` |
| `min-block-size: 64rem;` | `min-ys-lg` |
| `min-block-size: 80rem;` | `min-ys-xl` |
| `min-block-size: 96rem;` | `min-ys-xxl` |

### min-height

| CSS Rule | Yumma Utility |
|----------|---------------|
| `min-height: value;` | `min-h-{0-100}` |
| `min-height: auto;` | `min-h-auto` |
| `min-height: 100dvh;` | `min-h-dvh` |
| `min-height: 100dvw;` | `min-h-dvw` |
| `min-height: 100vh;` | `min-h-vh` |
| `min-height: 100vw;` | `min-h-vw` |
| `min-height: 100vi;` | `min-h-vi` |
| `min-height: 100vb;` | `min-h-vb` |
| `min-height: 100svh;` | `min-h-svh` |
| `min-height: 100svw;` | `min-h-svw` |
| `min-height: 100lvh;` | `min-h-lvh` |
| `min-height: 100lvw;` | `min-h-lvw` |
| `min-height: 100vmin;` | `min-h-vmin` |
| `min-height: 100vmax;` | `min-h-vmax` |
| `min-height: fit-content;` | `min-h-fc` |
| `min-height: 100%;` | `min-h-full` |
| `min-height: 50%;` | `min-h-half` |
| `min-height: max-content;` | `min-h-max` |
| `min-height: min-content;` | `min-h-min` |
| `min-height: 1px;` | `min-h-px` |
| `min-height: stretch;` | `min-h-s` |
| `min-height: 40rem;` | `min-h-sm` |
| `min-height: 48rem;` | `min-h-md` |
| `min-height: 64rem;` | `min-h-lg` |
| `min-height: 80rem;` | `min-h-xl` |
| `min-height: 96rem;` | `min-h-xxl` |

### min-inline-size

| CSS Rule | Yumma Utility |
|----------|---------------|
| `min-inline-size: value;` | `min-xs-{0-100}` |
| `min-inline-size: auto;` | `min-xs-auto` |
| `min-inline-size: 100dvh;` | `min-xs-dvh` |
| `min-inline-size: 100dvw;` | `min-xs-dvw` |
| `min-inline-size: 100vh;` | `min-xs-vh` |
| `min-inline-size: 100vw;` | `min-xs-vw` |
| `min-inline-size: 100vi;` | `min-xs-vi` |
| `min-inline-size: 100vb;` | `min-xs-vb` |
| `min-inline-size: 100svh;` | `min-xs-svh` |
| `min-inline-size: 100svw;` | `min-xs-svw` |
| `min-inline-size: 100lvh;` | `min-xs-lvh` |
| `min-inline-size: 100lvw;` | `min-xs-lvw` |
| `min-inline-size: 100vmin;` | `min-xs-vmin` |
| `min-inline-size: 100vmax;` | `min-xs-vmax` |
| `min-inline-size: fit-content;` | `min-xs-fc` |
| `min-inline-size: 100%;` | `min-xs-full` |
| `min-inline-size: 50%;` | `min-xs-half` |
| `min-inline-size: max-content;` | `min-xs-max` |
| `min-inline-size: min-content;` | `min-xs-min` |
| `min-inline-size: 1px;` | `min-xs-px` |
| `min-inline-size: stretch;` | `min-xs-s` |
| `min-inline-size: 40rem;` | `min-xs-sm` |
| `min-inline-size: 48rem;` | `min-xs-md` |
| `min-inline-size: 64rem;` | `min-xs-lg` |
| `min-inline-size: 80rem;` | `min-xs-xl` |
| `min-inline-size: 96rem;` | `min-xs-xxl` |

### margin

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin: value;` | `m-{0-100}` |
| `margin: auto;` | `m-auto` |
| `margin: 1px;` | `m-px` |

### margin-block-end

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin-block-end: value;` | `mbe-{0-100}` |
| `margin-block-end: auto;` | `mbe-auto` |
| `margin-block-end: 1px;` | `mbe-px` |

### margin-block-start

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin-block-start: value;` | `mbs-{0-100}` |
| `margin-block-start: auto;` | `mbs-auto` |
| `margin-block-start: 1px;` | `mbs-px` |

### margin-bottom

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin-bottom: value;` | `mb-{0-100}` |
| `margin-bottom: auto;` | `mb-auto` |
| `margin-bottom: 1px;` | `mb-px` |

### margin-inline-end

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin-inline-end: value;` | `mie-{0-100}` |
| `margin-inline-end: auto;` | `mie-auto` |
| `margin-inline-end: 1px;` | `mie-px` |

### margin-inline-start

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin-inline-start: value;` | `mis-{0-100}` |
| `margin-inline-start: auto;` | `mis-auto` |
| `margin-inline-start: 1px;` | `mis-px` |

### margin-left

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin-left: value;` | `ml-{0-100}` |
| `margin-left: auto;` | `ml-auto` |
| `margin-left: 1px;` | `ml-px` |

### margin-right

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin-right: value;` | `mr-{0-100}` |
| `margin-right: auto;` | `mr-auto` |
| `margin-right: 1px;` | `mr-px` |

### margin-top

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin-top: value;` | `mt-{0-100}` |
| `margin-top: auto;` | `mt-auto` |
| `margin-top: 1px;` | `mt-px` |

### margin-inline

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin-inline: value;` | `mx-{0-100}` |
| `margin-inline: auto;` | `mx-auto` |
| `margin-inline: 1px;` | `mx-px` |

### margin-block

| CSS Rule | Yumma Utility |
|----------|---------------|
| `margin-block: value;` | `my-{0-100}` |
| `margin-block: auto;` | `my-auto` |
| `margin-block: 1px;` | `my-px` |

### padding

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding: value;` | `p-{0-100}` |
| `padding: auto;` | `p-auto` |
| `padding: 1px;` | `p-px` |

### padding-block-end

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding-block-end: value;` | `pbe-{0-100}` |
| `padding-block-end: auto;` | `pbe-auto` |
| `padding-block-end: 1px;` | `pbe-px` |

### padding-block-start

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding-block-start: value;` | `pbs-{0-100}` |
| `padding-block-start: auto;` | `pbs-auto` |
| `padding-block-start: 1px;` | `pbs-px` |

### padding-bottom

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding-bottom: value;` | `pb-{0-100}` |
| `padding-bottom: auto;` | `pb-auto` |
| `padding-bottom: 1px;` | `pb-px` |

### padding-inline-end

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding-inline-end: value;` | `pie-{0-100}` |
| `padding-inline-end: auto;` | `pie-auto` |
| `padding-inline-end: 1px;` | `pie-px` |

### padding-inline-start

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding-inline-start: value;` | `pis-{0-100}` |
| `padding-inline-start: auto;` | `pis-auto` |
| `padding-inline-start: 1px;` | `pis-px` |

### padding-left

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding-left: value;` | `pl-{0-100}` |
| `padding-left: auto;` | `pl-auto` |
| `padding-left: 1px;` | `pl-px` |

### padding-right

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding-right: value;` | `pr-{0-100}` |
| `padding-right: auto;` | `pr-auto` |
| `padding-right: 1px;` | `pr-px` |

### padding-top

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding-top: value;` | `pt-{0-100}` |
| `padding-top: auto;` | `pt-auto` |
| `padding-top: 1px;` | `pt-px` |

### padding-inline

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding-inline: value;` | `px-{0-100}` |
| `padding-inline: auto;` | `px-auto` |
| `padding-inline: 1px;` | `px-px` |

### padding-block

| CSS Rule | Yumma Utility |
|----------|---------------|
| `padding-block: value;` | `py-{0-100}` |
| `padding-block: auto;` | `py-auto` |
| `padding-block: 1px;` | `py-px` |

### width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `width: value;` | `w-{0-100}` |
| `width: auto;` | `w-auto` |
| `width: 100dvh;` | `w-dvh` |
| `width: 100dvw;` | `w-dvw` |
| `width: 100vh;` | `w-vh` |
| `width: 100vw;` | `w-vw` |
| `width: 100vi;` | `w-vi` |
| `width: 100vb;` | `w-vb` |
| `width: 100svh;` | `w-svh` |
| `width: 100svw;` | `w-svw` |
| `width: 100lvh;` | `w-lvh` |
| `width: 100lvw;` | `w-lvw` |
| `width: 100vmin;` | `w-vmin` |
| `width: 100vmax;` | `w-vmax` |
| `width: fit-content;` | `w-fc` |
| `width: 100%;` | `w-full` |
| `width: 50%;` | `w-half` |
| `width: max-content;` | `w-max` |
| `width: min-content;` | `w-min` |
| `width: 1px;` | `w-px` |
| `width: stretch;` | `w-s` |
| `width: 40rem;` | `w-sm` |
| `width: 48rem;` | `w-md` |
| `width: 64rem;` | `w-lg` |
| `width: 80rem;` | `w-xl` |
| `width: 96rem;` | `w-xxl` |

### max-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `max-width: value;` | `max-w-{0-100}` |
| `max-width: auto;` | `max-w-auto` |
| `max-width: 100dvh;` | `max-w-dvh` |
| `max-width: 100dvw;` | `max-w-dvw` |
| `max-width: 100vh;` | `max-w-vh` |
| `max-width: 100vw;` | `max-w-vw` |
| `max-width: 100vi;` | `max-w-vi` |
| `max-width: 100vb;` | `max-w-vb` |
| `max-width: 100svh;` | `max-w-svh` |
| `max-width: 100svw;` | `max-w-svw` |
| `max-width: 100lvh;` | `max-w-lvh` |
| `max-width: 100lvw;` | `max-w-lvw` |
| `max-width: 100vmin;` | `max-w-vmin` |
| `max-width: 100vmax;` | `max-w-vmax` |
| `max-width: fit-content;` | `max-w-fc` |
| `max-width: 100%;` | `max-w-full` |
| `max-width: 50%;` | `max-w-half` |
| `max-width: max-content;` | `max-w-max` |
| `max-width: min-content;` | `max-w-min` |
| `max-width: 1px;` | `max-w-px` |
| `max-width: stretch;` | `max-w-s` |
| `max-width: 40rem;` | `max-w-sm` |
| `max-width: 48rem;` | `max-w-md` |
| `max-width: 64rem;` | `max-w-lg` |
| `max-width: 80rem;` | `max-w-xl` |
| `max-width: 96rem;` | `max-w-xxl` |

### min-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `min-width: value;` | `min-w-{0-100}` |
| `min-width: auto;` | `min-w-auto` |
| `min-width: 100dvh;` | `min-w-dvh` |
| `min-width: 100dvw;` | `min-w-dvw` |
| `min-width: 100vh;` | `min-w-vh` |
| `min-width: 100vw;` | `min-w-vw` |
| `min-width: 100vi;` | `min-w-vi` |
| `min-width: 100vb;` | `min-w-vb` |
| `min-width: 100svh;` | `min-w-svh` |
| `min-width: 100svw;` | `min-w-svw` |
| `min-width: 100lvh;` | `min-w-lvh` |
| `min-width: 100lvw;` | `min-w-lvw` |
| `min-width: 100vmin;` | `min-w-vmin` |
| `min-width: 100vmax;` | `min-w-vmax` |
| `min-width: fit-content;` | `min-w-fc` |
| `min-width: 100%;` | `min-w-full` |
| `min-width: 50%;` | `min-w-half` |
| `min-width: max-content;` | `min-w-max` |
| `min-width: min-content;` | `min-w-min` |
| `min-width: 1px;` | `min-w-px` |
| `min-width: stretch;` | `min-w-s` |
| `min-width: 40rem;` | `min-w-sm` |
| `min-width: 48rem;` | `min-w-md` |
| `min-width: 64rem;` | `min-w-lg` |
| `min-width: 80rem;` | `min-w-xl` |
| `min-width: 96rem;` | `min-w-xxl` |

### accent-color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `accent-color: {color};` | `ac-{color}` |
| `accent-color: #e63946;` | `ac-red` |
| `accent-color: #ff6b35;` | `ac-orange` |
| `accent-color: #ffb81c;` | `ac-yellow` |
| `accent-color: #84cc16;` | `ac-lime` |
| `accent-color: #10b981;` | `ac-mint` |
| `accent-color: #06d6a0;` | `ac-green` |
| `accent-color: #06b6d4;` | `ac-cyan` |
| `accent-color: #38bdf8;` | `ac-sky` |
| `accent-color: #2563eb;` | `ac-blue` |
| `accent-color: #6366f1;` | `ac-indigo` |
| `accent-color: #8b5cf6;` | `ac-violet` |
| `accent-color: #a78bfa;` | `ac-lavender` |
| `accent-color: #d946ef;` | `ac-magenta` |
| `accent-color: #ec4899;` | `ac-pink` |
| `accent-color: #ff6f91;` | `ac-coral` |
| `accent-color: #52525b;` | `ac-zinc` |
| `accent-color: #6b7280;` | `ac-gray` |
| `accent-color: #64748b;` | `ac-slate` |
| `accent-color: #9ca3af;` | `ac-silver` |
| `accent-color: #000000;` | `ac-black` |
| `accent-color: currentColor;` | `ac-current` |
| `accent-color: transparent;` | `ac-transparent` |
| `accent-color: #ffffff;` | `ac-white` |

### background-color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `background-color: {color};` | `bg-{color}` |
| `background-color: #e63946;` | `bg-red` |
| `background-color: #ff6b35;` | `bg-orange` |
| `background-color: #ffb81c;` | `bg-yellow` |
| `background-color: #84cc16;` | `bg-lime` |
| `background-color: #10b981;` | `bg-mint` |
| `background-color: #06d6a0;` | `bg-green` |
| `background-color: #06b6d4;` | `bg-cyan` |
| `background-color: #38bdf8;` | `bg-sky` |
| `background-color: #2563eb;` | `bg-blue` |
| `background-color: #6366f1;` | `bg-indigo` |
| `background-color: #8b5cf6;` | `bg-violet` |
| `background-color: #a78bfa;` | `bg-lavender` |
| `background-color: #d946ef;` | `bg-magenta` |
| `background-color: #ec4899;` | `bg-pink` |
| `background-color: #ff6f91;` | `bg-coral` |
| `background-color: #52525b;` | `bg-zinc` |
| `background-color: #6b7280;` | `bg-gray` |
| `background-color: #64748b;` | `bg-slate` |
| `background-color: #9ca3af;` | `bg-silver` |
| `background-color: #000000;` | `bg-black` |
| `background-color: currentColor;` | `bg-current` |
| `background-color: transparent;` | `bg-transparent` |
| `background-color: #ffffff;` | `bg-white` |

### border-color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-color: {color};` | `bc-{color}` |
| `border-color: #e63946;` | `bc-red` |
| `border-color: #ff6b35;` | `bc-orange` |
| `border-color: #ffb81c;` | `bc-yellow` |
| `border-color: #84cc16;` | `bc-lime` |
| `border-color: #10b981;` | `bc-mint` |
| `border-color: #06d6a0;` | `bc-green` |
| `border-color: #06b6d4;` | `bc-cyan` |
| `border-color: #38bdf8;` | `bc-sky` |
| `border-color: #2563eb;` | `bc-blue` |
| `border-color: #6366f1;` | `bc-indigo` |
| `border-color: #8b5cf6;` | `bc-violet` |
| `border-color: #a78bfa;` | `bc-lavender` |
| `border-color: #d946ef;` | `bc-magenta` |
| `border-color: #ec4899;` | `bc-pink` |
| `border-color: #ff6f91;` | `bc-coral` |
| `border-color: #52525b;` | `bc-zinc` |
| `border-color: #6b7280;` | `bc-gray` |
| `border-color: #64748b;` | `bc-slate` |
| `border-color: #9ca3af;` | `bc-silver` |
| `border-color: #000000;` | `bc-black` |
| `border-color: currentColor;` | `bc-current` |
| `border-color: transparent;` | `bc-transparent` |
| `border-color: #ffffff;` | `bc-white` |

### border-bottom-color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-bottom-color: {color};` | `bbc-{color}` |
| `border-bottom-color: #e63946;` | `bbc-red` |
| `border-bottom-color: #ff6b35;` | `bbc-orange` |
| `border-bottom-color: #ffb81c;` | `bbc-yellow` |
| `border-bottom-color: #84cc16;` | `bbc-lime` |
| `border-bottom-color: #10b981;` | `bbc-mint` |
| `border-bottom-color: #06d6a0;` | `bbc-green` |
| `border-bottom-color: #06b6d4;` | `bbc-cyan` |
| `border-bottom-color: #38bdf8;` | `bbc-sky` |
| `border-bottom-color: #2563eb;` | `bbc-blue` |
| `border-bottom-color: #6366f1;` | `bbc-indigo` |
| `border-bottom-color: #8b5cf6;` | `bbc-violet` |
| `border-bottom-color: #a78bfa;` | `bbc-lavender` |
| `border-bottom-color: #d946ef;` | `bbc-magenta` |
| `border-bottom-color: #ec4899;` | `bbc-pink` |
| `border-bottom-color: #ff6f91;` | `bbc-coral` |
| `border-bottom-color: #52525b;` | `bbc-zinc` |
| `border-bottom-color: #6b7280;` | `bbc-gray` |
| `border-bottom-color: #64748b;` | `bbc-slate` |
| `border-bottom-color: #9ca3af;` | `bbc-silver` |
| `border-bottom-color: #000000;` | `bbc-black` |
| `border-bottom-color: currentColor;` | `bbc-current` |
| `border-bottom-color: transparent;` | `bbc-transparent` |
| `border-bottom-color: #ffffff;` | `bbc-white` |

### border-left-color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-left-color: {color};` | `blc-{color}` |
| `border-left-color: #e63946;` | `blc-red` |
| `border-left-color: #ff6b35;` | `blc-orange` |
| `border-left-color: #ffb81c;` | `blc-yellow` |
| `border-left-color: #84cc16;` | `blc-lime` |
| `border-left-color: #10b981;` | `blc-mint` |
| `border-left-color: #06d6a0;` | `blc-green` |
| `border-left-color: #06b6d4;` | `blc-cyan` |
| `border-left-color: #38bdf8;` | `blc-sky` |
| `border-left-color: #2563eb;` | `blc-blue` |
| `border-left-color: #6366f1;` | `blc-indigo` |
| `border-left-color: #8b5cf6;` | `blc-violet` |
| `border-left-color: #a78bfa;` | `blc-lavender` |
| `border-left-color: #d946ef;` | `blc-magenta` |
| `border-left-color: #ec4899;` | `blc-pink` |
| `border-left-color: #ff6f91;` | `blc-coral` |
| `border-left-color: #52525b;` | `blc-zinc` |
| `border-left-color: #6b7280;` | `blc-gray` |
| `border-left-color: #64748b;` | `blc-slate` |
| `border-left-color: #9ca3af;` | `blc-silver` |
| `border-left-color: #000000;` | `blc-black` |
| `border-left-color: currentColor;` | `blc-current` |
| `border-left-color: transparent;` | `blc-transparent` |
| `border-left-color: #ffffff;` | `blc-white` |

### border-right-color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-right-color: {color};` | `brc-{color}` |
| `border-right-color: #e63946;` | `brc-red` |
| `border-right-color: #ff6b35;` | `brc-orange` |
| `border-right-color: #ffb81c;` | `brc-yellow` |
| `border-right-color: #84cc16;` | `brc-lime` |
| `border-right-color: #10b981;` | `brc-mint` |
| `border-right-color: #06d6a0;` | `brc-green` |
| `border-right-color: #06b6d4;` | `brc-cyan` |
| `border-right-color: #38bdf8;` | `brc-sky` |
| `border-right-color: #2563eb;` | `brc-blue` |
| `border-right-color: #6366f1;` | `brc-indigo` |
| `border-right-color: #8b5cf6;` | `brc-violet` |
| `border-right-color: #a78bfa;` | `brc-lavender` |
| `border-right-color: #d946ef;` | `brc-magenta` |
| `border-right-color: #ec4899;` | `brc-pink` |
| `border-right-color: #ff6f91;` | `brc-coral` |
| `border-right-color: #52525b;` | `brc-zinc` |
| `border-right-color: #6b7280;` | `brc-gray` |
| `border-right-color: #64748b;` | `brc-slate` |
| `border-right-color: #9ca3af;` | `brc-silver` |
| `border-right-color: #000000;` | `brc-black` |
| `border-right-color: currentColor;` | `brc-current` |
| `border-right-color: transparent;` | `brc-transparent` |
| `border-right-color: #ffffff;` | `brc-white` |

### border-top-color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `border-top-color: {color};` | `btc-{color}` |
| `border-top-color: #e63946;` | `btc-red` |
| `border-top-color: #ff6b35;` | `btc-orange` |
| `border-top-color: #ffb81c;` | `btc-yellow` |
| `border-top-color: #84cc16;` | `btc-lime` |
| `border-top-color: #10b981;` | `btc-mint` |
| `border-top-color: #06d6a0;` | `btc-green` |
| `border-top-color: #06b6d4;` | `btc-cyan` |
| `border-top-color: #38bdf8;` | `btc-sky` |
| `border-top-color: #2563eb;` | `btc-blue` |
| `border-top-color: #6366f1;` | `btc-indigo` |
| `border-top-color: #8b5cf6;` | `btc-violet` |
| `border-top-color: #a78bfa;` | `btc-lavender` |
| `border-top-color: #d946ef;` | `btc-magenta` |
| `border-top-color: #ec4899;` | `btc-pink` |
| `border-top-color: #ff6f91;` | `btc-coral` |
| `border-top-color: #52525b;` | `btc-zinc` |
| `border-top-color: #6b7280;` | `btc-gray` |
| `border-top-color: #64748b;` | `btc-slate` |
| `border-top-color: #9ca3af;` | `btc-silver` |
| `border-top-color: #000000;` | `btc-black` |
| `border-top-color: currentColor;` | `btc-current` |
| `border-top-color: transparent;` | `btc-transparent` |
| `border-top-color: #ffffff;` | `btc-white` |

### caret-color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `caret-color: {color};` | `cc-{color}` |
| `caret-color: #e63946;` | `cc-red` |
| `caret-color: #ff6b35;` | `cc-orange` |
| `caret-color: #ffb81c;` | `cc-yellow` |
| `caret-color: #84cc16;` | `cc-lime` |
| `caret-color: #10b981;` | `cc-mint` |
| `caret-color: #06d6a0;` | `cc-green` |
| `caret-color: #06b6d4;` | `cc-cyan` |
| `caret-color: #38bdf8;` | `cc-sky` |
| `caret-color: #2563eb;` | `cc-blue` |
| `caret-color: #6366f1;` | `cc-indigo` |
| `caret-color: #8b5cf6;` | `cc-violet` |
| `caret-color: #a78bfa;` | `cc-lavender` |
| `caret-color: #d946ef;` | `cc-magenta` |
| `caret-color: #ec4899;` | `cc-pink` |
| `caret-color: #ff6f91;` | `cc-coral` |
| `caret-color: #52525b;` | `cc-zinc` |
| `caret-color: #6b7280;` | `cc-gray` |
| `caret-color: #64748b;` | `cc-slate` |
| `caret-color: #9ca3af;` | `cc-silver` |
| `caret-color: #000000;` | `cc-black` |
| `caret-color: currentColor;` | `cc-current` |
| `caret-color: transparent;` | `cc-transparent` |
| `caret-color: #ffffff;` | `cc-white` |

### color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `color: {color};` | `c-{color}` |
| `color: #e63946;` | `c-red` |
| `color: #ff6b35;` | `c-orange` |
| `color: #ffb81c;` | `c-yellow` |
| `color: #84cc16;` | `c-lime` |
| `color: #10b981;` | `c-mint` |
| `color: #06d6a0;` | `c-green` |
| `color: #06b6d4;` | `c-cyan` |
| `color: #38bdf8;` | `c-sky` |
| `color: #2563eb;` | `c-blue` |
| `color: #6366f1;` | `c-indigo` |
| `color: #8b5cf6;` | `c-violet` |
| `color: #a78bfa;` | `c-lavender` |
| `color: #d946ef;` | `c-magenta` |
| `color: #ec4899;` | `c-pink` |
| `color: #ff6f91;` | `c-coral` |
| `color: #52525b;` | `c-zinc` |
| `color: #6b7280;` | `c-gray` |
| `color: #64748b;` | `c-slate` |
| `color: #9ca3af;` | `c-silver` |
| `color: #000000;` | `c-black` |
| `color: currentColor;` | `c-current` |
| `color: transparent;` | `c-transparent` |
| `color: #ffffff;` | `c-white` |

### fill

| CSS Rule | Yumma Utility |
|----------|---------------|
| `fill: {color};` | `f-{color}` |
| `fill: #e63946;` | `f-red` |
| `fill: #ff6b35;` | `f-orange` |
| `fill: #ffb81c;` | `f-yellow` |
| `fill: #84cc16;` | `f-lime` |
| `fill: #10b981;` | `f-mint` |
| `fill: #06d6a0;` | `f-green` |
| `fill: #06b6d4;` | `f-cyan` |
| `fill: #38bdf8;` | `f-sky` |
| `fill: #2563eb;` | `f-blue` |
| `fill: #6366f1;` | `f-indigo` |
| `fill: #8b5cf6;` | `f-violet` |
| `fill: #a78bfa;` | `f-lavender` |
| `fill: #d946ef;` | `f-magenta` |
| `fill: #ec4899;` | `f-pink` |
| `fill: #ff6f91;` | `f-coral` |
| `fill: #52525b;` | `f-zinc` |
| `fill: #6b7280;` | `f-gray` |
| `fill: #64748b;` | `f-slate` |
| `fill: #9ca3af;` | `f-silver` |
| `fill: #000000;` | `f-black` |
| `fill: currentColor;` | `f-current` |
| `fill: transparent;` | `f-transparent` |
| `fill: #ffffff;` | `f-white` |

### outline-color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `outline-color: {color};` | `oc-{color}` |
| `outline-color: #e63946;` | `oc-red` |
| `outline-color: #ff6b35;` | `oc-orange` |
| `outline-color: #ffb81c;` | `oc-yellow` |
| `outline-color: #84cc16;` | `oc-lime` |
| `outline-color: #10b981;` | `oc-mint` |
| `outline-color: #06d6a0;` | `oc-green` |
| `outline-color: #06b6d4;` | `oc-cyan` |
| `outline-color: #38bdf8;` | `oc-sky` |
| `outline-color: #2563eb;` | `oc-blue` |
| `outline-color: #6366f1;` | `oc-indigo` |
| `outline-color: #8b5cf6;` | `oc-violet` |
| `outline-color: #a78bfa;` | `oc-lavender` |
| `outline-color: #d946ef;` | `oc-magenta` |
| `outline-color: #ec4899;` | `oc-pink` |
| `outline-color: #ff6f91;` | `oc-coral` |
| `outline-color: #52525b;` | `oc-zinc` |
| `outline-color: #6b7280;` | `oc-gray` |
| `outline-color: #64748b;` | `oc-slate` |
| `outline-color: #9ca3af;` | `oc-silver` |
| `outline-color: #000000;` | `oc-black` |
| `outline-color: currentColor;` | `oc-current` |
| `outline-color: transparent;` | `oc-transparent` |
| `outline-color: #ffffff;` | `oc-white` |

### stroke

| CSS Rule | Yumma Utility |
|----------|---------------|
| `stroke: {color};` | `s-{color}` |
| `stroke: #e63946;` | `s-red` |
| `stroke: #ff6b35;` | `s-orange` |
| `stroke: #ffb81c;` | `s-yellow` |
| `stroke: #84cc16;` | `s-lime` |
| `stroke: #10b981;` | `s-mint` |
| `stroke: #06d6a0;` | `s-green` |
| `stroke: #06b6d4;` | `s-cyan` |
| `stroke: #38bdf8;` | `s-sky` |
| `stroke: #2563eb;` | `s-blue` |
| `stroke: #6366f1;` | `s-indigo` |
| `stroke: #8b5cf6;` | `s-violet` |
| `stroke: #a78bfa;` | `s-lavender` |
| `stroke: #d946ef;` | `s-magenta` |
| `stroke: #ec4899;` | `s-pink` |
| `stroke: #ff6f91;` | `s-coral` |
| `stroke: #52525b;` | `s-zinc` |
| `stroke: #6b7280;` | `s-gray` |
| `stroke: #64748b;` | `s-slate` |
| `stroke: #9ca3af;` | `s-silver` |
| `stroke: #000000;` | `s-black` |
| `stroke: currentColor;` | `s-current` |
| `stroke: transparent;` | `s-transparent` |
| `stroke: #ffffff;` | `s-white` |

### text-decoration-color

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-decoration-color: {color};` | `tdc-{color}` |
| `text-decoration-color: #e63946;` | `tdc-red` |
| `text-decoration-color: #ff6b35;` | `tdc-orange` |
| `text-decoration-color: #ffb81c;` | `tdc-yellow` |
| `text-decoration-color: #84cc16;` | `tdc-lime` |
| `text-decoration-color: #10b981;` | `tdc-mint` |
| `text-decoration-color: #06d6a0;` | `tdc-green` |
| `text-decoration-color: #06b6d4;` | `tdc-cyan` |
| `text-decoration-color: #38bdf8;` | `tdc-sky` |
| `text-decoration-color: #2563eb;` | `tdc-blue` |
| `text-decoration-color: #6366f1;` | `tdc-indigo` |
| `text-decoration-color: #8b5cf6;` | `tdc-violet` |
| `text-decoration-color: #a78bfa;` | `tdc-lavender` |
| `text-decoration-color: #d946ef;` | `tdc-magenta` |
| `text-decoration-color: #ec4899;` | `tdc-pink` |
| `text-decoration-color: #ff6f91;` | `tdc-coral` |
| `text-decoration-color: #52525b;` | `tdc-zinc` |
| `text-decoration-color: #6b7280;` | `tdc-gray` |
| `text-decoration-color: #64748b;` | `tdc-slate` |
| `text-decoration-color: #9ca3af;` | `tdc-silver` |
| `text-decoration-color: #000000;` | `tdc-black` |
| `text-decoration-color: currentColor;` | `tdc-current` |
| `text-decoration-color: transparent;` | `tdc-transparent` |
| `text-decoration-color: #ffffff;` | `tdc-white` |

### backdrop-blur

| CSS Rule | Yumma Utility |
|----------|---------------|
| `backdrop-filter: blur();` | `bf-b-none` |
| `backdrop-filter: blur(4px);` | `bf-b-xs` |
| `backdrop-filter: blur(8px);` | `bf-b-sm` |
| `backdrop-filter: blur(16px);` | `bf-b-md` |
| `backdrop-filter: blur(32px);` | `bf-b-lg` |
| `backdrop-filter: blur(64px);` | `bf-b-xl` |

### backdrop-grayscale

| CSS Rule | Yumma Utility |
|----------|---------------|
| `backdrop-filter: grayscale(0%);` | `bf-g-0` |
| `backdrop-filter: grayscale(10%);` | `bf-g-10` |
| `backdrop-filter: grayscale(20%);` | `bf-g-20` |
| `backdrop-filter: grayscale(30%);` | `bf-g-30` |
| `backdrop-filter: grayscale(40%);` | `bf-g-40` |
| `backdrop-filter: grayscale(50%);` | `bf-g-50` |
| `backdrop-filter: grayscale(60%);` | `bf-g-60` |
| `backdrop-filter: grayscale(70%);` | `bf-g-70` |
| `backdrop-filter: grayscale(80%);` | `bf-g-80` |
| `backdrop-filter: grayscale(90%);` | `bf-g-90` |
| `backdrop-filter: grayscale();` | `bf-g-100` |

### blur

| CSS Rule | Yumma Utility |
|----------|---------------|
| `filter: blur();` | `f-b-none` |
| `filter: blur(4px);` | `f-b-xs` |
| `filter: blur(8px);` | `f-b-sm` |
| `filter: blur(16px);` | `f-b-md` |
| `filter: blur(32px);` | `f-b-lg` |
| `filter: blur(64px);` | `f-b-xl` |

### box-shadow-outset

| CSS Rule | Yumma Utility |
|----------|---------------|
| `box-shadow: none;` | `bs-o-none` |
| `box-shadow: 0 1px 2px #0000000d;` | `bs-o-xs` |
| `box-shadow: 0 1px 3px #0000001a, 0 1px 2px -1px #0000001a;` | `bs-o-sm` |
| `box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a;` | `bs-o-md` |
| `box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;` | `bs-o-lg` |
| `box-shadow: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;` | `bs-o-xl` |
| `box-shadow: 0 25px 50px -12px #00000040;` | `bs-o-xxl` |
| `box-shadow: 0 35px 60px -15px #0000004d;` | `bs-o-3xl` |

### box-shadow-inset

| CSS Rule | Yumma Utility |
|----------|---------------|
| `box-shadow: none;` | `bs-i-none` |
| `box-shadow: inset 0 1px 2px #0000000d;` | `bs-i-xs` |
| `box-shadow: inset 0 2px 4px #0000000f;` | `bs-i-sm` |
| `box-shadow: inset 0 2px 4px #0000001a;` | `bs-i-md` |
| `box-shadow: inset 0 4px 6px #0000001a;` | `bs-i-lg` |
| `box-shadow: inset 0 6px 10px #0000001f;` | `bs-i-xl` |
| `box-shadow: inset 0 8px 16px #00000026;` | `bs-i-xxl` |
| `box-shadow: inset 0 12px 24px #00000033;` | `bs-i-3xl` |

### grayscale

| CSS Rule | Yumma Utility |
|----------|---------------|
| `filter: grayscale(0%);` | `fgr-0` |
| `filter: grayscale(10%);` | `fgr-10` |
| `filter: grayscale(20%);` | `fgr-20` |
| `filter: grayscale(30%);` | `fgr-30` |
| `filter: grayscale(40%);` | `fgr-40` |
| `filter: grayscale(50%);` | `fgr-50` |
| `filter: grayscale(60%);` | `fgr-60` |
| `filter: grayscale(70%);` | `fgr-70` |
| `filter: grayscale(80%);` | `fgr-80` |
| `filter: grayscale(90%);` | `fgr-90` |
| `filter: grayscale();` | `fgr-100` |

### mix-blend-mode

| CSS Rule | Yumma Utility |
|----------|---------------|
| `mix-blend-mode: normal;` | `mbm-n` |
| `mix-blend-mode: multiply;` | `mbm-m` |
| `mix-blend-mode: screen;` | `mbm-s` |
| `mix-blend-mode: overlay;` | `mbm-o` |
| `mix-blend-mode: darken;` | `mbm-d` |
| `mix-blend-mode: lighten;` | `mbm-l` |
| `mix-blend-mode: color-dodge;` | `mbm-cd` |
| `mix-blend-mode: color-burn;` | `mbm-cb` |
| `mix-blend-mode: hard-light;` | `mbm-hl` |
| `mix-blend-mode: soft-light;` | `mbm-sl` |
| `mix-blend-mode: difference;` | `mbm-df` |
| `mix-blend-mode: exclusion;` | `mbm-e` |
| `mix-blend-mode: hue;` | `mbm-h` |
| `mix-blend-mode: saturation;` | `mbm-st` |
| `mix-blend-mode: color;` | `mbm-c` |
| `mix-blend-mode: luminosity;` | `mbm-lu` |
| `mix-blend-mode: plus-darker;` | `mbm-pd` |
| `mix-blend-mode: plus-lighter;` | `mbm-pl` |

### opacity

| CSS Rule | Yumma Utility |
|----------|---------------|
| `opacity: 0;` | `o-0` |
| `opacity: .1;` | `o-10` |
| `opacity: .2;` | `o-20` |
| `opacity: .3;` | `o-30` |
| `opacity: .4;` | `o-40` |
| `opacity: .5;` | `o-50` |
| `opacity: .6;` | `o-60` |
| `opacity: .7;` | `o-70` |
| `opacity: .8;` | `o-80` |
| `opacity: .9;` | `o-90` |
| `opacity: 1;` | `o-100` |

### align-content

| CSS Rule | Yumma Utility |
|----------|---------------|
| `align-content: baseline;` | `ac-b` |
| `align-content: center;` | `ac-c` |
| `align-content: flex-end;` | `ac-fe` |
| `align-content: flex-start;` | `ac-fs` |
| `align-content: normal;` | `ac-n` |
| `align-content: stretch;` | `ac-st` |
| `align-content: space-around;` | `ac-sa` |
| `align-content: space-between;` | `ac-sb` |
| `align-content: space-evenly;` | `ac-se` |

### align-items

| CSS Rule | Yumma Utility |
|----------|---------------|
| `align-items: baseline;` | `ai-b` |
| `align-items: center;` | `ai-c` |
| `align-items: flex-end;` | `ai-fe` |
| `align-items: flex-start;` | `ai-fs` |
| `align-items: stretch;` | `ai-st` |

### align-self

| CSS Rule | Yumma Utility |
|----------|---------------|
| `align-self: auto;` | `as-auto` |
| `align-self: baseline;` | `as-b` |
| `align-self: center;` | `as-c` |
| `align-self: flex-end;` | `as-fe` |
| `align-self: flex-start;` | `as-fs` |
| `align-self: stretch;` | `as-st` |

### flex-basis

| CSS Rule | Yumma Utility |
|----------|---------------|
| `flex-basis: value;` | `fb-{0-100}` |
| `flex-basis: auto;` | `fb-auto` |
| `flex-basis: 100%;` | `fb-full` |
| `flex-basis: 50%;` | `fb-half` |

### flex-direction

| CSS Rule | Yumma Utility |
|----------|---------------|
| `flex-direction: column;` | `fd-c` |
| `flex-direction: column-reverse;` | `fd-cr` |
| `flex-direction: row;` | `fd-r` |
| `flex-direction: row-reverse;` | `fd-rr` |

### flex-grow

| CSS Rule | Yumma Utility |
|----------|---------------|
| `flex-grow: 0;` | `fg-0` |
| `flex-grow: 1;` | `fg-1` |
| `flex-grow: 2;` | `fg-2` |
| `flex-grow: 3;` | `fg-3` |
| `flex-grow: 4;` | `fg-4` |
| `flex-grow: 5;` | `fg-5` |
| `flex-grow: 6;` | `fg-6` |
| `flex-grow: 7;` | `fg-7` |
| `flex-grow: 8;` | `fg-8` |

### flex-shrink

| CSS Rule | Yumma Utility |
|----------|---------------|
| `flex-shrink: 0;` | `fs-0` |
| `flex-shrink: 1;` | `fs-1` |
| `flex-shrink: 2;` | `fs-2` |
| `flex-shrink: 3;` | `fs-3` |
| `flex-shrink: 4;` | `fs-4` |
| `flex-shrink: 5;` | `fs-5` |
| `flex-shrink: 6;` | `fs-6` |
| `flex-shrink: 7;` | `fs-7` |
| `flex-shrink: 8;` | `fs-8` |

### flex-wrap

| CSS Rule | Yumma Utility |
|----------|---------------|
| `flex-wrap: nowrap;` | `fw-nw` |
| `flex-wrap: wrap;` | `fw-w` |
| `flex-wrap: wrap-reverse;` | `fw-wr` |

### flex

| CSS Rule | Yumma Utility |
|----------|---------------|
| `flex: 1;` | `f-1` |
| `flex: 2;` | `f-2` |
| `flex: 3;` | `f-3` |
| `flex: 4;` | `f-4` |
| `flex: 5;` | `f-5` |
| `flex: 6;` | `f-6` |
| `flex: auto;` | `f-auto` |
| `flex: none;` | `f-none` |

### justify-content

| CSS Rule | Yumma Utility |
|----------|---------------|
| `justify-content: center;` | `jc-c` |
| `justify-content: flex-end;` | `jc-fe` |
| `justify-content: flex-start;` | `jc-fs` |
| `justify-content: normal;` | `jc-n` |
| `justify-content: stretch;` | `jc-st` |
| `justify-content: space-around;` | `jc-sa` |
| `justify-content: space-between;` | `jc-sb` |
| `justify-content: space-evenly;` | `jc-se` |

### justify-items

| CSS Rule | Yumma Utility |
|----------|---------------|
| `justify-items: center;` | `ji-c` |
| `justify-items: end;` | `ji-e` |
| `justify-items: start;` | `ji-s` |
| `justify-items: stretch;` | `ji-st` |

### justify-self

| CSS Rule | Yumma Utility |
|----------|---------------|
| `justify-self: auto;` | `js-auto` |
| `justify-self: center;` | `js-c` |
| `justify-self: end;` | `js-e` |
| `justify-self: start;` | `js-s` |
| `justify-self: stretch;` | `js-st` |

### order

| CSS Rule | Yumma Utility |
|----------|---------------|
| `order: value;` | `or-{1-11}` |
| `order: -9999;` | `or-l` |
| `order: 9999;` | `or-f` |

### font-family

| CSS Rule | Yumma Utility |
|----------|---------------|
| `font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Liberation Sans, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;` | `ff-d` |
| `font-family: ui-monospace, Cascadia Code, Source Code Pro, Menlo, Roboto Mono, Ubuntu Mono, Consolas, Liberation Mono, Courier New, monospace;` | `ff-m` |
| `font-family: Iowan Old Style, Palatino Linotype, URW Palladio L, P052, serif;` | `ff-s` |

### font-size

| CSS Rule | Yumma Utility |
|----------|---------------|
| `font-size: 0.75rem;` | `fs-xs` |
| `font-size: 0.875rem;` | `fs-sm` |
| `font-size: 1rem;` | `fs-md` |
| `font-size: 1.125rem;` | `fs-lg` |
| `font-size: 1.25rem;` | `fs-xl` |
| `font-size: 1.5rem;` | `fs-xxl` |
| `font-size: 1.875rem;` | `fs-3xl` |
| `font-size: 2.25rem;` | `fs-4xl` |
| `font-size: 3rem;` | `fs-5xl` |
| `font-size: 3.75rem;` | `fs-6xl` |
| `font-size: 4.5rem;` | `fs-7xl` |
| `font-size: 6rem;` | `fs-8xl` |
| `font-size: 8rem;` | `fs-9xl` |

### font-style

| CSS Rule | Yumma Utility |
|----------|---------------|
| `font-style: italic;` | `fs-i` |
| `font-style: normal;` | `fs-n` |

### font-weight

| CSS Rule | Yumma Utility |
|----------|---------------|
| `font-weight: 100;` | `fw-100` |
| `font-weight: 200;` | `fw-200` |
| `font-weight: 300;` | `fw-300` |
| `font-weight: 400;` | `fw-400` |
| `font-weight: 500;` | `fw-500` |
| `font-weight: 600;` | `fw-600` |
| `font-weight: 700;` | `fw-700` |
| `font-weight: 800;` | `fw-800` |
| `font-weight: 900;` | `fw-900` |

### column-gap

| CSS Rule | Yumma Utility |
|----------|---------------|
| `column-gap: value;` | `cg-{0-100}` |
| `column-gap: 1px;` | `cg-px` |

### gap

| CSS Rule | Yumma Utility |
|----------|---------------|
| `gap: value;` | `g-{0-100}` |
| `gap: 1px;` | `g-px` |

### grid-auto-columns

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-auto-columns: auto;` | `gac-auto` |
| `grid-auto-columns: max-content;` | `gac-max` |
| `grid-auto-columns: min-content;` | `gac-min` |

### grid-auto-flow

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-auto-flow: column;` | `gaf-c` |
| `grid-auto-flow: column dense;` | `gaf-cd` |
| `grid-auto-flow: dense;` | `gaf-d` |
| `grid-auto-flow: row;` | `gaf-r` |
| `grid-auto-flow: row dense;` | `gaf-rd` |

### grid-auto-rows

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-auto-rows: auto;` | `gar-auto` |
| `grid-auto-rows: max-content;` | `gar-max` |
| `grid-auto-rows: min-content;` | `gar-min` |

### grid-column

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-column: value;` | `gc-s-{1-16}` |

### grid-column-end

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-column-end: value;` | `gce-{1-16}` |

### grid-column-start

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-column-start: value;` | `gcs-{1-16}` |

### grid-row

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-row: value;` | `gr-s-{1-16}` |

### grid-row-end

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-row-end: value;` | `gre-{1-16}` |

### grid-row-start

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-row-start: value;` | `grs-{1-16}` |

### grid-template-columns

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-template-columns: value;` | `gtc-{1-16}` |

### grid-template-rows

| CSS Rule | Yumma Utility |
|----------|---------------|
| `grid-template-rows: value;` | `gtr-{1-16}` |

### place-content

| CSS Rule | Yumma Utility |
|----------|---------------|
| `place-content: baseline start;` | `pc-bs` |
| `place-content: center;` | `pc-c` |
| `place-content: end;` | `pc-e` |
| `place-content: start;` | `pc-s` |
| `place-content: space-around;` | `pc-sa` |
| `place-content: space-between;` | `pc-sb` |
| `place-content: space-evenly;` | `pc-se` |
| `place-content: stretch stretch;` | `pc-ss` |

### place-items

| CSS Rule | Yumma Utility |
|----------|---------------|
| `place-items: baseline;` | `pi-b` |
| `place-items: center;` | `pi-c` |
| `place-items: end;` | `pi-e` |
| `place-items: start;` | `pi-s` |
| `place-items: stretch stretch;` | `pi-ss` |

### place-self

| CSS Rule | Yumma Utility |
|----------|---------------|
| `place-self: auto;` | `ps-auto` |
| `place-self: center;` | `ps-c` |
| `place-self: end;` | `ps-e` |
| `place-self: start;` | `ps-s` |
| `place-self: stretch;` | `ps-st` |

### row-gap

| CSS Rule | Yumma Utility |
|----------|---------------|
| `row-gap: value;` | `rg-{0-100}` |
| `row-gap: 1px;` | `rg-px` |

### appearance

| CSS Rule | Yumma Utility |
|----------|---------------|
| `appearance: auto;` | `a-auto` |
| `appearance: none;` | `a-none` |

### cursor

| CSS Rule | Yumma Utility |
|----------|---------------|
| `cursor: alias;` | `c-a` |
| `cursor: all-scroll;` | `c-as` |
| `cursor: auto;` | `c-auto` |
| `cursor: cell;` | `c-c` |
| `cursor: crosshair;` | `c-ch` |
| `cursor: context-menu;` | `c-cm` |
| `cursor: copy;` | `c-co` |
| `cursor: col-resize;` | `c-cr` |
| `cursor: default;` | `c-d` |
| `cursor: ew-resize;` | `c-er` |
| `cursor: grab;` | `c-g` |
| `cursor: grabbing;` | `c-gr` |
| `cursor: help;` | `c-h` |
| `cursor: move;` | `c-m` |
| `cursor: not-allowed;` | `c-na` |
| `cursor: ne-resize;` | `c-ner` |
| `cursor: nesw-resize;` | `c-neswr` |
| `cursor: none;` | `c-none` |
| `cursor: n-resize;` | `c-nr` |
| `cursor: ns-resize;` | `c-nsr` |
| `cursor: nw-resize;` | `c-nwr` |
| `cursor: nwse-resize;` | `c-nwser` |
| `cursor: pointer;` | `c-p` |
| `cursor: progress;` | `c-pr` |
| `cursor: row-resize;` | `c-rs` |
| `cursor: se-resize;` | `c-ser` |
| `cursor: s-resize;` | `c-sr` |
| `cursor: sw-resize;` | `c-swr` |
| `cursor: text;` | `c-t` |
| `cursor: vertical-text;` | `c-vt` |
| `cursor: wait;` | `c-w` |
| `cursor: w-resize;` | `c-wr` |
| `cursor: zoom-in;` | `c-zi` |
| `cursor: zoom-out;` | `c-zo` |

### field-sizing

| CSS Rule | Yumma Utility |
|----------|---------------|
| `field-sizing: fixed;` | `fs-f` |
| `field-sizing: content;` | `fs-c` |

### pointer-events

| CSS Rule | Yumma Utility |
|----------|---------------|
| `pointer-events: auto;` | `pe-auto` |
| `pointer-events: none;` | `pe-none` |

### overscroll-behavior

| CSS Rule | Yumma Utility |
|----------|---------------|
| `overscroll-behavior: auto;` | `ob-auto` |
| `overscroll-behavior: contain;` | `ob-c` |
| `overscroll-behavior: none;` | `ob-none` |

### overscroll-behavior-block

| CSS Rule | Yumma Utility |
|----------|---------------|
| `overscroll-behavior-block: auto;` | `obb-auto` |
| `overscroll-behavior-block: contain;` | `obb-c` |
| `overscroll-behavior-block: none;` | `obb-none` |

### overscroll-behavior-inline

| CSS Rule | Yumma Utility |
|----------|---------------|
| `overscroll-behavior-inline: auto;` | `obi-auto` |
| `overscroll-behavior-inline: contain;` | `obi-c` |
| `overscroll-behavior-inline: none;` | `obi-none` |

### overscroll-behavior-x

| CSS Rule | Yumma Utility |
|----------|---------------|
| `overscroll-behavior-x: auto;` | `obx-auto` |
| `overscroll-behavior-x: contain;` | `obx-c` |
| `overscroll-behavior-x: none;` | `obx-none` |

### overscroll-behavior-y

| CSS Rule | Yumma Utility |
|----------|---------------|
| `overscroll-behavior-y: auto;` | `oby-auto` |
| `overscroll-behavior-y: contain;` | `oby-c` |
| `overscroll-behavior-y: none;` | `oby-none` |

### resize

| CSS Rule | Yumma Utility |
|----------|---------------|
| `resize: both;` | `r-b` |
| `resize: horizontal;` | `r-h` |
| `resize: none;` | `r-none` |
| `resize: vertical;` | `r-v` |

### scroll-behavior

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-behavior: auto;` | `sb-auto` |
| `scroll-behavior: smooth;` | `sb-s` |

### scroll-margin

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-margin: value;` | `sm-{0-100}` |
| `scroll-margin: auto;` | `sm-auto` |
| `scroll-margin: 1px;` | `sm-px` |

### scroll-margin-bottom

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-margin-bottom: value;` | `smb-{0-100}` |
| `scroll-margin-bottom: auto;` | `smb-auto` |
| `scroll-margin-bottom: 1px;` | `smb-px` |

### scroll-margin-inline-start

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-margin-inline-start: value;` | `smis-{0-100}` |
| `scroll-margin-inline-start: auto;` | `smis-auto` |
| `scroll-margin-inline-start: 1px;` | `smis-px` |

### scroll-margin-left

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-margin-left: value;` | `sml-{0-100}` |
| `scroll-margin-left: auto;` | `sml-auto` |
| `scroll-margin-left: 1px;` | `sml-px` |

### scroll-margin-right

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-margin-right: value;` | `smr-{0-100}` |
| `scroll-margin-right: auto;` | `smr-auto` |
| `scroll-margin-right: 1px;` | `smr-px` |

### scroll-margin-top

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-margin-top: value;` | `smt-{0-100}` |
| `scroll-margin-top: auto;` | `smt-auto` |
| `scroll-margin-top: 1px;` | `smt-px` |

### scroll-margin-inline-end

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-margin-inline-end: value;` | `smie-{0-100}` |
| `scroll-margin-inline-end: auto;` | `smie-auto` |
| `scroll-margin-inline-end: 1px;` | `smie-px` |

### scroll-margin-x

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-margin-left: value;` | `smx-{0-100}` |
| `scroll-margin-left: auto;` | `smx-auto` |
| `scroll-margin-left: 1px;` | `smx-px` |

### scroll-margin-y

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-margin-bottom: value;` | `smy-{0-100}` |
| `scroll-margin-bottom: auto;` | `smy-auto` |
| `scroll-margin-bottom: 1px;` | `smy-px` |

### scroll-padding

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-padding: value;` | `sp-{0-100}` |
| `scroll-padding: auto;` | `sp-auto` |
| `scroll-padding: 1px;` | `sp-px` |

### scroll-padding-bottom

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-padding-bottom: value;` | `spb-{0-100}` |
| `scroll-padding-bottom: auto;` | `spb-auto` |
| `scroll-padding-bottom: 1px;` | `spb-px` |

### scroll-padding-inline-start

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-padding-inline-start: value;` | `spis-{0-100}` |
| `scroll-padding-inline-start: auto;` | `spis-auto` |
| `scroll-padding-inline-start: 1px;` | `spis-px` |

### scroll-padding-left

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-padding-left: value;` | `spl-{0-100}` |
| `scroll-padding-left: auto;` | `spl-auto` |
| `scroll-padding-left: 1px;` | `spl-px` |

### scroll-padding-right

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-padding-right: value;` | `spr-{0-100}` |
| `scroll-padding-right: auto;` | `spr-auto` |
| `scroll-padding-right: 1px;` | `spr-px` |

### scroll-padding-top

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-padding-top: value;` | `spt-{0-100}` |
| `scroll-padding-top: auto;` | `spt-auto` |
| `scroll-padding-top: 1px;` | `spt-px` |

### scroll-padding-inline-end

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-padding-inline-end: value;` | `spie-{0-100}` |
| `scroll-padding-inline-end: auto;` | `spie-auto` |
| `scroll-padding-inline-end: 1px;` | `spie-px` |

### scroll-padding-x

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-padding-left: value;` | `spx-{0-100}` |
| `scroll-padding-left: auto;` | `spx-auto` |
| `scroll-padding-left: 1px;` | `spx-px` |

### scroll-padding-y

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-padding-bottom: value;` | `spy-{0-100}` |
| `scroll-padding-bottom: auto;` | `spy-auto` |
| `scroll-padding-bottom: 1px;` | `spy-px` |

### scroll-snap-align

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-snap-align: center;` | `ssa-c` |
| `scroll-snap-align: end;` | `ssa-e` |
| `scroll-snap-align: none;` | `ssa-none` |
| `scroll-snap-align: start;` | `ssa-s` |

### scroll-snap-stop

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-snap-stop: always;` | `sss-a` |
| `scroll-snap-stop: normal;` | `sss-n` |

### scroll-snap-type

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scroll-snap-type: both mandatory;` | `sst-bm` |
| `scroll-snap-type: none;` | `sst-none` |
| `scroll-snap-type: x mandatory;` | `sst-xm` |
| `scroll-snap-type: x proximity;` | `sst-xp` |
| `scroll-snap-type: y mandatory;` | `sst-ym` |
| `scroll-snap-type: y proximity;` | `sst-yp` |

### user-select

| CSS Rule | Yumma Utility |
|----------|---------------|
| `user-select: all;` | `us-a` |
| `user-select: auto;` | `us-auto` |
| `user-select: none;` | `us-none` |
| `user-select: text;` | `us-t` |

### touch-action

| CSS Rule | Yumma Utility |
|----------|---------------|
| `touch-action: auto;` | `ta-auto` |
| `touch-action: manipulation;` | `ta-m` |
| `touch-action: none;` | `ta-none` |
| `touch-action: pan-down;` | `ta-pd` |
| `touch-action: pan-left;` | `ta-pl` |
| `touch-action: pan-right;` | `ta-pr` |
| `touch-action: pan-up;` | `ta-pu` |
| `touch-action: pan-x;` | `ta-px` |
| `touch-action: pan-y;` | `ta-py` |
| `touch-action: pinch-zoom;` | `ta-pz` |

### clear

| CSS Rule | Yumma Utility |
|----------|---------------|
| `clear: both;` | `cl-b` |
| `clear: inline-end;` | `cl-ie` |
| `clear: inline-start;` | `cl-is` |
| `clear: left;` | `cl-l` |
| `clear: none;` | `cl-none` |
| `clear: right;` | `cl-r` |

### container-type

| CSS Rule | Yumma Utility |
|----------|---------------|
| `container-type: inline-size;` | `ct-is` |
| `container-type: none;` | `ct-none` |
| `container-type: size;` | `ct-s` |

### table-layout

| CSS Rule | Yumma Utility |
|----------|---------------|
| `table-layout: auto;` | `tl-a` |
| `table-layout: fixed;` | `tl-f` |

### display

| CSS Rule | Yumma Utility |
|----------|---------------|
| `display: block;` | `d-b` |
| `display: flex;` | `d-f` |
| `display: flow-root;` | `d-fr` |
| `display: grid;` | `d-g` |
| `display: inline;` | `d-i` |
| `display: inline-block;` | `d-ib` |
| `display: inline-flex;` | `d-if` |
| `display: inline-grid;` | `d-ig` |
| `display: inline-table;` | `d-it` |
| `display: none;` | `d-none` |
| `display: table;` | `d-t` |
| `display: table-cell;` | `d-tc` |
| `display: table-column;` | `d-tco` |
| `display: table-row;` | `d-tr` |

### float

| CSS Rule | Yumma Utility |
|----------|---------------|
| `float: inline-end;` | `fl-ie` |
| `float: inline-start;` | `fl-is` |
| `float: left;` | `fl-l` |
| `float: none;` | `fl-none` |
| `float: right;` | `fl-r` |

### isolation

| CSS Rule | Yumma Utility |
|----------|---------------|
| `isolation: auto;` | `is-auto` |
| `isolation: isolate;` | `is-i` |

### outline-offset

| CSS Rule | Yumma Utility |
|----------|---------------|
| `outline-offset: 0;` | `oo-0` |
| `outline-offset: 1px;` | `oo-1` |
| `outline-offset: 2px;` | `oo-2` |
| `outline-offset: 3px;` | `oo-3` |
| `outline-offset: 4px;` | `oo-4` |

### outline-style

| CSS Rule | Yumma Utility |
|----------|---------------|
| `outline-style: none;` | `os-none` |
| `outline-style: dashed;` | `os-d` |
| `outline-style: solid;` | `os-s` |

### outline-width

| CSS Rule | Yumma Utility |
|----------|---------------|
| `outline-width: 0;` | `ow-0` |
| `outline-width: 1px;` | `ow-1` |
| `outline-width: 2px;` | `ow-2` |
| `outline-width: 3px;` | `ow-3` |
| `outline-width: 4px;` | `ow-4` |

### bottom

| CSS Rule | Yumma Utility |
|----------|---------------|
| `bottom: value;` | `b-{0-100}` |
| `bottom: auto;` | `b-auto` |
| `bottom: 100%;` | `b-full` |
| `bottom: 50%;` | `b-half` |

### inset

| CSS Rule | Yumma Utility |
|----------|---------------|
| `inset: value;` | `i-{0-100}` |
| `inset: auto;` | `i-auto` |
| `inset: 100%;` | `i-full` |
| `inset: 50%;` | `i-half` |

### inset-x

| CSS Rule | Yumma Utility |
|----------|---------------|
| `left: value;` | `ix-{0-100}` |
| `left: auto;` | `ix-auto` |
| `left: 100%;` | `ix-full` |
| `left: 50%;` | `ix-half` |

### inset-y

| CSS Rule | Yumma Utility |
|----------|---------------|
| `top: value;` | `iy-{0-100}` |
| `top: auto;` | `iy-auto` |
| `top: 100%;` | `iy-full` |
| `top: 50%;` | `iy-half` |

### left

| CSS Rule | Yumma Utility |
|----------|---------------|
| `left: value;` | `l-{0-100}` |
| `left: auto;` | `l-auto` |
| `left: 100%;` | `l-full` |
| `left: 50%;` | `l-half` |

### right

| CSS Rule | Yumma Utility |
|----------|---------------|
| `right: value;` | `r-{0-100}` |
| `right: auto;` | `r-auto` |
| `right: 100%;` | `r-full` |
| `right: 50%;` | `r-half` |

### top

| CSS Rule | Yumma Utility |
|----------|---------------|
| `top: value;` | `t-{0-100}` |
| `top: auto;` | `t-auto` |
| `top: 100%;` | `t-full` |
| `top: 50%;` | `t-half` |

### object-fit

| CSS Rule | Yumma Utility |
|----------|---------------|
| `object-fit: cover;` | `of-c` |
| `object-fit: fill;` | `of-f` |
| `object-fit: none;` | `of-none` |
| `object-fit: scale-down;` | `of-sd` |

### object-position

| CSS Rule | Yumma Utility |
|----------|---------------|
| `object-position: bottom;` | `op-b` |
| `object-position: center;` | `op-c` |
| `object-position: left;` | `op-l` |
| `object-position: left bottom;` | `op-lb` |
| `object-position: left top;` | `op-lt` |
| `object-position: right;` | `op-r` |
| `object-position: right bottom;` | `op-rb` |
| `object-position: right top;` | `op-rt` |
| `object-position: top;` | `op-t` |

### overflow

| CSS Rule | Yumma Utility |
|----------|---------------|
| `overflow: auto;` | `o-auto` |
| `overflow: clip;` | `o-c` |
| `overflow: hidden;` | `o-h` |
| `overflow: scroll;` | `o-s` |
| `overflow: visible;` | `o-v` |

### overflow-x

| CSS Rule | Yumma Utility |
|----------|---------------|
| `overflow-x: auto;` | `ox-auto` |
| `overflow-x: clip;` | `ox-c` |
| `overflow-x: hidden;` | `ox-h` |
| `overflow-x: scroll;` | `ox-s` |
| `overflow-x: visible;` | `ox-v` |

### overflow-y

| CSS Rule | Yumma Utility |
|----------|---------------|
| `overflow-y: auto;` | `oy-auto` |
| `overflow-y: clip;` | `oy-c` |
| `overflow-y: hidden;` | `oy-h` |
| `overflow-y: scroll;` | `oy-s` |
| `overflow-y: visible;` | `oy-v` |

### position

| CSS Rule | Yumma Utility |
|----------|---------------|
| `position: absolute;` | `p-a` |
| `position: fixed;` | `p-f` |
| `position: relative;` | `p-r` |
| `position: static;` | `p-s` |
| `position: sticky;` | `p-st` |

### visibility

| CSS Rule | Yumma Utility |
|----------|---------------|
| `visibility: collapse;` | `v-c` |
| `visibility: hidden;` | `v-h` |
| `visibility: visible;` | `v-v` |

### z-index

| CSS Rule | Yumma Utility |
|----------|---------------|
| `z-index: 0;` | `zi-0` |
| `z-index: 10;` | `zi-10` |
| `z-index: 20;` | `zi-20` |
| `z-index: 30;` | `zi-30` |
| `z-index: 40;` | `zi-40` |
| `z-index: 50;` | `zi-50` |
| `z-index: 60;` | `zi-60` |
| `z-index: 70;` | `zi-70` |
| `z-index: 80;` | `zi-80` |
| `z-index: 90;` | `zi-90` |
| `z-index: 9999;` | `zi-9999` |
| `z-index: auto;` | `zi-auto` |

### letter-spacing

| CSS Rule | Yumma Utility |
|----------|---------------|
| `letter-spacing: 0;` | `ls-0` |
| `letter-spacing: -.05em;` | `ls-1` |
| `letter-spacing: -.025em;` | `ls-2` |
| `letter-spacing: .025em;` | `ls-3` |
| `letter-spacing: .05em;` | `ls-4` |
| `letter-spacing: .1em;` | `ls-5` |

### line-height

| CSS Rule | Yumma Utility |
|----------|---------------|
| `line-height: 1;` | `lh-1` |
| `line-height: 1.25;` | `lh-2` |
| `line-height: 1.375;` | `lh-3` |
| `line-height: 1.5;` | `lh-4` |
| `line-height: 1.625;` | `lh-5` |
| `line-height: 2;` | `lh-6` |

### list-style-position

| CSS Rule | Yumma Utility |
|----------|---------------|
| `list-style-position: inside;` | `lsp-i` |
| `list-style-position: outside;` | `lsp-o` |

### list-style-type

| CSS Rule | Yumma Utility |
|----------|---------------|
| `list-style-type: circle;` | `lst-c` |
| `list-style-type: disc;` | `lst-d` |
| `list-style-type: square;` | `lst-s` |

### overflow-wrap

| CSS Rule | Yumma Utility |
|----------|---------------|
| `overflow-wrap: break-word;` | `ow-bw` |
| `overflow-wrap: normal;` | `ow-n` |

### text-align

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-align: center;` | `ta-c` |
| `text-align: end;` | `ta-e` |
| `text-align: justify;` | `ta-j` |
| `text-align: justify-all;` | `ta-ja` |
| `text-align: left;` | `ta-l` |
| `text-align: match-parent;` | `ta-mp` |
| `text-align: right;` | `ta-r` |
| `text-align: start;` | `ta-s` |

### text-decoration-line

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-decoration-line: line-through;` | `tdl-lt` |
| `text-decoration-line: none;` | `tdl-none` |
| `text-decoration-line: overline;` | `tdl-o` |
| `text-decoration-line: underline;` | `tdl-u` |

### text-decoration-style

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-decoration-style: dashed;` | `tds-d` |
| `text-decoration-style: solid;` | `tds-s` |
| `text-decoration-style: wavy;` | `tds-w` |

### text-decoration-thickness

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-decoration-thickness: 0;` | `tdt-0` |
| `text-decoration-thickness: 1px;` | `tdt-1` |
| `text-decoration-thickness: 2px;` | `tdt-2` |
| `text-decoration-thickness: 3px;` | `tdt-3` |
| `text-decoration-thickness: 4px;` | `tdt-4` |
| `text-decoration-thickness: auto;` | `tdt-auto` |
| `text-decoration-thickness: from-font;` | `tdt-ff` |

### text-decoration

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-decoration: none;` | `td-none` |
| `text-decoration: underline;` | `td-u` |

### text-indent

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-indent: 0;` | `ti-0` |
| `text-indent: 1px;` | `ti-1` |
| `text-indent: .25rem;` | `ti-2` |
| `text-indent: .5rem;` | `ti-3` |
| `text-indent: .75rem;` | `ti-4` |

### text-overflow

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-overflow: clip;` | `to-c` |
| `text-overflow: ellipsis;` | `to-e` |

### text-transform

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-transform: capitalize;` | `tt-c` |
| `text-transform: lowercase;` | `tt-l` |
| `text-transform: none;` | `tt-n` |
| `text-transform: uppercase;` | `tt-u` |

### text-underline-offset

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-underline-offset: 0;` | `tuo-0` |
| `text-underline-offset: 1px;` | `tuo-1` |
| `text-underline-offset: 2px;` | `tuo-2` |
| `text-underline-offset: 4px;` | `tuo-4` |
| `text-underline-offset: 8px;` | `tuo-8` |
| `text-underline-offset: auto;` | `tuo-auto` |

### text-wrap

| CSS Rule | Yumma Utility |
|----------|---------------|
| `text-wrap: balance;` | `tw-b` |
| `text-wrap: nowrap;` | `tw-n` |
| `text-wrap: pretty;` | `tw-p` |
| `text-wrap: wrap;` | `tw-w` |

### white-space

| CSS Rule | Yumma Utility |
|----------|---------------|
| `white-space: break-spaces;` | `ws-bs` |
| `white-space: normal;` | `ws-n` |
| `white-space: nowrap;` | `ws-nw` |
| `white-space: pre;` | `ws-p` |
| `white-space: pre-line;` | `ws-pl` |
| `white-space: pre-wrap;` | `ws-pw` |

### vertical-align

| CSS Rule | Yumma Utility |
|----------|---------------|
| `vertical-align: bottom;` | `va-b` |
| `vertical-align: baseline;` | `va-ba` |
| `vertical-align: middle;` | `va-m` |
| `vertical-align: sub;` | `va-s` |
| `vertical-align: super;` | `va-su` |
| `vertical-align: top;` | `va-t` |
| `vertical-align: text-bottom;` | `va-tb` |
| `vertical-align: text-top;` | `va-tt` |

### writing-mode

| CSS Rule | Yumma Utility |
|----------|---------------|
| `writing-mode: horizontal-tb;` | `wm-htb` |
| `writing-mode: sideways-lr;` | `wm-slr` |
| `writing-mode: sideways-rl;` | `wm-srl` |
| `writing-mode: vertical-lr;` | `wm-vlr` |
| `writing-mode: vertical-rl;` | `wm-vrl` |

### word-break

| CSS Rule | Yumma Utility |
|----------|---------------|
| `word-break: auto-phrase;` | `wb-ap` |
| `word-break: break-all;` | `wb-ba` |
| `word-break: keep-all;` | `wb-ka` |
| `word-break: normal;` | `wb-n` |

### rotate

| CSS Rule | Yumma Utility |
|----------|---------------|
| `rotate: value;` | `ro-{0-100}` |

### scale

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scale: 0;` | `s-0` |
| `scale: .1;` | `s-10` |
| `scale: .2;` | `s-20` |
| `scale: .3;` | `s-30` |
| `scale: .4;` | `s-40` |
| `scale: .5;` | `s-50` |
| `scale: .6;` | `s-60` |
| `scale: .7;` | `s-70` |
| `scale: .8;` | `s-80` |
| `scale: .9;` | `s-90` |
| `scale: 1;` | `s-100` |

### scale-x

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scale: 0;` | `sx-0` |
| `scale: .1;` | `sx-10` |
| `scale: .2;` | `sx-20` |
| `scale: .3;` | `sx-30` |
| `scale: .4;` | `sx-40` |
| `scale: .5;` | `sx-50` |
| `scale: .6;` | `sx-60` |
| `scale: .7;` | `sx-70` |
| `scale: .8;` | `sx-80` |
| `scale: .9;` | `sx-90` |
| `scale: 1;` | `sx-100` |

### scale-y

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scale: 0;` | `sy-0` |
| `scale: .1;` | `sy-10` |
| `scale: .2;` | `sy-20` |
| `scale: .3;` | `sy-30` |
| `scale: .4;` | `sy-40` |
| `scale: .5;` | `sy-50` |
| `scale: .6;` | `sy-60` |
| `scale: .7;` | `sy-70` |
| `scale: .8;` | `sy-80` |
| `scale: .9;` | `sy-90` |
| `scale: 1;` | `sy-100` |

### scale-z

| CSS Rule | Yumma Utility |
|----------|---------------|
| `scale: 0;` | `sz-0` |
| `scale: .1;` | `sz-10` |
| `scale: .2;` | `sz-20` |
| `scale: .3;` | `sz-30` |
| `scale: .4;` | `sz-40` |
| `scale: .5;` | `sz-50` |
| `scale: .6;` | `sz-60` |
| `scale: .7;` | `sz-70` |
| `scale: .8;` | `sz-80` |
| `scale: .9;` | `sz-90` |
| `scale: 1;` | `sz-100` |

### skew

| CSS Rule | Yumma Utility |
|----------|---------------|
| `transform: skew(1deg);` | `ts-1` |
| `transform: skew(2deg);` | `ts-2` |
| `transform: skew(3deg);` | `ts-3` |
| `transform: skew(6deg);` | `ts-6` |
| `transform: skew(12deg);` | `ts-12` |

### skew-x

| CSS Rule | Yumma Utility |
|----------|---------------|
| `transform: skewX(1deg);` | `tsx-1` |
| `transform: skewX(2deg);` | `tsx-2` |
| `transform: skewX(3deg);` | `tsx-3` |
| `transform: skewX(6deg);` | `tsx-6` |
| `transform: skewX(12deg);` | `tsx-12` |

### skew-y

| CSS Rule | Yumma Utility |
|----------|---------------|
| `transform: skewY(1deg);` | `tsy-1` |
| `transform: skewY(2deg);` | `tsy-2` |
| `transform: skewY(3deg);` | `tsy-3` |
| `transform: skewY(6deg);` | `tsy-6` |
| `transform: skewY(12deg);` | `tsy-12` |

### transform-origin

| CSS Rule | Yumma Utility |
|----------|---------------|
| `transform-origin: bottom;` | `tor-b` |
| `transform-origin: 0 100%;` | `tor-bl` |
| `transform-origin: 100% 100%;` | `tor-br` |
| `transform-origin: center;` | `tor-c` |
| `transform-origin: 0;` | `tor-l` |
| `transform-origin: 100%;` | `tor-r` |
| `transform-origin: top;` | `tor-t` |
| `transform-origin: 0 0;` | `tor-tl` |
| `transform-origin: 100% 0;` | `tor-tr` |

### translate

| CSS Rule | Yumma Utility |
|----------|---------------|
| `translate: value;` | `tr-{0-100}` |
| `translate: 100% 100%;` | `tr-full` |
| `translate: 50% 50%;` | `tr-half` |

### translate-x

| CSS Rule | Yumma Utility |
|----------|---------------|
| `transform: value;` | `ttx-{0-100}` |
| `transform: translateX(100%);` | `ttx-full` |
| `transform: translateX(50%);` | `ttx-half` |

### translate-y

| CSS Rule | Yumma Utility |
|----------|---------------|
| `transform: value;` | `tty-{0-100}` |
| `transform: translateY(100%);` | `tty-full` |
| `transform: translateY(50%);` | `tty-half` |

### transition-delay

| CSS Rule | Yumma Utility |
|----------|---------------|
| `transition-delay: 0;` | `td-0` |
| `transition-delay: 50ms;` | `td-50` |
| `transition-delay: 100ms;` | `td-100` |
| `transition-delay: 150ms;` | `td-150` |
| `transition-delay: 200ms;` | `td-200` |
| `transition-delay: 250ms;` | `td-250` |
| `transition-delay: 300ms;` | `td-300` |
| `transition-delay: 350ms;` | `td-350` |
| `transition-delay: 400ms;` | `td-400` |
| `transition-delay: 450ms;` | `td-450` |
| `transition-delay: 500ms;` | `td-500` |
| `transition-delay: 550ms;` | `td-550` |
| `transition-delay: 600ms;` | `td-600` |
| `transition-delay: 650ms;` | `td-650` |
| `transition-delay: 700ms;` | `td-700` |
| `transition-delay: 750ms;` | `td-750` |
| `transition-delay: 800ms;` | `td-800` |
| `transition-delay: 850ms;` | `td-850` |
| `transition-delay: 900ms;` | `td-900` |
| `transition-delay: 950ms;` | `td-950` |
| `transition-delay: 1000ms;` | `td-1000` |

### transition-duration

| CSS Rule | Yumma Utility |
|----------|---------------|
| `transition-duration: 0;` | `tdu-0` |
| `transition-duration: 50ms;` | `tdu-50` |
| `transition-duration: 100ms;` | `tdu-100` |
| `transition-duration: 150ms;` | `tdu-150` |
| `transition-duration: 200ms;` | `tdu-200` |
| `transition-duration: 250ms;` | `tdu-250` |
| `transition-duration: 300ms;` | `tdu-300` |
| `transition-duration: 350ms;` | `tdu-350` |
| `transition-duration: 400ms;` | `tdu-400` |
| `transition-duration: 450ms;` | `tdu-450` |
| `transition-duration: 500ms;` | `tdu-500` |
| `transition-duration: 550ms;` | `tdu-550` |
| `transition-duration: 600ms;` | `tdu-600` |
| `transition-duration: 650ms;` | `tdu-650` |
| `transition-duration: 700ms;` | `tdu-700` |
| `transition-duration: 750ms;` | `tdu-750` |
| `transition-duration: 800ms;` | `tdu-800` |
| `transition-duration: 850ms;` | `tdu-850` |
| `transition-duration: 900ms;` | `tdu-900` |
| `transition-duration: 950ms;` | `tdu-950` |
| `transition-duration: 1000ms;` | `tdu-1000` |

### transition-property

| CSS Rule | Yumma Utility |
|----------|---------------|
| `transition-property: all;` | `tp-a` |
| `transition-property: box-shadow;` | `tp-bs` |
| `transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;` | `tp-c` |
| `transition-property: height, width;` | `tp-d` |
| `transition-property: height;` | `tp-h` |
| `transition-property: none;` | `tp-none` |
| `transition-property: opacity;` | `tp-o` |
| `transition-property: transform;` | `tp-t` |
| `transition-property: width;` | `tp-w` |

### transition-timing-function

| CSS Rule | Yumma Utility |
|----------|---------------|
| `transition-timing-function: linear;` | `ttf-l` |
| `transition-timing-function: ease-in;` | `ttf-ei` |
| `transition-timing-function: ease-out;` | `ttf-eo` |
| `transition-timing-function: ease-in-out;` | `ttf-io` |

