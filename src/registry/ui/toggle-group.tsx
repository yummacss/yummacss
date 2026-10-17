"use client";

import { ToggleGroup } from "@base-ui/react/toggle-group";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle" | "pill";
type Orientation = "horizontal" | "vertical";

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "br:0",
  squircle: "br:xxl cs:s",
  pill: "br:9999",
};

const BASE = "p:r d:f g:1 p:1 w:fc bg:well";

export interface ToggleGroupProps {
  /** Merged with the group's own classes, so a utility you pass wins. */
  className?: string;
  /** The toggles. */
  children: ReactNode;
  /**
   * Corner radius of the container. The toggles inside carry their own `shape`.
   */
  shape?: Shape;
  /** Stacks the toggles and switches the arrow keys that move focus. */
  orientation?: Orientation;
  /**
   * More than one toggle can be pressed at a time. Off by default, matching
   * Base UI, so a group is single-choice unless you say otherwise.
   */
  multiple?: boolean;
  /** Ignores interaction on every toggle in the group. */
  disabled?: boolean;
  /** The pressed toggles, controlled. Pair with `onValueChange`. */
  value?: readonly string[];
  /** The pressed toggles on first render, uncontrolled. */
  defaultValue?: readonly string[];
  /** Called with the pressed values whenever they change. */
  onValueChange?: (value: string[]) => void;
}

/**
 * A set of toggles sharing one container, in four shapes and both orientations,
 * pressing one or several at a time.
 */
export default function ToggleGroupBase({
  className,
  children,
  shape = "rounded",
  orientation = "horizontal",
  multiple = false,
  disabled = false,
  value,
  defaultValue,
  onValueChange,
}: ToggleGroupProps) {
  return (
    <ToggleGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      multiple={multiple}
      disabled={disabled}
      orientation={orientation}
      className={merge(
        BASE,
        SHAPES[shape],
        orientation === "vertical" && "fd:c",
        className,
      )}
    >
      {children}
    </ToggleGroup>
  );
}
