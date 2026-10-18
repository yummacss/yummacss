"use client";

import { Button } from "@base-ui/react/button";
import type {
  ComponentProps,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode,
} from "react";
import { useEffect, useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Variant = "primary" | "secondary" | "subtle" | "ghost" | "danger" | "link";
type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle" | "pill";
type IconSide = "leading" | "trailing";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

const BASE = "d:if ai:c jc:c g:2 bw:1 fw:500 us:none";

const MOTION = "tp:a tdu:150 ttf:io a:s:95";

// a bevel names all four sides: Yumma sorts rules by name, so bc: would beat bbc:
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg:fill h:o:90 btc:white/20 blc:black/40 brc:black/40 bbc:black/60 c:on-fill bs-o:sm",
  secondary:
    "bg:raised btc:rim blc:rim brc:rim bbc:shadow c:label h:bg:well bs-o:xs",
  subtle: "bg:well bc:transparent c:hint h:bg:rim",
  ghost: "bg:transparent bc:transparent c:label h:bg:well",
  danger:
    "bg:red h:bg:red-8 btc:red-5 blc:red-8 brc:red-8 bbc:red-9 c:white bs-o:sm",
  link: "bg:transparent bc:transparent c:label tuo:2 h:td:u",
};

const VARIANT_OUTLINE: Partial<Record<Variant, string>> = {
  danger: "fv:oc:red-2/60 fv:bc:red-3",
};

// held, the button's content again in a stronger color sweeps across it
const HOLD_FILL: Record<Variant, string> = {
  primary: "bg:check c:white",
  secondary: "bg:fill c:on-fill",
  subtle: "bg:fill c:on-fill",
  ghost: "bg:fill c:on-fill",
  danger: "bg:red-9 c:white",
  link: "bg:fill c:on-fill",
};

// a fixed height per size, so a row of buttons lines up whatever they hold
const SIZES: Record<Size, string> = {
  sm: "h:8 px:3 fs:xs",
  md: "h:9 px:4 fs:sm",
  lg: "h:11 px:5 fs:md",
};

const ICON_ONLY: Record<Size, string> = {
  sm: "w:8 h:8",
  md: "w:9 h:9",
  lg: "w:11 h:11",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "br:0",
  squircle: "br:xxl cs:s",
  pill: "br:9999",
};

export interface ButtonProps extends ComponentProps<typeof Button> {
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
  /**
   * Visual weight. `primary` for the main action on a view, `danger` for
   * destructive ones.
   */
  variant?: Variant;
  /**
   * Height, padding and text size. Every size is a fixed height, so a row of
   * buttons lines up.
   */
  size?: Size;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;
  /**
   * Swaps the icon for a spinner, dims the button and blocks interaction, while
   * leaving it focusable: `aria-busy` and `aria-disabled` rather than the
   * native `disabled` attribute, which would drop the control out of the tab
   * order while a reader is waiting on it.
   */
  loading?: boolean;
  /**
   * A glyph beside the label. Pass the icon and nothing else; the base gap
   * spaces it for you. With `iconOnly` it becomes the whole button, so give
   * that one an `aria-label`.
   */
  icon?: ReactNode;
  /** Which end `icon` sits at. */
  iconPosition?: IconSide;
  /**
   * Drops the label and draws the icon alone, keeping the label as the
   * accessible name. Needs `icon`: without one there would be nothing left to
   * show, so the prop has no effect.
   */
  iconOnly?: boolean;
  /**
   * Acts only once the button has been held down, for `true` 1.5 seconds or for
   * this many milliseconds. A stronger color sweeps across while it is held and
   * drains back if it is let go early. Space and Enter hold too.
   */
  hold?: boolean | number;
  /** What the button says for a moment once a hold completes. */
  holdLabel?: string;
  /** Called once a hold completes. A held button never calls `onClick`. */
  onHold?: () => void;
  /**
   * The hover and focus transition. Turn it off for a static button, or when
   * the user has asked for reduced motion.
   */
  transition?: boolean;
  /**
   * The focus outline. `true` draws it, `false` removes it along with the
   * danger, error and success tints that ride with it, and a string of Yumma
   * CSS utilities restyles it on every focusable part of the component, which
   * is more than `className` reaches. Removing it outright and putting nothing
   * back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
  /** The button's label. */
  children?: ReactNode;
}

/**
 * A primary action, in six variants, three sizes and four shapes, with loading,
 * icon-only and hold-to-confirm states.
 */
export default function ButtonBase({
  variant = "primary",
  size = "md",
  shape = "rounded",
  loading = false,
  icon,
  iconPosition = "leading",
  iconOnly = false,
  hold,
  holdLabel,
  onHold,
  transition = true,
  disabled,
  className,
  focus = true,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const outline = focus
    ? merge(FOCUS, VARIANT_OUTLINE[variant], focus === true ? "" : focus)
    : "";

  const inactive = disabled || loading;
  const busy = loading && !disabled;
  const iconOnlyActive = iconOnly && Boolean(icon);
  const trailing = iconPosition === "trailing" && Boolean(icon);
  const glyph = loading ? (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className={`w:4 h:4 fs:0 ${transition ? "an:spin adu:700 atf:l aic:inf @prm:an:none" : ""}`}
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  ) : (
    icon
  );

  const held = useHold(hold, onHold, transition);
  const label =
    holdLabel && held.done ? (
      <Swap shown={holdLabel} hidden={children} />
    ) : holdLabel ? (
      <Swap shown={children} hidden={holdLabel} />
    ) : (
      children
    );

  const classes = merge(
    outline,
    BASE,
    hold ? "p:r o:h ta:none" : "",
    transition ? MOTION : "",
    VARIANTS[variant],
    iconOnlyActive ? ICON_ONLY[size] : SIZES[size],
    SHAPES[shape],
    inactive ? "o:60 c:na" : "c:p",
    className,
  );

  return (
    <Button
      className={classes}
      disabled={inactive}
      focusableWhenDisabled={busy}
      aria-busy={loading || undefined}
      aria-label={
        iconOnlyActive && typeof children === "string" ? children : undefined
      }
      onClick={hold ? undefined : onClick}
      {...(hold && !inactive ? held.handlers : {})}
      {...props}
    >
      {iconOnlyActive ? (
        glyph
      ) : (
        <>
          {!trailing && glyph}
          {label}
          {trailing && glyph}
        </>
      )}
      {hold && (
        <span
          aria-hidden
          style={held.style}
          className={merge("p:a i:0 d:f ai:c jc:c g:2", HOLD_FILL[variant])}
        >
          {iconOnlyActive ? (
            glyph
          ) : (
            <>
              {!trailing && glyph}
              {label}
              {trailing && glyph}
            </>
          )}
        </span>
      )}
      {hold && holdLabel && (
        <span aria-live="polite" className="p:a w:px h:px o:h">
          {held.done ? holdLabel : ""}
        </span>
      )}
    </Button>
  );
}

// both labels share one grid cell, so the button keeps the wider one's width
function Swap({ shown, hidden }: { shown: ReactNode; hidden: ReactNode }) {
  return (
    <span className="d:ig ji:c">
      <span className="gcs:1 grs:1">{shown}</span>
      <span aria-hidden className="gcs:1 grs:1 v:h">
        {hidden}
      </span>
    </span>
  );
}

function useHold(
  hold: boolean | number | undefined,
  onHold: (() => void) | undefined,
  animated: boolean,
) {
  const duration = typeof hold === "number" ? hold : 1500;
  const [phase, setPhase] = useState<"idle" | "holding" | "done">("idle");
  const [still, setStill] = useState(!animated);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // reduced motion fades the fill in over the same time, rather than sweeping it
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(!animated || query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [animated]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const start = () => {
    if (phase !== "idle") return;
    setPhase("holding");
    timer.current = setTimeout(() => {
      setPhase("done");
      onHold?.();
      timer.current = setTimeout(() => setPhase("idle"), 2400);
    }, duration);
  };

  const stop = () => {
    if (phase !== "holding") return;
    clearTimeout(timer.current);
    setPhase("idle");
  };

  const isKey = (event: KeyboardEvent) =>
    event.key === " " || event.key === "Enter";

  const full = phase !== "idle";
  const timing =
    phase === "holding"
      ? `${duration}ms linear`
      : `${still ? 200 : 350}ms cubic-bezier(0.25, 1, 0.5, 1)`;

  return {
    done: phase === "done",
    style: still
      ? { opacity: full ? 1 : 0, transition: `opacity ${timing}` }
      : {
          clipPath: full ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path ${timing}`,
        },
    handlers: {
      onPointerDown: (event: PointerEvent<HTMLElement>) => {
        if (event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        start();
      },
      onPointerUp: stop,
      onPointerCancel: stop,
      onLostPointerCapture: stop,
      onBlur: stop,
      onContextMenu: (event: MouseEvent) => event.preventDefault(),
      onKeyDown: (event: KeyboardEvent) => {
        if (!isKey(event)) return;
        event.preventDefault();
        if (!event.repeat) start();
      },
      onKeyUp: (event: KeyboardEvent) => {
        if (!isKey(event)) return;
        event.preventDefault();
        stop();
      },
    },
  };
}
