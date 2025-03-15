import { Command } from "commander";
import { init } from "../commands/init.js";
import { build } from "../commands/build.js";
import { watch } from "../commands/watch.js";

const program = new Command();

program
  .name("yummacss")
  .description("Yumma CSS CLI")
  .version("3.0.0");

program
  .command("init")
  .description("Create a default config file")
  .action(init);

program
  .command("build")
  .description("Compile CSS with optional minification")
  .action(() => build().catch(() => process.exit(1)));

program
  .command("watch")
  .description("Watch files and rebuild on changes")
  .action(() => watch().catch(() => process.exit(1)));

program.parse(process.argv);
