import { Button } from "@base-ui/react/button";
import type { ComponentProps, ReactNode } from "react";
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

const SIZES: Record<Size, string> = {
  sm: "px:3 py:1 fs:xs",
  md: "px:4 py:2 fs:sm",
  lg: "px:6 py:3 fs:md",
};

const ICON_ONLY: Record<Size, string> = {
  sm: "p:1",
  md: "p:2",
  lg: "p:3",
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
  /** Padding and text size. */
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
 * A primary action, in six variants, three sizes and four shapes, with loading
 * and icon-only states.
 */
export default function ButtonBase({
  variant = "primary",
  size = "md",
  shape = "rounded",
  loading = false,
  icon,
  iconPosition = "leading",
  iconOnly = false,
  transition = true,
  disabled,
  className,
  focus = true,
  children,
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

  const classes = merge(
    outline,
    BASE,
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
      {...props}
    >
      {iconOnlyActive ? (
        glyph
      ) : (
        <>
          {!trailing && glyph}
          {children}
          {trailing && glyph}
        </>
      )}
    </Button>
  );
}
