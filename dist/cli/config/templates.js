import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { defaultConfig } from "./defaultConfig.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATES_DIR = join(__dirname, "templates");
const CONFIG_PLACEHOLDER = "{{CONFIG}}";
const SUPPORTED_TEMPLATES = [
    { extension: ".js", templateFile: "yumma.config.js.template" },
];
function loadTemplate(templateFile) {
    const templatePath = join(TEMPLATES_DIR, templateFile);
    return readFileSync(templatePath, "utf-8");
}
function generateConfigContent(template, config) {
    const configString = JSON.stringify(config, null, 2);
    return template.replace(CONFIG_PLACEHOLDER, configString);
}
export function generateConfigFile(extension) {
    const templateInfo = SUPPORTED_TEMPLATES.find(t => t.extension === extension);
    if (!templateInfo) {
        throw new Error(`Unsupported config extension: ${extension}`);
    }
    const template = loadTemplate(templateInfo.templateFile);
    return generateConfigContent(template, defaultConfig);
}
export function getSupportedExtensions() {
    return SUPPORTED_TEMPLATES.map(t => t.extension);
}
export function isSupportedExtension(extension) {
    return SUPPORTED_TEMPLATES.some(t => t.extension === extension);
}
