"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PRODUCTS = [
  { title: "Yumma CSS", href: "/docs/installation", prefix: "/docs" },
  {
    title: "Yumma UI",
    href: "/components/installation",
    prefix: "/components",
  },
];

/** The two products as a section, the one the route is in marked active. */
export default function ProductLinks({
  heading,
  list,
  link,
  onNavigate,
}: {
  /** Classes for the section's heading, list and each link, as in the menu around it. */
  heading: string;
  list?: string;
  link: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <section className="d:f fd:c">
      <h3 className={heading}>Products</h3>
      <ul className={list}>
        {PRODUCTS.map(({ title, href, prefix }) => {
          const isActive = pathname.startsWith(prefix);
          return (
            <li key={href} className="d:f ai:c">
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={`${link} ${isActive ? "c:accent td:u tds:d" : "c:ink/70 h:c:accent"}`}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
