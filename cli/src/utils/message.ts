export const message = {
  build: {
    start: "Building...",
    success: (time: number, output: string) =>
      `Build done in ${time}ms. (${output})`,
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
    unknownError: "Something went wrong, and we don't know what.",
  },
};
