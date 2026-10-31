import {
	BRAND_COLORS,
	BRAND_PRODUCTS,
	BRAND_VARIANTS,
	type BrandProduct,
	brandFiles,
} from "@/utils/brand";

function Download({ base }: { base: string }) {
	return (
		<span className="d:f g:3 fs:sm">
			<a href={`/brand/${base}.svg`} download className="c:accent tdl:u">
				SVG
			</a>
			<a href={`/brand/${base}.png`} download className="c:accent tdl:u">
				PNG
			</a>
		</span>
	);
}

/** The shared mark or a product's logo, light on the light page and dark on the dark one, whatever the theme. */
export function BrandMarks({ product }: { product: BrandProduct }) {
	const name = BRAND_PRODUCTS[product];
	const files = brandFiles(product);
	return (
		<div className="d:g gtc:1 g:6 my:6 @sm:gtc:2">
			{BRAND_VARIANTS.map((variant) => {
				const own = files.filter((file) => file.variant === variant.label);
				return (
					<div key={variant.label} className="d:f fd:c g:3">
						<div
							className="d:f ai:c jc:c g:10 h:40 p:8 bw:1 bc:ink/10"
							style={{ background: variant.page }}
						>
							{own.map(({ base, label }) => (
								// biome-ignore lint/performance/noImgElement: a plain SVG at its own ratio
								<img
									key={base}
									src={`/brand/${base}.svg`}
									alt={`${name}, ${label.toLowerCase()}`}
									className={product === "yumma" ? "h:18" : "h:10"}
								/>
							))}
						</div>
						{own.map(({ base, label }) => (
							<div key={base} className="d:f fw:w jc:sb g:2 c:ink/70 fs:sm">
								<span>{label}</span>
								<Download base={base} />
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
}

export function BrandColors() {
	return (
		<div className="d:g gtc:2 g:6 my:6 @sm:gtc:4">
			{BRAND_COLORS.map((color) => (
				<div key={color.hex} className="d:f fd:c g:2">
					<div
						className="h:16 bw:1 bc:ink/10"
						style={{ background: color.hex }}
					/>
					<span className="c:ink fs:sm">{color.name}</span>
					<code className="c:ink/70 fs:sm">{color.hex}</code>
				</div>
			))}
		</div>
	);
}
