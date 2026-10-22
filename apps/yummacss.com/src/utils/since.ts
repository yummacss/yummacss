import { ver } from "./version";

// the minor the site is built against: a page is new while its `since` matches it
const MINOR = ver.split(".").slice(0, 2).join(".");

/** The badge beside a sidebar link: the version a page arrived in. */
export function badgeFor(doc?: { since?: string }) {
  return doc?.since && doc.since === MINOR ? doc.since : undefined;
}
