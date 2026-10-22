"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { YummaCSSMark } from "../icons/yummacss-mark";

/** The mark of the product the page is in, linking to its installation; a right-click opens the brand page, which is what someone right-clicking a logo is after. */
export default function HomeMark({ className }: { className: string }) {
  const router = useRouter();
  const ui = usePathname().startsWith("/components");
  return (
    <Link
      href={ui ? "/components/installation" : "/docs/installation"}
      aria-label={ui ? "Yumma UI" : "Yumma CSS"}
      onContextMenu={(event) => {
        event.preventDefault();
        router.push("/docs/brand");
      }}
      className="d:b w:fc fv:oc:ink fv:ow:2"
    >
      <YummaCSSMark product={ui ? "ui" : "css"} className={className} />
    </Link>
  );
}
