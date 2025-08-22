const configName = "yumma.config.js";

type InternalConfig = {
  source: string[];
  output: string;
  buildOptions: {
    reset: boolean;
    minify: boolean;
  };
};

export { InternalConfig, configName };
