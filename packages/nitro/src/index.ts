export type { LoadConfigOptions, LoadedConfig } from "./config/load";
export { findConfig, loadConfig } from "./config/load";
export type { Config } from "./config/schema";
export {
	ConfigSchema,
	configName,
	defineConfig,
	legacyConfigName,
} from "./config/schema";
export type { ValidationResult } from "./generator";
export { generator, suggestClasses, validateClasses } from "./generator";
export { normalizeCSS } from "./normalize";
export type { ScanOptions, ScanResult } from "./scan";
export { scan } from "./scan";
