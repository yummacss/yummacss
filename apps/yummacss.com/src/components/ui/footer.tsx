import Link from "next/link";
import type { CSSProperties } from "react";
import { ver } from "@/utils/version";
import HomeMark from "./home-mark";

// Esteban's widest glyph and its dot, at 1em, so the display version is sized to
// the band it sits in rather than to a guess that only holds for 4.1.2.
const label = `v${ver}`;
const span = [...label].reduce((w, c) => w + (c === "." ? 0.135 : 0.55), 0);

const COLUMNS = [
  {
    title: "Yumma CSS",
    links: [
      { label: "Installation", href: "/docs/installation" },
      { label: "Configuration", href: "/docs/configuration" },
      { label: "Customization", href: "/docs/color-system" },
      { label: "Handbook", href: "/docs/naming-convention" },
      { label: "Variants", href: "/docs/media-queries" },
    ],
  },
  {
    title: "Yumma UI",
    links: [
      { label: "Installation", href: "/components/installation" },
      { label: "Forms", href: "/components/autocomplete" },
      { label: "Display", href: "/components/accordion" },
      { label: "Interactive", href: "/components/button" },
      { label: "Overlays", href: "/components/alert-dialog" },
      { label: "Application UI", href: "/components/empty-state" },
    ],
  },
  {
    title: "Updates",
    links: [
      {
        label: "Changelog",
        href: "https://github.com/yummacss/yummacss/blob/main/CHANGELOG.md",
      },
      {
        label: "Releases",
        href: "https://github.com/yummacss/yummacss/releases",
      },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "GitHub", href: "https://github.com/yummacss/yummacss" },
      { label: "Twitter", href: "https://x.com/yummacss" },
    ],
  },
];

/** A separator that is neither selected with the text nor read aloud. */
function Dot() {
  return (
    <span aria-hidden="true" className="mx:1 us:none">
      &middot;
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="btw:1 bc:border bg:page">
      <div className="mx:auto px:6 max-w:clamp(40rem,80vw,96rem)">
        <div className="d:f fd:c g:12 pt:14 @lg:fd:r @lg:g:18">
          <div className="d:f fd:c g:5 @lg:w:80">
            <HomeMark className="d:b w:10 h:10" />

            <div className="d:f fd:c g:2">
              <p className="m:0 c:ink/60 fs:sm">
                An atomic CSS framework with fixed scales for spacing, colors,
                type and radius. No arbitrary values.
              </p>
              <p className="m:0 c:ink/40 fs:xs">
                MIT licensed
                <Dot />
                &copy; {new Date().getFullYear()} Yumma CSS
                <Dot />
                <Link
                  href="/docs/brand"
                  className="c:ink/60 td:u h:c:accent fv:oc:ink fv:ow:2"
                >
                  Brand
                </Link>
              </p>
            </div>
          </div>

          <div className="d:g f:1 g:8 gtc:1 @sm:gtc:2 @lg:gtc:4">
            {COLUMNS.map((column) => (
              <div key={column.title} className="d:f fd:c g:4">
                <h3 className="ff:system c:ink/90 fs:xs fw:600 ls:5 tt:u">
                  {column.title}
                </h3>
                <ul className="d:f fd:c g:3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="c:ink/60 fs:sm td:none h:c:accent fv:oc:ink fv:ow:2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt:12 ct:is"
          style={{ "--span": span } as CSSProperties}
        >
          <span
            aria-hidden="true"
            className="d:b ff:display fs:min(17rem,calc(100cqw/(var(--span)*1.03))) ls:1 ws:nw us:none pe:none footer-version"
          >
            {label}
          </span>
        </div>
      </div>
    </footer>
  );
}
