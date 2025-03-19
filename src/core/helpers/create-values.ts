type ValueCreatorConfig = {
  base: number;
  unit?: string;
  min?: number;
  max?: number;
  formatter?: (value: number) => string | number;
};

export const createValues = ({
  base,
  unit = "",
  min = 0,
  max = 100,
  formatter,
}: ValueCreatorConfig): Record<string, string> => {
  const values: Record<string, string> = {};

  for (let i = min; i <= max; i++) {
    const numericValue = base * i;
    const formattedValue = formatter ? formatter(numericValue) : numericValue;

    values[i.toString()] = typeof formattedValue === "number" ? `${formattedValue}${unit}` : formattedValue;
  }

  return values;
};
