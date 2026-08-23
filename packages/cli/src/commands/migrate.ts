import { readFileSync, writeFileSync } from "node:fs";
import { glob } from "tinyglobby";
import { loadConfig } from "@/services/loader";
import { useThemeColors } from "@/services/migrate";
import { rewriteSource } from "@/services/rewrite";
import { logger } from "@/utils/logger";

export interface MigrateOptions {
	/** Report what would change without touching any file. */
	dryRun?: boolean;
}

export async function migrate(options: MigrateOptions = {}) {
	try {
		const config = await loadConfig();

		// Without this every class built on a project's own palette reads as
		// unrecognized & is skipped.
		useThemeColors(config.theme?.colors);

		const files = await glob(config.source ?? []);

		let changedFiles = 0;
		let migrated = 0;
		const skipped = new Map<string, string>();

		for (const file of files) {
			const original = readFileSync(file, "utf-8");
			const result = rewriteSource(original);

			for (const [token, reason] of result.skipped) skipped.set(token, reason);
			migrated += result.migrated;

			if (result.content === original) continue;
			changedFiles++;
			if (!options.dryRun) writeFileSync(file, result.content);
		}

		const verb = options.dryRun ? "would rewrite" : "rewrote";
		console.log(
			`Scanned ${files.length} files and ${verb} ${migrated} classes in ${changedFiles} files.`,
		);

		if (skipped.size > 0) {
			console.log(`\nLeft alone (${skipped.size}):`);
			for (const [token, reason] of [...skipped].sort()) {
				console.log(` "${token}" - ${reason}`);
			}
			console.log(
				"\nThese are unchanged & need a look. A class built at runtime has to be rewritten by hand.",
			);
		}

		if (options.dryRun) {
			console.log("\nNothing was written. Re-run without --dry-run to apply.");
		}
	} catch (error) {
		logger.fail(error instanceof Error ? error.message : String(error));
		process.exit(1);
	}
}
