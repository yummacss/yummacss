import { Button } from "@base-ui/react/button";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type IconTone = "accent" | "neutral";
type Shape = "rounded" | "square" | "squircle";

const BADGE_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const ICON_TONES: Record<IconTone, string> = {
  accent: "c:label",
  neutral: "c:hint",
};

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

const BUTTON_BASE =
  "d:if ai:c px:3 py:2 bw:1 fs:sm fw:500 tp:c tdu:150 ttf:io us:none c:p br:lg";

export interface EmptyStateProps {
  /** The glyph in the badge. No badge renders without one. */
  icon?: ReactNode;
  /**
   * `accent` for an invitation to act, `neutral` for a plain absence: nothing
   * found, nothing to do.
   */
  iconTone?: IconTone;
  /** The heading. */
  title: string;
  /** A line under the title. */
  description?: string;
  /** The filled button. Omit it for a state with nothing to do. */
  primaryLabel?: string;
  /** A glyph before the primary label. */
  primaryIcon?: ReactNode;
  /** Called when the primary button is pressed. */
  onPrimary?: () => void;
  /** The outlined button beside the primary one. */
  secondaryLabel?: string;
  /** A glyph before the secondary action's label. */
  secondaryIcon?: ReactNode;
  /** Called when the secondary button is pressed. */
  onSecondary?: () => void;
  /** Corner radius on the badge. */
  iconShape?: Shape;
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
 * A placeholder for an empty list, with an optional badge icon and up to two
 * actions.
 */
export default function EmptyStateBase({
  icon,
  iconTone = "accent",
  title,
  description,
  primaryLabel,
  primaryIcon,
  secondaryIcon,
  onPrimary,
  secondaryLabel,
  onSecondary,
  iconShape = "rounded",
  className,
  focus = true,
}: EmptyStateProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const hasActions = Boolean(primaryLabel || secondaryLabel);

  const gap = icon || hasActions ? "g:4" : "g:1";

  const rootClasses = merge("d:f fd:c ai:c jc:c p:8", gap, className);

  const badgeClasses = [
    "d:f ai:c jc:c w:12 h:12 bg:well",
    ICON_TONES[iconTone],
    BADGE_SHAPES[iconShape],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses}>
      {icon && <div className={badgeClasses}>{icon}</div>}

      <div className="d:f fd:c ai:c g:1 ta:c">
        <span className="c:label fs:md fw:600">{title}</span>
        {description && <span className="c:hint fs:sm">{description}</span>}
      </div>

      {hasActions && (
        <div className="d:f g:3">
          {secondaryLabel && (
            <Button
              onClick={onSecondary}
              className={merge(
                outline,
                BUTTON_BASE,
                "g:2 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label h:bg:well",
              )}
            >
              {secondaryIcon}
              {secondaryLabel}
            </Button>
          )}
          {primaryLabel && (
            <Button
              onClick={onPrimary}
              className={merge(
                outline,
                BUTTON_BASE,
                "g:2 bg:fill btc:white/20 blc:black/40 brc:black/40 bbc:black/60 bs-o:sm h:o:90 c:on-fill",
              )}
            >
              {primaryIcon}
              {primaryLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
