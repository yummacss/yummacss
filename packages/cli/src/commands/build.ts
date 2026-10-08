import { m } from "../messages";
import { readConfig, build as run } from "../services/build";
import { fail, intro, outro, say } from "../ui";

export async function build(configPath?: string): Promise<number> {
	intro();
	try {
		const built = await run(await readConfig(configPath), configPath);
		say.done("scan", m.build.scanned(built.files, built.classes));
		say.done("write", m.build.written(built.output, built.bytes));
		outro("done", m.build.done(built.ms));
		return 0;
	} catch (error) {
		return fail(error);
	}
}
