import { parseArgs } from "node:util";
import { version } from "../package.json";
import { build } from "./commands/build";
import { init } from "./commands/init";
import { lint } from "./commands/lint";
import { migrate } from "./commands/migrate";
import { watch } from "./commands/watch";
import { m } from "./messages";
import { c, repaint } from "./ui";

const options = {
	allow: { type: "string", short: "a", multiple: true },
	config: { type: "string", short: "c" },
	"dry-run": { type: "boolean" },
	force: { type: "boolean" },
	help: { type: "boolean", short: "h" },
	version: { type: "boolean", short: "V" },
} as const;

const parse = (args: string[]) =>
	parseArgs({ args, options, allowPositionals: true });

async function main(): Promise<number> {
	repaint();
	let parsed: ReturnType<typeof parse>;
	try {
		parsed = parse(process.argv.slice(2));
	} catch (error) {
		const unknown =
			(error as { code?: string }).code === "ERR_PARSE_ARGS_UNKNOWN_OPTION";
		const option = String(error).match(/'(-[^']+)'/)?.[1];
		console.error(
			c.danger(
				unknown ? m.cli.unknownOption(option) : (error as Error).message,
			),
		);
		console.error(m.cli.seeHelp);
		return 1;
	}
	const { values, positionals } = parsed;

	if (values.version) {
		console.log(version);
		return 0;
	}

	const configPath = values.config;
	switch (values.help ? undefined : positionals[0]) {
		case "init":
		case "i":
			return init(values.force);
		case "build":
		case "b":
			return build(configPath);
		case "watch":
		case "w":
			return watch(configPath);
		case "lint":
		case "l":
			return lint({
				configPath,
				allowlist: values.allow
					?.flatMap((value) => value.split(","))
					.map((entry) => entry.trim()),
			});
		case "migrate":
		case "m":
			return migrate({ dryRun: values["dry-run"], configPath });
		case "help":
		case undefined:
			console.log(m.help(version));
			return 0;
		default:
			console.error(c.danger(m.cli.unknownCommand(positionals[0])));
			console.log(m.help(version));
			return 1;
	}
}

main()
	.then((code) => {
		process.exitCode = code;
	})
	.catch((error: unknown) => {
		console.error(
			c.danger(error instanceof Error ? error.message : String(error)),
		);
		process.exitCode = 1;
	});
