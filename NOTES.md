# Notes

What the code does not say for itself. The reasoning lives here so PR bodies
can stay to what changed.

## `@rm:`, and what it does not finish

`prefers-reduced-motion` joins the media queries as `@rm:`, beside `@pc:` for
pointer. Both are conditions rather than widths, and the prefix is the initials
the rest of the table uses.

It exists for one measured reason. **Twelve Yumma UI components carry 161 lines
of hand-written CSS** for popup enter and exit, and every one of them ends with
a `@media (prefers-reduced-motion: reduce)` block that no utility could express.
That block can now be `@rm:tp-none`.

**Two things still stop those blocks becoming utilities**, and neither is what
the docs' TODO said it was:

1. **A named prefix can already carry an attribute selector.** A variant's
   `value` is concatenated onto the escaped class name, so an entry
   `{ prefix: "xo", value: "[data-open]" }` makes `xo:o-0` canon and emits
   `.xo\:o-0[data-open] { opacity: 0 }`. Measured: valid through
   `validateClasses`, generated, no parser change.

   **The bracket form does not work and must not be built.** `[data-open]:o-0`
   fails validation, and it should: brackets in a class name are the arbitrary
   value shape this framework does not have. Any attribute variant is a named
   prefix in the table like every other one.

   What is left is only which attributes earn a prefix. Naming Base UI's
   `data-starting-style` would put another library's vocabulary in this table,
   so the names have to come from the attributes themselves.
2. **`translate` has no per-axis utility.** `tr-*` sets both axes to the same
   value and `tty-*` writes `transform: translateY(...)`, which is a different
   property and will not transition alongside `translate`. The popup CSS wants
   `translate: 0 4px`, which nothing emits.

## OKLab shades, and the evenness claim that did not survive

`generateShades` mixes in OKLab instead of sRGB, and `tinycolor2` is gone.
Core now has no dependencies at all.

**The bundle half of the argument holds.** `packages/core/dist/index.mjs` goes
from **55,930 B to 41,831 B**, a 25% cut, for `mix` and `toHexString`. The
replacement is two matrix conversions and a lerp, about 40 lines.

**The evenness half does not.** Measured max/min ratio of consecutive OKLab
lightness steps across all 19 families, before and after:

| | sRGB mix | OKLab mix |
|---|---|---|
| median | 2.51x | 2.37x |
| yellow, the worst | 5.60x | 5.19x |
| green | 4.97x | 3.83x |
| silver, lavender, violet, indigo, slate, gray | | slightly worse |

**Changing the space does not fix the ramp, because the space was not the
problem.** The weights are absolute percentages from the base toward white and
black, so the light half of a light-native hue crowds into whatever lightness
is left above it while its dark half spans everything below. Yellow sits at
L 0.97, so six light steps share 0.03 and six dark steps share 0.97. That is
arithmetic, not colour science.

**Fixing it means targeting lightness directly**, which collides with the base
being the brand colour at index 6: even steps and a preserved base cannot both
hold unless the base happens to sit mid-lightness. That is a real decision and
it is not this change.

**What moved.** 247 shades, 20 unchanged, mean worst-channel shift 14.3 of 255,
largest `green-4` from `#4ce1bb` to `#79e3ba`. Every base is preserved exactly.
