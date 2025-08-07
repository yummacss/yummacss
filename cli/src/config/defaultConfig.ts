interface Configuration {
  source: string[];
  output: string;
  buildOptions: {
    reset: boolean;
    minify: boolean;
  };
}

const defaultConfig: Configuration = {
  source: [""],
  output: "",
  buildOptions: {
    reset: true,
    minify: false,
  },
};

export { Configuration, defaultConfig };
