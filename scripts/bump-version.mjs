import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const version = process.argv[2];

if (!version || !/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
	console.error("Usage: pnpm bump <version>  (e.g. pnpm bump 3.28.1)");
	process.exit(1);
}

const packageJsonPaths = [
	path.join(rootDir, "package.json"),
	...readdirSync(path.join(rootDir, "packages"), { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => path.join(rootDir, "packages", entry.name, "package.json")),
];

for (const filePath of packageJsonPaths) {
	const original = readFileSync(filePath, "utf-8");
	const pkg = JSON.parse(original);
	const previous = pkg.version;
	pkg.version = version;

	// Preserve tab indentation and trailing newline to match the
	// existing file style instead of npm's default 2-space output.
	writeFileSync(filePath, `${JSON.stringify(pkg, null, "\t")}\n`);

	console.log(`${pkg.name}: ${previous} -> ${version}`);
}
