import { z } from "zod";

// Flexible schema: only source and output are required
const ConfigSchema = z.object({
  source: z.array(z.string()).min(1, "At least one source path is required"),
  output: z.string().min(1, "Output path is required"),
  buildOptions: z.object({
    reset: z.boolean().optional(),
    minify: z.boolean().optional(),
  }).optional(),
});

// Infer TypeScript type from schema
type Configuration = z.infer<typeof ConfigSchema>;

// Internal config with defaults applied
type InternalConfig = {
  source: string[];
  output: string;
  buildOptions: {
    reset: boolean;
    minify: boolean;
  };
};

// Default values for optional fields
const defaultBuildOptions = {
  reset: true,
  minify: false,
};

// Minimal default config for init command
const defaultConfig = {
  source: [""],
  output: "",
};

export { Configuration, InternalConfig, ConfigSchema, defaultConfig, defaultBuildOptions };
