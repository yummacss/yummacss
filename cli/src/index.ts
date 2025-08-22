import { Command } from "commander";
import { build } from "./commands/build.js";
import { init } from "./commands/init.js";
import { watch } from "./commands/watch.js";

const cli = new Command();

cli.name("yummacss").description("Main command");

cli.command("init").description("Initialize config").action(init);

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
