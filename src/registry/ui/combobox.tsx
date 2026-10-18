"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Combobox } from "@base-ui/react/combobox";
import { SortVerticalIcon } from "@solar-icons/react/bold";
import { CheckIcon, CloseIcon } from "@solar-icons/react/outline";
import type { ReactNode } from "react";
import { useEffect, useId, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";

export interface ComboboxItem {
  label: string;
  description?: string;
  avatar?: string;
}

export interface ComboboxGroup {
  group: string;
  items: ComboboxItem[];
}

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const INPUT =
  "pl:4 pr:16 bg:field btc:shadow blc:line brc:line bbc:rim c:label bw:1 fs:sm";

const SIZES: Record<Size, string> = {
  sm: "h:8 w:56",
  md: "h:9 w:64",
  lg: "h:11 w:72",
};

const CHIPS_SIZES: Record<Size, string> = {
  sm: "min-h:8 w:56 fs:sm",
  md: "min-h:9 w:64 fs:sm",
  lg: "min-h:11 w:72 fs:md",
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

const ACTION_HEIGHTS: Record<Size, string> = {
  sm: "h:8",
  md: "h:9",
  lg: "h:11",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "br:0",
  squircle: "br:xxl cs:s",
};

const ACTION =
  "d:f b:0 ai:c jc:c w:6 h:6 p:0 bg:transparent c:hint c:p h:c:label";

export interface ComboboxProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /**
   * What to choose from. Same shape as Autocomplete's: `label` is matched and
   * shown, `description` and `avatar` are optional.
   */
  items: ComboboxItem[] | ComboboxGroup[];
  /** Field label above the input. */
  label?: ReactNode;
  /**
   * A line under the input, for what the field expects rather than a
   * restatement of the label.
   */
  description?: string;
  /** Placeholder text. */
  placeholder?: string;
  /**
   * Height and width of the input. The popup and the trigger column follow it.
   */
  size?: Size;
  /**
   * Corner radius, applied to the input and the popup together. `squircle` uses
   * `corner-shape`.
   */
  shape?: Shape;
  /**
   * Allows more than one selection. Choices become removable chips under the
   * input.
   */
  multiple?: boolean;
  /**
   * Adds a button that empties the selection. It appears with the first
   * selection rather than with the prop, because an X on an empty field has
   * nothing to do. Works alongside `multiple`, where it clears every chip.
   */
  clearable?: boolean;
  /** Blocks interaction and dims the field. */
  disabled?: boolean;
  /**
   * Replaces the results with a loading row, for an async source. The fetching
   * itself is yours; this is only the state.
   */
  loading?: boolean;
  /**
   * Fades the popup in and out. Turn it off for a static popup, or when the
   * user has asked for reduced motion.
   */
  animated?: boolean;
  /** Shown when nothing matches. */
  emptyMessage?: string;
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

function isGroupEntry(
  entry: ComboboxItem | ComboboxGroup,
): entry is ComboboxGroup {
  return "items" in entry;
}

function renderItem(item: ComboboxItem, shape: Shape) {
  return (
    <Combobox.Item
      key={item.label}
      value={item.label}
      className={(state) =>
        `d:f ai:c g:2 py:2 px:3 mx:1 bw:1 bc:transparent ${ITEM_SHAPES[shape]} fs:sm fw:500 us:none c:p ${
          state.highlighted
            ? "bg:check c:white btc:white/25 blc:black/15 brc:black/15 bbc:black/30"
            : "bg:transparent"
        }`
      }
    >
      {item.avatar && (
        <Avatar.Root className="d:if o:h ai:c jc:c w:6 h:6 bc:raised br:9999 bw:1 us:none">
          <Avatar.Image
            src={item.avatar}
            alt=""
            className="of:c w:100% h:100%"
          />
          <Avatar.Fallback className="d:f ai:c jc:c w:100% h:100% c:hint fs:xs">
            {item.label[0]}
          </Avatar.Fallback>
        </Avatar.Root>
      )}
      <span className="fg:1 min-w:0 o:h to:e ws:nw">{item.label}</span>
      {item.description && (
        <span className="fs:0 fw:400 o:80">{item.description}</span>
      )}
      <Combobox.ItemIndicator className="d:f ml:auto">
        <CheckIcon className="w:3 h:3" />
      </Combobox.ItemIndicator>
    </Combobox.Item>
  );
}

/**
 * A filtering input that commits to a selection, in three sizes and three
 * shapes, single or multiple with removable chips.
 */
export default function ComboboxBase({
  items,
  label,
  description,
  placeholder = "Search",
  size = "md",
  shape = "rounded",
  multiple = false,
  clearable = true,
  disabled = false,
  loading = false,
  animated = true,
  emptyMessage = "No results found.",
  className,
  focus = true,
  container,
}: ComboboxProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);
  const id = useId();

  const chipsClasses = merge(
    "d:f fw:w ai:c g:1 py:1 pl:2 pr:16 bg:field btc:shadow blc:line brc:line bbc:rim c:label bw:1",
    CHIPS_SIZES[size],
    SHAPES[shape],
    className,
  );

  const inputClasses = merge(
    outline,
    INPUT,
    SIZES[size],
    SHAPES[shape],
    className,
  );

  const popup = (
    <Combobox.Popup
      className={`o:h bg:raised bc:line bs-o:xl c:label bw:1 ${POPUP_SIZES[size]} ${SHAPES[shape]} ${animated ? "tor:var(--transform-origin) tp:a tdu:200 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:100 closing:ttf:eo @prm:tp:none" : ""}`}
    >
      {loading ? (
        <div
          className="d:f py:3 px:4 ai:c g:2 c:hint fs:sm us:none"
          role="status"
        >
          <span
            aria-hidden
            className={`d:b w:4 h:4 bc:rim btc:hint bw:2 br:9999 ${
              animated ? "an:spin adu:700 atf:l aic:inf" : ""
            }`}
          />
          Loading
        </div>
      ) : (
        <>
          <Combobox.List className="oy:auto py:1 max-h:72 ow:0">
            {(entry: ComboboxItem | ComboboxGroup) =>
              isGroupEntry(entry) ? (
                <Combobox.Group key={entry.group}>
                  <Combobox.GroupLabel className="px:3 pt:2 pb:1 fs:xs fw:500 c:hint us:none">
                    {entry.group}
                  </Combobox.GroupLabel>
                  {entry.items.map((entry) => renderItem(entry, shape))}
                </Combobox.Group>
              ) : (
                renderItem(entry, shape)
              )
            }
          </Combobox.List>
          <Combobox.Empty className="c:hint fs:sm">
            <div className="py:4 px:4">{emptyMessage}</div>
          </Combobox.Empty>
        </>
      )}
    </Combobox.Popup>
  );

  return (
    <Combobox.Root
      items={items as ComboboxItem[]}
      open={open}
      onOpenChange={setOpen}
      multiple={multiple}
      disabled={disabled}
    >
      <div
        className={`d:f p:r fd:c g:2 c:label fs:sm ${disabled ? "o:60 c:na" : ""}`}
      >
        {label && (
          <label htmlFor={id} className="c:label fs:sm fw:600 us:none">
            {label}
          </label>
        )}

        <div className="p:r">
          {multiple ? (
            <Combobox.Chips className={chipsClasses}>
              <Combobox.Value>
                {(selected: string[] | string | null) => (
                  <>
                    {toChips(selected).map((chip) => (
                      <Combobox.Chip
                        key={chip}
                        className="d:f ai:c g:1 px:2 py:0 h:6 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label bw:1 fs:xs fw:500"
                      >
                        {chip}
                        <Combobox.ChipRemove
                          className="d:f b:0 ai:c jc:c p:0 bg:transparent c:hint c:p h:c:label"
                          aria-label={`Remove ${chip}`}
                        >
                          <CloseIcon className="w:3 h:3" />
                        </Combobox.ChipRemove>
                      </Combobox.Chip>
                    ))}
                  </>
                )}
              </Combobox.Value>
              <Combobox.Input
                id={id}
                placeholder={placeholder}
                className={merge(
                  outline,
                  "fg:1 w:24 min-w:24 bg:transparent c:label bw:0",
                )}
              />
            </Combobox.Chips>
          ) : (
            <Combobox.Input
              id={id}
              placeholder={placeholder}
              className={inputClasses}
            />
          )}
          <div
            className={`d:f p:a r:2 b:0 ai:c jc:c c:hint ${ACTION_HEIGHTS[size]}`}
          >
            {clearable && (
              <Combobox.Clear
                className={merge(outline, ACTION)}
                aria-label="Clear selection"
              >
                <CloseIcon className="w:4 h:4" />
              </Combobox.Clear>
            )}
            <Combobox.Trigger
              className={merge(outline, ACTION)}
              aria-label="Open popup"
            >
              <SortVerticalIcon className="w:4 h:4" />
            </Combobox.Trigger>
          </div>
        </div>

        {description && <p className="m:0 c:hint fs:xs">{description}</p>}
      </div>
      <Combobox.Portal container={container} keepMounted>
        <Combobox.Positioner className="ow:0" sideOffset={8}>
          {popup}
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

function toChips(selected: string[] | string | null): string[] {
  if (Array.isArray(selected)) return selected;
  return selected ? [selected] : [];
}
