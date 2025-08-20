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

export { Config, ConfigSchema };
