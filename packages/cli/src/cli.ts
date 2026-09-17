import { version } from "../package.json";
import { build } from "./commands/build.js";
import { init } from "./commands/init.js";
import { migrate } from "./commands/migrate.js";
import { watch } from "./commands/watch.js";
import { logger } from "./utils/logger.js";

const args = process.argv.slice(2);
const command = args[0];

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
	case "migrate":
	case "m":
		logger.header(version);
		migrate({ dryRun: args.includes("--dry-run") }).catch(() =>
			process.exit(1),
		);
		break;
	default:
		logger.header(version);
		console.log(`Commands:
  init, i    Initialize the configuration.
  build, b   Build the styles once.
  watch, w   Watch for file changes continuously.
  migrate, m Rewrite 3.x classes into the 4.0 syntax. --dry-run to preview.
`);
		break;
}
