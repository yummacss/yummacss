import type { Utilities } from "@/interfaces";

import { background } from "./background";
import { border } from "./border";
import { boxModel } from "./box-model";
import { color } from "./color";
import { effect } from "./effect";
import { flexbox } from "./flexbox";
import { font } from "./font";
import { grid } from "./grid";
import { interactivity } from "./interactivity";
import { layout } from "./layout";
import { outline } from "./outline";
import { positioning } from "./positioning";
import { svg } from "./svg";
import { table } from "./table";
import { text } from "./text";
import { transform } from "./transform";
import { transition } from "./transition";

export const core: Utilities = {
	...background,
	...border,
	...boxModel,
	...color,
	...effect,
	...flexbox,
	...font,
	...grid,
	...interactivity,
	...layout,
	...outline,
	...positioning,
	...svg,
	...table,
	...text,
	...transform,
	...transition,
};
