import { Command } from "commander";
import { version } from "../../package.json";
import { build } from "./commands/build.js";
import { init } from "./commands/init.js";
import { watch } from "./commands/watch.js";

const cli = new Command();

cli.name("yummacss").description("Yumma CSS main command").version(version);

cli.command("init").action(init).alias("i").description("Initialize config");

cli
	.command("build")
	.action(() => build().catch(() => process.exit(1)))
	.alias("b")
	.description("Build styles once");

cli
	.command("watch")
	.action(() => watch().catch(() => process.exit(1)))
	.alias("w")
	.description("Build styles continuously");

cli.parse(process.argv);
