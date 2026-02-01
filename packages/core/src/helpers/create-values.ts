type Values = {
	base: number;
	unit?: string;
	min?: number;
	max?: number;
	step?: number;
	keyAsValue?: boolean;
	wrapper?: (value: string) => string;
	extras?: Record<string, string>;
};

export const createValues = ({
	base,
	unit = "",
	min = 0,
	max = 100,
	step = 1,
	keyAsValue = false,
	wrapper,
	extras,
}: Values): Record<string, string> => {
	const values: Record<string, string> = {};

	for (let i = min; i <= max; i += step) {
		const computedValue = base * i;
		const key = keyAsValue ? computedValue.toString() : i.toString();
		let value = `${computedValue}${unit}`;
		if (wrapper) {
			value = wrapper(value);
		}
		values[key] = value;
	}

	if (extras) {
		Object.assign(values, extras);
	}

	return values;
};
