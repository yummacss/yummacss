"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "@solar-icons/react/outline";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

const BOX = "d:f ai:c jc:c fs:0";

const SIZES: Record<Size, string> = {
  sm: "w:3 h:3",
  md: "w:4 h:4",
  lg: "w:5 h:5",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "w:2 h:2",
  md: "w:3 h:3",
  lg: "w:4 h:4",
};

const LABEL_SIZES: Record<Size, string> = {
  sm: "fs:xs",
  md: "fs:sm",
  lg: "fs:md",
};

// a box of the label's first line, so the box sits level with it at every size
const LINE: Record<Size, string> = {
  sm: "h:4",
  md: "h:5",
  lg: "h:6",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:sm",
  square: "br:0",
  squircle: "br:xxl cs:s",
};

// a ticked box is raised and bevelled, an empty one sits recessed
const CHECKED =
  "bw:1 bg:check btc:white/25 blc:black/15 brc:black/15 bbc:black/30";
const UNCHECKED = "bw:1 bg:field btc:shadow blc:line brc:line bbc:rim";

export interface CheckboxProps
  extends Omit<ComponentProps<typeof Checkbox.Root>, "className"> {
  /**
   * The text beside the box. The whole thing is one `<label>`, so clicking the
   * text toggles it.
   */
  label?: ReactNode;

  /**
   * A second line under the label, indented to line up with it. Use it for the
   * consequence of ticking the box, not for a restatement of the label.
   */
  description?: string;
  /** A glyph between the box and the label. */
  icon?: ReactNode;
  /** Quiet text at the far end of the row, such as a size or a count. */
  aside?: ReactNode;
  /**
   * Draws the checkbox as a full-width row that lifts into a raised chip while
   * ticked, for a list in a Checkbox Group.
   */
  row?: boolean;
  /**
   * Box, tick and label together. The description's indent follows, so it stays
   * aligned with the label at every size.
   */
  size?: Size;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;
  /**
   * The mark's transition when the box is ticked. Turn it off for a static
   * form, or when the user has asked for reduced motion.
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
 * A single tick box with its label, in three sizes and three shapes, with
 * indeterminate, disabled and read-only states.
 */
export default function CheckboxBase({
  label,
  description,
  icon,
  aside,
  row = false,
  size = "md",
  shape = "rounded",
  disabled = false,
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  className,
  animated = true,
  focus = true,
  ...props
}: CheckboxProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false,
  );
  const checked = controlledChecked ?? internalChecked;

  const handleChange: NonNullable<CheckboxProps["onCheckedChange"]> = (
    next,
    details,
  ) => {
    setInternalChecked(next);
    onCheckedChange?.(next, details);
  };

  const indicator = (
    <Checkbox.Indicator
      className={`d:f c:white ${animated ? "tp:a tdu:350 ttf:out-back opening:o:0 opening:s:40 closing:o:0 closing:s:80 closing:tdu:100 closing:ttf:eo @prm:tp:none" : ""}`}
      render={(indicatorProps, state) => (
        <span {...indicatorProps}>
          {state.indeterminate ? (
            <MinusIcon className={ICON_SIZES[size]} />
          ) : (
            <CheckIcon className={ICON_SIZES[size]} />
          )}
        </span>
      )}
    />
  );

  if (row) {
    // the row is the checkbox, so its chip follows the checked state
    return (
      <Checkbox.Root
        disabled={disabled}
        checked={checked}
        onCheckedChange={handleChange}
        className={(state) =>
          merge(
            outline,
            "d:f ai:c g:3 w:100% px:2 py:2 bw:1 br:lg us:none tp:c tdu:150 ttf:io",
            disabled ? "o:60 c:na" : "c:p",
            state.checked
              ? "bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs"
              : "bg:transparent bc:transparent",
            className,
          )
        }
        render={(rootProps, state) => (
          <span {...rootProps}>
            <span
              className={merge(
                BOX,
                SIZES[size],
                SHAPES[shape],
                state.checked || state.indeterminate ? CHECKED : UNCHECKED,
              )}
            >
              {indicator}
            </span>
            {icon && <span className="d:f fs:0">{icon}</span>}
            <span className={`c:label fw:500 ${LABEL_SIZES[size]}`}>
              {label}
            </span>
            {aside && <span className="ml:auto c:hint fs:xs">{aside}</span>}
          </span>
        )}
        {...props}
      />
    );
  }

  return (
    <label
      className={`d:f ai:fs g:2 us:none ${disabled ? "o:60 c:na" : "c:p"}`}
    >
      <span className={`d:f ai:c fs:0 ${LINE[size]}`}>
        <Checkbox.Root
          disabled={disabled}
          checked={checked}
          onCheckedChange={handleChange}
          className={(state) =>
            merge(
              outline,
              BOX,
              SIZES[size],
              SHAPES[shape],
              state.checked || state.indeterminate ? CHECKED : UNCHECKED,
              className,
            )
          }
          {...props}
        >
          {indicator}
        </Checkbox.Root>
      </span>
      <span className="d:f fd:c">
        <span className={`c:label fw:600 ${LABEL_SIZES[size]}`}>{label}</span>
        {description && <span className="c:hint fs:xs">{description}</span>}
      </span>
    </label>
  );
}
