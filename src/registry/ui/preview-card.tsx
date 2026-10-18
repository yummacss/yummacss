"use client";

import { PreviewCard } from "@base-ui/react/preview-card";
import type { CSSProperties, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const ARROW_PLACEMENT: Record<string, CSSProperties> = {
  top: { bottom: -6, rotate: "180deg" },
  bottom: { top: -6 },
  left: { right: -9, rotate: "90deg" },
  right: { left: -9, rotate: "-90deg" },
  "inline-start": { right: -9, rotate: "90deg" },
  "inline-end": { left: -9, rotate: "-90deg" },
};

const ARROW_HEIGHT = 6;

export interface PreviewCardProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /**
   * A pointer notched into the card's edge, aimed back at the trigger. It
   * re-aims itself when the card flips to fit.
   */
  arrow?: boolean;
  /** The inline content that opens the card on hover or focus. */
  trigger: ReactNode;
  /** The card's contents. */
  children: ReactNode;
  /**
   * Starting state when you are not controlling it. Pair `open` with
   * `onOpenChange` instead if you are.
   */
  defaultOpen?: boolean;
  /** Controlled state. */
  open?: boolean;
  /** Called with the new state. Required for a controlled preview card. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Corner radius on the card. `squircle` uses `corner-shape`, which degrades
   * to a rounded square where that is unsupported.
   */
  shape?: Shape;
  /**
   * The card's fade in/out. Turn it off for an instant appearance, or when the
   * user has asked for reduced motion.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
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

/** A hover-triggered card, in three shapes. */
export default function PreviewCardBase({
  arrow = true,
  trigger,
  children,
  defaultOpen,
  open,
  onOpenChange,
  shape = "rounded",
  animated = true,
  className,
  focus = true,
  container,
}: PreviewCardProps) {
  const popupClasses = [
    "d:f fd:c g:3 w:64 p:3 bg:raised bc:line bw:1 c:label fs:sm bs-o:xl",
    SHAPES[shape],
    arrow ? "p:r" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  return (
    <PreviewCard.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <PreviewCard.Trigger
        className={(state) =>
          merge(
            outline,
            "c:blue c:p fw:500 td:none h:td:u",
            state.open ? "td:u" : "",
            className,
          )
        }
      >
        {trigger}
      </PreviewCard.Trigger>

      <PreviewCard.Portal container={container}>
        <PreviewCard.Positioner sideOffset={8 + (arrow ? ARROW_HEIGHT : 0)}>
          <PreviewCard.Popup
            className={`${popupClasses} ${animated ? "tor:var(--transform-origin) tp:a tdu:200 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:100 closing:ttf:eo @prm:tp:none" : ""}`}
          >
            {arrow && (
              <PreviewCard.Arrow
                className="d:f"
                style={(state) => ARROW_PLACEMENT[state.side]}
              >
                <svg viewBox="0 0 10 5" width="12" height="6">
                  <title>Arrow</title>
                  <path
                    d="M0 5 L5 0 L10 5"
                    strokeWidth="1"
                    className="f:raised s:line"
                  />
                </svg>
              </PreviewCard.Arrow>
            )}
            {children}
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
