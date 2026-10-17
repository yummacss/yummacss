"use client";

import { Field } from "@base-ui/react/field";
import { Toggle } from "@base-ui/react/toggle";
import {
  DangerTriangleIcon,
  EyeClosedIcon,
  EyeIcon,
} from "@solar-icons/react/bold-duotone";
import { CheckIcon } from "@solar-icons/react/outline";
import { type ComponentProps, type ReactNode, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type IconSide = "leading" | "trailing";
type Status = "default" | "error" | "success";

const SIZES: Record<Size, string> = {
  sm: "h:8 w:56",
  md: "h:9 w:64",
  lg: "h:11 w:72",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "br:0",
  squircle: "br:xxl cs:s",
};

const ICON_PADDING: Record<IconSide, string> = {
  leading: "pl:9 pr:3",
  trailing: "pl:3 pr:9",
};

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";
const FOCUS_WITHIN = "fw:os:s fw:ow:3 fw:oo:0 fw:oc:slate-4/60 fw:bc:slate-6";

const STATUS_BORDER: Record<Status, string> = {
  // recessed: the top edge darker than the bottom
  default: "btc:shadow blc:line brc:line bbc:rim",
  error: "bc:red-5",
  success: "bc:green-5",
};

const STATUS_OUTLINE: Record<Status, string> = {
  default: "",
  error: "fv:oc:red-2/60 fv:bc:red-3",
  success: "fv:oc:green-2/60 fv:bc:green-3",
};

const STATUS_OUTLINE_WITHIN: Record<Status, string> = {
  default: "",
  error: "fw:oc:red-2/60 fw:bc:red-3",
  success: "fw:oc:green-2/60 fw:bc:green-3",
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

export interface FieldProps
  extends Omit<ComponentProps<typeof Field.Control>, "size"> {
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
  /**
   * Text above the control. `Field.Root` and `Field.Label` associate it
   * automatically, so no `id`/`htmlFor` bookkeeping is needed.
   */
  label?: string;

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
  /** Height and width of the control. */
  size?: Size;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;

  /**
   * Any icon. It is positioned over the control, so pass the glyph and nothing
   * else. Hidden once `error` or `success` is set, which claim the trailing
   * slot for their own icon.
   */
  icon?: ReactNode;
  /** Which end `icon` sits at. */
  iconPosition?: IconSide;

  /**
   * Lets `icon` receive pointer events, for an inline button, a clear or reveal
   * toggle, instead of a decorative glyph.
   */
  iconInteractive?: boolean;

  /**
   * Static content flush against the control's leading edge, like a URL scheme.
   * Mutually exclusive with `icon`/`suffix` in practice: each claims the same
   * row.
   */
  prefixNode?: ReactNode;

  /**
   * Static content flush against the control's trailing edge, like a domain
   * suffix.
   */
  suffix?: ReactNode;

  /**
   * Adds a trailing button that shows and hides the value, for password fields.
   * Always trailing and always interactive, so it overrides `iconPosition` and
   * `icon`.
   */
  revealable?: boolean;
}

/**
 * A labelled input, in three sizes and three shapes, with an optional icon and
 * error or success states.
 */
export default function FieldBase({
  label,
  description,
  error,
  success,
  size = "md",
  shape = "rounded",
  icon,
  iconPosition = "leading",
  iconInteractive = false,
  prefixNode,
  suffix,
  revealable = false,
  disabled,
  required,
  className,
  focus = true,
  type,
  ...props
}: FieldProps) {
  const [revealed, setRevealed] = useState(false);
  const status: Status = error ? "error" : success ? "success" : "default";
  const outline = focus
    ? merge(FOCUS, STATUS_OUTLINE[status], focus === true ? "" : focus)
    : "";
  const message = error ?? success ?? description;
  const reveal = revealable;
  const controlType = reveal && revealed ? "text" : type;
  const trailingIcon = reveal ? (
    <Toggle
      aria-label={revealed ? "Hide" : "Show"}
      pressed={revealed}
      onPressedChange={setRevealed}
      disabled={disabled}
      className={merge(
        outline,
        "d:f ai:c jc:c p:0 bg:transparent bw:0 c:hint c:p us:none",
      )}
    >
      {revealed ? (
        <EyeIcon className="w:4 h:4" />
      ) : (
        <EyeClosedIcon className="w:4 h:4" />
      )}
    </Toggle>
  ) : (
    icon
  );
  const activeIcon = reveal ? trailingIcon : icon;
  const showDecorativeIcon = Boolean(activeIcon) && status === "default";
  const activeSide: IconSide =
    reveal || status !== "default" ? "trailing" : iconPosition;
  const hasAffix = Boolean(prefixNode) || Boolean(suffix);

  const controlClasses = merge(
    outline,
    "bg:field c:label bw:1 fs:sm",
    SIZES[size],
    SHAPES[shape],
    STATUS_BORDER[status],
    showDecorativeIcon || status !== "default"
      ? ICON_PADDING[activeSide]
      : "px:3",
    className,
  );

  // the affixes sit inside the box, so the box takes the focus outline
  const affixBoxClasses = merge(
    focus
      ? merge(
          FOCUS_WITHIN,
          STATUS_OUTLINE_WITHIN[status],
          focus === true ? "" : focus.replace(/\bfv:/g, "fw:"),
        )
      : "",
    "d:f ai:c g:2 px:3 bg:field bw:1 fs:sm",
    SIZES[size],
    SHAPES[shape],
    STATUS_BORDER[status],
    className,
  );

  return (
    <Field.Root
      disabled={disabled}
      className={`d:f fd:c g:2 c:label fs:sm ${disabled ? "o:60 c:na" : ""}`}
    >
      {label && (
        <Field.Label className="fw:600">
          {label}
          {required && <span className="c:red-5"> *</span>}
        </Field.Label>
      )}

      {hasAffix ? (
        <div className={affixBoxClasses}>
          {prefixNode && (
            <span className="d:f ai:c fs:0 c:hint">{prefixNode}</span>
          )}
          <Field.Control
            required={required}
            type={controlType}
            className="f:1 min-w:0 h:100% p:0 bw:0 bg:transparent c:label fs:sm os:none"
            {...props}
          />
          {suffix && <span className="d:f ai:c fs:0 c:hint">{suffix}</span>}
        </div>
      ) : (
        <div className="d:f p:r ai:c">
          {showDecorativeIcon && (
            <span
              className={merge(
                "d:f p:a ai:c c:hint",
                !(iconInteractive || reveal) && "pe:none",
                activeSide === "leading" ? "l:3" : "r:3",
              )}
            >
              {activeIcon}
            </span>
          )}
          <Field.Control
            required={required}
            type={controlType}
            className={controlClasses}
            {...props}
          />
          {status !== "default" && (
            <span className={`d:f p:a r:3 ai:c pe:none ${STATUS_ICON[status]}`}>
              {status === "error" ? (
                <DangerTriangleIcon className="w:4 h:4" />
              ) : (
                <CheckIcon className="w:4 h:4" />
              )}
            </span>
          )}
        </div>
      )}

      {message && (
        <Field.Description className={`fs:xs ${STATUS_MESSAGE[status]}`}>
          {message}
        </Field.Description>
      )}
    </Field.Root>
  );
}
