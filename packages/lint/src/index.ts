import { existsSync } from "node:fs";
import { join } from "node:path";
import { coreUtils } from "@yummacss/core";
import {
	type Config,
	configName,
	isLegacyClass,
	loadConfig,
	suggestClasses,
	validateClasses,
} from "@yummacss/nitro";

// the subset of the ESLint v9 rule API that Oxlint's JS plugins implement
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

/** Options every Yumma CSS rule accepts. */
export interface RuleOptions {
	/**
	 * Exceptions to the rule. Class names for `no-unknown-classes`, CSS
	 * property names for `no-inline-styles`. A trailing `*` matches a prefix.
	 *
	 * @example ["footer-version", "editor-*"]
	 */
	allow?: string[];

	/**
	 * Replaces the rule's message. `{{className}}`, `{{property}}` and
	 * `{{suggestions}}` are filled in, and left empty where they do not apply.
	 *
	 * @example "Use a class from the scale for {{property}}. See yumma.config.mjs."
	 */
	message?: string;
}

const optionsSchema = [
	{
		type: "object",
		properties: {
			allow: { type: "array", items: { type: "string" } },
			message: { type: "string" },
		},
		additionalProperties: false,
	},
];

function policy(context: Context) {
	const options = (context.options[0] ?? {}) as RuleOptions;
	const exact = new Set<string>();
	const prefixes: string[] = [];
	for (const entry of options.allow ?? []) {
		if (entry.endsWith("*")) prefixes.push(entry.slice(0, -1));
		else exact.add(entry);
	}

	return {
		allows: (name: string) =>
			exact.has(name) || prefixes.some((prefix) => name.startsWith(prefix)),
		report(node: Node, messageId: string, data: Record<string, string>) {
			if (!options.message) return context.report({ node, messageId, data });
			const filled = { className: "", property: "", suggestions: "", ...data };
			const text = options.message.replace(
				/\{\{(\w+)\}\}/g,
				(_, key: string) => filled[key as keyof typeof filled] ?? "",
			);
			context.report({ node, messageId: "custom", data: { text } });
		},
	};
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

const CLASS_ATTRIBUTES = new Set(["className", "class"]);
const CLASS_FUNCTIONS = new Set(["cn", "cx", "clsx", "classNames"]);

// the string pieces of a class value, through ternaries, `&&`, arrays and object keys
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
		case "ArrayExpression":
			return (node.elements as Node[]).flatMap(stringsIn);
		case "ObjectExpression":
			return (node.properties as Node[]).flatMap((property) =>
				property.type === "Property" && !property.computed
					? stringsIn(property.key as Node)
					: [],
			);
		default:
			return [];
	}
}

const textOf = (node: Node): string =>
	node.type === "TemplateElement"
		? ((node.value as { cooked?: string }).cooked ?? "")
		: (node.value as string);

const calleeName = (node: Node): string | undefined =>
	(node.callee as Node | undefined)?.name as string | undefined;

const noUnknownClasses: Rule = {
	meta: {
		type: "problem",
		docs: { description: "Report class names Yumma CSS does not generate." },
		messages: {
			unknown:
				"`{{className}}` is not a Yumma CSS class, so it generates no CSS. Check the prefix and the value against yummacss.com/docs, or add it to `allow` if your own stylesheet defines it.",
			didYouMean:
				"`{{className}}` is not a Yumma CSS class, so it generates no CSS. Did you mean `{{suggestions}}`?",
			legacy:
				"`{{className}}` is Yumma CSS 3.x syntax for `{{suggestions}}`. Run `pnpm dlx yummacss migrate` to rewrite every class in the project, rather than one at a time.",
			custom: "{{text}}",
		},
		schema: optionsSchema,
	},
	create(context) {
		const rule = policy(context);
		const found: { name: string; node: Node }[] = [];
		// `merge` is a common name, so it counts only when imported from yummacss/merge
		const merges = new Set<string>();
		const collect = (value: Node | undefined) => {
			for (const part of stringsIn(value)) {
				for (const name of textOf(part).split(/\s+/)) {
					if (name && !rule.allows(name)) found.push({ name, node: part });
				}
			}
		};

		return {
			JSXAttribute(node) {
				const name = (node.name as Node | undefined)?.name as string;
				if (CLASS_ATTRIBUTES.has(name)) collect(node.value as Node);
			},
			ImportDeclaration(node) {
				if ((node.source as Node).value !== "yummacss/merge") return;
				for (const specifier of node.specifiers as Node[]) {
					merges.add((specifier.local as Node).name as string);
				}
			},
			CallExpression(node) {
				const name = calleeName(node);
				if (!name || !(CLASS_FUNCTIONS.has(name) || merges.has(name))) return;
				for (const argument of node.arguments as Node[]) collect(argument);
			},
			"Program:exit"() {
				check(found.map((entry) => entry.name));
				for (const { name, node } of found) {
					const verdict = verdicts.get(name);
					if (!verdict) continue;
					const suggestion = verdict.suggestion ?? "";
					const messageId = isLegacyClass(name, suggestion)
						? "legacy"
						: suggestion
							? "didYouMean"
							: "unknown";
					rule.report(node, messageId, {
						className: name,
						suggestions: suggestion,
					});
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

const noInlineStyles: Rule = {
	meta: {
		type: "suggestion",
		docs: {
			description:
				"Report inline styles, naming the Yumma CSS class that writes the same declaration.",
		},
		messages: {
			useClass: "`{{property}}` is set inline. Use `{{suggestions}}` instead.",
			inline:
				"`{{property}}` is set inline. Use a class from the scale, or pass a value that changes at runtime through a custom property.",
			custom: "{{text}}",
		},
		schema: optionsSchema,
	},
	create(context) {
		const rule = policy(context);
		return {
			JSXAttribute(node) {
				if ((node.name as Node | undefined)?.name !== "style") return;
				const object = (node.value as Node | undefined)?.expression as
					| Node
					| undefined;
				if (object?.type !== "ObjectExpression") return;

				for (const property of object.properties as Node[]) {
					if (property.type !== "Property") continue;
					const key = property.key as Node;
					const raw = (key.name ?? key.value) as string | undefined;
					if (typeof raw !== "string" || raw.startsWith("--")) continue;

					const name = kebab(raw);
					if (rule.allows(name) || rule.allows(raw)) continue;

					const value = (property.value as Node).value;
					const className =
						typeof value === "string"
							? byDeclaration.get(`${name}: ${value}`)
							: undefined;
					rule.report(property, className ? "useClass" : "inline", {
						property: typeof value === "string" ? `${name}: ${value}` : name,
						suggestions: className ?? "",
					});
				}
			},
		};
	},
};

/** Every rule, by name. */
export const rules = {
	"no-unknown-classes": noUnknownClasses,
	"no-inline-styles": noInlineStyles,
};

/**
 * Lint rules for Yumma CSS, loaded by Oxlint as a JS plugin. `meta.name` is
 * the namespace, so a rule reads `yummacss/no-unknown-classes`.
 *
 * @example
 * // .oxlintrc.json
 * { "jsPlugins": ["@yummacss/lint"], "rules": { "yummacss/no-unknown-classes": "error" } }
 */
export const plugin = { meta: { name: "yummacss" }, rules };

export default plugin;
