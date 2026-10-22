"use client";

import Link from "next/link";
import { CSS_ORIGIN } from "@/utils/hosts";
import { YummaCSSMark } from "../icons/yummacss-mark";

/** The mark, linking to Installation; a right-click opens the brand page, which is what someone right-clicking a logo is after. */
export default function HomeMark({ className }: { className: string }) {
  return (
    <Link
      href="/docs/installation"
      aria-label="Yumma UI"
      onContextMenu={(event) => {
        event.preventDefault();
        window.location.assign(`${CSS_ORIGIN}/docs/brand`);
      }}
      className="d:b w:fc fv:oc:ink fv:ow:2"
    >
      <YummaCSSMark product="ui" className={className} />
    </Link>
  );
}
