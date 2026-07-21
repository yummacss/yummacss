# @yummacss/language-server

Language Server Protocol implementation for [Yumma CSS](https://yummacss.com).

Brings completion, hover, diagnostics, color decorators, and class sorting to any LSP-compatible editor.

## Usage

```bash
npx @yummacss/language-server --stdio
```

## Programmatic API

```js
import { createConnection, ProposedFeatures } from "vscode-languageserver/node";
import { createServer } from "@yummacss/language-server";

const connection = createConnection(ProposedFeatures.all, process.stdin, process.stdout);
createServer(connection);
```

## Documentation

Learn more at [yummacss.com](https://yummacss.com)
