// the class attribute contexts `yummacss lint` reads
const CONTEXTS = [
  /class(?:Name)?\s*=\s*["']([^"']+)["']/g,
  /class(?:Name)?=\{["']([^"']+)["']\}/g,
  /class(?:Name)?=\{`([^`]+)`\}/g,
  /\b(?:cn|clsx|classnames|cva)\s*\(\s*["'`]([^"'`]+)["'`]/g,
];
const CLASS_NAME = /^@?[a-z][a-zA-Z0-9@:/.%-]*$/;

/** The class names in a source string, found where `yummacss lint` looks. */
export function extractClasses(source) {
  const found = new Set();
  for (const regex of CONTEXTS) {
    for (const [, value] of source.matchAll(regex)) {
      for (const cls of value.replace(/\$\{[^}]*\}/g, " ").split(/\s+/)) {
        if (cls && CLASS_NAME.test(cls)) found.add(cls);
      }
    }
  }
  return found;
}
