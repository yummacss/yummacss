import { Command } from "commander";
import { init } from "../commands/init.js";
import { build } from "../commands/build.js";
const program = new Command();
program
    .name("yummacss")
    .description("Compiling SCSS and purges styles")
    .version("3.0.0");
program
    .command("init")
    .description("Initialize yumma.config.js file")
    .action(init);
program
    .command("build")
    .description("Compile SCSS to CSS based on yumma.config.js")
    .action(build);
program.parse(process.argv);
