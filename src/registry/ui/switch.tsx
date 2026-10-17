"use client";

import { Field } from "@base-ui/react/field";
import { Switch } from "@base-ui/react/switch";
import { type ReactNode, useId, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

interface SizeSpec {
  track: string;
  thumb: string;
  travelClass: string;
}

const SIZES: Record<Size, SizeSpec> = {
  sm: { track: "h:5 w:8", thumb: "w:4 h:4", travelClass: "ttx:3" },
  md: { track: "h:6 w:10", thumb: "w:5 h:5", travelClass: "ttx:4" },
  lg: { track: "h:7 w:12", thumb: "w:6 h:6", travelClass: "ttx:5" },
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

export interface SwitchProps {
  /** Text beside the track. */
  label?: string;
  /** A line under the label, for the consequence of turning it on. */
  description?: string;
  /**
   * Starting state when you are not controlling it. Pair `checked` with
   * `onCheckedChange` instead if you are.
   */
  defaultChecked?: boolean;
  /** Controlled state. */
  checked?: boolean;
  /** Called with the new state. Required for a controlled switch. */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Shown on the track, revealed as the thumb slides past it once checked.
   * Absent from the DOM while unchecked, not just hidden.
   */
  icon?: ReactNode;
  /** Track and thumb together. */
  size?: Size;
  /**
   * Corner radius, applied to the track and the thumb together. `squircle` uses
   * `corner-shape`.
   */
  shape?: Shape;
  /** Blocks interaction and dims the whole control, label included. */
  disabled?: boolean;
  /**
   * The thumb's slide when the state changes. Turn it off for an instant jump,
   * or when the user has asked for reduced motion.
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
  /** The accessible name, for a switch with no visible label. */
  ariaLabel?: string;
}

/**
 * An on/off control, in three sizes and three shapes, with an optional icon
 * revealed on the track.
 */
export default function SwitchBase({
  label,
  description,
  defaultChecked,
  checked: controlledChecked,
  onCheckedChange,
  icon,
  size = "md",
  shape = "rounded",
  disabled = false,
  animated = true,
  className,
  focus = true,
  ariaLabel,
}: SwitchProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? controlledChecked ?? false,
  );
  const checked = controlledChecked ?? internalChecked;
  const id = useId();
  const { track, thumb, travelClass } = SIZES[size];

  const handleChange = (next: boolean) => {
    setInternalChecked(next);
    onCheckedChange?.(next);
  };

  const trackClasses = merge(
    outline,
    "p:r d:f ai:c fs:0 m:0 p:0 bw:2 bc:transparent tp:c tdu:300 ttf:out-quart",
    track,
    SHAPES[shape],
    checked ? "bg:on" : "bg:rim",
    disabled ? "" : "c:p",
    className,
  );

  const thumbClasses = [
    "bg:knob bw:1 btc:white blc:black/10 brc:black/10 bbc:black/20 bs-o:sm",
    thumb,
    SHAPES[shape],
  ].join(" ");

  return (
    <Field.Root
      className={`d:f ai:fs g:3 ${disabled ? "o:60 c:na" : ""}`}
      disabled={disabled}
    >
      <Switch.Root
        id={id}
        checked={checked}
        onCheckedChange={handleChange}
        aria-label={ariaLabel}
        className={trackClasses}
      >
        {icon && checked && (
          <span className="d:f p:a l:1 ai:c jc:c w:3 h:3 c:white">{icon}</span>
        )}
        <Switch.Thumb
          className={merge(
            thumbClasses,
            checked ? travelClass : "",
            animated ? "tp:t tdu:400 ttf:out-back @prm:tp:none" : "",
          )}
        />
      </Switch.Root>
      {(label || description) && (
        <div className="d:f fd:c">
          {label && (
            <Field.Label
              htmlFor={id}
              className={`c:label fs:sm fw:600 us:none ${disabled ? "" : "c:p"}`}
            >
              {label}
            </Field.Label>
          )}
          {description && (
            <Field.Description className="m:0 c:hint fs:xs">
              {description}
            </Field.Description>
          )}
        </div>
      )}
    </Field.Root>
  );
}
