"use client";

import { Button } from "@base-ui/react";
import { type CSSProperties, useState } from "react";
import tinycolor from "tinycolor2";
import { Check } from "@/icons";
import {
	generateShades,
	SHADE_LABELS,
	SWATCH,
	swatchStyle,
} from "@/utils/colors";

interface ColorItem {
	name: string;
	color: string;
}

interface Props {
	data: ColorItem[];
	scale?: string[];
	whitePercentage?: number;
	blackPercentage?: number;
}

// one column per shade, however many the palette has
const columns = (count: number) =>
	({ "--shades": `repeat(${count}, minmax(0, 1fr))` }) as CSSProperties;

export default function Palette({
	data,
	scale = SHADE_LABELS,
	whitePercentage = 14,
	blackPercentage = 14,
}: Props) {
	return (
		<div className="d:f fd:c g:1">
			<div className="d:none @lg:d:f fd:c g:1 @md:fd:r @md:ai:c">
				<div className="d:f ai:c ws:nw ta:c @md:w:24 @md:min-w:24 @md:mr:2" />
				<div
					className="d:g g:1 f:1 my:2 w:100% gtc:var(--shades)"
					style={columns(scale.length)}
				>
					{scale.map((label) => (
						<div key={`header-${label}`} className="d:f ai:c jc:c c:ink fs:sm">
							{label}
						</div>
					))}
				</div>
			</div>

			{data.map((colorItem) => {
				const shades = generateShades(
					colorItem.color,
					whitePercentage,
					blackPercentage,
				);
				return (
					<div
						key={colorItem.name}
						className="d:f fd:c g:1 ai:c @md:ai:c @md:fd:r"
					>
						<p className="d:f ai:c c:ink ws:nw o:h fs:sm @md:w:24 @md:min-w:24 @md:mr:2">
							{colorItem.name}
						</p>
						<div
							className="d:g g:1 f:1 w:100% gtc:var(--shades)"
							style={columns(scale.length)}
						>
							{shades.map((shade, index) => (
								<ColorSwatch
									key={`${colorItem.name}-${scale[index]}`}
									name={colorItem.name}
									shade={shade}
									label={scale[index]}
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
}

function ColorSwatch({
	name,
	shade,
	label,
}: {
	name: string;
	shade: string;
	label: string;
}) {
	const [copied, setCopied] = useState(false);

	const handleClick = async () => {
		await navigator.clipboard.writeText(
			tinycolor(shade).toHexString().toUpperCase(),
		);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<Button
			onClick={handleClick}
			aria-label={`${name} ${label}: ${shade}${copied ? ", copied" : ""}`}
			className={`d:f ai:c jc:c w:100% ar:1/1 p:0 c:p fv:oc:ink fv:oo:2 fv:ow:2 ${SWATCH}`}
			style={swatchStyle(shade)}
		>
			{copied && (
				<Check
					aria-hidden
					className={`w:4 h:4 ${tinycolor(shade).isLight() ? "c:black" : "c:white"}`}
				/>
			)}
		</Button>
	);
}
