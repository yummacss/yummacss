export const normalizeCSS = `*, :before, :after {
  box-sizing: border-box;
  border: 0 solid;
}

* {
  margin: 0;
  padding: 0;
}

html {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Liberation Sans, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}

body {
  -webkit-font-smoothing: antialiased;
  font-family: inherit;
  line-height: 1.5;
}

canvas, img, picture, svg, video {
  max-width: 100%;
  display: block;
}

button, input, optgroup, select, textarea {
  background-color: transparent;
  font: inherit;
}

button {
  cursor: pointer;
}

:where(button, input, select, textarea):disabled {
  cursor: not-allowed;
  opacity: .5;
}

h1, h2, h3, h4, h5, h6, p {
  overflow-wrap: break-word;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
  font-size: inherit;
  font-weight: inherit;
}

p {
  text-wrap: pretty;
}

b, strong {
  font-weight: 700;
}

pre, code, kbd, samp {
  font-family: monospace;
  font-size: 1em;
}

a {
  color: inherit;
  text-decoration: none;
}

ol, ul {
  padding: 0;
  list-style: none;
}

hr {
  border-top-width: 1px;
  height: 0;
}
`;
