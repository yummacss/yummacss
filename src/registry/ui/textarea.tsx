"use client";

import { Field } from "@base-ui/react/field";
import { DangerTriangleIcon } from "@solar-icons/react/bold-duotone";
import { CheckIcon } from "@solar-icons/react/outline";
import type { ChangeEvent, ComponentProps } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Status = "default" | "error" | "success";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const STATUS_BORDER: Record<Status, string> = {
  default: "btc:shadow blc:line brc:line bbc:rim",
  error: "bc:red-5",
  success: "bc:green-5",
};

const STATUS_OUTLINE: Record<Status, string> = {
  default: "",
  error: "fv:oc:red-2/60 fv:bc:red-3",
  success: "fv:oc:green-2/60 fv:bc:green-3",
};

const STATUS_ICON: Record<Status, string> = {
  default: "",
  error: "c:red-5",
  success: "c:green-5",
};

const STATUS_MESSAGE: Record<Status, string> = {
  default: "c:hint",
  error: "c:red-5",
  success: "c:green-6",
};

const WARN_AT = 20;

export interface TextareaProps
  extends Omit<ComponentProps<"textarea">, "className" | "onChange"> {
  /**
   * Text above the control. `Field.Root` and `Field.Label` associate it
   * automatically, so no `id`/`htmlFor` bookkeeping is needed.
   */
  label?: string;

  /**
   * Appends a red asterisk to the label & sets the control's native `required`
   * attribute.
   */
  required?: boolean;

  /**
   * A line under the control, for format or context. Replaced by `error` or
   * `success` when either is set.
   */
  description?: string;

  /**
   * Red border, a warning icon & this message in place of `description`. Wins
   * over `success` if both are set.
   */
  error?: string;

  /** Green border, a check icon & this message in place of `description`. */
  success?: string;

  /**
   * Caps the value and draws the counter under the field. Zero draws neither.
   */
  maxLength?: number;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;
  /** Called on every input event. */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
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
 * A multi-line text field, in three shapes, with an optional character counter
 * and error or success states.
 */
export default function TextareaBase({
  label,
  required = false,
  description,
  error,
  success,
  maxLength,
  shape = "rounded",
  disabled,
  className,
  focus = true,
  onChange,
  defaultValue,
  value: controlledValue,
  ...props
}: TextareaProps) {
  const [internalValue, setInternalValue] = useState(
    String(defaultValue ?? controlledValue ?? ""),
  );
  const value = String(controlledValue ?? internalValue);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(event.target.value);
    onChange?.(event);
  };

  const status: Status = error ? "error" : success ? "success" : "default";
  const outline = focus
    ? merge(FOCUS, STATUS_OUTLINE[status], focus === true ? "" : focus)
    : "";
  const message = error ?? success ?? description;

  const showCounter = maxLength !== undefined && maxLength > 0;
  const remaining = showCounter ? maxLength - value.length : 0;
  const warn = showCounter && remaining <= WARN_AT;

  const controlClasses = merge(
    outline,
    "h:24 w:100% py:2 pl:3 bg:field c:label bw:1 fs:sm r:none",
    status !== "default" ? "pr:10" : "pr:3",
    SHAPES[shape],
    STATUS_BORDER[status],
    className,
  );

  return (
    <Field.Root
      disabled={disabled}
      className={`d:f fd:c g:2 w:80 ${disabled ? "o:60 c:na" : ""}`}
    >
      {(label || showCounter) && (
        <div className="d:f ai:c jc:sb g:2">
          {label && (
            <Field.Label className="c:label fs:sm fw:600">
              {label}
              {required && <span className="c:red-5"> *</span>}
            </Field.Label>
          )}
          {showCounter && (
            <span
              aria-live="polite"
              className={`ml:auto fs:xs ${warn ? "c:red fw:600" : "c:hint"}`}
            >
              {value.length} / {maxLength}
            </span>
          )}
        </div>
      )}

      <div className="d:f p:r ai:s">
        <Field.Control
          render={<textarea />}
          value={value}
          maxLength={maxLength}
          required={required}
          className={controlClasses}
          {...(props as ComponentProps<typeof Field.Control>)}
          onChange={
            handleChange as unknown as ComponentProps<
              typeof Field.Control
            >["onChange"]
          }
        />
        {status !== "default" && (
          <span className={`d:f p:a r:3 t:3 ai:c jc:c ${STATUS_ICON[status]}`}>
            {status === "error" ? (
              <DangerTriangleIcon className="w:4 h:4" />
            ) : (
              <CheckIcon className="w:4 h:4" />
            )}
          </span>
        )}
      </div>

      {message && (
        <p className={`m:0 fs:xs ${STATUS_MESSAGE[status]}`}>{message}</p>
      )}
    </Field.Root>
  );
}
