"use client";

import { Field } from "@base-ui/react/field";
import { OTPField } from "@base-ui/react/otp-field";
import type { ComponentProps } from "react";
import { Fragment } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type ValidationType = "numeric" | "alpha" | "alphanumeric";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

// each slot sits recessed
const SLOT =
  "p:0 bw:1 bg:field btc:shadow blc:line brc:line bbc:rim c:label ta:c fw:600 tp:c tdu:150 ttf:io";

const SLOT_SIZES: Record<Size, string> = {
  sm: "w:8 h:9 fs:md",
  md: "w:9 h:11 fs:lg",
  lg: "w:11 h:13 fs:xl",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

export interface OTPFieldProps
  extends Omit<
    ComponentProps<typeof OTPField.Root>,
    "className" | "length" | "validationType"
  > {
  /**
   * Text above the slots, wired to the first one through Base UI's
   * `Field.Label`.
   */
  label?: string;
  /** A line under the slots, for where the code comes from. */
  description?: string;
  /** How many characters the code has, one slot each. */
  length?: number;
  /**
   * Slots per group, with a dash between groups. `0` draws one unbroken row.
   */
  groupSize?: number;
  /**
   * Which characters a slot accepts. Anything else is dropped as it is typed or
   * pasted, and the mobile keyboard follows it.
   */
  validationType?: ValidationType;
  /** Draws each character as a dot, as a password field does. */
  mask?: boolean;
  /** Width, height and type size of every slot. */
  size?: Size;
  /**
   * Corner radius on each slot. `squircle` uses `corner-shape`, which degrades
   * to a rounded square where that is unsupported.
   */
  shape?: Shape;
  /** Blocks input and dims the whole field, label included. */
  disabled?: boolean;
  /**
   * Appends a red asterisk to the label and makes the code required when a form
   * submits.
   */
  required?: boolean;
  /**
   * The focus outline on the slot being typed in. `true` draws it, `false`
   * removes it, and a string of Yumma CSS utilities restyles it. Removing it
   * outright and putting nothing back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

/**
 * A one-time code input, one slot per character, in three sizes and three
 * shapes.
 */
export default function OTPFieldBase({
  label,
  description,
  length = 6,
  groupSize = 3,
  validationType = "numeric",
  mask = false,
  size = "md",
  shape = "rounded",
  disabled = false,
  required = false,
  focus = true,
  className,
  ...props
}: OTPFieldProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const slots = Array.from({ length }, (_, index) => index);

  return (
    <Field.Root
      disabled={disabled}
      className={`d:f fd:c ai:c g:2 ${disabled ? "o:60 c:na" : ""}`}
    >
      {label && (
        <Field.Label className="c:label fs:sm fw:600">
          {label}
          {required && <span className="c:red-5"> *</span>}
        </Field.Label>
      )}

      <OTPField.Root
        length={length}
        validationType={validationType}
        mask={mask}
        required={required}
        className="d:f ai:c g:2"
        {...props}
      >
        {slots.map((index) => (
          <Fragment key={index}>
            {index > 0 && groupSize > 0 && index % groupSize === 0 && (
              <OTPField.Separator className="w:2 h:px bg:hint" />
            )}
            <OTPField.Input
              className={merge(
                outline,
                SLOT,
                SLOT_SIZES[size],
                SHAPES[shape],
                className,
              )}
            />
          </Fragment>
        ))}
      </OTPField.Root>

      {description && (
        <Field.Description className="m:0 c:hint fs:xs">
          {description}
        </Field.Description>
      )}
    </Field.Root>
  );
}
