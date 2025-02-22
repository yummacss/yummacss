#!/usr/bin/env node

import { program } from "commander";
import { runBuild } from "../cli/index.js";

program
  .command("init")
  .description("Purges unused styles.")
  .action(async () => {
    try {
      await runBuild();
    } catch (err) {
      console.error("Build process failed:", err);
    }
  });

program.parse(process.argv);
