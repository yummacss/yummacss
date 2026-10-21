"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { useId } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

const BASE = "d:f ai:c jc:c p:0 m:0";

const SIZES: Record<Size, string> = {
  sm: "w:3 h:3",
  md: "w:4 h:4",
  lg: "w:5 h:5",
};

const DOT_SIZES: Record<Size, string> = {
  sm: "w:1 h:1",
  md: "w:2 h:2",
  lg: "w:3 h:3",
};

const LABEL_SIZES: Record<Size, string> = {
  sm: "fs:xs",
  md: "fs:sm",
  lg: "fs:md",
};

// a box of the label's first line, so the circle sits level with it
const LINE: Record<Size, string> = {
  sm: "h:4",
  md: "h:5",
  lg: "h:6",
};

const ROUND = "br:9999";

// a picked circle is raised and bevelled, an empty one sits recessed
const PICKED =
  "bw:1 bg:check btc:white/25 blc:black/15 brc:black/15 bbc:black/30";
const UNPICKED = "bw:1 bg:field btc:shadow blc:line brc:line bbc:rim";

export interface RadioProps {
  /**
   * The choices. `value` and `label` are required; `description` and `icon` are
   * optional per option. The shape is fixed rather than generic because you own
   * the file: data that does not fit is an edit to the option body, not an API.
   */
  options: RadioOption[];
  /**
   * A caption above the group, correctly wired to it via `aria-labelledby`.
   * Without one the group has no accessible name at all.
   */
  label?: string;
  /**
   * The option selected when you are not controlling the group. Pair `value`
   * with `onValueChange` instead if you are.
   */
  defaultValue?: string;
  /** Controlled selection. */
  value?: string;
  /** Called with the newly selected value. Required for a controlled group. */
  onValueChange?: (value: string) => void;
  /** The circle, the dot and the label together. */
  size?: Size;
  /** Blocks interaction and dims every option. */
  disabled?: boolean;
  /**
   * The dot's transition when selection changes. Turn it off for a static
   * group, or when the user has asked for reduced motion.
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
 * A single choice from a short list, always round, with an optional icon and
 * description on each option.
 */
export default function RadioBase({
  options,
  label,
  defaultValue,
  value,
  onValueChange,
  size = "md",
  disabled = false,
  animated = true,
  className,
  focus = true,
}: RadioProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const labelId = useId();

  const dotClasses = (checked: boolean) =>
    checked
      ? `${DOT_SIZES[size]} ${ROUND} bg:white bs-o:xs ${animated ? "tp:t tdu:350 ttf:out-back @st:s:0 @prm:tp:none" : ""}`
      : "d:none";

  return (
    <div className="d:f fd:c g:2">
      {label && (
        <div id={labelId} className="c:label fs:sm fw:600 us:none">
          {label}
        </div>
      )}

      <RadioGroup
        aria-labelledby={label ? labelId : undefined}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className={merge("d:f fd:c g:2 ai:fs", className)}
      >
        {options.map((option) => {
          const rootClasses = (checked: boolean) =>
            merge(
              outline,
              BASE,
              SIZES[size],
              ROUND,
              checked ? PICKED : UNPICKED,
            );

          const indicator = (
            <Radio.Indicator className={(state) => dotClasses(state.checked)} />
          );

          return (
            <label
              key={option.value}
              className={`d:f ai:fs g:2 us:none ${
                disabled ? "o:60 c:na" : "c:p"
              }`}
            >
              <span className={`d:f ai:c fs:0 ${LINE[size]}`}>
                <Radio.Root
                  value={option.value}
                  className={(state) => rootClasses(state.checked)}
                >
                  {indicator}
                </Radio.Root>
              </span>
              <span className="d:f fd:c">
                <span className={`c:label fw:600 ${LABEL_SIZES[size]}`}>
                  {option.label}
                </span>
                {option.description && (
                  <span className="c:hint fs:xs">{option.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
