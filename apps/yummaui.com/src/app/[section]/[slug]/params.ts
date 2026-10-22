import { allUis } from "content-collections";
import { pagePath } from "@/utils/hosts";

/** Every page as its two segments: `/docs/installation`, `/components/button`. */
export function pageParams() {
  return allUis.map((ui) => {
    const [, section, slug] = pagePath(ui._meta.path).split("/");
    return { section, slug };
  });
}
