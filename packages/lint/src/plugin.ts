import { existsSync } from "node:fs";
import { join } from "node:path";
import { coreUtils } from "@yummacss/core";
import {
	type Config,
	configName,
	loadConfig,
	suggestClasses,
	validateClasses,
} from "@yummacss/nitro";

// the subset of the ESLint v9 rule API both ESLint and Oxlint call
interface Node {
	type: string;
	[key: string]: unknown;
}

interface Context {
	options: unknown[];
	report(descriptor: {
		node: Node;
		messageId: string;
		data?: Record<string, string>;
	}): void;
}

interface Rule {
	meta: {
		type: "problem" | "suggestion";
		docs: { description: string };
		messages: Record<string, string>;
		schema: unknown[];
	};
	create(context: Context): Record<string, (node: Node) => void>;
}

/** Options for the `canon` rule. */
export interface CanonOptions {
	/**
	 * Class names to accept even though Yumma CSS does not generate them.
	 *
	 * @example ["footer-version"]
	 */
	allow?: string[];
}

// a project without a config file gets the defaults
const config: Config = existsSync(join(process.cwd(), configName))
	? (await loadConfig({ cwd: process.cwd() })).config
	: {};

// nitro rebuilds its tables on every call, so each class is checked once
const verdicts = new Map<string, { suggestion?: string } | null>();

function check(classNames: string[]): void {
	const fresh = [...new Set(classNames)].filter((name) => !verdicts.has(name));
	if (fresh.length === 0) return;

	const { invalid } = validateClasses(fresh, config);
	const bad = new Set(invalid);
	const suggestions = invalid.length
		? suggestClasses(invalid, config)
		: new Map<string, string>();

	for (const name of fresh) {
		verdicts.set(
			name,
			bad.has(name) ? { suggestion: suggestions.get(name) } : null,
		);
	}
}

const isClassAttribute = (node: Node): boolean => {
	const name = (node.name as Node | undefined)?.name;
	return name === "className" || name === "class";
};

function stringsIn(node: Node | null | undefined): Node[] {
	if (!node) return [];
	switch (node.type) {
		case "Literal":
			return typeof node.value === "string" ? [node] : [];
		case "JSXExpressionContainer":
			return stringsIn(node.expression as Node);
		case "TemplateLiteral":
			return node.quasis as Node[];
		case "ConditionalExpression":
			return [
				...stringsIn(node.consequent as Node),
				...stringsIn(node.alternate as Node),
			];
		case "LogicalExpression":
			return stringsIn(node.right as Node);
		default:
			return [];
	}
}

const textOf = (node: Node): string =>
	node.type === "TemplateElement"
		? ((node.value as { cooked?: string }).cooked ?? "")
		: (node.value as string);

const canon: Rule = {
	meta: {
		type: "problem",
		docs: { description: "Report class names Yumma CSS does not generate." },
		messages: {
			notCanon: "`{{name}}` is not a Yumma CSS class.",
			didYouMean:
				"`{{name}}` is not a Yumma CSS class. Did you mean `{{suggestion}}`?",
		},
		schema: [
			{
				type: "object",
				properties: { allow: { type: "array", items: { type: "string" } } },
				additionalProperties: false,
			},
		],
	},
	create(context) {
		const allow = new Set((context.options[0] as CanonOptions)?.allow ?? []);
		const found: { name: string; node: Node }[] = [];

		return {
			JSXAttribute(node) {
				if (!isClassAttribute(node)) return;
				for (const part of stringsIn(node.value as Node)) {
					for (const name of textOf(part).split(/\s+/)) {
						if (name && !allow.has(name)) found.push({ name, node: part });
					}
				}
			},
			"Program:exit"() {
				check(found.map((entry) => entry.name));
				for (const { name, node } of found) {
					const verdict = verdicts.get(name);
					if (!verdict) continue;
					context.report(
						verdict.suggestion
							? {
									node,
									messageId: "didYouMean",
									data: { name, suggestion: verdict.suggestion },
								}
							: { node, messageId: "notCanon", data: { name } },
					);
				}
			},
		};
	},
};

// one class per single-property declaration, read from core's own tables
const byDeclaration = new Map<string, string>();
for (const utility of Object.values(coreUtils())) {
	if (utility.properties.length !== 1) continue;
	const [property] = utility.properties;
	for (const [key, value] of Object.entries(utility.values)) {
		const declaration = `${property}: ${value}`;
		const className = `${utility.prefix}:${key}`;
		const current = byDeclaration.get(declaration);
		if (!current || className.length < current.length) {
			byDeclaration.set(declaration, className);
		}
	}
}

const kebab = (name: string): string =>
	name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const preferClass: Rule = {
	meta: {
		type: "suggestion",
		docs: {
			description: "Report inline styles a Yumma CSS class already writes.",
		},
		messages: { useClass: "`{{declaration}}` is `{{className}}`." },
		schema: [],
	},
	create(context) {
		return {
			JSXAttribute(node) {
				if ((node.name as Node | undefined)?.name !== "style") return;
				const object = (node.value as Node | undefined)?.expression as
					| Node
					| undefined;
				if (object?.type !== "ObjectExpression") return;

				for (const property of object.properties as Node[]) {
					const key = property.key as Node | undefined;
					const value = property.value as Node | undefined;
					const name = key?.name ?? key?.value;
					if (typeof name !== "string" || typeof value?.value !== "string") {
						continue;
					}

					const declaration = `${kebab(name)}: ${value.value}`;
					const className = byDeclaration.get(declaration);
					if (className) {
						context.report({
							node: property,
							messageId: "useClass",
							data: { declaration, className },
						});
					}
				}
			},
		};
	},
};

/**
 * Lint rules for Yumma CSS, in the ESLint plugin shape Oxlint also loads.
 * `canon` reports classes Yumma CSS does not generate, and `prefer-class`
 * reports inline styles a class already writes.
 *
 * @example
 * // .oxlintrc.json
 * { "jsPlugins": ["@yummacss/lint/plugin"], "rules": { "yummacss/canon": "error" } }
 */
const plugin = {
	meta: { name: "yummacss" },
	rules: { canon, "prefer-class": preferClass },
};

export default plugin;
