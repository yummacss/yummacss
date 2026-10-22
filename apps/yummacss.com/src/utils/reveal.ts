"use client";

import { type RefObject, useEffect, useRef } from "react";

/**
 * Keeps a scroller's active item in view. `scrollIntoView` would move the page
 * as well, so the viewport's own `scrollTop` does the work.
 */
export function useReveal(key: string): {
  viewport: RefObject<HTMLDivElement | null>;
  active: RefObject<HTMLLIElement | null>;
} {
  const viewport = useRef<HTMLDivElement>(null);
  const active = useRef<HTMLLIElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: `key` is the route change to re-run on, not a value read
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const box = viewport.current;
      const item = active.current;
      if (!box || !item) return;

      const view = box.getBoundingClientRect();
      const rect = item.getBoundingClientRect();
      if (rect.top >= view.top && rect.bottom <= view.bottom) return;

      box.scrollTop += rect.top - view.top - (view.height - rect.height) / 2;
    });

    return () => cancelAnimationFrame(frame);
  }, [key]);

  return { viewport, active };
}
