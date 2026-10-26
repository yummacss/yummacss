"use client";

import { useEffect, useState } from "react";
import GradientASCII from "./gradient-ascii";

/** The landing page's field of class initials, fading into indigo on either scheme. */
export default function Field() {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(prefers-color-scheme: dark)");
		const update = () => setDark(query.matches);
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);

	return (
		<GradientASCII
			key={dark ? "dark" : "light"}
			shape="pinch"
			colors={
				dark
					? ["#151724", "#232a5c", "#3a49a8", "#4c5fc7"]
					: ["#f7f8fb", "#c7cdf0", "#8796e4", "#4c5fc7"]
			}
			characters=" .:dfjcsbp"
			cellSize={22}
			glyphOpacity={1}
			gradientOpacity={0.25}
			fontFamily='"iA Writer Quattro", monospace'
			lightMode={!dark}
			mouseInteraction={false}
			intro={false}
			flicker={0.1}
		/>
	);
}
