"use client";

import { Slider } from "@base-ui/react/slider";
import { type FocusEvent, type ReactNode, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Value = number | number[];

const SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

const FOCUS = "os:s ow:3 oo:0 oc:slate-4/60";

// the knob, centered on the value and overhanging the bar, as a switch thumb
const THUMB =
  "w:5 h:5 bg:knob bw:1 btc:white blc:black/10 brc:black/10 bbc:black/20 bs-o:sm";

function defaultFormat(value: Value): ReactNode {
  return Array.isArray(value) ? `${value[0]} - ${value[1]}` : `${value}%`;
}

export interface SliderProps {
  /** Text beside the value, above the track. */
  label?: string;
  /** Appends a red asterisk to the label. */
  required?: boolean;
  /** A line under the control, for context on what the value means. */
  description?: string;
  /**
   * A single number for one thumb, or a two-item array for a range with two.
   * Whichever shape you start with is the shape the slider keeps. It does not
   * switch thumb count at runtime.
   */
  defaultValue?: Value;
  /** Controlled value, same shape rule as `defaultValue`. */
  value?: Value;
  /**
   * Called with the new value on every change. Required for a controlled
   * slider.
   */
  onValueChange?: (value: Value) => void;
  /** Lower bound. */
  min?: number;
  /** Upper bound. */
  max?: number;
  /** Amount each keyboard press or drag increment changes the value by. */
  step?: number;
  /**
   * Corner radius, applied to the track, the indicator and the thumb together.
   * `squircle` uses `corner-shape`.
   */
  shape?: Shape;
  /** Blocks interaction and dims the control. */
  disabled?: boolean;
  /**
   * How the value is shown beside the label. Defaults to `50%` for one thumb,
   * `20 - 80` for a range; override for currency, units, or anything else.
   */
  formatValue?: (value: Value) => ReactNode;
  /**
   * A unit after the value, such as `px`. The number reads bold and the unit
   * quiet. Ignored when `formatValue` is set.
   */
  unit?: string;
  /**
   * Labels spread evenly under the track, first at the start, last at the end.
   */
  marks?: string[];
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
 * A value between a min and a max, one thumb or two for a range, in three
 * shapes.
 */
export default function SliderBase({
  label,
  required = false,
  description,
  defaultValue,
  value: controlledValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  shape = "rounded",
  disabled = false,
  formatValue,
  unit,
  marks,
  className,
  focus = true,
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<Value>(
    defaultValue ?? controlledValue ?? 0,
  );
  const [focused, setFocused] = useState(-1);
  const value = controlledValue ?? internalValue;
  const isRange = Array.isArray(value);

  const handleChange = (next: Value) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const outline = merge(
    focus ? FOCUS : "",
    (typeof focus === "string" ? focus : "").replace(/\bfv:/g, ""),
  );

  const thumbClasses = (index: number) =>
    merge(THUMB, SHAPES[shape], focused === index ? outline : "");

  const focusProps = (index: number) => ({
    onFocus: (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.matches(":focus-visible")) setFocused(index);
    },
    onBlur: () => setFocused(-1),
  });

  return (
    <div className={merge("d:f fd:c g:2 w:64", disabled && "o:60", className)}>
      <div className="d:f ai:c jc:sb">
        {label && (
          <label className="c:label fs:sm fw:600 us:none">
            {label}
            {required && <span className="c:red-5"> *</span>}
          </label>
        )}
        <span className="c:hint fs:sm">
          {formatValue ? (
            formatValue(value)
          ) : unit ? (
            <>
              <span className="c:label fw:600">
                {Array.isArray(value) ? value.join(" - ") : value}
              </span>{" "}
              {unit}
            </>
          ) : (
            defaultFormat(value)
          )}
        </span>
      </div>

      <Slider.Root
        value={value}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
      >
        <Slider.Control
          className={`d:f ai:c py:3 us:none ta:none ${disabled ? "c:na" : ""}`}
        >
          <Slider.Track
            className={merge("p:r h:2 w:100% bg:rim", SHAPES[shape])}
          >
            <Slider.Indicator className={merge("bg:check", SHAPES[shape])} />
            {isRange ? (
              value.map((_, index) => (
                <Slider.Thumb
                  // biome-ignore lint/suspicious/noArrayIndexKey: positional by design
                  key={index}
                  index={index}
                  className={thumbClasses(index)}
                  {...focusProps(index)}
                />
              ))
            ) : (
              <Slider.Thumb className={thumbClasses(0)} {...focusProps(0)} />
            )}
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>

      {marks && marks.length > 0 && (
        <div aria-hidden className="d:f jc:sb c:hint fs:xs">
          {marks.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      )}

      {description && <p className="m:0 c:hint fs:xs">{description}</p>}
    </div>
  );
}
