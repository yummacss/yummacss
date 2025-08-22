import { z } from "zod";

const ConfigSchema = z.object({
  source: z.array(z.string()).default([""]),
  output: z.string().default(""),
  buildOptions: z
    .object({
      reset: z.boolean().default(true),
      minify: z.boolean().default(false),
    })
    .default({ reset: true, minify: false }),
});

type Config = z.infer<typeof ConfigSchema>;

export { Config, ConfigSchema };
