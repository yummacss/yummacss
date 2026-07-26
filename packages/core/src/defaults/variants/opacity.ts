// Values are percentages fed to `color-mix()` by the generator, not hex alpha
// pairs. The previous representation ("1a", "80", ...) could only be appended
// to a 6-digit hex color, which ruled out every functional color value -
// `light-dark()` in particular.
export const opacity = [
	{ prefix: "0", value: "0%" },
	{ prefix: "5", value: "5%" },
	{ prefix: "10", value: "10%" },
	{ prefix: "15", value: "15%" },
	{ prefix: "20", value: "20%" },
	{ prefix: "25", value: "25%" },
	{ prefix: "30", value: "30%" },
	{ prefix: "35", value: "35%" },
	{ prefix: "40", value: "40%" },
	{ prefix: "45", value: "45%" },
	{ prefix: "50", value: "50%" },
	{ prefix: "55", value: "55%" },
	{ prefix: "60", value: "60%" },
	{ prefix: "65", value: "65%" },
	{ prefix: "70", value: "70%" },
	{ prefix: "75", value: "75%" },
	{ prefix: "80", value: "80%" },
	{ prefix: "85", value: "85%" },
	{ prefix: "90", value: "90%" },
	{ prefix: "95", value: "95%" },
] as const;
