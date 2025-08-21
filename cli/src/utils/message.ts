export const msg = {
  init: {
    exists: "Config already exists.",
    fail: "Config failed.",
    start: "Creating config...",
    success: "Config created.",
  },
  build: {
    compiling: "Compiling...",
    fail: "Build failed.",
    minifying: "Minifying...",
    purging: "Purging...",
    start: "Building...",
    success: (time: number, output: string) =>
      `Build done in ${time}ms. (${output})`,
  },
  watch: {
    fail: "Watch failed.",
    start: "Watching...",
  },
  common: {
    unknownError: "Something went wrong, and we don't know why.",
  },
};
