import { writeFileSync } from "fs";
import { defaultConfig } from "../config/defaultConfig.js";
export function init() {
    // prettier-ignore
    const configContent = `export default ${JSON.stringify(defaultConfig, null, 2)}`;
    try {
        writeFileSync("yumma.config.js", configContent);
        console.log("Created yumma.config.js successfully");
    }
    catch (error) {
        console.error("Error creating config file:", error);
        process.exit(1);
    }
}
