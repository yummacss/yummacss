#!/usr/bin/env node

import { program } from "commander";
import { runBuild } from "../cli/index.js";

program
  .command("build")
  .description("Compiles SCSS based on your configuration.")
  .action(async () => {
    try {
      await runBuild();
    } catch (err) {
      console.error("Build process failed:", err);
    }
  });

program.parse(process.argv);
