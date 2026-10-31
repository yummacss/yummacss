import type { CSSProperties, ReactNode } from "react";

// The link preview for every page: a canvas, the product's logo, and one
// selected layer. Drawn by ImageResponse at 1200 by 630. the notes, "OG images".

export type OgTheme = "light" | "dark";

// the site's own tokens; `on` is what sits on the accent and fills the handles
const PALETTES = {
	light: {
		page: "#f7f8fb",
		panel: "#ffffff",
		rule: "#e3e6ef",
		tick: "#8b91a3",
		ink: "#14171f",
		muted: "#6b7180",
		accent: "#4c5fc7",
		on: "#ffffff",
	},
	// the canvas is the surface, as the site's boxes are, so it stands off the page
	dark: {
		page: "#1a1d2e",
		panel: "#20243a",
		rule: "#2c3152",
		tick: "#5c6080",
		ink: "#ffffff",
		muted: "#9a9db0",
		accent: "#bec6f2",
		on: "#151724",
	},
};

type Palette = (typeof PALETTES)[OgTheme];
const BAR = 28;
const LEFT = 84;

export type OgSpec =
	| {
			// two lines with one word selected, for a product's home
			kind: "home";
			before: string;
			word: string;
			second: string;
	  }
	| {
			// the page title selected, for docs pages
			kind: "title";
			title: string;
			description?: string;
			classes?: string[];
	  };

const box = (
	left: number,
	top: number,
	width: number,
	height: number,
	style: CSSProperties = {},
): CSSProperties => ({
	position: "absolute",
	left,
	top,
	width,
	height,
	...style,
});

function Rulers({ c }: { c: Palette }) {
	const ticks: ReactNode[] = [];
	for (let i = 40; i < 1200; i += 40) {
		const n = i % 200 ? 9 : 16;
		ticks.push(
			<div
				key={`x${i}`}
				style={box(i, BAR - n, 2, n, { background: c.tick })}
			/>,
		);
		if (i < 630)
			ticks.push(
				<div
					key={`y${i}`}
					style={box(BAR - n, i, n, 2, { background: c.tick })}
				/>,
			);
	}
	return (
		<>
			<div
				style={box(0, 0, 1200, BAR, {
					background: c.panel,
					borderBottom: `1.5px solid ${c.rule}`,
				})}
			/>
			<div
				style={box(0, 0, BAR, 630, {
					background: c.panel,
					borderRight: `1.5px solid ${c.rule}`,
				})}
			/>
			{ticks}
		</>
	);
}

const HANDLE = 16;
const handle = (c: Palette, left: string, top: string): CSSProperties => ({
	position: "absolute",
	left,
	top,
	width: HANDLE,
	height: HANDLE,
	marginLeft: -HANDLE / 2 - 1.5,
	marginTop: -HANDLE / 2 - 1.5,
	background: c.on,
	border: `3px solid ${c.accent}`,
});

/** A selected layer: an outline, eight handles and a tag above. */
function TagIcon({ c, kind }: { c: Palette; kind: "text" | "component" }) {
	return kind === "text" ? (
		<span style={{ fontWeight: 400 }}>T</span>
	) : (
		<div
			style={{
				width: 10,
				height: 10,
				border: `2px solid ${c.on}`,
				transform: "rotate(45deg)",
			}}
		/>
	);
}

function Selected({
	c,
	tag,
	kind = "text",
	pad,
	children,
}: {
	c: Palette;
	tag: string;
	kind?: "text" | "component";
	pad: number;
	children: ReactNode;
}) {
	const spots = [
		["0%", "0%"],
		["50%", "0%"],
		["100%", "0%"],
		["0%", "50%"],
		["100%", "50%"],
		["0%", "100%"],
		["50%", "100%"],
		["100%", "100%"],
	];
	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				padding: pad,
				border: `3px solid ${c.accent}`,
			}}
		>
			{children}
			{spots.map(([x, y]) => (
				<div key={`${x}${y}`} style={handle(c, x, y)} />
			))}
			<div
				style={{
					position: "absolute",
					left: -3,
					top: -54,
					display: "flex",
					alignItems: "center",
					gap: 10,
					padding: "3px 10px",
					borderRadius: 0,
					background: c.accent,
					color: c.on,
					fontFamily: "Quattro",
					fontSize: 18,
					whiteSpace: "nowrap",
				}}
			>
				<TagIcon c={c} kind={kind} />
				{tag}
			</div>
		</div>
	);
}

const cursor = (c: Palette) => (
	<svg width="28" height="32" viewBox="0 0 28 32" aria-hidden="true">
		<path
			d="M2 2 L2 26 L8.5 20 L13 30 L17.5 28 L13 18.5 L22 18.5 Z"
			fill={c.ink}
			stroke={c.on}
			strokeWidth="2"
			strokeLinejoin="round"
		/>
	</svg>
);

// Geist Serif's average advance is about half its size, so a title fits by length
const titleSize = (text: string, width: number, max: number) =>
	Math.min(max, Math.floor(width / (text.length * 0.53)));

function Home({
	c,
	spec,
}: {
	c: Palette;
	spec: Extract<OgSpec, { kind: "home" }>;
}) {
	return (
		<div
			style={{
				position: "absolute",
				left: LEFT,
				top: 306,
				display: "flex",
				flexDirection: "column",
				fontFamily: "Geist Serif",
				fontSize: 124,
				lineHeight: 1.02,
				color: c.ink,
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
				<span>{spec.before}</span>
				<div style={{ display: "flex", position: "relative" }}>
					<Selected c={c} tag={spec.word} pad={0}>
						<span style={{ padding: "0 8px" }}>{spec.word}</span>
					</Selected>
					<div
						style={{
							position: "absolute",
							right: -26,
							bottom: -30,
							display: "flex",
						}}
					>
						{cursor(c)}
					</div>
				</div>
			</div>
			<span>{spec.second}</span>
		</div>
	);
}

function Title({
	c,
	spec,
}: {
	c: Palette;
	spec: Extract<OgSpec, { kind: "title" }>;
}) {
	return (
		<div
			style={{
				position: "absolute",
				left: LEFT,
				top: 300,
				display: "flex",
				flexDirection: "column",
				gap: 30,
			}}
		>
			<div style={{ display: "flex" }}>
				<Selected c={c} tag={spec.title} pad={14}>
					<span
						style={{
							fontFamily: "Geist Serif",
							fontSize: titleSize(spec.title, 960, 124),
							lineHeight: 1,
							color: c.ink,
						}}
					>
						{spec.title}
					</span>
				</Selected>
			</div>
			{spec.description && (
				<div
					style={{
						display: "flex",
						fontFamily: "Quattro",
						fontSize: 30,
						color: c.muted,
						maxWidth: 1000,
					}}
				>
					{spec.description}
				</div>
			)}
			{spec.classes?.length ? (
				<div style={{ display: "flex", gap: 12 }}>
					{spec.classes.map((name) => (
						<div
							key={name}
							style={{
								display: "flex",
								padding: "6px 14px",
								border: `2px solid ${c.accent}`,
								borderRadius: 0,
								background: c.on,
								color: c.accent,
								fontFamily: "Quattro",
								fontSize: 20,
							}}
						>
							{name}
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}

export default function OgImage({
	spec,
	theme = "light",
	mark,
	markRatio,
}: {
	spec: OgSpec;
	theme?: OgTheme;
	/** The product's logo for this theme, as a data URL. */
	mark: string;
	/** The logo's width over its height. */
	markRatio: number;
}) {
	const c = PALETTES[theme];
	return (
		<div
			style={{
				display: "flex",
				position: "relative",
				width: 1200,
				height: 630,
				background: c.page,
			}}
		>
			<Rulers c={c} />
			<div
				style={{ position: "absolute", left: LEFT, top: 64, display: "flex" }}
			>
				{/* biome-ignore lint/performance/noImgElement: ImageResponse draws a plain img */}
				<img src={mark} width={64 * markRatio} height={64} alt="" />
			</div>
			{spec.kind === "home" && <Home c={c} spec={spec} />}
			{spec.kind === "title" && <Title c={c} spec={spec} />}
		</div>
	);
}
