import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const packagesDir = path.join(rootDir, "packages");
const out = mkdtempSync(path.join(tmpdir(), "yumma-publish-"));

const run = (cmd, args, cwd) =>
	execFileSync(cmd, args, {
		cwd,
		encoding: "utf-8",
		stdio: ["ignore", "pipe", "inherit"],
	}).trim();

const manifest = (dir) =>
	JSON.parse(
		readFileSync(path.join(packagesDir, dir, "package.json"), "utf-8"),
	);

const publishable = readdirSync(packagesDir, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name)
	.filter((dir) => !manifest(dir).private);

for (const dir of publishable) {
	const { name } = manifest(dir);
	const cwd = path.join(packagesDir, dir);

	const dest = mkdtempSync(path.join(out, "pkg-"));
	run("pnpm", ["pack", "--pack-destination", dest], cwd);

	const packed = readdirSync(dest).filter((file) => file.endsWith(".tgz"));
	if (packed.length !== 1) {
		throw new Error(`${name}: expected one tarball, got ${packed.length}`);
	}
	const tarball = path.join(dest, packed[0]);

	console.log(`publishing ${name}`);
	run("npm", ["publish", tarball], rootDir);
}

console.log(`published ${publishable.length} packages`);
