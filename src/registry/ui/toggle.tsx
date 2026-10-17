"use client";

import { Button } from "@base-ui/react/button";
import { Toggle } from "@base-ui/react/toggle";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Size = "sm" | "md";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

// in a group, one step under the track's own round, so the chip nests inside it
const GROUP_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:xl cs:s",
};

const SIZES: Record<Size, string> = {
  sm: "w:9 h:9",
  md: "w:12 h:12",
};

const DISABLED = "bw:1 bc:line bg:well c:hint o:60";

// pressed sinks in: the one place an inset shadow belongs
const PRESSED = "bg:well bs-i:md btc:shadow blc:line brc:line bbc:rim c:check";
const UNPRESSED =
  "bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label h:bg:well";

// in a group, picking one of several: the selected tab's raised chip on the track
const GROUP_PRESSED =
  "bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label";
const GROUP_UNPRESSED = "bg:transparent bc:transparent c:hint h:c:label";

export interface ToggleProps
  extends Omit<ComponentProps<"button">, "className" | "value">,
    Pick<ComponentProps<typeof Toggle>, "value"> {
  /** Shown while not pressed. */
  icon?: ReactNode;

  /** Shown while pressed. */
  pressedIcon?: ReactNode;
  /**
   * Starting state when you are not controlling it. Pair `pressed` with
   * `onPressedChange` instead if you are.
   */
  defaultPressed?: boolean;
  /** Controlled state. */
  pressed?: boolean;
  /** Called with the new state. Required for a controlled toggle. */
  onPressedChange?: (pressed: boolean) => void;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;
  /** The button's footprint. */
  size?: Size;

  /**
   * Blocks the press and marks the control. The pressed state stays legible, so
   * a disabled toggle still reports its value.
   */
  disabled?: boolean;
  /**
   * The press-scale animation. Turn it off for an instant press, or when the
   * user has asked for reduced motion.
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

/**
 * A two-state icon button, in three shapes, with an optional press animation.
 */
export default function ToggleBase({
  icon,
  pressedIcon,
  defaultPressed,
  pressed: controlledPressed,
  onPressedChange,
  shape = "rounded",
  size = "md",
  disabled = false,
  animated = true,
  className,
  focus = true,
  value,
  ...props
}: ToggleProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const grouped = value !== undefined;
  const [internalPressed, setInternalPressed] = useState(
    defaultPressed ?? false,
  );
  const pressed = controlledPressed ?? internalPressed;

  const handlePressedChange = (next: boolean) => {
    setInternalPressed(next);
    onPressedChange?.(next);
  };

  const pressedProps = grouped
    ? {}
    : { pressed, onPressedChange: handlePressedChange, defaultPressed };

  return (
    <Toggle
      value={value}
      disabled={disabled}
      {...pressedProps}
      className={(state) =>
        merge(
          outline,
          "d:f ai:c jc:c us:none",
          disabled ? "c:na" : "c:p",
          SIZES[size],
          grouped ? GROUP_SHAPES[shape] : SHAPES[shape],
          disabled
            ? DISABLED
            : `bw:1 ${
                grouped
                  ? state.pressed
                    ? GROUP_PRESSED
                    : GROUP_UNPRESSED
                  : state.pressed
                    ? PRESSED
                    : UNPRESSED
              }`,
          className,
        ) +
        (animated && !disabled
          ? " tp:t tdu:200 ttf:eo a:s:90 @prm:tp:none"
          : "")
      }
      render={(renderProps, state) => (
        <Button {...(renderProps as ComponentProps<"button">)}>
          {animated ? (
            <Pop on={state.pressed}>
              {(state.pressed && pressedIcon) || icon}
            </Pop>
          ) : (
            (state.pressed && pressedIcon) || icon
          )}
        </Button>
      )}
      {...props}
    />
  );
}
