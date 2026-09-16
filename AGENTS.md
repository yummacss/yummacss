# Writing

- **PR bodies**: one short block per topic under a bold heading, then the
  checks line. Say **what changed**, and nothing else. No cause, no history,
  no justification: a reader outside the project does not care why a thing was
  renamed from A to B. The why goes in NOTES.md.
- **Commit messages**: a subject and a couple of lines. No essays.
- **Code comments**: one or two lines. A comment earns its length only where
  the code is genuinely surprising, and never by repeating the same paragraph
  in a dozen files.
- **No attribution footers** in commits or PRs. `.claude/settings.json` clears
  them; do not add them by hand either.
- No em dashes.
- Never name another framework to explain a Yumma decision.

# Copy

- The prose rules live in `tests/copywriting.test.ts` and run over the strings
  the packages print: CLI output and the text intellisense shows in an editor.
  US spelling, no contractions, no em dashes, `cannot` as one word, never
  Tailwind, and focus draws an outline rather than a ring.
- The docs site also spells an ellipsis as one character. That rule stops at
  the browser: `...` is the conventional spelling in terminal output, and a
  lone `…` can render as a box on a legacy Windows code page.
- Each repo owns its copy of the rules rather than importing them. This repo
  has no icons, so it has no icons module either.

# Working

- PRs, never direct commits to `main`.
- Verify an issue or a note against the code before acting on it. Most are
  right about the symptom and wrong about the cause.
