"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Scroller from "@/components/ui/scroller";

interface TocItem {
  id: string;
  // text & inline code, so code keeps its mono face here as in the heading
  parts: { text: string; code: boolean }[];
  level: number;
}

const INDENT: Record<number, string> = { 3: "ml:4", 4: "ml:8" };

export default function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocItem[]>([]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: need this useEffect to re-run this on route change to update the headings
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = Array.from(
        document.querySelectorAll(
          "article h2, article h3, article h4, main h2, main h3, main h4",
        ),
      ).filter((el) => !el.closest("[data-meta]") && el.id);

      const items: TocItem[] = elements.map((el) => ({
        id: el.id,
        parts: Array.from(el.childNodes).map((node) => ({
          text: node.textContent ?? "",
          code: node.nodeName === "CODE",
        })),
        level: Number(el.tagName.charAt(1)),
      }));

      setHeadings(items);
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="d:none bc:border blw:1 @lg:d:b @lg:gc-s:3">
      <Scroller className="p:st t:20 max-h:calc(100dvh-5rem)">
        <div className="px:8 pb:12">
          <h3 className="ff:system mb:4 c:silver-8 fs:xs fw:600 ls:2 tt:u">
            On this page
          </h3>
          <ul className="d:f fd:c g:2 fs:sm">
            {headings.map((heading) => (
              <li key={heading.id}>
                <Link
                  href={`#${heading.id}`}
                  className={`c:ink/70 h:c:ink fv:oc:ink fv:ow:2 ${INDENT[heading.level] ?? ""}`}
                >
                  {heading.parts.map((part, index) =>
                    part.code ? (
                      // biome-ignore lint/suspicious/noArrayIndexKey: parts never reorder
                      <code key={index} className="ff:m c:code">
                        {part.text}
                      </code>
                    ) : (
                      part.text
                    ),
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Scroller>
    </aside>
  );
}
