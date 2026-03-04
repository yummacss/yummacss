import * as vscode from "vscode";
import { findConflicts } from "@/conflicts";
import { CLASS_ATTR_REGEX, extractClassContent } from "@/constants";
import { buildUtilityMap, getSuggestions, hexToRgba } from "@/core";
import { findHoverTarget, getHoverMarkdown } from "@/hover";
import { sortUtilityClasses } from "@/sort";

const utilityMap = buildUtilityMap();

export class CompletionProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
	): vscode.CompletionItem[] | undefined {
		const linePrefix = document
			.lineAt(position)
			.text.substring(0, position.character);

		if (!/(?:class(?:Name)?)\s*=\s*["'{`][^"'`]*$/.test(linePrefix)) {
			return undefined;
		}

		return getSuggestions().map((s) => {
			const item = new vscode.CompletionItem(
				{ label: s.label, description: s.detail } as vscode.CompletionItemLabel,
				s.isColor
					? vscode.CompletionItemKind.Color
					: vscode.CompletionItemKind.Constant,
			);
			item.documentation = new vscode.MarkdownString(
				`\`\`\`css\n${s.detail}\n\`\`\``,
			);
			return item;
		});
	}
}

export class HoverProvider implements vscode.HoverProvider {
	provideHover(
		document: vscode.TextDocument,
		position: vscode.Position,
	): vscode.Hover | undefined {
		const line = document.lineAt(position).text;
		const target = findHoverTarget(line, position.character);
		if (!target) return undefined;

		const markdown = getHoverMarkdown(target.className);
		if (!markdown) return undefined;

		const range = new vscode.Range(
			position.line,
			target.startIndex,
			position.line,
			target.endIndex,
		);

		const md = new vscode.MarkdownString(markdown, true);
		md.isTrusted = true;
		return new vscode.Hover(md, range);
	}
}

export class ColorProvider implements vscode.DocumentColorProvider {
	provideDocumentColors(
		document: vscode.TextDocument,
	): vscode.ColorInformation[] {
		const result: vscode.ColorInformation[] = [];

		for (let i = 0; i < document.lineCount; i++) {
			const line = document.lineAt(i).text;
			const regex = new RegExp(CLASS_ATTR_REGEX.source, "g");
			let match: RegExpExecArray | null;

			match = regex.exec(line);
			while (match !== null) {
				const classContent = extractClassContent(match);
				if (!classContent) {
					match = regex.exec(line);
					continue;
				}

				const contentStart = match.index + match[0].indexOf(classContent);
				const classes = classContent.split(/\s+/).filter(Boolean);
				let searchFrom = 0;

				for (const cls of classes) {
					const base = cls.includes(":")
						? cls.slice(cls.lastIndexOf(":") + 1)
						: cls;
					const info = utilityMap.get(base);

					if (info) {
						const rgba = hexToRgba(info.cssValue);
						if (rgba) {
							const idx = classContent.indexOf(cls, searchFrom);
							if (idx !== -1) {
								const start = contentStart + idx;
								const range = new vscode.Range(i, start, i, start + cls.length);
								result.push(
									new vscode.ColorInformation(
										range,
										new vscode.Color(rgba.r, rgba.g, rgba.b, rgba.a),
									),
								);
								searchFrom = idx + cls.length;
							}
						}
					}
				}

				match = regex.exec(line);
			}
		}

		return result;
	}

	provideColorPresentations(): vscode.ColorPresentation[] {
		return [];
	}
}

export class ActionProvider implements vscode.CodeActionProvider {
	static readonly providedCodeActionKinds = [vscode.CodeActionKind.QuickFix];

	provideCodeActions(
		document: vscode.TextDocument,
		_range: vscode.Range,
		context: vscode.CodeActionContext,
	): vscode.CodeAction[] {
		return context.diagnostics
			.filter((d) => d.source === "yummacss")
			.flatMap((diagnostic) => {
				const data = (diagnostic as any).data as
					| { conflicts: string[] }
					| undefined;
				if (!data) return [];

				const { conflicts } = data;
				const lineText = document.lineAt(diagnostic.range.start.line).text;

				const regex = new RegExp(CLASS_ATTR_REGEX.source, "g");
				let classMatch: RegExpExecArray | null;
				let classContent: string | null = null;
				let contentStart = -1;

				classMatch = regex.exec(lineText);
				while (classMatch !== null) {
					if (
						diagnostic.range.start.character >= classMatch.index &&
						diagnostic.range.start.character <=
							classMatch.index + classMatch[0].length
					) {
						classContent = extractClassContent(classMatch);
						if (classContent) {
							contentStart = lineText.indexOf(classContent, classMatch.index);
						}
						break;
					}
					classMatch = regex.exec(lineText);
				}

				if (!classContent || contentStart === -1) return [];

				const contentRange = new vscode.Range(
					diagnostic.range.start.line,
					contentStart,
					diagnostic.range.start.line,
					contentStart + classContent.length,
				);

				return conflicts.map((keepUtil, index) => {
					const toRemove = conflicts.filter((u) => u !== keepUtil);
					const label =
						toRemove.length === 1
							? `Keep "${keepUtil}", remove "${toRemove[0]}"`
							: `Keep "${keepUtil}", remove ${toRemove.map((u) => `"${u}"`).join(", ")}`;

					const action = new vscode.CodeAction(
						label,
						vscode.CodeActionKind.QuickFix,
					);
					action.diagnostics = [diagnostic];
					action.isPreferred = index === conflicts.length - 1;

					let newContent = classContent!;
					for (const u of toRemove) {
						newContent = newContent
							.replace(new RegExp(`\\b${u}\\b`, "g"), "")
							.replace(/\s+/g, " ")
							.trim();
					}

					const edit = new vscode.WorkspaceEdit();
					edit.replace(document.uri, contentRange, newContent);
					action.edit = edit;
					return action;
				});
			});
	}
}

export function refreshDiagnostics(
	document: vscode.TextDocument,
	collection: vscode.DiagnosticCollection,
): void {
	const diagnostics: vscode.Diagnostic[] = [];

	for (let i = 0; i < document.lineCount; i++) {
		const line = document.lineAt(i).text;
		const conflicts = findConflicts(line);

		for (const conflict of conflicts) {
			const range = new vscode.Range(
				i,
				conflict.startIndex,
				i,
				conflict.endIndex,
			);
			const uniqueUtils = [...new Set(conflict.utilities)];

			const diagnostic = new vscode.Diagnostic(
				range,
				`${uniqueUtils.map((u) => `"${u}"`).join(", ")} conflict — both set \`${conflict.property}\``,
				vscode.DiagnosticSeverity.Warning,
			);
			diagnostic.source = "yummacss";
			diagnostic.code = "conflicting_utilities";
			(diagnostic as any).data = {
				conflicts: conflict.utilities,
				property: conflict.property,
			};

			diagnostics.push(diagnostic);
		}
	}

	collection.set(document.uri, diagnostics);
}

export function subscribeToDocChanges(
	context: vscode.ExtensionContext,
	collection: vscode.DiagnosticCollection,
	languages: string[],
): void {
	if (vscode.window.activeTextEditor) {
		refreshDiagnostics(vscode.window.activeTextEditor.document, collection);
	}

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor((editor) => {
			if (editor) refreshDiagnostics(editor.document, collection);
		}),
		vscode.workspace.onDidChangeTextDocument((e) =>
			refreshDiagnostics(e.document, collection),
		),
		vscode.workspace.onDidCloseTextDocument((doc) =>
			collection.delete(doc.uri),
		),
	);
}

export function registerSortCommand(
	context: vscode.ExtensionContext,
	languages: string[],
): void {
	const sortCommand = vscode.commands.registerCommand(
		"yummacss.sortClasses",
		async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;

			const fullText = editor.document.getText();
			const sorted = sortUtilityClasses(fullText);

			if (sorted === fullText) {
				vscode.window.showInformationMessage(
					"Yumma CSS: classes are already sorted!",
				);
				return;
			}

			await editor.edit((editBuilder) => {
				const fullRange = new vscode.Range(
					editor.document.positionAt(0),
					editor.document.positionAt(fullText.length),
				);
				editBuilder.replace(fullRange, sorted);
			});

			vscode.window.showInformationMessage("Yumma CSS: classes sorted!");
		},
	);

	const formatOnSave = vscode.workspace.onWillSaveTextDocument((event) => {
		if (event.reason !== vscode.TextDocumentSaveReason.Manual) return;

		const config = vscode.workspace.getConfiguration("yummacss");
		if (!config.get<boolean>("sortOnSave", true)) return;
		if (!languages.includes(event.document.languageId)) return;

		const fullText = event.document.getText();
		const sorted = sortUtilityClasses(fullText);
		if (sorted === fullText) return;

		const fullRange = new vscode.Range(
			event.document.positionAt(0),
			event.document.positionAt(fullText.length),
		);

		event.waitUntil(Promise.resolve([new vscode.TextEdit(fullRange, sorted)]));
	});

	context.subscriptions.push(sortCommand, formatOnSave);
}
