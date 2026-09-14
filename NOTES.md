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

1. **Selecting an attribute needs no parser work.** A variant's `value` is
   concatenated onto the escaped class name, so an entry holding
   `"[data-open]"` emits `.x\:o-0[data-open]` today. What is missing is only a
   decision about how to spell one. Naming Base UI's `data-starting-style`
   directly would put another library's vocabulary in this table, so the shape
   worth having is the general one: an attribute selector, written as CSS
   already writes it.
2. **`translate` has no per-axis utility.** `tr-*` sets both axes to the same
   value and `tty-*` writes `transform: translateY(...)`, which is a different
   property and will not transition alongside `translate`. The popup CSS wants
   `translate: 0 4px`, which nothing emits.
