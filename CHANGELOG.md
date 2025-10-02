# Release notes

All notable changes to the Yumma CSS will be documented in this file.

## [3.4.0]

<details open>
<summary>
    <b>Features</b>
</summary>

- Add media query support for all color utilities
- Full `sass-embedded` migration to `@yummacss/api`
- Implement class token extraction and generation
- Improve build and rebuild times with `build` and `watch` tasks
- Integrate `@yummacss/cli` into the CLI

</details>

<details open>
<summary>
    <b>Breaking changes</b>
</summary>

- Base styles are no longer tree shaken
- Remove `purgecss` from the build process (Internal)
- Remove all `scss` files from the framework (Internal)

</details>

<details open>
<summary>
    <b>Fixes</b>
</summary>

- Fixed an issue where npm users could not run the CLI

</details>
