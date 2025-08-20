type InternalConfig = {
  source: string[];
  output: string;
  buildOptions: {
    reset: boolean;
    minify: boolean;
  };
};

const defaultConfig = {
  source: [""],
  output: "",
  buildOptions: {
    reset: false,
    minify: false,
  },
};

export { InternalConfig, defaultConfig };
