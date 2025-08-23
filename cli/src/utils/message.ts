export const message = {
  build: {
    start: "Building...",
    success: (time: number, output: string) =>
      `Build done in ${time}ms. (${output})`,
    fail: "Build failed.",
  },
  init: {
    fail: "Config failed.",
    notFound: "Config not found.",
    success: "Config created.",
  },
  watch: {
    start: "Watching...",
    fail: "Watch failed.",
  },
  common: {
    unknownError: "Something went wrong, and we don't know what.",
  },
};
