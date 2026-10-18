"use client";

import { Tooltip } from "@base-ui/react/tooltip";
import type { CSSProperties, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Side = "top" | "right" | "bottom" | "left";
type Tone = "light" | "dark" | "danger";
type Shape = "rounded" | "square" | "squircle";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:3xl cs:s",
};

const TONES: Record<Tone, string> = {
  light: "bg:raised bc:line c:label bw:1",
  dark: "bg:fill c:on-fill",
  danger: "bg:red-7 c:white",
};

const DANGER_OUTLINE = "fv:oc:red-2/60 fv:bc:red-3";

const TRIGGER_TONES: Record<Tone, string> = {
  light: "c:hint h:c:label",
  dark: "c:hint h:c:label",
  danger: "c:red-7 h:c:red-8",
};

const ARROW_TONES: Record<Tone, string> = {
  light: "f:raised s:line",
  dark: "f:fill s:fill",
  danger: "f:red-7 s:red-7",
};

const ARROW_PLACEMENT: Record<string, CSSProperties> = {
  top: { bottom: -6, rotate: "180deg" },
  bottom: { top: -6 },
  left: { right: -9, rotate: "90deg" },
  right: { left: -9, rotate: "-90deg" },
  "inline-start": { right: -9, rotate: "90deg" },
  "inline-end": { left: -9, rotate: "-90deg" },
};

/** Added to `sideOffset`, so the gap is measured from the arrow's tip. */
const ARROW_HEIGHT = 6;

export interface TooltipProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /**
   * The trigger's content, an icon usually. Pair it with `triggerLabel` when
   * there is no text.
   */
  trigger: ReactNode;
  /**
   * The trigger's `aria-label`. An icon-only trigger has no accessible name
   * without it.
   */
  triggerLabel?: string;
  /** The tooltip's text. */
  content: ReactNode;
  /**
   * Which side of the trigger the tooltip opens on. It flips automatically if
   * there is no room.
   */
  side?: Side;
  /** Gap between the trigger and the tooltip, or its arrow tip, in pixels. */
  sideOffset?: number;
  /**
   * The tooltip's surface and its trigger together. `light` and `dark` are the
   * two neutral surfaces; `danger` reads red at both ends, for a destructive
   * action.
   */
  tone?: Tone;
  /**
   * A pointer notched into the tooltip's edge, aimed back at the trigger. It
   * re-aims itself when `side` changes.
   */
  arrow?: boolean;
  /**
   * How long a hover must rest before it opens, in ms. Set to `0` to open on
   * contact.
   */
  delay?: number;
  /** Corner radius on the tooltip. */
  shape?: Shape;
  /**
   * The tooltip's fade and rise. Turn it off for an instant tooltip, or when
   * the user has asked for reduced motion.
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

/**
 * A hover tooltip, light or dark, positionable on any side, with an optional
 * arrow.
 */
export default function TooltipBase({
  trigger,
  triggerLabel,
  content,
  side = "top",
  sideOffset = 8,
  tone = "light",
  arrow = true,
  delay = 300,
  shape = "rounded",
  animated = true,
  className,
  focus = true,
  container,
}: TooltipProps) {
  const outline = focus
    ? merge(
        FOCUS,
        tone === "danger" ? DANGER_OUTLINE : "",
        focus === true ? "" : focus,
      )
    : "";

  const triggerClasses = merge(
    outline,
    "d:f ai:c jc:c bg:transparent bw:0 c:p",
    TRIGGER_TONES[tone],
    className,
  );

  const popupClasses = [
    "px:3 py:2 fs:sm us:none",
    TONES[tone],
    SHAPES[shape],
    "bs-o:md",
    arrow ? "p:r" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const arrowTone = ARROW_TONES[tone];

  const popup = (
    <Tooltip.Popup
      className={`${popupClasses} ${animated ? "tor:var(--transform-origin) tp:a tdu:200 ttf:out-quart opening:o:0 opening:s:95 opening:tty:1 closing:o:0 closing:tdu:100 closing:ttf:eo @prm:tp:none" : ""}`}
    >
      {arrow && (
        <Tooltip.Arrow
          className="d:f"
          style={(state) => ARROW_PLACEMENT[state.side]}
        >
          <svg viewBox="0 0 10 5" width="12" height="6">
            <title>Arrow</title>
            <path d="M0 5 L5 0 L10 5" strokeWidth="1" className={arrowTone} />
          </svg>
        </Tooltip.Arrow>
      )}
      {content}
    </Tooltip.Popup>
  );

  return (
    <Tooltip.Provider delay={delay}>
      <Tooltip.Root>
        <Tooltip.Trigger className={triggerClasses} aria-label={triggerLabel}>
          {trigger}
        </Tooltip.Trigger>
        <Tooltip.Portal container={container}>
          <Tooltip.Positioner
            side={side}
            sideOffset={sideOffset + (arrow ? ARROW_HEIGHT : 0)}
          >
            {popup}
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
