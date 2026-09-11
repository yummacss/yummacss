# Writing

- **PR bodies**: one short block per topic under a bold heading, then the
  checks line. Say **what changed**, and nothing else. No cause, no history,
  no justification: a reader outside the project does not care why a thing was
  renamed from A to B. Keep the why in this file, or in the commit body.
- **Commit messages**: a subject and a couple of lines. No essays.
- **Code comments**: one or two lines. A comment earns its length only where
  the code is genuinely surprising, and never by repeating the same paragraph
  in a dozen files.
- **No attribution footers** in commits or PRs. `.claude/settings.json` clears
  them; do not add them by hand either.
- No em dashes.
- Never name another framework to explain a Yumma decision.

# Working

- PRs, never direct commits to `main`.
- Verify an issue or a note against the code before acting on it. Most are
  right about the symptom and wrong about the cause.
