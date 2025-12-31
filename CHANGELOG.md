# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-12-31

### Features

- Added `px` variants to all `border` and `gap` utilities.
- Added `s` value (`stretch`) to `height`, `width` and Dimension utilities.
- Added `ts-*` utilities (`tab-size`).
- Added `va-*` utilities (`vertical-align`).
- Added `wm-*` utilities (`writing-mode`).
- Extended `top`, `right`, `bottom`, `left`, `inset`, `inset-x`, `inset-y` utilities range from `16` to `100`.

### Breaking changes

- Renamed `9` to `pill` in all `border-radius` utilities.
- Renamed `b-*` utilities to `bw-*` (`border-width`).
- Renamed `b-*` variants (e.g., `bt`, `br`) to `bw-*` equivalents (e.g. `btw`, `brw`).
- Renamed `b` utility to `bs` (`border-style`).
- Renamed `bo-*` utilities to `b-*` (`bottom`).
- Renamed `rad-*` utilities to `br-*` (`border-radius`).
- Renamed `tc-*` utilities to `c-*` (`color`).

## [0.2.2] - 2025-12-27

### Features

- No user-facing changes.

## [0.2.1] - 2025-12-26

### Fixes

- Update exports to use `iife.js`.

## [0.2.0] - 2025-12-26

### Features

- Add support for arbitrary, chainable variants (e.g. `lg:h:bg-red/50`).

## [0.1.1] - 2025-11-13

### Features

- You can now use `https://cdn.jsdelivr.net/npm/@yummacss/runtime@version` instead of the longer path.

## [0.1.0] - 2025-11-12

### Features

- Initial release.
