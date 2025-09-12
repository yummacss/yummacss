# [@yummacss](https://www.npmjs.com/package/yummacss)

A CSS framework for the web with abbreviated styles.

[![NPM Version](https://img.shields.io/npm/v/yummacss?style=plastic&label=yummacss&labelColor=eaedfc&color=413cb8)](https://www.npmjs.com/package/yummacss)
[![NPM Downloads](https://img.shields.io/npm/d18m/yummacss?style=plastic&label=downloads&labelColor=eaedfc&color=413cb8)](https://www.npmjs.com/package/yummacss)

## Getting started

Yumma CSS is a CLI-first CSS framework packed with a set of non-opinionated, atomic utility classes designed to minimize and scale your codebase.

### Installing

Install `yummacss` as a dev dependency

```
npm i yummacss -D
```

Initialize configuration

```
npx yummacss init
```

Our [framework guides](https://www.yummacss.com/docs/installation#framework-guides) will teach you how to set up your configuration file.

## Development setup

The Yumma CSS CLI provides several commands to help you work with your Yumma CSS files.

> [!IMPORTANT]  
> Make sure you have a `yumma.config.mjs` file set up before running these commands. If you haven’t, run `npx yummacss init` first.

### Building styles

The `build` command will compile your Yumma CSS files once.

```bash
npx yummacss build
```

### Watching changes

The `watch` command will watch for changes in your Yumma CSS files and recompile them automatically.

```bash
npx yummacss watch
```

## Documentation

Head over to [yummacss.com](https://www.yummacss.com) for the full documentation.

## Built with

- [sass-embedded](https://www.npmjs.com/package/sass-embedded)
- [lightningcss](https://www.npmjs.com/package/lightningcss)
- [typescript](https://www.npmjs.com/package/typescript)

## License

This project is licensed under the [MIT License](LICENSE)
