"use client";

import { ScrollArea } from "@base-ui/react/scroll-area";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

const SHAPES: Record<Shape, string> = {
  rounded: "br:xl",
  square: "",
  squircle: "br:3xl cs:s",
};

export interface ScrollAreaProps {
  /** What scrolls. */
  children?: ReactNode;
  /** Corner radius on the focus outline. The thumb is always a capsule. */
  shape?: Shape;
  /**
   * The scrollbar fading in while you hover or scroll. Turn it off for a
   * scrollbar that is simply there, or when the user has asked for reduced
   * motion.
   */
  animated?: boolean;
  /**
   * Extra classes on the area. Its height lives here: `merge` folds them in
   * last, so `h:96` replaces the default `h:72`.
   */
  className?: string;
  /**
   * The focus outline. `true` draws it, `false` removes it along with the
   * danger, error and success tints that ride with it, and a string of Yumma
   * CSS utilities restyles it on every focusable part of the component, which
   * is more than `className` reaches. Removing it outright and putting nothing
   * back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
}

/**
 * Content that scrolls inside whatever holds it, with a thin scrollbar that
 * shows while you hover or scroll.
 */
export default function ScrollAreaBase({
  children,
  shape = "rounded",
  animated = true,
  className,
  focus = true,
}: ScrollAreaProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  return (
    <ScrollArea.Root className={merge("w:100% h:72 c:label", className)}>
      <ScrollArea.Viewport
        className={merge(outline, "h:100% bw:1 bc:transparent", SHAPES[shape])}
      >
        <ScrollArea.Content>{children}</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className={merge(
          "d:f jc:c w:2 py:1",
          animated
            ? "o:0 tp:o tdu:200 ttf:io hovering:o:100 scrolling:o:100 scrolling:tdu:0 @prm:tp:none"
            : "o:100",
        )}
      >
        <ScrollArea.Thumb className="w:1 br:9999 bg:hint/50" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
