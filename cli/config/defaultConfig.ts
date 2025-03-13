export interface YummaConfig {
  source: string[];
  output: string;
  buildOptions: {
    reset: boolean;
    minify: boolean;
  };
}

export const defaultConfig: YummaConfig = {
  source: [""],
  output: "",
  buildOptions: {
    reset: true,
    minify: false,
  },
};
