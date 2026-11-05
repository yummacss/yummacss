"use client";

import { Button, Collapsible } from "@base-ui/react";
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
					<h3 className="m:0 mb:3 pb:2 bbw:1 bc:border ff:display fs:xl fw:400 lh:1 c:ink">
						{group.name}
					</h3>
					{group.families.map((family) => {
						const item = byName.get(family);
						if (!item) return null;
						return (
							<FamilyRow
								key={family}
								family={family}
								shades={generateShades(
									item.color,
									whitePercentage,
									blackPercentage,
								)}
							/>
						);
					})}
				</section>
			))}
		</div>
	);
}

// phones get a strip that opens into tiles, wider screens one row of swatches
function FamilyRow({ family, shades }: { family: string; shades: string[] }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Collapsible.Root
				open={open}
				onOpenChange={setOpen}
				className="d:f fd:c g:2 mb:2 @md:d:none"
			>
				<Collapsible.Trigger className="d:f fd:c g:2 w:100% p:0 bw:0 bg:transparent c:p ta:l fv:oc:ink fv:oo:2 fv:ow:2">
					<span className="d:f jc:sb ff:m fs:sm c:ink/60">
						<span>{family}</span>
						<span>{open ? "Close" : `${shades.length} shades`}</span>
					</span>
					<span aria-hidden className="d:f h:7 w:100%">
						{shades.map((shade, index) => (
							<span
								key={SHADE_LABELS[index]}
								className="f:1 bg:var(--swatch)"
								style={swatchStyle(shade)}
							/>
						))}
					</span>
				</Collapsible.Trigger>
				<Collapsible.Panel className="d:g gtc:4 g:px">
					{shades.map((shade, index) => (
						<ColorSwatch
							key={SHADE_LABELS[index]}
							name={family}
							shade={shade}
							label={SHADE_LABELS[index]}
							tile
						/>
					))}
				</Collapsible.Panel>
			</Collapsible.Root>
			<div className="d:none @md:d:f ai:c g:3">
				<p className="m:0 ff:m fs:sm c:ink/60 w:20 min-w:20">{family}</p>
				<div className="d:f g:px f:1 min-w:0">
					{shades.map((shade, index) => (
						<ColorSwatch
							key={SHADE_LABELS[index]}
							name={family}
							shade={shade}
							label={SHADE_LABELS[index]}
						/>
					))}
				</div>
			</div>
		</>
	);
}

function ColorSwatch({
	name,
	shade,
	label,
	tile = false,
}: {
	name: string;
	shade: string;
	label: string;
	tile?: boolean;
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
			className={`d:f fd:c jc:sb ai:fs min-w:0 ${tile ? "h:13 p:2" : "f:1 h:10 p:1"} c:p ff:m fs:xs lh:1 fv:oc:ink fv:oo:2 fv:ow:2 ${ink} ${SWATCH}`}
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
				{tile
					? label === "Base"
						? name
						: `${name}-${label}`
					: label === "Base"
						? ""
						: label}
			</span>
		</Button>
	);
}
