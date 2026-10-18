"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { SortVerticalIcon } from "@solar-icons/react/bold";
import { CheckIcon } from "@solar-icons/react/outline";
import { type ReactNode, useEffect, useId, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type IconSide = "leading" | "trailing";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  avatar?: string;
}

export interface SelectGroup {
  group: string;
  items: SelectOption[];
}

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const TRIGGER =
  "d:f ai:c jc:sb bw:1 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label us:none c:p";

const SIZES: Record<Size, string> = {
  sm: "h:8 w:56 px:3 fs:sm",
  md: "h:9 w:64 px:3 fs:sm",
  lg: "h:11 w:72 px:3 fs:md",
};

const ITEM_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:lg cs:s",
};

const POPUP_SIZES: Record<Size, string> = {
  sm: "w:56",
  md: "w:64",
  lg: "w:72",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

function isGroupEntry(entry: SelectOption | SelectGroup): entry is SelectGroup {
  return "items" in entry;
}

function flattenOptions(
  options: SelectOption[] | SelectGroup[],
): SelectOption[] {
  return options.flatMap((entry) =>
    isGroupEntry(entry) ? entry.items : [entry],
  );
}

function renderOption(option: SelectOption, shape: Shape) {
  return (
    <Select.Item
      key={option.value}
      value={option.value}
      className={(state) =>
        `d:f ai:c g:3 py:2 px:3 mx:1 bw:1 bc:transparent ${ITEM_SHAPES[shape]} fs:sm fw:500 us:none c:p c:label ${
          state.highlighted
            ? "bg:check c:white btc:white/25 blc:black/15 brc:black/15 bbc:black/30"
            : "bg:transparent"
        }`
      }
    >
      <span className="d:f ai:c w:4 h:4 fs:0">
        <Select.ItemIndicator className="d:f ai:c">
          <CheckIcon className="w:4 h:4" />
        </Select.ItemIndicator>
      </span>
      {option.avatar && (
        <Avatar.Root className="d:if o:h ai:c jc:c w:6 h:6 bc:raised br:9999 bw:1 va:m us:none">
          <Avatar.Image
            src={option.avatar}
            alt=""
            className="of:c w:100% h:100%"
          />
          <Avatar.Fallback className="d:f ai:c jc:c w:100% h:100% c:hint fs:xs">
            {option.label[0]}
          </Avatar.Fallback>
        </Avatar.Root>
      )}
      <div className="d:f fd:c">
        <Select.ItemText>{option.label}</Select.ItemText>
        {option.description && (
          <span className="fs:xs o:80">{option.description}</span>
        )}
      </div>
    </Select.Item>
  );
}

export interface SelectProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /**
   * The choices. `value` and `label` are required; `description` and `avatar`
   * are optional per option. The shape is fixed rather than generic because you
   * own the file: data that does not fit is an edit to the option body, not an
   * API.
   */
  options: SelectOption[] | SelectGroup[];
  /** Text above the trigger. */
  label?: string;
  /**
   * Appends a red asterisk to the label & sets the trigger's native `required`
   * attribute.
   */
  required?: boolean;
  /** A line under the control, for context on what the choice means. */
  description?: string;
  /** Shown on the trigger before anything is selected. */
  placeholder?: string;
  /**
   * The option selected when you are not controlling it. Pair `value` with
   * `onValueChange` instead if you are.
   */
  defaultValue?: string | null;
  /** Controlled selection. */
  value?: string | null;
  /**
   * Called with the newly selected value, or `null` if the selection was
   * cleared. Required for a controlled select.
   */
  onValueChange?: (value: string | null) => void;
  /** Height and width of the trigger. The popup follows it. */
  size?: Size;
  /**
   * Corner radius, applied to the trigger and the popup together. `squircle`
   * uses `corner-shape`.
   */
  shape?: Shape;
  /**
   * A single icon fixed on the trigger, not per option. For the per-option
   * kind, give an option an `avatar` instead.
   */
  icon?: ReactNode;
  /** Which side `icon` sits on. Trailing sits just before the chevron. */
  iconPosition?: IconSide;
  /** Blocks interaction and dims the whole control, label included. */
  disabled?: boolean;
  /**
   * Fades and scales the popup in and out. Turn it off for a static popup, or
   * when the user has asked for reduced motion.
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
 * A choice from a closed list, in three sizes and three shapes, with an
 * optional icon on the trigger and an avatar per option.
 */
export default function SelectBase({
  options,
  label,
  required = false,
  description,
  placeholder = "Select…",
  defaultValue = null,
  value,
  onValueChange,
  size = "md",
  shape = "rounded",
  icon,
  iconPosition = "leading",
  disabled = false,
  animated = true,
  className,
  focus = true,
  container,
}: SelectProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);
  const id = useId();

  const triggerClasses = merge(
    outline,
    TRIGGER,
    SIZES[size],
    SHAPES[shape],
    open ? "bg:well" : "",
    className,
  );

  const iconEl = icon && (
    <span className="d:f ai:c c:hint" aria-hidden>
      {icon}
    </span>
  );

  const flatOptions = flattenOptions(options);

  const value_ = (
    <Select.Value>
      {(selected: string) => (
        <span className="min-w:0 o:h to:e ws:nw">
          {selected
            ? (flatOptions.find((o) => o.value === selected)?.label ?? selected)
            : placeholder}
        </span>
      )}
    </Select.Value>
  );

  const arrow = (
    <Select.Icon className="d:f c:hint">
      <SortVerticalIcon className="w:4 h:4" />
    </Select.Icon>
  );

  const popup = (
    <Select.Popup
      className={`d:f fd:c o:h max-h:var(--available-height) py:1 bg:raised bc:line bs-o:xl bw:1 ${POPUP_SIZES[size]} ${SHAPES[shape]} ${animated ? "tor:var(--transform-origin) tp:a tdu:200 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:100 closing:ttf:eo @prm:tp:none" : ""}`}
    >
      <Select.List className="p:r min-h:0 o:auto">
        {options.map((entry) =>
          isGroupEntry(entry) ? (
            <Select.Group key={entry.group}>
              <Select.GroupLabel className="px:3 pt:2 pb:1 fs:xs fw:500 c:hint us:none">
                {entry.group}
              </Select.GroupLabel>
              {entry.items.map((entry) => renderOption(entry, shape))}
            </Select.Group>
          ) : (
            renderOption(entry, shape)
          ),
        )}
      </Select.List>
    </Select.Popup>
  );

  return (
    <Field.Root className={`d:f fd:c g:2 ${disabled ? "o:60 c:na" : ""}`}>
      {label && (
        <label htmlFor={id} className="c:label fs:sm fw:600 us:none">
          {label}
          {required && <span className="c:red-5"> *</span>}
        </label>
      )}

      <Select.Root
        items={options as SelectOption[]}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        open={open}
        onOpenChange={setOpen}
        disabled={disabled}
        required={required}
      >
        <Select.Trigger id={id} className={triggerClasses}>
          {icon && iconPosition === "leading" && (
            <span className="d:f ai:c g:2">
              {iconEl}
              {value_}
            </span>
          )}
          {(!icon || iconPosition !== "leading") && value_}
          {icon && iconPosition === "trailing" ? (
            <span className="d:f ai:c g:1">
              {iconEl}
              {arrow}
            </span>
          ) : (
            arrow
          )}
        </Select.Trigger>
        <Select.Portal container={container}>
          <Select.Positioner
            sideOffset={8}
            alignItemWithTrigger={false}
            className="zi:10 p:0 ow:0 us:none"
          >
            {popup}
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>

      {description && <p className="m:0 c:hint fs:xs">{description}</p>}
    </Field.Root>
  );
}
