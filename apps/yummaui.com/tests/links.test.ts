import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { redirects } from "../redirects";
import { pagePath } from "../src/utils/hosts";
import { contentPages, rootDir, tsxFilesIn } from "./helpers";

// a section name is not a route: `/components/overlays` is a sidebar
// heading, and only the pages under it exist
const routes = new Set([
  "/llms.txt",
  "/robots.txt",
  "/sitemap.xml",
  ...contentPages().map(({ slug }) => pagePath(slug)),
  ...redirects.map(({ source }) => source),
]);

describe("Internal links", () => {
  it("points every href in a page or component at a route that exists", () => {
    const dead = ["src/app", "src/components"]
      .flatMap((dir) => tsxFilesIn(join(rootDir, dir)))
      .flatMap((file) => {
        const source = readFileSync(file, "utf-8");
        return [...source.matchAll(/href[=:]\s*"(\/[^"#?]*)"/g)].map((m) => ({
          file: file.slice(rootDir.length + 1),
          href: m[1].replace(/(.)\/$/, "$1"),
        }));
      })
      .filter(({ href }) => !routes.has(href))
      .map(({ file, href }) => `${file}: ${href}`);

    expect(dead).toEqual([]);
  });

  it("points every link in a page at a route on this site", () => {
    const dead = contentPages()
      .flatMap(({ slug, source }) =>
        [...source.matchAll(/\]\((\/[^)#?\s]*)/g)].map((m) => ({
          slug,
          href: m[1],
        })),
      )
      .filter(({ href }) => !routes.has(href))
      .map(({ slug, href }) => `${slug}: ${href}`);

    expect(dead).toEqual([]);
  });

  it("leaves no page or component on the old /ui/components path", () => {
    const stale = ["src/app", "src/components"]
      .flatMap((dir) => tsxFilesIn(join(rootDir, dir)))
      .filter((file) =>
        /\/ui\/components|\\\/ui\\\/components/.test(
          readFileSync(file, "utf-8"),
        ),
      )
      .map((file) => file.slice(rootDir.length + 1));

    expect(stale).toEqual([]);
  });
});
