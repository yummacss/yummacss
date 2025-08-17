import { writeFileSync } from "fs";
import { defaultConfig, defaultBuildOptions } from "../config/defaultConfig.js";
import { messages } from "../lib/cli-lang.js";
import { cli } from "../lib/cli-ui.js";

// Generate clean JavaScript object syntax (not JSON)
function generateConfigContent(): string {
  return `export default {
  source: ${JSON.stringify(defaultConfig.source)},
  output: ${JSON.stringify(defaultConfig.output)},
  buildOptions: {
    reset: ${defaultBuildOptions.reset},
    minify: ${defaultBuildOptions.minify}
  }
}`;
}

export function init() {
  const init = cli.startSpinner(messages.init.start);

  try {
    const configContent = generateConfigContent();
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
