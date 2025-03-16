import { writeFileSync } from "fs";
import { defaultConfig } from "../config/defaultConfig.js";
import { cli } from "../utils/cli-ui.js";
export function init() {
    const initSpinner = cli.startSpinner("Creating config file...");
    try {
        const configContent = `export default ${JSON.stringify(defaultConfig, null, 2)}`;
        writeFileSync("yumma.config.js", configContent);
        initSpinner.succeed("Config file created!");
        cli.success("yumma.config.js successfully created");
    }
    catch (error) {
        initSpinner.fail("Failed to create config file!");
        cli.error(error instanceof Error ? error.message : "Unknown error occurred");
        process.exit(1);
    }
}
