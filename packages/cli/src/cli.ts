import { parseArgs } from "node:util";
import { version } from "../package.json";
import { build } from "./commands/build.js";
import { init } from "./commands/init.js";
import { lint } from "./commands/lint.js";
import { migrate } from "./commands/migrate.js";
import { watch } from "./commands/watch.js";
import { logger } from "./utils/logger.js";

const { positionals, values } = parseArgs({
	allowPositionals: true,
	strict: false,
	options: {
		allow: { type: "string", short: "a", multiple: true },
		config: { type: "string", short: "c" },
		"dry-run": { type: "boolean" },
	},
});
const command = positionals[0];

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
		lint({
			allowlist: (values.allow as string[] | undefined)
				?.flatMap((value) => value.split(","))
				.map((entry) => entry.trim()),
			configPath: values.config as string | undefined,
		}).catch((error) => {
			console.error(error instanceof Error ? error.message : String(error));
			process.exit(1);
		});
		break;
	case "migrate":
	case "m":
		logger.header(version);
		migrate({ dryRun: values["dry-run"] === true }).catch(() =>
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
