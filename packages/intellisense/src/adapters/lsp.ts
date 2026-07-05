import type { Config } from "@yummacss/nitro";
import {
	type CodeAction,
	CodeActionKind,
	type ColorInformation,
	type ColorPresentation,
	type CompletionItem,
	CompletionItemKind,
	type Diagnostic,
	DiagnosticSeverity,
	type Hover,
	MarkupKind,
	Position,
	Range,
	type TextEdit,
	type WorkspaceEdit,
} from "vscode-languageserver-types";
import { buildPropertyMap, findConflicts } from "@/conflicts";
import { CLASS_ATTR_REGEX, extractClassContent } from "@/constants";
import type { IntellisenseConfig } from "@/core";
import { buildUtilityMap, getSuggestions, hexToRgba } from "@/core";
import { findHoverTarget, getHoverMarkdown } from "@/hover";
import { sortUtilityClasses } from "@/sort";
import { findUnknownClasses } from "@/validate";

export const CONFLICT_SOURCE = "conflicting_utilities";
export const UNKNOWN_CLASS_SOURCE = "unknown_class";

interface ConflictData {
	kind: typeof CONFLICT_SOURCE;
	conflicts: string[];
}

interface UnknownClassData {
	kind: typeof UNKNOWN_CLASS_SOURCE;
	suggestion?: string;
}

/**
 * Class-attribute completion, matching the same trigger context the
 * VS Code and Monaco adapters use.
 */
export function getCompletions(
	text: string,
	position: Position,
	config?: IntellisenseConfig,
): CompletionItem[] {
	const line = text.split("\n")[position.line] ?? "";
	const linePrefix = line.slice(0, position.character);

	if (!/(?:class(?:Name)?)\s*=\s*["'{`][^"'`]*$/.test(linePrefix)) {
		return [];
	}

	return getSuggestions(config).map((s) => ({
		label: s.label,
		insertText: s.insertText,
		detail: s.detail,
		kind: s.isColor ? CompletionItemKind.Color : CompletionItemKind.Constant,
		documentation: {
			kind: MarkupKind.Markdown,
			value: `\`\`\`css\n${s.detail}\n\`\`\``,
		},
	}));
}

export function getHover(
	text: string,
	position: Position,
	config?: IntellisenseConfig,
): Hover | null {
	const line = text.split("\n")[position.line] ?? "";
	const target = findHoverTarget(line, position.character, config);
	if (!target) return null;

	const markdown = getHoverMarkdown(target.className, config);
	if (!markdown) return null;

	return {
		contents: { kind: MarkupKind.Markdown, value: markdown },
		range: Range.create(
			Position.create(position.line, target.startIndex),
			Position.create(position.line, target.endIndex),
		),
	};
}

export function getDocumentColors(
	text: string,
	config?: IntellisenseConfig,
): ColorInformation[] {
	const result: ColorInformation[] = [];
	const colorUtilityMap = buildUtilityMap(config);
	const lines = text.split("\n");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i] ?? "";
		const regex = new RegExp(CLASS_ATTR_REGEX.source, "g");
		let match = regex.exec(line);

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
				const base = cls.includes(":") ? cls.slice(cls.lastIndexOf(":") + 1) : cls;
				const info = colorUtilityMap.get(base);
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
								range: Range.create(
									Position.create(i, start),
									Position.create(i, start + cls.length),
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
}

export function getColorPresentations(): ColorPresentation[] {
	return [];
}

/**
 * Compute conflict and unknown-class diagnostics for a document.
 * `data` carries the payload the corresponding code action needs, the
 * same pattern the VS Code adapter uses via `Diagnostic.data`.
 */
export function getDiagnostics(
	text: string,
	config?: IntellisenseConfig,
	validationConfig?: Config,
): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	const pm = buildPropertyMap(config);
	const lines = text.split("\n");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i] ?? "";
		for (const conflict of findConflicts(line, pm)) {
			const uniqueUtils = [...new Set(conflict.utilities)];
			diagnostics.push({
				range: Range.create(
					Position.create(i, conflict.startIndex),
					Position.create(i, conflict.endIndex),
				),
				severity: DiagnosticSeverity.Warning,
				source: "yummacss",
				code: CONFLICT_SOURCE,
				message: `${uniqueUtils.map((u) => `"${u}"`).join(", ")} conflict - both set \`${conflict.property}\``,
				data: {
					kind: CONFLICT_SOURCE,
					conflicts: conflict.utilities,
				} satisfies ConflictData,
			});
		}
	}

	const messageFor = (className: string) =>
		validationConfig
			? `"${className}" is not a Yumma CSS class or covered by your yumma.config.mjs (prefix, safelist, theme)`
			: `"${className}" is not a Yumma CSS class`;

	for (const unknown of findUnknownClasses(text, validationConfig)) {
		const suggestion = unknown.suggestion
			? `. Did you mean "${unknown.suggestion}"?`
			: "";

		diagnostics.push({
			range: Range.create(
				Position.create(unknown.line, unknown.startIndex),
				Position.create(unknown.line, unknown.endIndex),
			),
			severity: DiagnosticSeverity.Warning,
			source: "yummacss",
			code: UNKNOWN_CLASS_SOURCE,
			message: `${messageFor(unknown.className)}${suggestion}`,
			data: {
				kind: UNKNOWN_CLASS_SOURCE,
				suggestion: unknown.suggestion,
			} satisfies UnknownClassData,
		});
	}

	return diagnostics;
}

/**
 * Build quick fixes for the yummacss diagnostics found in `diagnostics`.
 * `uri` and `getLine` let the caller supply document access without this
 * module depending on a specific LSP document implementation.
 */
export function getCodeActions(
	uri: string,
	diagnostics: Diagnostic[],
	getLine: (lineNumber: number) => string,
): CodeAction[] {
	const actions: CodeAction[] = [];

	for (const diagnostic of diagnostics) {
		if (diagnostic.source !== "yummacss") continue;
		const data = diagnostic.data as ConflictData | UnknownClassData | undefined;
		if (!data) continue;

		if (data.kind === UNKNOWN_CLASS_SOURCE) {
			if (!data.suggestion) continue;

			const edit: WorkspaceEdit = {
				changes: {
					[uri]: [
						{ range: diagnostic.range, newText: data.suggestion } as TextEdit,
					],
				},
			};

			actions.push({
				title: `Replace with "${data.suggestion}"`,
				kind: CodeActionKind.QuickFix,
				diagnostics: [diagnostic],
				isPreferred: true,
				edit,
			});
			continue;
		}

		const { conflicts } = data;
		const lineText = getLine(diagnostic.range.start.line);
		const regex = new RegExp(CLASS_ATTR_REGEX.source, "g");
		let classMatch = regex.exec(lineText);
		let classContent: string | null = null;
		let contentStart = -1;

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

		if (!classContent || contentStart === -1) continue;

		const contentRange = Range.create(
			Position.create(diagnostic.range.start.line, contentStart),
			Position.create(
				diagnostic.range.start.line,
				contentStart + classContent.length,
			),
		);

		for (const [index, keepUtil] of conflicts.entries()) {
			const toRemove = conflicts.filter((u) => u !== keepUtil);
			const label =
				toRemove.length === 1
					? `Keep "${keepUtil}", remove "${toRemove[0]}"`
					: `Keep "${keepUtil}", remove ${toRemove.map((u) => `"${u}"`).join(", ")}`;

			let newContent = classContent;
			for (const u of toRemove) {
				newContent = newContent
					.replace(new RegExp(`\\b${u}\\b`, "g"), "")
					.replace(/\s+/g, " ")
					.trim();
			}

			actions.push({
				title: label,
				kind: CodeActionKind.QuickFix,
				diagnostics: [diagnostic],
				isPreferred: index === conflicts.length - 1,
				edit: {
					changes: {
						[uri]: [{ range: contentRange, newText: newContent } as TextEdit],
					},
				},
			});
		}
	}

	return actions;
}

/**
 * Sort classes across the whole document, returning a single replacing
 * edit (or an empty array when already sorted).
 */
export function getFormattingEdits(text: string): TextEdit[] {
	const sorted = sortUtilityClasses(text);
	if (sorted === text) return [];

	const lines = text.split("\n");
	const lastLine = lines[lines.length - 1] ?? "";

	return [
		{
			range: Range.create(
				Position.create(0, 0),
				Position.create(lines.length - 1, lastLine.length),
			),
			newText: sorted,
		},
	];
}
