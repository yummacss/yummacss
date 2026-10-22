"use client";

import { Progress } from "@base-ui/react/progress";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";

const SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

export interface ProgressProps {
  /**
   * The current value, 0-100. Pass `null` for an indeterminate, always-animated
   * sliding bar. There is no fill level to show, so the schema here cannot demo
   * it, but the prop accepts it.
   */
  value: number | null;
  /**
   * Text above the track, correctly wired to it via Base UI's own
   * Progress.Label.
   */
  label: ReactNode;
  /**
   * A band of light that sweeps along the fill on a loop while the bar is below
   * 100. Needs `animated`, and stops under reduced motion.
   */
  shimmer?: boolean;
  /** Corner radius on both the track and the indicator. */
  shape?: Shape;
  /**
   * The indicator's width transition as `value` changes. Indeterminate progress
   * always animates regardless of this.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

/** A labelled progress bar, determinate or indeterminate, in three shapes. */
export default function ProgressBase({
  value,
  label,
  shimmer = false,
  shape = "rounded",
  animated = true,
  className,
}: ProgressProps) {
  const isIndeterminate = value === null;
  const sweeps = shimmer && animated && !isIndeterminate && value < 100;

  const rootClasses = merge("d:f fd:c g:2 w:64", className);

  const trackClasses = ["o:h h:2 bg:rim", SHAPES[shape]]
    .filter(Boolean)
    .join(" ");

  return (
    <Progress.Root className={rootClasses} value={value}>
      <div className="d:f jc:sb ai:c">
        <Progress.Label className="c:label fs:sm fw:500">
          {label}
        </Progress.Label>
        <Progress.Value className="c:hint fs:sm fvn:tn" />
      </div>
      <Progress.Track className={trackClasses}>
        {isIndeterminate ? (
          <Progress.Indicator
            className={[
              "h:100% w:100% bg:fill an:slide adu:1000 atf:io aic:inf @prm:an:none",
              SHAPES[shape],
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ) : (
          <Progress.Indicator
            className={(state) =>
              [
                "h:100%",
                sweeps ? "o:h" : "",
                animated ? "tp:w tdu:500 ttf:eo" : "",
                SHAPES[shape],
                state.status === "complete" ? "bg:green" : "bg:fill",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            {/* `slide` moves the strip its own width, so the band at its end crosses the whole fill */}
            {sweeps && (
              <span
                aria-hidden
                className="d:f jc:fe h:100% w:100% an:slide adu:1000 atf:io aic:inf @prm:an:none"
              >
                <span className="h:100% w:30% bg:white/20" />
              </span>
            )}
          </Progress.Indicator>
        )}
      </Progress.Track>
    </Progress.Root>
  );
}
