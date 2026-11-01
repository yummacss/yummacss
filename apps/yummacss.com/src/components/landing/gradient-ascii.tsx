// React Bits Gradient ASCII (https://reactbits.dev, MIT + Commons Clause), with Yumma classes for its two CSS rules, Array.from for its glyphs, and its renderer in a worker
"use client";

import {
	useEffect,
	useRef,
	type CSSProperties,
	type HTMLAttributes,
} from "react";
import {
	CLICK_EFFECTS,
	clamp,
	DEFAULT_CHARACTERS,
	DEFAULT_COLORS,
	DEFAULT_FONT,
	drawAtlas,
	type Input,
	MAX_COLORS,
	mount,
	SHAPES,
	type Settings,
} from "./gradient-ascii-render";

export type GradientASCIIShape = "horizon" | "pinch" | "rise" | "eclipse";

export type GradientASCIIClickEffect = "wave" | "burst" | "none";

export interface GradientASCIIProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	"style"
> {
	colors?: string[];
	shape?: GradientASCIIShape;
	characters?: string;
	cellSize?: number;
	density?: number;
	glyphOpacity?: number;
	glow?: number;
	depthOfField?: number;
	flicker?: number;
	softness?: number;
	scale?: number;
	flow?: number;
	speed?: number;
	gradientOpacity?: number;
	grain?: number;
	variation?: number;
	mouseInteraction?: boolean;
	scrambleRadius?: number;
	clickEffect?: GradientASCIIClickEffect;
	intro?: boolean;
	lightMode?: boolean;
	fontFamily?: string;
	dpr?: number;
	style?: CSSProperties;
}

const GradientASCII = ({
	colors = DEFAULT_COLORS,
	shape = "horizon",
	characters = DEFAULT_CHARACTERS,
	cellSize = 18,
	density = 0.8,
	glyphOpacity = 0.85,
	glow = 0.2,
	depthOfField = 0,
	flicker = 0.2,
	softness = 0.5,
	scale = 1,
	flow = 0.5,
	speed = 1,
	gradientOpacity = 0.9,
	grain = 0.08,
	variation = 0,
	mouseInteraction = true,
	scrambleRadius = 0.1,
	clickEffect = "wave",
	intro = true,
	lightMode = false,
	fontFamily = DEFAULT_FONT,
	dpr,
	className = "",
	style,
	...rest
}: GradientASCIIProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const palette = (
		Array.isArray(colors) && colors.length ? colors : DEFAULT_COLORS
	).slice(0, MAX_COLORS);
	const settings: Settings = {
		colors: palette.length > 1 ? palette : [palette[0], palette[0]],
		shape: SHAPES[shape] ?? 0,
		characters: characters || DEFAULT_CHARACTERS,
		cellSize: clamp(cellSize, 6, 64),
		density: clamp(density, 0, 1),
		glyphOpacity: clamp(glyphOpacity, 0, 1),
		glow: clamp(glow, 0, 2),
		depthOfField: clamp(depthOfField, 0, 1),
		flicker: clamp(flicker, 0, 1),
		softness: clamp(softness, 0, 1),
		scale: clamp(scale, 0.4, 2.5),
		flow: clamp(flow, 0, 2),
		speed: Math.max(0, speed),
		gradientOpacity: clamp(gradientOpacity, 0, 1),
		grain: clamp(grain, 0, 0.4),
		variation: Math.max(0, variation),
		mouseInteraction,
		scrambleRadius: clamp(scrambleRadius, 0.02, 0.4),
		clickEffect: CLICK_EFFECTS[clickEffect] ?? 1,
		intro,
		lightMode,
		fontFamily: fontFamily || DEFAULT_FONT,
		dpr,
	};
	const settingsRef = useRef(settings);
	settingsRef.current = settings;
	const sendRef = useRef<((input: Input) => void) | null>(null);
	const sentRef = useRef("");

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return undefined;
		// a fresh canvas per mount: a canvas hands its control to a worker only once
		const canvas = document.createElement("canvas");
		canvas.className = "p:a i:0 d:b w:100% h:100%";
		canvas.setAttribute("aria-hidden", "true");
		container.append(canvas);

		const reduce =
			window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
		const initial = settingsRef.current;
		let worker: Worker | null = null;
		let renderer: ReturnType<typeof mount> = null;
		if (
			"transferControlToOffscreen" in canvas &&
			typeof Worker !== "undefined"
		) {
			const offscreen = canvas.transferControlToOffscreen();
			worker = new Worker(
				new URL("./gradient-ascii.worker.ts", import.meta.url),
			);
			worker.postMessage(
				{ type: "init", canvas: offscreen, settings: initial, reduce },
				[offscreen],
			);
		} else {
			renderer = mount(canvas, initial, reduce);
		}
		const send = (input: Input, transfer: Transferable[] = []) => {
			if (worker) worker.postMessage(input, transfer);
			else renderer?.send(input);
		};
		sendRef.current = send;
		sentRef.current = JSON.stringify(initial);

		let disposed = false;
		const glyphs = () => {
			const s = settingsRef.current;
			const {
				canvas: image,
				count,
				grid,
			} = drawAtlas(s.characters, s.fontFamily);
			void createImageBitmap(image, { premultiplyAlpha: "none" }).then(
				(bitmap) => {
					if (disposed) bitmap.close();
					else send({ type: "atlas", image: bitmap, count, grid }, [bitmap]);
				},
			);
		};
		glyphs();
		document.fonts
			?.load?.(`300 64px ${initial.fontFamily}`, initial.characters)
			.then(
				() => !disposed && glyphs(),
				() => {},
			);

		const resize = () =>
			send({
				type: "resize",
				width: container.clientWidth,
				height: container.clientHeight,
				ratio: window.devicePixelRatio || 1,
			});
		let intersecting = true;
		const visibility = () =>
			send({ type: "visible", visible: intersecting && !document.hidden });
		const pointer = (event: PointerEvent) => {
			const s = settingsRef.current;
			const down = event.type === "pointerdown";
			if (reduce || (down ? !s.clickEffect : !s.mouseInteraction)) return;
			const rect = container.getBoundingClientRect();
			const x = (event.clientX - rect.left) / Math.max(1, rect.width);
			const y = 1 - (event.clientY - rect.top) / Math.max(1, rect.height);
			const aspect = rect.width / Math.max(1, rect.height);
			const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
			if (!inside) return;
			send({
				type: "pointer",
				x: (x - 0.5) * aspect,
				y: y - 0.5,
				inside,
				down,
			});
		};

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(container);
		const intersection = new IntersectionObserver((entries) => {
			intersecting = entries.some((entry) => entry.isIntersecting);
			visibility();
		});
		intersection.observe(container);
		window.addEventListener("pointermove", pointer, { passive: true });
		window.addEventListener("pointerdown", pointer, { passive: true });
		document.addEventListener("visibilitychange", visibility);
		resize();

		return () => {
			disposed = true;
			sendRef.current = null;
			resizeObserver.disconnect();
			intersection.disconnect();
			window.removeEventListener("pointermove", pointer);
			window.removeEventListener("pointerdown", pointer);
			document.removeEventListener("visibilitychange", visibility);
			worker?.terminate();
			renderer?.dispose();
			canvas.remove();
		};
	}, []);

	useEffect(() => {
		const next = JSON.stringify(settings);
		if (next === sentRef.current) return;
		sentRef.current = next;
		sendRef.current?.({ type: "settings", settings });
	});

	return (
		<div
			ref={containerRef}
			className={`p:r w:100% h:100% o:h${className ? ` ${className}` : ""}`}
			style={style}
			{...rest}
		/>
	);
};

export default GradientASCII;
