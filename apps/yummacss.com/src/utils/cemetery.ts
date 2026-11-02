/** A project Yumma CSS outlived, with the dates the timeline draws it between. */
export interface Grave {
	name: string;
	/** What took its place, or what it became. */
	note: string;
	/** The day it shipped, or `null` when nobody remembers. */
	born: string | null;
	/** The day it was retired, or `null` when nobody remembers. */
	died: string | null;
	/** A day it was known to be alive, which anchors a bar with an unknown end. */
	seen?: string;
	/** How long it lived, in words, or `?`. */
	lived: string;
	/** Lives on under another name. */
	reborn?: boolean;
}

/** The timeline's first and last day. */
export const CEMETERY_START = "2023-09-01";
export const CEMETERY_END = "2026-11-01";

export const GRAVES: Grave[] = [
	{
		name: "Yumma CSS Helper",
		note: "VS Code snippets → IntelliSense",
		born: "2023-09-18",
		died: null,
		lived: "?",
	},
	{
		name: "Yumma CSS Editor",
		note: "the first playground",
		born: null,
		died: null,
		// left beta that day
		seen: "2024-01-10",
		lived: "?",
	},
	{
		name: "yummacss.com/blog",
		note: "→ GitHub releases",
		born: "2024-01-10",
		died: "2026-10-11",
		lived: "2 years",
	},
	{
		name: "IntelliSense for VS Code",
		note: "→ @yummacss/lint",
		born: "2024-04-18",
		died: "2026-08-29",
		lived: "2 years",
	},
	{
		name: "Yumma CSS Play",
		note: "play.yummacss.com",
		born: "2024-07-10",
		died: "2026-09-30",
		lived: "2 years",
	},
	{
		name: "@yummacss/runtime",
		note: "→ @yummacss/cdn",
		born: "2026-01-15",
		died: "2026-09-19",
		lived: "8 months",
	},
	{
		name: "@yummacss/intellisense",
		note: "58 versions",
		born: "2026-03-04",
		died: "2026-09-30",
		lived: "7 months",
	},
	{
		name: "@yummacss/canon",
		note: "reincarnated as @yummacss/lint",
		born: "2026-07-03",
		died: "2026-09-18",
		lived: "11 weeks",
		reborn: true,
	},
	{
		name: "@yummacss/language-server",
		note: "→ @yummacss/lint",
		born: "2026-07-05",
		died: "2026-08-29",
		lived: "8 weeks",
	},
	{
		name: "Zed extension",
		note: "→ @yummacss/lint",
		born: "2026-07-23",
		died: "2026-08-29",
		lived: "5 weeks",
	},
	{
		name: "@yummacss/cdn",
		note: "→ Vite & PostCSS plugins",
		born: "2026-09-19",
		died: "2026-09-30",
		lived: "11 days",
	},
];
