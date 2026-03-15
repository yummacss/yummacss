import { version } from "../package.json";
import { build } from "./commands/build.js";
import { init } from "./commands/init.js";
import { watch } from "./commands/watch.js";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
	case "init":
	case "i":
		init();
		break;
	case "build":
	case "b":
		build().catch(() => process.exit(1));
		break;
	case "watch":
	case "w":
		watch().catch(() => process.exit(1));
		break;
	default:
		console.log(`
Yumma CSS v${version}

Commands:
  init, i    Initialize the configuration.
  build, b   Build the styles once.
  watch, w   Watch for file changes continuously.
`);
		break;
}
