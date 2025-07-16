interface YummaConfig {
  source: string[];
  output: string;
  buildOptions: {
    reset: boolean;
    minify: boolean;
  };
}

const defaultConfig: YummaConfig = {
  source: [""],
  output: "",
  buildOptions: {
    reset: true,
    minify: false,
  },
};

export { YummaConfig, defaultConfig };
