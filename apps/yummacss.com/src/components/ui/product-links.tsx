import Link from "next/link";
import { UI_ORIGIN } from "@/utils/hosts";

const PRODUCTS = [
  { title: "Yumma CSS", href: "/docs/installation", current: true },
  { title: "Yumma UI", href: `${UI_ORIGIN}/docs/installation` },
];

/** The two products as a section, this site's marked active. */
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
  return (
    <section className="d:f fd:c">
      <h3 className={heading}>Products</h3>
      <ul className={list}>
        {PRODUCTS.map(({ title, href, current }) => {
          const isActive = current === true;
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
