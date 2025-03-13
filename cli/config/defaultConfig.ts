export interface YummaConfig {
  source: string[];
  output: string;
  buildOptions: {
    reset: boolean;
    minify: boolean;
  };
}

export const defaultConfig: YummaConfig = {
  source: ["./src/**/*.html"],
  output: "./src/globals.css",
  buildOptions: {
    reset: true,
    minify: false,
  },
};
