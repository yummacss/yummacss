import { Command } from "commander";
import { init } from "../commands/init.js";
import { build } from "../commands/build.js";
import { watch } from "../commands/watch.js";

const program = new Command();

program.name("yummacss").description("Yumma CSS CLI").version("3.1.0");

program
  .command("init")
  .description("Create a default config file")
  .action(init);

program
  .command("build")
  .description("Build styles.")
  .action(() => build().catch(() => process.exit(1)));

program
  .command("watch")
  .description("Build styles automatically.")
  .action(() => watch().catch(() => process.exit(1)));

program.parse(process.argv);
