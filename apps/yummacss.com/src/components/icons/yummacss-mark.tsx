"use client";

import { type ComponentProps, useId } from "react";

type Product = "css" | "ui";

// the glass cube with a solid cube inside for Yumma CSS, two slabs for Yumma UI; follows the page's colour scheme
export function YummaCSSMark({
	product = "css",
	...props
}: ComponentProps<"svg"> & { product?: Product }) {
	const id = useId().replace(/[^\w-]/g, "");
	return (
		<svg
			viewBox="18 14 64 72"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{...props}
		>
			<defs>
				<linearGradient id={`${id}-w0`} x1="0" y1="0" x2="0.4" y2="1">
					<stop
						offset="0"
						style={{ stopColor: "light-dark(#c9cff3, #3c4796)" }}
					/>
					<stop
						offset="1"
						style={{ stopColor: "light-dark(#8f9be0, #141836)" }}
					/>
				</linearGradient>
				<linearGradient id={`${id}-w1`} x1="1" y1="0" x2="0.6" y2="1">
					<stop
						offset="0"
						style={{ stopColor: "light-dark(#b4bdee, #29316e)" }}
					/>
					<stop
						offset="1"
						style={{ stopColor: "light-dark(#7d8ad6, #0f1230)" }}
					/>
				</linearGradient>
				<linearGradient id={`${id}-w2`} x1="0.5" y1="0" x2="0.5" y2="1">
					<stop
						offset="0"
						style={{ stopColor: "light-dark(#a9b3ea, #161a3c)" }}
					/>
					<stop
						offset="1"
						style={{ stopColor: "light-dark(#dfe3f9, #333d85)" }}
					/>
				</linearGradient>
				<linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
					<stop
						offset="0"
						style={{
							stopColor:
								"light-dark(rgb(255 255 255 / 0.95), rgb(255 255 255 / 0.55))",
						}}
					/>
					<stop offset="1" stopColor="#fff" stopOpacity="0.15" />
				</linearGradient>
			</defs>
			<polygon
				points="50,19 23.2,34.5 23.2,65.5 50,50"
				fill={`url(#${id}-w0)`}
			/>
			<polygon
				points="50,19 76.8,34.5 76.8,65.5 50,50"
				fill={`url(#${id}-w1)`}
			/>
			<polygon
				points="23.2,65.5 50,81 76.8,65.5 50,50"
				fill={`url(#${id}-w2)`}
			/>
			<path
				d="M50 50 L50 19 M50 50 L23.2 65.5 M50 50 L76.8 65.5"
				fill="none"
				strokeWidth="0.5"
				style={{
					stroke:
						"light-dark(rgb(255 255 255 / 0.35), rgb(255 255 255 / 0.12))",
				}}
			/>
			{product === "ui" ? <UIStack /> : <CSSCube />}
			<polygon
				points="50,19 76.8,34.5 50,50 23.2,34.5"
				style={{
					fill: "light-dark(rgb(255 255 255 / 0.22), rgb(255 255 255 / 0.18))",
				}}
			/>
			<polygon
				points="23.2,34.5 50,50 50,81 23.2,65.5"
				style={{
					fill: "light-dark(rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.06))",
				}}
			/>
			<polygon
				points="76.8,34.5 76.8,65.5 50,81 50,50"
				style={{
					fill: "light-dark(rgb(255 255 255 / 0.05), rgb(255 255 255 / 0.03))",
				}}
			/>
			<polygon
				points="50,19 76.8,34.5 76.8,65.5 50,81 23.2,65.5 23.2,34.5"
				fill="none"
				stroke={`url(#${id}-rim)`}
				strokeWidth="0.65"
				strokeLinejoin="round"
			/>
			<path
				d="M23.2 34.5 L50 50 L76.8 34.5 M50 50 L50 81"
				fill="none"
				strokeWidth="0.45"
				style={{
					stroke:
						"light-dark(rgb(255 255 255 / 0.55), rgb(255 255 255 / 0.18))",
				}}
			/>
		</svg>
	);
}

function CSSCube() {
	return (
		<>
			<polygon
				points="50,34.9885 63,42.4942 50,50 37,42.4942"
				style={{ fill: "light-dark(#8796e4, #ffffff)" }}
			/>
			<polygon
				points="37,42.4942 50,50 50,65.0115 37,57.5058"
				style={{ fill: "light-dark(#3f51c0, #bec6f2)" }}
			/>
			<polygon
				points="63,42.4942 63,57.5058 50,65.0115 50,50"
				style={{ fill: "light-dark(#27348a, #7f8bd6)" }}
			/>
			<polygon
				points="50,34.9885 63,42.4942 50,50 37,42.4942"
				fill="none"
				strokeWidth="0.4"
				strokeLinejoin="round"
				style={{ stroke: "light-dark(rgb(255 255 255 / 0.6), transparent)" }}
			/>
		</>
	);
}

// two stacked slabs, the lower drawn first
function UIStack() {
	return (
		<>
			<polygon
				points="50,43.7 65.59,52.7 50,61.7 34.41,52.7"
				style={{ fill: "light-dark(#8796e4, #ffffff)" }}
			/>
			<polygon
				points="34.41,52.7 50,61.7 50,65.3 34.41,56.3"
				style={{ fill: "light-dark(#3f51c0, #bec6f2)" }}
			/>
			<polygon
				points="65.59,52.7 50,61.7 50,65.3 65.59,56.3"
				style={{ fill: "light-dark(#27348a, #7f8bd6)" }}
			/>
			<polygon
				points="50,43.7 65.59,52.7 50,61.7 34.41,52.7"
				fill="none"
				strokeWidth="0.4"
				strokeLinejoin="round"
				style={{ stroke: "light-dark(rgb(255 255 255 / 0.6), transparent)" }}
			/>
			<polygon
				points="50,34.7 65.59,43.7 50,52.7 34.41,43.7"
				style={{ fill: "light-dark(#8796e4, #ffffff)" }}
			/>
			<polygon
				points="34.41,43.7 50,52.7 50,56.3 34.41,47.3"
				style={{ fill: "light-dark(#3f51c0, #bec6f2)" }}
			/>
			<polygon
				points="65.59,43.7 50,52.7 50,56.3 65.59,47.3"
				style={{ fill: "light-dark(#27348a, #7f8bd6)" }}
			/>
			<polygon
				points="50,34.7 65.59,43.7 50,52.7 34.41,43.7"
				fill="none"
				strokeWidth="0.4"
				strokeLinejoin="round"
				style={{ stroke: "light-dark(rgb(255 255 255 / 0.6), transparent)" }}
			/>
		</>
	);
}
