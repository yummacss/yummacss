export const messages = {
  build: {
    start: "Building...",
    compiling: "Compiling...",
    usingCache: "Using cache...",
    purging: "Purging...",
    minifying: "Minifying...",
    success: (ms: number, output: string) =>
      `Build done in ${ms}ms. (${output})`,
    fail: "Build failed.",
  },
  init: {
    start: "Creating config...",
    success: "Config created.",
    fail: "Config failed.",
  },
  watch: {
    start: "Watching...",
    fail: "Watch failed.",
  },
  common: {
    unknownError: "Unknown error.",
  },
};
