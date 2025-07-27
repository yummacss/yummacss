import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { defaultConfig } from "./defaultConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATES_DIR = join(__dirname, "templates");

const CONFIG_PLACEHOLDER = "{{CONFIG}}";

interface TemplateInfo {
  extension: string;
  templateFile: string;
}

const SUPPORTED_TEMPLATES: TemplateInfo[] = [
  { extension: ".js", templateFile: "yumma.config.js.template" },
];

function loadTemplate(templateFile: string): string {
  const templatePath = join(TEMPLATES_DIR, templateFile);
  return readFileSync(templatePath, "utf-8");
}

function generateConfigContent(template: string, config: object): string {
  const configString = JSON.stringify(config, null, 2);
  return template.replace(CONFIG_PLACEHOLDER, configString);
}

export function generateConfigFile(extension: string): string {
  const templateInfo = SUPPORTED_TEMPLATES.find(
    (t) => t.extension === extension
  );

  if (!templateInfo) {
    throw new Error(`Unsupported config extension: ${extension}`);
  }

  const template = loadTemplate(templateInfo.templateFile);
  return generateConfigContent(template, defaultConfig);
}

export function getSupportedExtensions(): string[] {
  return SUPPORTED_TEMPLATES.map((t) => t.extension);
}

export function isSupportedExtension(extension: string): boolean {
  return SUPPORTED_TEMPLATES.some((t) => t.extension === extension);
}
