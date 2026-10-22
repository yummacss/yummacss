import { allUis } from "content-collections";
import { sidebarConfig } from "@/config/sidebar";
import { EXAMPLES, LEGACY, SITE, SYNTAX } from "@/utils/agent-rules";
import { docs } from "@/utils/docs";
import { UI_ORIGIN } from "@/utils/hosts";

export const dynamic = "force-static";

const BASE = SITE;

export function GET() {
  const docMap = new Map(docs.map((d) => [d._meta.path, d]));
  const uiMap = new Map(allUis.map((u) => [u._meta.path, u]));

  const lines: string[] = [
    "# Yumma CSS",
    "",
    "> Yumma CSS is a utility CSS framework whose class names are built from the",
    "> initials of a CSS property and its value, joined by a colon.",
    "",
    "## Syntax",
    "",
    ...SYNTAX,
    "",
    "Check your work: `pnpm dlx yummacss lint` reports every class Yumma CSS does not",
    "generate, with the closest one that exists. In a project that uses Oxlint, the",
    "`@yummacss/lint` plugin reports the same in the editor. Both read the generator",
    "itself, so they are authoritative on whether a class exists. Prefer them over",
    "guessing.",
    "",
    `A project whose classes put a dash between property and value (\`${LEGACY[0]}\`, \`${LEGACY[1]}\`)`,
    "is on 3.x. Run `pnpm dlx yummacss migrate` before writing any class, rather",
    `than fixing classes by hand: ${BASE}/agents.md has the steps.`,
    "",
    `A rules file for a project's coding agents: ${BASE}/agents.md`,
    "",
    `Worked examples, real components in these classes: ${EXAMPLES.map(({ id }) => `${UI_ORIGIN}/components/${id}.md`).join(", ")}`,
    "",
    `Docs: ${BASE}/docs`,
    `UI Components: ${UI_ORIGIN}/components/installation`,
    "",
    "Every page below has a `.md` twin carrying its full text, and for a UI",
    "component its source and its API. Fetch the ones you need rather than a",
    "whole-site dump: the index is ~5k tokens and a page is ~4k, where the dump",
    "this used to advertise was ~594k.",
    "",
  ];

  for (const section of sidebarConfig.docs) {
    lines.push(`## ${section.title}`, "");
    for (const item of section.items) {
      if (typeof item === "string") {
        const doc = docMap.get(item);
        const title = doc?.title ?? item;
        const desc = doc?.description ? `: ${doc.description}` : "";
        lines.push(`- [${title}](${BASE}/docs/${item}.md)${desc}`);
      } else {
        lines.push(`### ${item.title}`, "");
        for (const slug of item.items) {
          const doc = docMap.get(slug);
          const title = doc?.title ?? slug;
          const desc = doc?.description ? `: ${doc.description}` : "";
          lines.push(`- [${title}](${BASE}/docs/${slug}.md)${desc}`);
        }
        lines.push("");
      }
    }
    lines.push("");
  }

  lines.push("## UI Components", "");

  for (const section of sidebarConfig.ui) {
    lines.push(`### ${section.title}`, "");
    for (const item of section.items) {
      if (typeof item === "string") {
        const ui = uiMap.get(item);
        const title = ui?.title ?? item;
        const desc = ui?.description ? `: ${ui.description}` : "";
        lines.push(`- [${title}](${UI_ORIGIN}/components/${item}.md)${desc}`);
      }
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
