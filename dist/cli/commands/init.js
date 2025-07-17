import { writeFileSync } from "fs";
import { generateConfigFile } from "../config/templates.js";
import { messages } from "../lib/cli-lang.js";
import { cli } from "../lib/cli-ui.js";
const DEFAULT_CONFIG_EXTENSION = ".js";
export function init() {
    const init = cli.startSpinner(messages.init.start);
    try {
        const configContent = generateConfigFile(DEFAULT_CONFIG_EXTENSION);
        const configFileName = `yumma.config${DEFAULT_CONFIG_EXTENSION}`;
        writeFileSync(configFileName, configContent);
        init.succeed(messages.init.success);
    }
    catch (error) {
        init.fail(messages.init.fail);
        cli.error(error instanceof Error ? error.message : messages.common.unknownError);
        process.exit(1);
    }
}
