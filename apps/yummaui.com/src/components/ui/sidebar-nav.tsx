"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Scroller from "@/components/ui/scroller";
import { useReveal } from "@/utils/reveal";
import type { NavSection } from "./mobile-sheet";
import NewBadge, { NewLabel } from "./new-badge";
import ProductLinks from "./product-links";

interface Props {
  sections: NavSection[];
}

export default function SidebarNav({ sections }: Props) {
  const pathname = usePathname();
  const { viewport, active } = useReveal(pathname);

  return (
    <aside className="d:none @lg:d:b @lg:gc-s:3 @lg:pt:20">
      <Scroller
        viewportRef={viewport}
        className="p:st t:20 max-h:calc(100dvh-5rem)"
        viewportClassName="d:f fd:c g:8 mx:-2 px:2 pb:12"
      >
        <ProductLinks
          heading="ff:system mb:3 c:silver-8 fs:xs fw:600 ls:2 tt:u"
          list="d:f fd:c g:2"
          link="p:r d:if ai:c g:3 fs:sm us:none fv:oc:ink fv:oo:2 fv:ow:2"
        />
        {sections.map((section) => (
          <div key={section.title} className="d:f fd:c g:3">
            <h3 className="ff:system c:silver-8 fs:xs fw:600 ls:2 tt:u">
              {section.title}
            </h3>
            <ul className="d:f fd:c g:2">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li
                    key={item.href}
                    ref={isActive ? active : undefined}
                    className="d:f ai:c g:3"
                  >
                    <Link
                      href={item.href}
                      className={`p:r d:if ai:c g:3 fs:sm us:none fv:oc:ink fv:oo:2 fv:ow:2 ${isActive ? "c:accent td:u tds:d" : "c:ink/70 h:c:accent"}`}
                    >
                      {item.title}
                      <NewLabel since={item.since} />
                    </Link>
                    <NewBadge since={item.since} />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </Scroller>
    </aside>
  );
}
