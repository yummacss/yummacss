import { writeFileSync } from "node:fs";
import { ConfigSchema, configName } from "@yummacss/nitro";
import { feedback } from "@/utils/feedback";
import { cli } from "@/utils/status";

function stringify(obj: any, depth = 1): string {
	const indent = "  ".repeat(depth);
	const baseIndent = "  ".repeat(depth - 1);

	if (typeof obj === "string") return `"${obj}"`;
	if (typeof obj === "boolean" || typeof obj === "number") return String(obj);
	if (Array.isArray(obj)) {
		if (obj.length === 0) return "[]";
		const items = obj
			.map((item) => `${indent}${stringify(item, depth + 1)}`)
			.join(",\n");
		return `[\n${items}\n${baseIndent}]`;
	}
	if (typeof obj === "object" && obj !== null) {
		const keys = Object.keys(obj);
		if (keys.length === 0) return "{}";
		const items = keys
			.map((key) => `${indent}${key}: ${stringify(obj[key], depth + 1)}`)
			.join(",\n");
		return `{\n${items}\n${baseIndent}}`;
	}
	return String(obj);
}

function generateConfig(): { filename: string; content: string } {
	const config = ConfigSchema.parse({});

	return {
		filename: configName,
		content: `import { defineConfig } from "yummacss";\n\nexport default defineConfig(${stringify(config)});\n`,
	};
}

export function init() {
	const status = cli.progress("Initializing config...");

	try {
		const { filename, content } = generateConfig();
		writeFileSync(filename, content);
		status.succeed(feedback.init.success);
	} catch (_error) {
		status.fail(feedback.init.fail);
		process.exit(1);
	}
}
