export const feedback = {
	build: {
		start: "Build the styles...",
		success: (time: number, output: string) =>
			`Built the styles in ${time} ms. (${output})`,
		fail: "Something went wrong—check the files and try again.",
	},
	init: {
		fail: "Something went wrong—try again or check the documentation.",
		invalid: "Your configuration is invalid. Check the syntax and try again.",
		notFound:
			"Your configuration was not found. Initialize a new one with the 'init' command.",
		success: "Created the configuration.",
	},
	watch: {
		start: "Watch for file changes...",
		fail: "Something went wrong—try again or check the documentation.",
	},
	common: {
		unknownError: "Something went wrong—try again or contact support.",
	},
};
