export const baseStyles = `*, :before, :after {
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
  padding: .5rem;
  font-family: inherit;
}

button:not([class]), input:not([class]), optgroup:not([class]), select:not([class]), textarea:not([class]) {
  border: 1px solid #bfc2c7;
}

:is(a, button, input, select, summary, textarea):focus {
  outline: 2px solid transparent;
}

textarea:not([rows]) {
  min-height: 10em;
}

button {
  cursor: pointer;
}

button:disabled, input:disabled, select:disabled, textarea:disabled {
  cursor: not-allowed;
  opacity: .5;
}

h1, h2, h3, h4, h5, h6, p {
  overflow-wrap: break-word;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
  font-size: 1rem;
  font-weight: 600;
}

p {
  text-wrap: pretty;
}

b, strong {
  font-weight: 700;
}

small {
  font-size: 80%;
  line-height: 1.4;
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

th {
  font-size: 1rem;
  font-weight: 600;
}

hr {
  border-top: 1px solid #bfc2c7;
  height: 0;
  margin: 1em 0;
}

details {
  display: block;
}

summary {
  display: list-item;
}
`;
