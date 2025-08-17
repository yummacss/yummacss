import { Command } from "commander";
import { build } from "./commands/build.js";
import { init } from "./commands/init.js";
import { watch } from "./commands/watch.js";

const program = new Command();

program.name("yummacss").description("Main command.");

program.command("init").description("Create config file.").action(init);

program
  .command("build")
  .description("Build styles.")
  .action(() => build().catch(() => process.exit(1)));

program
  .command("watch")
  .description("Build styles continuously.")
  .action(() => watch().catch(() => process.exit(1)));

program.parse(process.argv);
