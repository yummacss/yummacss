import { extractClassStrings } from "./extract";

export function tokenizer(content: string): string[] {
	const tokens = new Set<string>();

	for (const literal of extractClassStrings(content)) {
		for (const token of literal.value.split(/\s+/)) {
			const clean = token.replace(/^@+/, "");
			if (clean && /^[a-z]/.test(clean) && clean.includes("-")) {
				tokens.add(token);
			}
		}
	}

	return Array.from(tokens);
}
