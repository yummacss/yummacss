import { writeFileSync } from "node:fs";
import { configName } from "@yummacss/nitro";
import { feedback } from "@/utils/feedback";
import { cli } from "@/utils/status";

function generateConfig(): { filename: string; content: string } {
	return {
		filename: configName,
		content: `import { defineConfig } from "yummacss";\n\nexport default defineConfig({\n  source: [""],\n  output: "",\n});\n`,
	};
}

export function init() {
	const status = cli.progress("Initialize the configuration...");

	try {
		const { filename, content } = generateConfig();
		writeFileSync(filename, content);
		status.succeed(feedback.init.success);
	} catch (_error) {
		status.fail(feedback.init.fail);
		process.exit(1);
	}
}
