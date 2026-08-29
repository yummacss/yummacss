import { version } from "../package.json";
import { build } from "./commands/build.js";
import { init } from "./commands/init.js";
import { watch } from "./commands/watch.js";
import { logger } from "./utils/logger.js";

const args = process.argv.slice(2);
const command = args[0];

// `migrate` (packages/cli/src/commands/migrate.ts) is written, tested and
// deliberately not wired up here. It rewrites classes into the v4 colon
// syntax, which this release cannot compile - `d-f` generates, `d:f` does
// not - so shipping it would let someone silently unstyle their whole
// project. Re-add the import, the case and the help line when v4 lands.

switch (command) {
	case "init":
	case "i":
		init();
		break;
	case "build":
	case "b":
		logger.header(version);
		build().catch(() => process.exit(1));
		break;
	case "watch":
	case "w":
		logger.header(version);
		watch().catch(() => process.exit(1));
		break;
	default:
		logger.header(version);
		console.log(`Commands:
  init, i    Initialize the configuration.
  build, b   Build the styles once.
  watch, w   Watch for file changes continuously.
`);
		break;
}
