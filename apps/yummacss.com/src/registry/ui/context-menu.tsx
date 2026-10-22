"use client";

import { ContextMenu } from "@base-ui/react/context-menu";
import { AltArrowRightIcon, CheckIcon } from "@solar-icons/react/outline";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type IconPosition = "leading" | "trailing";

const TRIGGER_SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "",
  squircle: "br:xxl cs:s",
};

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "",
  squircle: "br:3xl cs:s",
};

const ITEM_SHAPES: Record<Shape, string> = {
  rounded: "br:xl",
  square: "",
  squircle: "br:xxl cs:s",
};

export interface ContextMenuAction {
  type?: "item";
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ContextMenuSeparator {
  type: "separator";
}

export interface ContextMenuGroup {
  type: "group";
  label?: string;
  items: ContextMenuItem[];
}

export interface ContextMenuCheckbox {
  type: "checkbox";
  label: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export interface ContextMenuRadio {
  type: "radio";
  value: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
}

export interface ContextMenuSubmenu {
  type: "submenu";
  label: string;
  items: ContextMenuItem[];
}

export type ContextMenuItem =
  | ContextMenuAction
  | ContextMenuSeparator
  | ContextMenuGroup
  | ContextMenuCheckbox
  | ContextMenuRadio
  | ContextMenuSubmenu;

export interface ContextMenuProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /** The right-clickable tile's label, such as a file name. */
  trigger: ReactNode;
  /** A glyph in a well above the label, such as the file's type. */
  triggerIcon?: ReactNode;
  /**
   * A discriminated union. `{ label }` is a plain action (plus optional `icon`,
   * `shortcut`, `destructive`, `disabled`, `onClick`). `{ type: "separator" }`
   * divides. `{ type: "group", label?, items }` wraps a `role="group"` block
   * under a heading. `{ type: "checkbox", label, checked, onCheckedChange }`
   * and `{ type: "radio", value, onValueChange, options }` are the stateful
   * kinds. `{ type: "submenu", label, items }` nests, recursively.
   */
  items: ContextMenuItem[];
  /**
   * Corner radius on the trigger, popup and items together. `squircle` steps
   * the popup & item radius up one and adds `corner-shape`.
   */
  shape?: Shape;
  /**
   * Draws each action's icon. `false` drops them, so every row shows its label
   * alone.
   */
  icon?: boolean;
  /**
   * Which end of an item its `icon` sits at. A `shortcut` always trails
   * regardless.
   */
  iconPosition?: IconPosition;
  /** Blocks the menu from opening at all & dims the trigger. */
  disabled?: boolean;
  /**
   * Controlled state. There is no `defaultOpen` - a context menu that starts
   * open before anyone right-clicks was never demonstrated & makes no sense.
   */
  open?: boolean;
  /** Called with the new state. Required for a controlled menu. */
  onOpenChange?: (open: boolean) => void;
  /**
   * The popup's fade in/out. Turn it off for an instant appearance, or when the
   * user has asked for reduced motion.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

/**
 * A right-click menu built from an item list: actions, checkboxes, radios,
 * groups, separators and nested submenus.
 */
export default function ContextMenuBase({
  trigger,
  triggerIcon,
  items,
  shape = "rounded",
  icon = true,
  iconPosition = "leading",
  disabled = false,
  open: controlledOpen,
  onOpenChange,
  animated = true,
  className,
  container,
}: ContextMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;

  const handleOpenChange = (next: boolean) => {
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!disabled || !open) return;
    setInternalOpen(false);
    onOpenChange?.(false);
  }, [disabled, open, onOpenChange]);

  // a file tile, outlined while its menu is open
  const triggerClasses = (state: { open: boolean }) =>
    merge(
      "d:if fd:c ai:c jc:c g:2 p:3 min-w:24 bg:raised bw:2 fs:sm fw:500 c:label us:none",
      TRIGGER_SHAPES[shape],
      disabled
        ? "o:60 c:na bc:transparent"
        : state.open
          ? "bc:check/40"
          : "bc:transparent",
      className,
    );

  const popupClasses = [
    "py:1 min-w:52 max-h:var(--available-height) oy:auto bg:raised bc:line c:label bw:1 os:none bs-o:xl",
    POPUP_SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  const itemClasses =
    (destructive: boolean, spread: boolean) =>
    (state: { highlighted: boolean }) =>
      [
        "d:f ai:c g:2 py:2 pl:2 pr:3 fs:sm fw:500 us:none c:p mx:1 os:none bw:1 bc:transparent",
        spread ? "jc:sb" : "",
        ITEM_SHAPES[shape],
        destructive ? "c:red" : "",
        state.highlighted
          ? destructive
            ? "bg:red c:white btc:red-5 blc:red-8 brc:red-8 bbc:red-9"
            : "bg:check c:white btc:white/25 blc:black/15 brc:black/15 bbc:black/30"
          : "bg:transparent",
      ]
        .filter(Boolean)
        .join(" ");

  const renderItems = (list: ContextMenuItem[], keyPrefix: string) =>
    list.map((item, index) => {
      const key = `${keyPrefix}-${index}`;

      if ("type" in item && item.type === "separator") {
        return (
          <ContextMenu.Separator
            key={key}
            className="my:1 w:100% h:0 btw:1 bbw:1 btc:groove bbc:glint"
          />
        );
      }

      if ("type" in item && item.type === "group") {
        return (
          <ContextMenu.Group key={key}>
            {item.label && (
              <div className="px:3 py:1 fs:xs fw:600 c:hint us:none">
                {item.label}
              </div>
            )}
            {renderItems(item.items, key)}
          </ContextMenu.Group>
        );
      }

      if ("type" in item && item.type === "checkbox") {
        return (
          <ContextMenu.CheckboxItem
            key={key}
            checked={item.checked}
            onCheckedChange={item.onCheckedChange}
            disabled={item.disabled}
            className={itemClasses(false, false)}
          >
            <span className="d:f ai:c jc:c fs:0 w:4 h:4 bc:rim br:sm bw:1">
              <ContextMenu.CheckboxItemIndicator>
                <CheckIcon className="w:3 h:3" />
              </ContextMenu.CheckboxItemIndicator>
            </span>
            {item.label}
          </ContextMenu.CheckboxItem>
        );
      }

      if ("type" in item && item.type === "radio") {
        return (
          <ContextMenu.RadioGroup
            key={key}
            value={item.value}
            onValueChange={item.onValueChange}
          >
            {item.options.map((option) => (
              <ContextMenu.RadioItem
                key={option.value}
                value={option.value}
                className={itemClasses(false, false)}
              >
                <span className="d:f ai:c jc:c fs:0 w:4 h:4 bc:rim br:9999 bw:1">
                  <ContextMenu.RadioItemIndicator>
                    <span className="d:b w:2 h:2 br:9999 bg:current" />
                  </ContextMenu.RadioItemIndicator>
                </span>
                {option.label}
              </ContextMenu.RadioItem>
            ))}
          </ContextMenu.RadioGroup>
        );
      }

      if ("type" in item && item.type === "submenu") {
        return (
          <ContextMenu.SubmenuRoot key={key}>
            <ContextMenu.SubmenuTrigger className={itemClasses(false, true)}>
              <span className="fg:1">{item.label}</span>
              <AltArrowRightIcon className="fs:0 w:4 h:4 o:70" />
            </ContextMenu.SubmenuTrigger>

            <ContextMenu.Portal container={container}>
              <ContextMenu.Positioner
                className="ow:0"
                sideOffset={-4}
                alignOffset={-4}
              >
                <ContextMenu.Popup className={popupClasses}>
                  {renderItems(item.items, key)}
                </ContextMenu.Popup>
              </ContextMenu.Positioner>
            </ContextMenu.Portal>
          </ContextMenu.SubmenuRoot>
        );
      }

      const action = item as ContextMenuAction;
      const destructive = Boolean(action.destructive);

      const trailing =
        Boolean(action.shortcut) ||
        (icon && Boolean(action.icon) && iconPosition === "trailing");

      return (
        <ContextMenu.Item
          key={key}
          disabled={action.disabled}
          onClick={action.onClick}
          className={itemClasses(destructive, trailing)}
        >
          {icon && action.icon && iconPosition === "leading" && (
            <span className={`d:f fs:0 ${destructive ? "" : "o:70"}`}>
              {action.icon}
            </span>
          )}
          {trailing ? (
            <span className="fg:1">{action.label}</span>
          ) : (
            action.label
          )}
          {icon && action.icon && iconPosition === "trailing" && (
            <span className={`d:f fs:0 ${destructive ? "" : "o:70"}`}>
              {action.icon}
            </span>
          )}
          {action.shortcut && (
            <kbd
              className={`ml:4 px:1 br:sm bw:1 bc:current fs:xs fw:400 lh:4 ff:d ${destructive ? "" : "o:70"}`}
            >
              {action.shortcut}
            </kbd>
          )}
        </ContextMenu.Item>
      );
    });

  const popup = (
    <ContextMenu.Portal container={container} keepMounted>
      <ContextMenu.Positioner className="ow:0">
        <ContextMenu.Popup
          className={`${popupClasses} ${animated ? "tor:var(--transform-origin) tp:a tdu:200 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:100 closing:ttf:eo @prm:tp:none" : ""}`}
        >
          {renderItems(items, "item")}
        </ContextMenu.Popup>
      </ContextMenu.Positioner>
    </ContextMenu.Portal>
  );

  return (
    <ContextMenu.Root
      open={open}
      onOpenChange={handleOpenChange}
      disabled={disabled}
    >
      <ContextMenu.Trigger className={triggerClasses}>
        {triggerIcon && (
          <span className="d:f ai:c jc:c w:12 h:12 br:lg bg:well">
            {triggerIcon}
          </span>
        )}
        {trigger}
      </ContextMenu.Trigger>

      {popup}
    </ContextMenu.Root>
  );
}
