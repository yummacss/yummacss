import { Command } from "commander";
import { init } from "../commands/init.js";
import { build } from "../commands/build.js";
// import { watch } from "../commands/watch.js";

const program = new Command();

program
  .name("yummacss")
  .description("Compiling SCSS and purges styles")
  .version("0.0.1");

program
  .command("init")
  .description("Initialize yumma.config.js file")
  .action(init);

program
  .command("build")
  .description("Compile SCSS to CSS based on yumma.config.js")
  .action(build);

// program
//   .command("watch")
//   .description("Looks for file changes and rebuild as necessary")
//   .action(watch);

program.parse(process.argv);
