"use client";

import { NumberField } from "@base-ui/react/number-field";
import { AddIcon, MinusIcon } from "@solar-icons/react/outline";
import type { ComponentProps } from "react";
import { useId } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

// the box draws focus for its input, so the outline wraps the value
const BOX_FOCUS = "fw:os:s fw:ow:3 fw:oo:0 fw:oc:focus/40 fw:bc:focus";

// minus and plus are raised, the value between them sits recessed
const STEP =
  "d:f ai:c jc:c fs:0 p:0 bw:1 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label us:none c:p h:bg:well";
const BOX = "d:f bw:1 bg:field btc:shadow blc:line brc:line bbc:rim";

const SIZES: Record<Size, string> = {
  sm: "h:8",
  md: "h:9",
  lg: "h:11",
};

const STEP_SIZES: Record<Size, string> = {
  sm: "w:8",
  md: "w:9",
  lg: "w:11",
};

const INPUT_SIZES: Record<Size, string> = {
  sm: "w:16 fs:sm",
  md: "w:20 fs:sm",
  lg: "w:24 fs:md",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "w:3 h:3",
  md: "w:4 h:4",
  lg: "w:4 h:4",
};

const START_SHAPES: Record<Shape, string> = {
  rounded: "blr:lg",
  square: "",
  squircle: "blr:xxl cs:s",
};

const END_SHAPES: Record<Shape, string> = {
  rounded: "brr:lg",
  square: "",
  squircle: "brr:xxl cs:s",
};

export interface NumberFieldProps
  extends Omit<ComponentProps<typeof NumberField.Root>, "className" | "id"> {
  /**
   * Text above the control. Also a scrub area: drag left or right on it to
   * change the value.
   */
  label?: string;

  /**
   * Appends a red asterisk to the label & sets the input's native `required`
   * attribute.
   */
  required?: boolean;

  /** A line under the control, for context on what the number means. */
  description?: string;
  /**
   * Height of the buttons and the input together. The icon inside the buttons
   * grows only at `lg`.
   */
  size?: Size;
  /**
   * Corner radius on the group's outer edges. `squircle` uses `corner-shape`,
   * which degrades to a rounded square where that is unsupported.
   */
  shape?: Shape;

  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
  /**
   * The focus outline, drawn around the input and both buttons together. `true`
   * draws it, `false` removes it, and a string of Yumma CSS utilities restyles
   * it; write them with `fw:`, since the group draws it while anything inside
   * has focus. Removing it outright and putting nothing back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
}

/**
 * A number input with increment and decrement buttons, in three sizes and three
 * shapes.
 */
export default function NumberFieldBase({
  label,
  required = false,
  description,
  size = "md",
  shape = "rounded",
  disabled = false,
  className,
  focus = true,
  ...props
}: NumberFieldProps) {
  const id = useId();

  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const boxOutline = focus
    ? merge(BOX_FOCUS, focus === true ? "" : focus.replace(/\bfv:/g, "fw:"))
    : "";

  const stepClasses = (side: string) =>
    merge(outline, STEP, SIZES[size], STEP_SIZES[size], side);

  return (
    <NumberField.Root
      id={id}
      disabled={disabled}
      className={`d:f fd:c ai:fs g:2 ${disabled ? "o:60 c:na" : ""}`}
      {...props}
    >
      {label && (
        <NumberField.ScrubArea className="c:er">
          <label htmlFor={id} className="c:label fs:sm fw:600 c:er">
            {label}
            {required && <span className="c:red-5"> *</span>}
          </label>
        </NumberField.ScrubArea>
      )}

      <NumberField.Group className="d:f">
        <NumberField.Decrement className={stepClasses(START_SHAPES[shape])}>
          <MinusIcon className={ICON_SIZES[size]} />
        </NumberField.Decrement>
        <span className={merge(BOX, "blw:0 brw:0", SIZES[size], boxOutline)}>
          <NumberField.Input
            required={required}
            className={merge(
              "os:none p:0 bw:0 bg:transparent c:label fw:600 ta:c fvn:tn",
              INPUT_SIZES[size],
              className,
            )}
          />
        </span>
        <NumberField.Increment className={stepClasses(END_SHAPES[shape])}>
          <AddIcon className={ICON_SIZES[size]} />
        </NumberField.Increment>
      </NumberField.Group>

      {description && <p className="m:0 c:hint fs:xs">{description}</p>}
    </NumberField.Root>
  );
}
