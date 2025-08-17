import { z } from "zod";

const ConfigSchema = z.object({
  source: z.array(z.string()),
  output: z.string(),
  buildOptions: z
    .object({
      reset: z.boolean().optional(),
      minify: z.boolean().optional(),
    })
    .optional(),
});

type Config = z.infer<typeof ConfigSchema>;

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

export { ConfigSchema, Config, defaultConfig, InternalConfig };
