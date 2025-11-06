import { writeFileSync } from "node:fs";
import { ConfigSchema, configName } from "@yummacss/nitro";
import stringifyObject from "stringify-object";
import { feedback } from "@/utils/feedback";
import { cli } from "@/utils/status";

function generateConfig(): { filename: string; content: string } {
	const z = ConfigSchema.parse({});

	return {
		filename: configName,
		content: `export default ${stringifyObject(z, {
			indent: "  ",
			singleQuotes: false,
		})};`,
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
