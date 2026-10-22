import { allUis } from "content-collections";
import { sidebarConfig } from "@/config/sidebar";
import { CSS_ORIGIN, pagePath, UI_ORIGIN } from "@/utils/hosts";

export const dynamic = "force-static";

export function GET() {
  const uiMap = new Map(allUis.map((u) => [u._meta.path, u]));

  const lines: string[] = [
    "# Yumma UI",
    "",
    "> Yumma UI is a collection of React components built on Base UI and styled",
    "> with Yumma CSS. The `yummaui` CLI copies a component's source into a project.",
    "",
    `The classes are Yumma CSS. Its syntax and a rules file for coding agents: ${CSS_ORIGIN}/llms.txt`,
    "",
    "Every page below has a `.md` twin carrying its full text, and for a",
    "component its source and its API. Fetch the ones you need.",
    "",
  ];

  for (const section of sidebarConfig) {
    lines.push(`## ${section.title}`, "");
    for (const slug of section.items) {
      const ui = uiMap.get(slug);
      const title = ui?.title ?? slug;
      const desc = ui?.description ? `: ${ui.description}` : "";
      lines.push(`- [${title}](${UI_ORIGIN}${pagePath(slug)}.md)${desc}`);
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
