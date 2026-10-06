import { type Config, generator, scan } from "@yummacss/nitro";

export async function compiler(config: Config): Promise<string> {
	const { classes } = await scan(config.source ?? []);
	return generator(classes, config);
}
