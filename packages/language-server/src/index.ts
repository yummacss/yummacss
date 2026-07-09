import { watch } from "node:fs";
import { fileURLToPath } from "node:url";
import {
	getCodeActions,
	getCompletions,
	getDiagnostics,
	getDocumentColors,
	getFormattingEdits,
	getHover,
} from "@yummacss/intellisense/lsp";
import { type Config, configName, loadConfig } from "@yummacss/nitro";
import {
	type Connection,
	TextDocumentSyncKind,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";

function toFsPath(uri: string): string | undefined {
	try {
		return fileURLToPath(uri);
	} catch {
		return undefined;
	}
}

/**
 * Wire every Yumma CSS feature (completion, hover, diagnostics, color
 * decorators, sorting) to an LSP connection. The connection's transport
 * (stdio, in-memory, sockets) is the caller's concern - this function
 * only registers handlers and starts listening.
 */
export function createServer(connection: Connection): void {
	const documents = new Map<string, TextDocument>();
	let rootPath: string | undefined;
	let currentConfig: Config | undefined;

	async function reloadConfig(): Promise<void> {
		if (!rootPath) return;
		try {
			const { config } = await loadConfig({ cwd: rootPath });
			currentConfig = config;
		} catch {
			// Missing or invalid config file - fall back to defaults.
			currentConfig = undefined;
		}
		for (const document of documents.values()) {
			validate(document);
		}
	}

	function validate(document: TextDocument): void {
		const diagnostics = getDiagnostics(
			document.getText(),
			currentConfig,
			currentConfig,
		);
		connection.sendDiagnostics({ uri: document.uri, diagnostics });
	}

	connection.onInitialize(async (params) => {
		const folder = params.workspaceFolders?.[0]?.uri ?? params.rootUri;
		rootPath = folder ? toFsPath(folder) : undefined;
		await reloadConfig();

		return {
			capabilities: {
				textDocumentSync: TextDocumentSyncKind.Full,
				completionProvider: { triggerCharacters: ['"', "'", " ", ":"] },
				hoverProvider: true,
				colorProvider: true,
				codeActionProvider: true,
				documentFormattingProvider: true,
			},
		};
	});

	connection.onInitialized(() => {
		if (!rootPath) return;

		try {
			watch(rootPath, { persistent: false }, (_event, filename) => {
				if (filename === configName) reloadConfig();
			});
		} catch {
			// Watching is best-effort - some filesystems/platforms may not
			// support it; the server still works without live config reload.
		}
	});

	connection.onCompletion((params) => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return [];
		return getCompletions(document.getText(), params.position, currentConfig);
	});

	connection.onHover((params) => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return null;
		return getHover(document.getText(), params.position, currentConfig);
	});

	connection.onDocumentColor((params) => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return [];
		return getDocumentColors(document.getText(), currentConfig);
	});

	connection.onColorPresentation(() => []);

	connection.onCodeAction((params) => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return [];
		const lines = document.getText().split("\n");
		return getCodeActions(
			params.textDocument.uri,
			params.context.diagnostics,
			(lineNumber) => lines[lineNumber] ?? "",
		);
	});

	connection.onDocumentFormatting((params) => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return [];
		return getFormattingEdits(document.getText());
	});

	connection.onDidOpenTextDocument((params) => {
		const { uri, languageId, version, text } = params.textDocument;
		const document = TextDocument.create(uri, languageId, version, text);
		documents.set(uri, document);
		validate(document);
	});

	connection.onDidChangeTextDocument((params) => {
		const document = documents.get(params.textDocument.uri);
		if (!document) return;
		const updated = TextDocument.update(
			document,
			params.contentChanges,
			params.textDocument.version ?? document.version,
		);
		documents.set(params.textDocument.uri, updated);
		validate(updated);
	});

	connection.onDidCloseTextDocument((params) => {
		documents.delete(params.textDocument.uri);
		connection.sendDiagnostics({
			uri: params.textDocument.uri,
			diagnostics: [],
		});
	});

	connection.listen();
}
