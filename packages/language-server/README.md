# @yummacss/language-server

Language server for [Yumma CSS](https://yummacss.com). Brings completion, hover, unknown-class diagnostics, conflict detection, color decorators, and class sorting to any editor that speaks the Language Server Protocol - Zed, Neovim, Helix, Sublime Text, and more.

This is the same engine behind the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=yumma-css.yummacss-intellisense), exposed over LSP instead of the VS Code API. Both consume `@yummacss/intellisense`, so features never drift between editors.

## Usage

Most users will get this through an editor extension (e.g. the Zed extension) rather than running it directly. To run it manually:

```bash
npx @yummacss/language-server --stdio
```

The server communicates over stdio and expects the client to send a standard LSP `initialize` request. It looks for `yumma.config.mjs` in the first workspace folder and reloads it automatically on change.

## Capabilities

- `textDocument/completion` - class name completion inside `class`/`className` attributes.
- `textDocument/hover` - the generated CSS declaration for the class under the cursor.
- `textDocument/publishDiagnostics` - warns on conflicting utilities (e.g. two classes setting the same property) and classes that are not part of the Yumma CSS canon, with "Did you mean" suggestions.
- `textDocument/codeAction` - quick fixes for both diagnostic kinds.
- `textDocument/documentColor` - color swatches for color utilities.
- `textDocument/formatting` - sorts classes in a document (bind to your editor's "Format Document" action).

## Programmatic API

```js
import { createConnection, ProposedFeatures } from "vscode-languageserver/node";
import { createServer } from "@yummacss/language-server";

const connection = createConnection(ProposedFeatures.all, process.stdin, process.stdout);
createServer(connection);
```
