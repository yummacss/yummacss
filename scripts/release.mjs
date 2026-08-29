import { execFileSync, execSync } from "node:child_process";
import { readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Drafts the GitHub Release that `publish.yml` fires on. Everything after
// pressing Publish is automated, so this only has to get the tag and the notes
// right - and refuse when something upstream is wrong.

const rootDir = path.resolve(fileURLToPath(import.meta.url), "../..");
const REPO = "yummacss/yummacss";

const read = (p) => readFileSync(path.join(rootDir, p), "utf-8");
const git = (args) =>
	execFileSync("git", args, { cwd: rootDir, encoding: "utf-8" }).trim();

const fail = (message) => {
	console.error(`✗ ${message}`);
	process.exit(1);
};

const version = process.argv[2] ?? JSON.parse(read("package.json")).version;
if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
	fail(`Not a version: ${version}`);
}
const tag = `v${version}`;

// Every package.json has to carry the version, or `pnpm bump` was missed.
const manifests = [
	"package.json",
	...readdirSync(path.join(rootDir, "packages"), { withFileTypes: true })
		.filter((e) => e.isDirectory())
		.map((e) => `packages/${e.name}/package.json`),
];
const stale = manifests.filter((f) => JSON.parse(read(f)).version !== version);
if (stale.length > 0) {
	fail(`Not at ${version}: ${stale.join(", ")}. Run \`pnpm bump ${version}\`.`);
}

// The tag will point at whatever main is, so main is what must be checked out,
// clean, and pushed.
const branch = git(["rev-parse", "--abbrev-ref", "HEAD"]);
if (branch !== "main") fail(`On ${branch}. Releases are cut from main.`);
if (git(["status", "--porcelain"])) fail("Working tree is dirty.");

git(["fetch", "origin", "main", "--tags"]);
if (git(["rev-parse", "HEAD"]) !== git(["rev-parse", "origin/main"])) {
	fail("main and origin/main disagree. Push or pull first.");
}
if (git(["tag", "--list", tag])) fail(`${tag} already exists.`);

// The notes are the changelog section, verbatim, minus its own heading.
const changelog = read("CHANGELOG.md");
const start = changelog.indexOf(`\n## [${version}]`);
if (start === -1) fail(`CHANGELOG.md has no section for ${version}.`);
// Ends at the next version heading, or at the link definitions for the last
// section in the file.
const after = changelog.indexOf("\n", start + 1);
const ends = [
	changelog.indexOf("\n## ", after),
	changelog.indexOf("\n[", after),
].filter((i) => i !== -1);
const body = changelog
	.slice(after, ends.length > 0 ? Math.min(...ends) : undefined)
	.trim();
if (!body) fail(`The ${version} section is empty.`);

const hasGh = (() => {
	try {
		execSync("gh --version", { stdio: "ignore" });
		return true;
	} catch {
		return false;
	}
})();

console.log(`${tag}, from ${git(["rev-parse", "--short", "HEAD"])} on main\n`);
console.log(body);
console.log();

if (hasGh) {
	const notes = path.join(rootDir, ".release-notes.md");
	writeFileSync(notes, `${body}\n`);
	const url = execFileSync(
		"gh",
		[
			"release",
			"create",
			tag,
			"--draft",
			"--title",
			tag,
			"--notes-file",
			notes,
		],
		{ cwd: rootDir, encoding: "utf-8" },
	).trim();
	unlinkSync(notes);
	console.log(`Draft created. Publish it to trigger publish.yml:\n${url}`);
} else {
	const url =
		`https://github.com/${REPO}/releases/new` +
		`?tag=${encodeURIComponent(tag)}` +
		`&title=${encodeURIComponent(tag)}` +
		`&body=${encodeURIComponent(body)}`;
	console.log(`No gh CLI. Open this, it is prefilled:\n${url}`);
}
