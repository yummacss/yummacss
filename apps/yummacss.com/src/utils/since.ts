import { ver } from "./version";

// the minor the site is built against: a page is new while its `since` matches it
const MINOR = ver.split(".").slice(0, 2).join(".");

// a component ships when the registry deploys, so it is new for a stretch of days
export const NEW_FOR_DAYS = 30;
const DAY = 86_400_000;

/** The badge beside a sidebar link: the version a page arrived in, or `New`. */
export function newIn(
  since?: string,
  added?: string,
  now = Date.now(),
): string | undefined {
  if (since && since === MINOR) return since;
  if (added && now - Date.parse(added) < NEW_FOR_DAYS * DAY) return "New";
  return undefined;
}

/** A page's badge, from `since` on a docs page or `added` on a component page. */
export function badgeFor(doc?: { since?: string; added?: unknown }) {
  return newIn(
    doc?.since,
    typeof doc?.added === "string" ? doc.added : undefined,
  );
}
