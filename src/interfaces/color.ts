import type { Utility } from "./utility";

export interface Color extends Utility {}

export interface Colors {
	[key: string]: Color;
}
