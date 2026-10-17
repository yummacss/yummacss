"use client";

import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import { type ReactNode, useId } from "react";
import { merge } from "yummacss/merge";
import Checkbox from "./checkbox";

export interface CheckboxGroupProps {
  /** Merged with the group's own classes, so a utility you pass wins. */
  className?: string;
  /** The checkboxes. */
  children: ReactNode;
  /** Names the group for screen readers and is shown above it. */
  label?: ReactNode;
  /**
   * Renders a checkbox above the group that checks and clears all of them, and
   * is indeterminate while only some are checked. Needs `allValues`, and
   * indents the group under it.
   */
  parentLabel?: ReactNode;
  /**
   * Every value in the group. Without it the parent cannot tell all-checked
   * from some-checked.
   */
  allValues?: string[];
  /** The checked values, controlled. Pair with `onValueChange`. */
  value?: string[];
  /** The checked values on first render, uncontrolled. */
  defaultValue?: string[];
  /** Called with the checked values whenever they change. */
  onValueChange?: (value: string[]) => void;
  /** Ignores interaction on every checkbox in the group. */
  disabled?: boolean;
  /** Form field name for the parent checkbox. */
  name?: string;
}

/**
 * A labelled group of checkboxes, optionally led by a parent checkbox that
 * checks and clears every one and sits indeterminate in between.
 */
export default function CheckboxGroupBase({
  className,
  children,
  label,
  parentLabel,
  allValues,
  value,
  defaultValue,
  onValueChange,
  disabled,
  name,
}: CheckboxGroupProps) {
  const labelId = useId();

  return (
    <CheckboxGroup
      aria-labelledby={label ? labelId : undefined}
      aria-label={
        !label && typeof parentLabel === "string" ? parentLabel : undefined
      }
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      allValues={allValues}
      disabled={disabled}
      className={merge("d:f fd:c g:2 c:label", className)}
    >
      {label && (
        <div className="c:label fs:sm fw:600 us:none" id={labelId}>
          {label}
        </div>
      )}
      {parentLabel && <Checkbox name={name} parent label={parentLabel} />}
      <div
        className={merge(
          "d:f fd:c g:2 p:3 br:lg bg:well",
          parentLabel ? "ml:6" : undefined,
        )}
      >
        {children}
      </div>
    </CheckboxGroup>
  );
}
