import { type Config, extractor, generator } from "@yummacss/nitro";

export async function compiler(config: Config): Promise<{
	css: string;
	dependencies: string[];
}> {
	const usedClasses = await extractor(config.source);
	const css = generator(usedClasses, config);

	return {
		css,
		dependencies: config.source,
	};
}
