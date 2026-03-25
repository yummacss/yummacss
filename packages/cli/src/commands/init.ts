import { writeFileSync } from "node:fs";
import { configName } from "@yummacss/nitro";
import { logger } from "@/utils/logger";

function generateConfig(): { filename: string; content: string } {
	return {
		filename: configName,
		content: `import { defineConfig } from "yummacss";\n\nexport default defineConfig({\n  source: [""],\n  output: "",\n});\n`,
	};
}

export function init() {
	const status = logger.init.start();

	try {
		const { filename, content } = generateConfig();
		writeFileSync(filename, content);
		status.succeed(logger.init.success(filename));
	} catch (_error) {
		status.fail(logger.init.fail());
		process.exit(1);
	}
}
