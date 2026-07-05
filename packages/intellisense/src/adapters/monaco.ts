import type { Config } from "@yummacss/nitro";
import { buildPropertyMap, findConflicts } from "@/conflicts";
import { CLASS_ATTR_REGEX } from "@/constants";
import type { IntellisenseConfig } from "@/core";
import { buildUtilityMap, getSuggestions, hexToRgba } from "@/core";
import { findHoverTarget, getHoverMarkdown } from "@/hover";
import { sortUtilityClasses, updateSortConfig } from "@/sort";
import { findUnknownClasses } from "@/validate";

export function registerCompletionProvider(
	monaco: any,
	config?: IntellisenseConfig,
): any {
	return monaco.languages.registerCompletionItemProvider("html", {
		provideCompletionItems: (model: any, position: any) => {
			const textUntilPosition = model.getValueInRange({
				startLineNumber: 1,
				startColumn: 1,
				endLineNumber: position.lineNumber,
				endColumn: position.column,
			});

			if (!/(?:class(?:Name)?)\s*=\s*["'{`][^"'`]*$/.test(textUntilPosition)) {
				return { suggestions: [] };
			}

			const word = model.getWordUntilPosition(position);
			const range = {
				startLineNumber: position.lineNumber,
				endLineNumber: position.lineNumber,
				startColumn: word.startColumn,
				endColumn: word.endColumn,
			};

			return {
				suggestions: getSuggestions(config).map((s) => ({
					label: s.label,
					insertText: s.insertText,
					detail: s.detail,
					kind: s.isColor
						? monaco.languages.CompletionItemKind.Color
						: monaco.languages.CompletionItemKind.Constant,
					range,
				})),
			};
		},
	});
}

export function registerHoverProvider(
	monaco: any,
	config?: IntellisenseConfig,
): any {
	return monaco.languages.registerHoverProvider("html", {
		provideHover: (model: any, position: any) => {
			const line = model.getLineContent(position.lineNumber);
			// Monaco columns are 1-indexed
			const target = findHoverTarget(line, position.column - 1, config);
			if (!target) return null;

			const markdown = getHoverMarkdown(target.className, config);
			if (!markdown) return null;

			return {
				range: new monaco.Range(
					position.lineNumber,
					target.startIndex + 1,
					position.lineNumber,
					target.endIndex + 1,
				),
				contents: [{ value: markdown, isTrusted: true }],
			};
		},
	});
}

export function registerColorProvider(
	monaco: any,
	config?: IntellisenseConfig,
): any {
	const utilityMap = buildUtilityMap(config);

	return monaco.languages.registerColorProvider("html", {
		provideColorPresentations: () => [],
		provideDocumentColors: (model: any) => {
			const result: any[] = [];

			for (let i = 1; i <= model.getLineCount(); i++) {
				const line = model.getLineContent(i);
				const regex = new RegExp(CLASS_ATTR_REGEX.source, "g");
				let match: RegExpExecArray | null;

				match = regex.exec(line);
				while (match !== null) {
					const classContent = extractContent(match);
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
									result.push({
										color: {
											red: rgba.r,
											green: rgba.g,
											blue: rgba.b,
											alpha: rgba.a,
										},
										range: new monaco.Range(
											i,
											start + 1,
											i,
											start + cls.length + 1,
										),
									});
									searchFrom = idx + cls.length;
								}
							}
						}
					}

					match = regex.exec(line);
				}
			}

			return result;
		},
	});
}

function extractContent(match: RegExpExecArray): string | null {
	const content = match[2] ?? match[4] ?? match[5] ?? null;
	if (!content) return null;
	if (match[5] !== undefined) {
		return content
			.replace(/\$\{[^}]*\}/g, "")
			.replace(/\s+/g, " ")
			.trim();
	}
	return content;
}

export function registerConflictMarkers(
	monaco: any,
	editor: any,
	config?: IntellisenseConfig,
	validationConfig?: Config,
): void {
	const pm = config ? buildPropertyMap(config) : buildPropertyMap();

	function update() {
		const model = editor.getModel();
		if (!model) return;

		const markers: any[] = [];

		for (let lineNumber = 1; lineNumber <= model.getLineCount(); lineNumber++) {
			const line = model.getLineContent(lineNumber);
			const conflicts = findConflicts(line, pm);

			for (const conflict of conflicts) {
				markers.push({
					severity: monaco.MarkerSeverity.Warning,
					message: `${[...new Set(conflict.utilities)].map((u) => `"${u}"`).join(", ")} conflict - both set \`${conflict.property}\``,
					startLineNumber: lineNumber,
					startColumn: conflict.startIndex + 1,
					endLineNumber: lineNumber,
					endColumn: conflict.endIndex + 1,
					source: "yummacss",
				});
			}
		}

		for (const unknown of findUnknownClasses(
			model.getValue(),
			validationConfig,
		)) {
			const suggestion = unknown.suggestion
				? ` Did you mean "${unknown.suggestion}"?`
				: "";

			markers.push({
				severity: monaco.MarkerSeverity.Warning,
				message: `"${unknown.className}" is not a Yumma CSS class.${suggestion}`,
				startLineNumber: unknown.line + 1,
				startColumn: unknown.startIndex + 1,
				endLineNumber: unknown.line + 1,
				endColumn: unknown.endIndex + 1,
				source: "yummacss",
			});
		}

		monaco.editor.setModelMarkers(model, "yummacss", markers);
	}

	update();
	editor.onDidChangeModelContent(update);
}

export function registerCodeActionsProvider(
	monaco: any,
	config?: IntellisenseConfig,
): any {
	return monaco.languages.registerCodeActionProvider("html", {
		provideCodeActions: (model: any, _range: any, context: any) => {
			const actions: any[] = [];
			const markers = (context.markers ?? []).filter(
				(m: any) => m.source === "yummacss",
			);

			for (const marker of markers) {
				const suggestionMatch = marker.message.match(
					/Did you mean "([^"]+)"\?$/,
				);
				if (suggestionMatch) {
					actions.push({
						title: `Replace with "${suggestionMatch[1]}"`,
						kind: "quickfix",
						diagnostics: [marker],
						isPreferred: true,
						edit: {
							edits: [
								{
									resource: model.uri,
									textEdit: {
										range: marker,
										text: suggestionMatch[1],
									},
								},
							],
						},
					});
					continue;
				}

				const match = marker.message.match(/^(.*) conflict - both set/);
				if (!match) continue;

				const utilities = (match[1] as string)
					.split(", ")
					.map((u: string) => u.replace(/"/g, ""));

				for (const keepUtil of utilities) {
					const toRemove = utilities.filter((u: string) => u !== keepUtil);

					actions.push({
						title: `Keep "${keepUtil}", remove ${toRemove.map((u: string) => `"${u}"`).join(", ")}`,
						kind: "quickfix",
						diagnostics: [marker],
						edit: {
							edits: [
								{
									resource: model.uri,
									textEdit: {
										range: marker,
										text: (() => {
											let result = model.getValueInRange(marker);
											for (const u of toRemove) {
												result = result.replace(
													new RegExp(`\\b${u}\\b\\s*`, "g"),
													"",
												);
											}
											return result.replace(/\s+/g, " ").trim();
										})(),
									},
								},
							],
						},
					});
				}
			}

			return { actions, dispose: () => {} };
		},
	});
}

export function registerSortAction(
	monaco: any,
	editor: any,
	config?: IntellisenseConfig,
): void {
	if (config) updateSortConfig(config);

	editor.addAction({
		id: "yummacss.sortClasses",
		label: "Yumma CSS: Sort Classes",
		keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
		run: (ed: any) => {
			const model = ed.getModel();
			if (!model) return;
			const fullText = model.getValue();
			const sorted = sortUtilityClasses(fullText);
			if (sorted === fullText) return;
			ed.executeEdits("yummacss.sortClasses", [
				{
					range: model.getFullModelRange(),
					text: sorted,
				},
			]);
		},
	});
}
