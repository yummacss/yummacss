type ValueCreatorConfig = {
  base: number;
  unit?: string;
  min?: number;
  max?: number;
};

export const createValues = ({ base, unit = "", min = 0, max = 100 }: ValueCreatorConfig): Record<string, string> => {
  const values: Record<string, string> = {};

  for (let i = min; i <= max; i++) {
    const value = base * i;
    values[i.toString()] = `${value}${unit}`;
  }

  return values;
};
