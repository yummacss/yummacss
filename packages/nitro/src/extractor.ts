import { scan } from "./scan";

export async function extractor(patterns: string[]): Promise<Set<string>> {
	const { classes } = await scan(patterns);
	return classes;
}
