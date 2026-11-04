"use client";

import { Button } from "@base-ui/react";
import { useState } from "react";
import { Check } from "@/icons";
import {
	COLOR_GROUPS,
	generateShades,
	isLight,
	SHADE_LABELS,
	SWATCH,
	swatchStyle,
	toHex,
} from "@/utils/colors";

interface ColorItem {
	name: string;
	color: string;
}

interface Props {
	data: ColorItem[];
	whitePercentage?: number;
	blackPercentage?: number;
}

export default function Palette({
	data,
	whitePercentage = 14,
	blackPercentage = 14,
}: Props) {
	const byName = new Map(data.map((item) => [item.name.toLowerCase(), item]));

	return (
		<div className="d:f fd:c g:10 my:6">
			{COLOR_GROUPS.map((group) => (
				<section key={group.name} className="d:f fd:c g:1">
					<h3 className="m:0 mb:3 pb:2 bbw:1 bc:border fs:md fw:600 c:ink">
						{group.name}
					</h3>
					{group.families.map((family) => {
						const item = byName.get(family);
						if (!item) return null;
						const shades = generateShades(
							item.color,
							whitePercentage,
							blackPercentage,
						);
						return (
							<div
								key={item.name}
								className="d:f fd:c g:1 @md:fd:r @md:ai:c @md:g:3"
							>
								<p className="m:0 ff:m fs:sm c:ink/60 @md:w:20 @md:min-w:20">
									{family}
								</p>
								<div className="d:f g:px f:1 min-w:0">
									{shades.map((shade, index) => (
										<ColorSwatch
											key={`${family}-${SHADE_LABELS[index]}`}
											name={family}
											shade={shade}
											label={SHADE_LABELS[index]}
										/>
									))}
								</div>
							</div>
						);
					})}
				</section>
			))}
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
	const ink = isLight(shade) ? "c:black" : "c:white";

	const handleClick = async () => {
		await navigator.clipboard.writeText(toHex(shade));
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<Button
			onClick={handleClick}
			aria-label={`${name} ${label}: ${shade}${copied ? ", copied" : ""}`}
			className={`d:f fd:c jc:sb ai:fs f:1 min-w:0 h:10 p:1 c:p ff:m fs:xs lh:1 fv:oc:ink fv:oo:2 fv:ow:2 ${ink} ${SWATCH}`}
			style={swatchStyle(shade)}
		>
			{copied ? (
				<Check aria-hidden className="w:3 h:3" />
			) : (
				<span aria-hidden className="fs:sm fw:500">
					Aa
				</span>
			)}
			<span aria-hidden className="o:80">
				{label === "Base" ? "" : label}
			</span>
		</Button>
	);
}
