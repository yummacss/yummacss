import { version } from "../package.json";
import { build } from "./commands/build.js";
import { init } from "./commands/init.js";
import { lint } from "./commands/lint.js";
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
	case "lint":
	case "l":
		logger.header(version);
		lint(args.slice(1)).catch((error) => {
			console.error(error instanceof Error ? error.message : String(error));
			process.exit(1);
		});
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
  lint, l    Report classes Yumma CSS does not generate. --allow to skip some.
  migrate, m Rewrite 3.x classes into the 4.0 syntax. --dry-run to preview.
`);
		break;
}
