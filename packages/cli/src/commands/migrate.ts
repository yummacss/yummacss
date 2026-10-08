import { readFileSync, writeFileSync } from "node:fs";
import { validateClasses } from "@yummacss/nitro";
import { glob } from "tinyglobby";
import { m } from "../messages";
import { readConfig } from "../services/build";
import { useThemeColors, useThemeScreens } from "../services/migrate";
import { rewriteSource } from "../services/rewrite";
import { fail, intro, outro, say } from "../ui";

export interface MigrateOptions {
	dryRun?: boolean;
	configPath?: string;
}

export async function migrate(options: MigrateOptions = {}): Promise<number> {
	intro();
	try {
		const config = await readConfig(options.configPath);
		useThemeColors(config.theme?.colors);
		useThemeScreens(config.theme?.screens);

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

		const dry = options.dryRun === true;
		(dry ? say.info : say.done)(
			"rewrite",
			m.migrate.rewrote(migrated, changedFiles, dry),
		);

		// a class already in the 4.x syntax is not left behind, it is done
		const { valid } = validateClasses(skipped.keys(), config);
		for (const token of valid) skipped.delete(token);

		if (skipped.size > 0) {
			const lines = [...skipped]
				.sort()
				.map(([token, reason]) => m.migrate.skipped(token, reason));
			say.warn("skipped", `${m.migrate.skippedNote}\n${lines.join("\n")}`);
		}

		outro("next", dry ? m.migrate.dryRun() : m.migrate.done);
		return 0;
	} catch (error) {
		return fail(error);
	}
}
