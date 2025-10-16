## Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Features

- No user-facing changes.

## [3.5.0] - 2025-10-11

### Features

- Added opacity support for all color utilities.
- Improved CSS generation architecture for better performance and maintainability.


## [3.4.3] - 2025-10-03


### Fixed

- Fixed CSS rules to be sorted alphabetically for consistent output.
- Fixed escaping of slashes in utilities like `ar-*` (aspect-ratio).


## [3.4.2] - 2025-10-03

### Fixed

- Fixed `tdt-*` (text-decoration-thickness) utilities to use `px` instead of `rem`.


## [3.4.1] - 2025-10-02

### Fixed

- Fixed utilities containing slashes or colons not being properly escaped.


## [3.4.0] - 2025-10-02

### Features

- Added media query support for all color utilities.
- Improved build and rebuild times with `build` and `watch` tasks.
- Improved CSS generation architecture for better performance and maintainability.

### Breaking changes

- Base styles are no longer tree-shaken.

### Fixed

- Fixed NPM users not being able to run the CLI.

## [3.3.2] - 2025-09-18


### Fixed

- No user-facing changes.


## [3.3.1] - 2025-09-12

### Fixed

- No user-facing changes.


## [3.3.0] - 2025-09-12

### Breaking changes

- Updated config file name from `yumma.config.mjs` to `yumma.config.js`.

### Fixed

- Fixed `init` command to use JavaScript objects instead of JSON entries.


## [3.2.2] - 2025-09-08

### Fixed

- Removed default `font-weight` property from `ff-*` (`font-family`) utilities.

## [3.2.1] - 2025-09-03

### Features

- Added `b` as an alias for the `build` command.
- Added `i` as an alias for the `init` command.
- Added `w` as an alias for the `watch` command.

### Breaking changes

- Default `font-family` is now applied to the `html` tag instead of the `body` tag.

## [3.2.0] - 


## [3.1.0] - 


## [3.0.3] - 


## [3.0.2] - 


## [3.0.1] - 


## [3.0.0] - 


## [2.1.0] - 


## [2.0.0] - 


## [1.2.0] - 


## [1.1.0] - 


## [1.0.3] - 


## [1.0.2] - 


## [1.0.1] - 


## [1.0.0] - 


## [0.2.0] - 


## [0.1.1] - 


## [0.1.0] - 


## [0.0.1] - 

- Initial release.
