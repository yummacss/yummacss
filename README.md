<div align="center">
  <a href="https://yummacss.com" target="_blank" target="_blank" rel="noopener noreferrer">
    <img alt="Yumma CSS API" src="https://api.yummacss.com/dark-logomark.png" width="250" style="max-width: 100%;">
  </a>
</div>

<div align="center">
  Yumma CSS for all of your back end needs.
  <br>
  <a href="https://yummacss.com"><strong>Read the documentation ↝</strong></a>
</div>

> [!Caution]
>
> ## Early Development Stage
>
> This project is still in a very early stage of development. The API, features, and documentation are subject to frequent changes. The codebase isn't ready for production use yet, so be prepared for breaking changes.

## List of utilities

Get all the utilities of a given CSS property. Here's an example:

### Request

```bash
GET /api/styles/background-attachment
```

### Response

```json
[
  {
    "slug": "background-attachment",
    "utility": "ba-f",
    "property": ["background-attachment: fixed;"]
  },
  {
    "slug": "background-attachment",
    "utility": "ba-l",
    "property": ["background-attachment: local;"]
  },
  {
    "slug": "background-attachment",
    "utility": "ba-s",
    "property": ["background-attachment: scroll;"]
  }
]
```

## Single utility

Get a specific utility of a given CSS property's numeric value. Here's an example:

### Request

```bash
GET /api/styles/height/1
```

### Response

```json
[
  {
    "slug": "height",
    "utility": "h-1",
    "property": ["height: 0.25rem;"]
  }
]
```

## Built with

- [Next.js](https://nextjs.org/) — The React Framework for the Web.
- [tinycolor2](https://bgrins.github.io/TinyColor/) — Fast, small color manipulation and conversion for JavaScript.

## Licensing

MIT — Copyright (c) 2022–present
