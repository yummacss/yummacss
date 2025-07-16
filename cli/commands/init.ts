import { writeFileSync } from "fs";

import { defaultConfig } from "../config/defaultConfig.js";
import { messages } from "../lib/cli-lang.js";
import { cli } from "../lib/cli-ui.js";

export function init() {
  const init = cli.startSpinner(messages.init.start);

  try {
    const configContent = `export default ${JSON.stringify(
      defaultConfig,
      null,
      2
    )}`;
    writeFileSync("yumma.config.js", configContent);

    init.succeed(messages.init.success);
  } catch (error) {
    init.fail(messages.init.fail);
    cli.error(
      error instanceof Error ? error.message : messages.common.unknownError
    );
    process.exit(1);
  }
}
