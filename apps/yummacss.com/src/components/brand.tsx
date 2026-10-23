import Image from "next/image";
import {
  BRAND_COLORS,
  BRAND_PRODUCTS,
  BRAND_VARIANTS,
  type BrandProduct,
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

/** A product's marks, light on the light page and dark on the dark one, whatever the theme. */
export function BrandMarks({ product }: { product: BrandProduct }) {
  const name = BRAND_PRODUCTS[product];
  return (
    <div className="d:g gtc:1 g:6 my:6 @sm:gtc:2">
      {BRAND_VARIANTS.map((variant) => {
        const theme = variant.label.toLowerCase();
        return (
          <div key={variant.label} className="d:f fd:c g:3">
            <div
              className="d:f ai:c jc:c g:10 p:8 bw:1 bc:ink/10"
              style={{ background: variant.page }}
            >
              <Image
                src={`/brand/${product}${variant.suffix}.svg`}
                alt={`${name} mark on its tile, ${theme}`}
                width={96}
                height={96}
                unoptimized
              />
              <Image
                src={`/brand/${product}-mark${variant.suffix}.svg`}
                alt={`${name} mark, ${theme}`}
                width={72}
                height={81}
                unoptimized
              />
            </div>
            <div className="d:f fw:w jc:sb g:2 c:ink/70 fs:sm">
              <span>{variant.label}, on its tile</span>
              <Download base={`${product}${variant.suffix}`} />
            </div>
            <div className="d:f fw:w jc:sb g:2 c:ink/70 fs:sm">
              <span>{variant.label}, without the tile</span>
              <Download base={`${product}-mark${variant.suffix}`} />
            </div>
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
