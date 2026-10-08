import { styleText } from "node:util";
import * as p from "@clack/prompts";
import { version } from "../package.json";

type Format = Parameters<typeof styleText>[0];
const style = (format: Format) => (text: string) => styleText(format, text);

// styleText has no hex, so 24-bit terminals get the docs colours raw
const depth = process.stdout.hasColors?.(2 ** 24)
	? 24
	: process.stdout.hasColors?.()
		? 4
		: 0;
const rgb = (code: string, fallback: Format) => (text: string) =>
	depth === 24 ? `\x1b[${code}m${text}\x1b[39m` : styleText(fallback, text);

// the docs theme's dark values: accent, diff-add and diff-remove, plus a
// yellow at the same lightness for warnings
const ACCENT = "38;2;190;198;242";
const WARNING = "38;2;225;212;168";
const SUCCESS = "38;2;168;225;173";
const DANGER = "38;2;225;168;168";

export const c = {
	bold: style("bold"),
	dim: style("dim"),
	accent: rgb(ACCENT, "blue"),
	success: rgb(SUCCESS, "green"),
	warning: rgb(WARNING, "yellow"),
	danger: rgb(DANGER, "red"),
	badge: (text: string) =>
		depth === 24
			? `\x1b[1;97;48;2;76;95;199m${text}\x1b[0m`
			: styleText(["bold", "whiteBright", "bgBlue"], text),
};

// the prompt library names its colours; repaint them in the docs palette.
// The same file lives in yummaui; keep the two alike.
const REPAINT: Record<string, string> = {
	"31": DANGER,
	"32": SUCCESS,
	"33": WARNING,
	"35": ACCENT,
	"36": ACCENT,
};

const ANSI_COLOR = new RegExp(`${String.fromCharCode(27)}\\[(3[1-6])m`, "g");

export function repaint(): void {
	if (depth !== 24) return;
	const write = process.stdout.write.bind(process.stdout);
	process.stdout.write = ((chunk: unknown, ...rest: never[]) =>
		write(
			typeof chunk === "string"
				? chunk.replace(ANSI_COLOR, (code, n: string) =>
						REPAINT[n] ? `\x1b[${REPAINT[n]}m` : code,
					)
				: (chunk as Uint8Array),
			...rest,
		)) as typeof process.stdout.write;
}

export const plural = (n: number, word: string) =>
	`${n} ${word}${n === 1 ? "" : word.endsWith("s") ? "es" : "s"}`;

// a stage name in a fixed column, so every line's text starts in one place
const WIDTH = 11;
function tagged(stage: string, text: string): string {
	const [first, ...rest] = text.split("\n");
	return [
		`${c.dim(stage.padEnd(WIDTH))}${first}`,
		...rest.map((line) => `${" ".repeat(WIDTH)}${line}`),
	].join("\n");
}

const line = (symbol: string) => (stage: string, text: string) =>
	p.log.message(tagged(stage, text), { symbol, spacing: 0 });

export const say = {
	done: line(c.success(p.S_STEP_SUBMIT)),
	info: line(p.S_INFO),
	warn: line(c.warning(p.S_WARN)),
	error: line(c.danger(p.S_ERROR)),
};

export const tag = tagged;

export function intro(): void {
	p.intro(`${depth ? c.badge(" yummacss ") : "yummacss"} ${c.dim(version)}`);
	p.log.message("", { symbol: c.dim(p.S_BAR), spacing: 0 });
}

export function outro(stage: string, text: string): void {
	p.outro(tagged(stage, text));
}

// ends the run on an error; every command returns its exit code
export function fail(error: unknown): number {
	p.cancel(
		tagged("error", error instanceof Error ? error.message : String(error)),
	);
	return 1;
}
