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
   `{ prefix: "xo", value: "[data-open]" }` makes `xo:o-0` valid and emits
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
   Yumma UI's components use `opening:` and `closing:`, declared that way.
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

**OIDC has published since 4.2.0, checked 2026-10-03.** `npm view
yummacss@4.2.2 _npmUser` names `GitHubActions` with a `trustedPublisher`
entry, and so does every package at 4.2.2, each with SLSA provenance; 4.2.0
too. The "npm tokens that bypass 2FA are being restricted" notice in run
`36775926217` is printed because the token is configured, not because npm
used it. An earlier reading of that notice said the opposite and was wrong.
So `NODE_AUTH_TOKEN` can leave the workflow and the secret can be deleted;
the 2026-11-27 expiry no longer matters. `yummaui` is the exception: 0.4.0
was published as `rrenildopereiraa`.

**4.3.0 prepared, 2026-10-03**, from `chore/release-4.3`. It also carries
`48582e6` (the Oxlint tests and the eslint removal), which was pushed to
`feat/lint-plugin` after #64 merged.

`pnpm release` and `pnpm bump` read only the `packages/*` folders that hold a
`package.json`. A folder left by a removed package (`packages/canon`, its
`node_modules` still there) stopped `pnpm release` on Renildo's machine,
2026-10-03.

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


## Lint rules for Oxlint and ESLint, 2026-10-01

`@yummacss/lint` is one file in the ESLint v9 plugin shape. Measured
with Oxlint 1.86.0 and ESLint 10.11.0: both load it and report the same
findings on the same file. Oxlint's JS plugins are alpha and outside semver,
so a minor Oxlint can break the plugin; the ESLint shape is the stable side.
`// eslint-disable-next-line` works in both; `oxlint-disable` only in Oxlint.

**The shape follows shadcn/lint**, Renildo's pointer, read at `a89d047`
(2026-09-22). What carried over, in our own code:

- **Rules are named for what they forbid**: `no-unknown-classes`,
  `no-inline-styles`. The word `canon` is retired with the package rename.
- **A message is written for whoever fixes it, agent or person**: what is
  wrong, then what to use instead, then where to look. Their published evals
  are the reason: almost every agent task reached zero violations in one
  correction round when the error named the replacement.
- **Every rule takes the same options**, `allow` (exact names, a trailing `*`
  for a prefix) and `message` with `{{className}}`, `{{property}}` and
  `{{suggestions}}`.
- **The oracle is the real generator.** They ask the installed framework in a
  worker because its loader is async. nitro's `validateClasses` is sync, so
  the plugin only has to load the config, once, with top-level await.
- **Classes are read from class functions as well as attributes**: `cn`,
  `cx`, `clsx`, `classNames`, and `merge` only when imported from
  `yummacss/merge`, since `merge` is a common name.
- `plugin` and `rules` are named exports, and `meta.name` is the namespace in
  both linters.

**What is next, in their order of value:**

1. `no-restyle`: a class on a Yumma UI component that a prop already owns,
   such as `p:8` on a `Button` when it takes `size`. Needs Yumma UI's
   schemas, so it lives with `yummaui`, with per-component contracts
   (`pattern`, `allow`, `deny`) and the category groups below.
2. Categories: color, typography, spacing, shape, effects, motion, layout.
   Core's utility files already split this way (`color`, `font`,
   `box-model`, `border`, `effect`, `transition`), so the map comes from core.
3. `no-raw-colors`: a palette color such as `bg:indigo-5` where the project
   declares theme colors.
4. `require-static-classes`: a class built from a value the linter cannot
   read, such as `` `bg:${tone}` ``.
5. Variables one hop deep, and spreads.

`no-arbitrary-values` has no Yumma counterpart: the framework has no
arbitrary values. Whether 4.2's `calc()` and `clamp()` values deserve a rule
is a question for Renildo.

**Biome cannot run `no-unknown-classes`.** Biome 2.5.15 plugins are GritQL
only, with no way to call JavaScript, so nothing can ask nitro whether a
class is valid. A GritQL rule can regex over class strings, so the only route
is generating the project's whole class set into a pattern, with no
suggestions. `no-inline-styles` does work as GritQL (tried on
`display: "flex"`). Biome lists JavaScript plugins on its roadmap; wait for
them rather than generating patterns.

**`validateClasses` rebuilds nitro's tables on every call**, about 5ms. One
call per `className` took 5s over the docs site's 117 files and 1,112
attributes, against 0.2s for Oxlint alone. The plugin collects a file's
classes and checks them once on `Program:exit`, caching each verdict across
files: 1.4s warm. Caching the tables per config inside nitro would cut the
rest and speed up the CLI too.

`no-inline-styles` reports every ordinary property and names a class when
one writes the exact `property: value`, read from core's single-property
utilities, the shortest winning. Custom properties pass, since they are how
a runtime value reaches a class. On the docs site it reports 41, most of
them runtime widths, and all of `blog-cover.tsx`, whose image renderer
takes only inline styles; that file wants an override.

The config is loaded once, from where the linter runs. A project with no
`yumma.config.mjs` gets the defaults rather than an error.

**One name per job, Renildo's call, 2026-10-02, for 4.3.** `@yummacss/lint`
is the plugin and nothing else, at its root, because a package and a
`/plugin` path both called lint read as two things. The one-off scan moved
into the CLI as `yummacss lint`, unchanged: the same class-attribute regexes,
`--allow` and `--config`, exit 1 on a finding. `yummacss-lint` and
`validate()` were deleted, not deprecated: one release to manage instead of
two. **Oxlint first, 2026-10-02.** The plugin is in the ESLint plugin shape only
because that is the API Oxlint's JS plugins implement; ESLint running it too
is a side effect, mentioned once in the README. The tests run the rules
through Oxlint itself, loading `packages/lint/src/index.ts` as a JS plugin
from a temporary project, so the repo has no `eslint` dependency. That needs
the workspace built first, as `publish.yml` already does. The docs page
follows the release.
