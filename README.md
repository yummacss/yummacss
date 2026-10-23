<a href="https://www.yummacss.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://www.yummacss.com/og-dark.png">
    <img src="https://www.yummacss.com/og.png" alt="Yumma CSS">
  </picture>
</a>

# Yumma CSS

An atomic CSS framework whose classes are the initials of a property and its value: `d:f` is `display: flex`, `jc:sb` is `justify-content: space-between`, on a fixed scale.

[Documentation](https://www.yummacss.com/docs/installation) • [Yumma UI](https://github.com/yummacss/yummaui) • [X](https://x.com/yummacss)

## Installation

```bash
pnpm add yummacss -D
pnpm dlx yummacss init
```

## Agent skill

Teach your coding agent Yumma CSS and Yumma UI:

```bash
npx skills add yummacss/yummacss
```

## Workspace

| Folder                                   | Contents                                  |
| ---------------------------------------- | ----------------------------------------- |
| [`packages/cli`](packages/cli)           | `yummacss`, the CLI and `yummacss/merge`  |
| [`packages/core`](packages/core)         | `@yummacss/core`, the utility definitions |
| [`packages/nitro`](packages/nitro)       | `@yummacss/nitro`, the CSS generator      |
| [`packages/vite`](packages/vite)         | `@yummacss/vite`, the Vite plugin         |
| [`packages/postcss`](packages/postcss)   | `@yummacss/postcss`, the PostCSS plugin   |
| [`packages/lint`](packages/lint)         | `@yummacss/lint`, lint rules for Oxlint   |
| [`apps/yummacss.com`](apps/yummacss.com) | The documentation site                    |
| [`skills/yummacss`](skills/yummacss)     | The agent skill                           |

## Contributing

```bash
pnpm install
pnpm dev:site   # the documentation site
pnpm test       # the packages; pnpm test:site for the site
pnpm check      # format, lint & types
```

## License

This project is licensed under the [MIT License](LICENSE).
