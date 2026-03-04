import { coreUtils } from "@yummacss/core";
import { CLASS_ATTR_REGEX, extractClassContent } from "./constants";

export interface Conflict {
	utilities: string[];
	property: string;
	startIndex: number;
	endIndex: number;
}

export interface ConflictGroup {
	conflicts: string[];
	property: string;
}

function buildPropertyMap(): Map<string, string[]> {
	const map = new Map<string, string[]>();
	const allUtils = coreUtils();

	Object.values(allUtils).forEach((util: any) => {
		Object.entries(util.values as Record<string, string>).forEach(
			([suffix]) => {
				const fullClass =
					suffix === "" ? util.prefix : `${util.prefix}-${suffix}`;
				map.set(fullClass, util.properties as string[]);
			},
		);
	});

	return map;
}

export const propertyMap = buildPropertyMap();

export function findConflicts(line: string): Conflict[] {
	const results: Conflict[] = [];
	const regex = new RegExp(CLASS_ATTR_REGEX.source, "g");
	let match: RegExpExecArray | null;

	match = regex.exec(line);
	while (match !== null) {
		const classContent = extractClassContent(match);
		if (!classContent) continue;

		const contentStart = match.index + match[0].indexOf(classContent);
		const utilities = classContent.split(/\s+/).filter((u) => u.trim() !== "");

		// group by property@variant key to respect variant scoping
		const propertyToUtilities = new Map<string, string[]>();

		for (const utility of utilities) {
			const parts = utility.split(":");
			const baseUtility = parts.pop() || utility;
			const variant = parts.join(":");

			const properties = propertyMap.get(baseUtility);
			if (!properties) continue;

			for (const prop of properties) {
				const key = `${prop}@${variant}`;
				const existing = propertyToUtilities.get(key) ?? [];
				existing.push(utility);
				propertyToUtilities.set(key, existing);
			}
		}

		for (const [key, utils] of propertyToUtilities) {
			if (utils.length <= 1) continue;

			const property = key.split("@")[0] as string;
			let minStart = Number.MAX_SAFE_INTEGER;
			let maxEnd = 0;
			let searchFrom = 0;

			for (const utility of utils) {
				const idx = classContent.indexOf(utility, searchFrom);
				if (idx !== -1) {
					minStart = Math.min(minStart, contentStart + idx);
					maxEnd = Math.max(maxEnd, contentStart + idx + utility.length);
					searchFrom = idx + utility.length;
				}
			}

			results.push({
				utilities: utils,
				property,
				startIndex: minStart,
				endIndex: maxEnd,
			});
		}
		match = regex.exec(line);
	}

	return results;
}