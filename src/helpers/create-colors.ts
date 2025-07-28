import tinycolor from "tinycolor2";
import { YMA_THEME } from "@/constants/theme";

const percentage = 14;

const generateShades = (color: string): string[] => {
  const shades: string[] = [];

  for (let i = 1; i <= 6; i++) {
    const weight = (7 - i) * percentage;
    const mixedColor = tinycolor.mix(color, "white", weight);
    shades.push(mixedColor.toHexString());
  }

  shades.push(tinycolor(color).toHexString());

  for (let i = 1; i <= 6; i++) {
    const weight = i * percentage;
    const mixedColor = tinycolor.mix(color, "black", weight);
    shades.push(mixedColor.toHexString());
  }

  return shades;
};

export const createColors = () => {
  const colors: Record<string, string> = {};

  Object.entries(YMA_THEME).forEach(([colorName, colorValue]) => {
    const shades = generateShades(colorValue);

    for (let i = 0; i < 6; i++) {
      const variantKey = `${colorName}-${i + 1}`;
      colors[variantKey] = shades[i];
    }

    colors[colorName] = shades[6];

    for (let i = 7; i < 13; i++) {
      const variantKey = `${colorName}-${i}`;
      colors[variantKey] = shades[i];
    }
  });

  return colors;
};
