# Notes

What the code does not say for itself. The reasoning lives here so PR bodies
can stay to what changed.

## `@prm:`, and what it does not finish

`prefers-reduced-motion` joins the media queries as `@prm:`, beside `@pc:` for
pointer. Both are conditions rather than widths, and the prefix is the initials
the rest of the table uses.

It exists for one measured reason. **Twelve Yumma UI components carry 161 lines
of hand-written CSS** for popup enter and exit, and every one of them ends with
a `@media (prefers-reduced-motion: reduce)` block that no utility could express.
That block can now be `@prm:tp-none`.

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

   **Answered in 4.2.0 by `theme.states`**: a project names its own attribute
   variants in its config, so the table stays free of any library's names.
   Yumma UI's registry defines `opening:` and `closing:` that way.
2. **`translate` has no per-axis utility.** Still true in 4.2.2. `tr-*` sets both axes to the same
   value and `tty-*` writes `transform: translateY(...)`, which is a different
   property and will not transition alongside `translate`. The popup CSS wants
   `translate: 0 4px`, which nothing emits.

## Trusted Publishing: pnpm cannot, npm can

The v4 note asked whether `pnpm -r publish` supports OIDC. **It does not.**
pnpm 10.30.3 has six references to `trustedPublish` and every one is
install-side, reading whether a package on the registry was published by a
trusted publisher. Searched its bundle for the publish-side markers a runner
needs, `ACTIONS_ID_TOKEN_REQUEST_URL`, `ACTIONS_ID_TOKEN_REQUEST_TOKEN`,
`oidc`, `id-token`: **zero hits for all four**.

npm has it. npm 12.0.2 carries `lib/utils/oidc.js`, and `libnpmpublish` reads
`ACTIONS_ID_TOKEN_REQUEST_URL`. Node 22 ships npm 10.9.7, which is too old, so
the workflow installs a current npm first.

**`npm publish` cannot be pointed at a workspace directly**: seven of the eight
manifests carry `workspace:*` dependencies, and npm would publish that string
verbatim. `pnpm pack` rewrites it: packing `@yummacss/nitro` produced
`"@yummacss/core": "3.31.1"` in the tarball. So the shape is **pack with pnpm,
publish the tarball with npm**, which keeps workspace resolution and gains
OIDC.

Two lines in the workflow do it. `pnpm -r exec pnpm pack` writes every
tarball, six since 4.2.2, into one directory, then a loop publishes each. Publishing every
tarball in the directory means nothing has to match a tarball to a package
name: npm reads the name out of the file. Dry-run against a stubbed `npm`:
eight packed, eight published, `workspace:*` rewritten in each.

**`NODE_AUTH_TOKEN` stays in the workflow on purpose.** npm uses OIDC where a
trusted publisher is configured and falls back to the token everywhere else, so
this can land before the npmjs side is done and there is no flag day. Drop the
secret once a release proves OIDC ran.

**Two things this cannot verify from here.** It is never exercised until a real
release, and the npmjs side is a web form **per package**, six of them now.

**4.2.2 did not prove it, 2026-10-01.** Run `36775926217` printed "npm tokens
that bypass 2FA are being restricted" for every package, which npm says only
when it authenticates with the token. So the token is still doing the work,
and it dies 2026-11-27. Check each package's trusted publisher entry on
npmjs before the next release; the secret stays until a release publishes
without that notice.

## `@xs:` at 32rem

Renildo's call, 2026-09-16. `xs` was the only t-shirt width alias with no query
behind it: `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem and `xxl` 96rem are
all exactly their breakpoints, and `max-w-xs` meant 32rem and nothing else.
Adding the breakpoint makes the alias honest rather than dropping it, and gives
the set a narrow-screen query it did not have.

Queries emit ascending, so 32rem lands before 40rem and the cascade still
resolves widest-last. `tests/breakpoints.test.ts` pins both.

## Markup inside a JavaScript string

The JavaScript lexer hands each string and each static chunk of a template
literal to `addClasses`, which splits on whitespace and drops any word holding
a quote or `=`. Markup in a string, such as a custom element's `innerHTML`,
puts a quote against the first and last class of every attribute:
`class="d:f p:4"` gave `class="d:f` and `p:4"`, both dropped. `addString`
splits the text on quotes first, which also covers an attribute that an
interpolation cuts in two.

## Two packages retired, 2026-09-30

`@yummacss/cdn` and `@yummacss/intellisense` left the monorepo with the
playground at play.yummacss.com. Nothing inside it depended on either: the
playground was the last user of the editor smarts, and it had already moved
to `validateClasses` and `suggestClasses` in `@yummacss/nitro/browser`. The
script tag build generated CSS at runtime in the browser, which the CLI,
PostCSS and Vite already cover for any real project. Fewer packages to build,
test, bump and publish. `@yummacss/intellisense` stays on npm, deprecated;
`@yummacss/cdn` was unpublished.

