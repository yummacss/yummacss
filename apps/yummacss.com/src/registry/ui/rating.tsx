"use client";

import { Toggle } from "@base-ui/react/toggle";
import { StarIcon } from "@solar-icons/react/bold";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

export interface RatingIcon {
  icon: ReactNode;
  label: string;
  activeClassName?: string;
}

export interface RatingProps {
  /** Text above the stars. */
  label?: string;
  /**
   * How many marks to draw, and the top of the scale. Ignored when `icons` is
   * set.
   */
  max?: number;
  /**
   * A custom icon set, for a single-choice picker instead of N stars. When set,
   * `value`/`defaultValue` index into it (0-based, `-1` for none) rather than
   * counting filled stars, and `count` is ignored.
   */
  icons?: RatingIcon[];
  /**
   * The rating on first render. Pair `value` with `onValueChange` instead if
   * you are controlling it.
   */
  defaultValue?: number;
  /** Controlled rating. */
  value?: number;
  /**
   * Called with the new rating. Pressing the current rating again clears it to
   * 0.
   */
  onValueChange?: (value: number) => void;
  /** Blocks interaction and dims the stars. */
  disabled?: boolean;
  /**
   * A rating that only reports one: an average, someone else's score. It draws
   * at full strength and stays out of the tab order, announced once as a single
   * value rather than as five controls. That is the difference from `disabled`,
   * which dims, because it means "you could, but not now".
   */
  readOnly?: boolean;
  /**
   * The pop each mark makes as it fills, and the press-scale under the pointer.
   * Turn it off for static stars, or when the user has asked for reduced
   * motion.
   */
  animated?: boolean;
  /**
   * Shown under the stars while nothing is selected. Once a rating is set it
   * reads `3 of 5`.
   */
  emptyHint?: string;
  /**
   * A figure beside the marks rather than under them: an average, where the
   * marks round it.
   */
  score?: ReactNode;
  /**
   * Replaces the `3 of 5` readout under the marks. A read-only average reports
   * what it is an average of, which a count of filled stars cannot say.
   */
  hint?: ReactNode;
  /** Extra content below the hint text, like a feedback field. */
  children?: ReactNode;
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

/** A star rating input. */
export default function RatingBase({
  label,
  max = 5,
  icons,
  defaultValue,
  value: controlledValue,
  onValueChange,
  disabled = false,
  readOnly = false,
  animated = true,
  emptyHint = "Click to rate",
  score,
  hint,
  children,
  className,
  focus = true,
}: RatingProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [internalValue, setInternalValue] = useState(
    defaultValue ?? controlledValue ?? (icons ? -1 : 0),
  );
  const value = controlledValue ?? internalValue;

  const handleChange = (next: number) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const starClasses = (pressed: boolean) =>
    merge(
      "d:f ai:c jc:c p:0 w:9 h:9 br:lg us:none",
      "bw:0 bg:transparent",
      disabled ? "c:na o:60" : "",
      !disabled && !readOnly ? `c:p ${outline}` : "",
      pressed ? "c:yellow" : "c:rim",
      !disabled && !readOnly && !pressed ? "h:c:hint" : "",
    );

  const iconClasses = (option: RatingIcon, active: boolean) =>
    merge(
      "d:f ai:c jc:c p:0 w:12 h:12 bw:0 br:lg us:none",
      disabled ? "c:na o:60" : `c:p ${outline}`,
      active ? (option.activeClassName ?? "c:yellow") : "c:rim",
      !disabled && !active ? "h:c:hint" : "",
    );

  return (
    <div className={merge("d:f fd:c ai:c jc:c g:4 p:8 h:56", className)}>
      {label && <span className="c:label fs:sm fw:500">{label}</span>}

      <Scored score={score}>
        <Row
          className={`d:f ${icons ? "g:3" : "g:1"}`}
          readOnly={readOnly}
          label={`${value} out of ${max} stars`}
        >
          {icons
            ? icons.map((option, index) => {
                const active = index === value;
                return (
                  <Toggle
                    key={option.label}
                    pressed={active}
                    disabled={disabled}
                    onPressedChange={() => handleChange(active ? -1 : index)}
                    aria-label={option.label}
                    className={
                      iconClasses(option, active) +
                      (animated && !disabled
                        ? " tp:t tdu:200 ttf:eo a:s:90 @prm:tp:none"
                        : "")
                    }
                  >
                    {animated && !disabled ? (
                      <Pop on={active}>{option.icon}</Pop>
                    ) : (
                      option.icon
                    )}
                  </Toggle>
                );
              })
            : Array.from({ length: max }, (_, index) => index + 1).map(
                (star) => {
                  const filled = star <= value;
                  const mark = <StarIcon className="fs:0 w:6 h:6" />;
                  const icon = animated ? <Pop on={filled}>{mark}</Pop> : mark;

                  if (readOnly) {
                    return (
                      <span key={star} className={starClasses(filled)}>
                        {icon}
                      </span>
                    );
                  }

                  return (
                    <Toggle
                      key={star}
                      pressed={filled}
                      disabled={disabled}
                      onPressedChange={() =>
                        handleChange(star === value ? 0 : star)
                      }
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      className={
                        starClasses(filled) +
                        (animated && !disabled
                          ? " tp:t tdu:200 ttf:eo a:s:90 @prm:tp:none"
                          : "")
                      }
                    >
                      {icon}
                    </Toggle>
                  );
                },
              )}
        </Row>
      </Scored>

      <span className="c:hint fs:xs">
        {hint ??
          (icons
            ? value >= 0
              ? icons[value].label
              : emptyHint
            : value > 0
              ? `${value} of ${max}`
              : emptyHint)}
      </span>

      {children}
    </div>
  );
}

function Pop({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <span
      key={on ? "on" : "off"}
      className={
        on ? "d:f tp:t tdu:250 ttf:out-back @st:s:80 @prm:tp:none" : "d:f"
      }
    >
      {children}
    </span>
  );
}

function Scored({
  score,
  children,
}: {
  score?: ReactNode;
  children: ReactNode;
}) {
  if (score === undefined || score === null) return <>{children}</>;

  return (
    <div className="d:f ai:c g:3">
      <span className="c:label fs:xxl fw:500">{score}</span>
      {children}
    </div>
  );
}

function Row({
  className,
  readOnly,
  label,
  children,
}: {
  className: string;
  readOnly: boolean;
  label: string;
  children: ReactNode;
}) {
  if (readOnly) {
    return (
      <div role="img" aria-label={label} className={className}>
        {children}
      </div>
    );
  }
  return <div className={className}>{children}</div>;
}
