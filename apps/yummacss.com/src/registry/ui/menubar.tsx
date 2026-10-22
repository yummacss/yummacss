"use client";

import { Menu } from "@base-ui/react/menu";
import { Menubar } from "@base-ui/react/menubar";
import { AltArrowRightIcon, CheckIcon } from "@solar-icons/react/outline";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type IconPosition = "leading" | "trailing";

const BAR_SHAPES: Record<Shape, string> = {
  rounded: "br:xl",
  square: "",
  squircle: "br:3xl cs:s",
};

const TRIGGER_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
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

export interface MenubarAction {
  type?: "item";
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MenubarSeparator {
  type: "separator";
}

export interface MenubarGroup {
  type: "group";
  label?: string;
  items: MenubarItem[];
}

export interface MenubarCheckbox {
  type: "checkbox";
  label: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export interface MenubarRadio {
  type: "radio";
  value: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
}

export interface MenubarSubmenu {
  type: "submenu";
  label: string;
  icon?: ReactNode;
  items: MenubarItem[];
}

export type MenubarItem =
  | MenubarAction
  | MenubarSeparator
  | MenubarGroup
  | MenubarCheckbox
  | MenubarRadio
  | MenubarSubmenu;

export interface MenubarMenu {
  label: string;
  items: MenubarItem[];
  disabled?: boolean;
}

export interface MenubarProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /**
   * Each menu's `label`, its `items`, and an optional `disabled`. Every menu
   * owns its own open state, so opening one closes the last.
   */
  menus: MenubarMenu[];
  /**
   * Corner radius on the bar, its buttons, the popups and their items together.
   */
  shape?: Shape;
  /**
   * Draws each item's icon. `false` drops them, so every row shows its label
   * alone.
   */
  icon?: boolean;
  /**
   * Which end of an item its `icon` sits at. A `shortcut` always trails
   * regardless.
   */
  iconPosition?: IconPosition;
  /**
   * The popups' fade in/out. Turn it off for instant menus, or when the user
   * has asked for reduced motion.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

/**
 * An application menu bar: a row of dropdown menus, each built from the same
 * item list as Menu.
 */
export default function MenubarBase({
  menus,
  shape = "rounded",
  icon = true,
  iconPosition = "leading",
  animated = true,
  className,
  container,
}: MenubarProps) {
  const barClasses = merge(
    "d:f g:1 p:1 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs bw:1",
    BAR_SHAPES[shape],
    className,
  );

  const popupClasses = [
    "py:1 min-w:52 max-h:var(--available-height) oy:auto bg:raised bc:line c:label bw:1 os:none bs-o:xl",
    POPUP_SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  const triggerClasses = (disabled: boolean) => (state: { open: boolean }) =>
    [
      "d:if ai:c h:8 px:3 py:0 fs:sm fw:500 us:none bw:0 bg:transparent",
      TRIGGER_SHAPES[shape],
      disabled ? "c:hint o:60 c:na" : "c:label c:p h:bg:well",
      !disabled && state.open ? "bg:well" : "",
    ]
      .filter(Boolean)
      .join(" ");

  const itemClasses =
    (destructive: boolean, spread: boolean) =>
    (state: { highlighted: boolean }) =>
      [
        "d:f ai:c g:2 py:2 pl:2 pr:3 fs:sm us:none c:p mx:1 fw:500 os:none bw:1 bc:transparent",
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

  const renderItems = (list: MenubarItem[], keyPrefix: string) =>
    list.map((item, index) => {
      const key = `${keyPrefix}-${index}`;

      if ("type" in item && item.type === "separator") {
        return (
          <Menu.Separator
            key={key}
            className="my:1 w:100% h:0 btw:1 bbw:1 btc:groove bbc:glint"
          />
        );
      }

      if ("type" in item && item.type === "group") {
        return (
          <Menu.Group key={key}>
            {item.label && (
              <div className="px:3 py:1 fs:xs fw:600 c:hint us:none">
                {item.label}
              </div>
            )}
            {renderItems(item.items, key)}
          </Menu.Group>
        );
      }

      if ("type" in item && item.type === "checkbox") {
        return (
          <Menu.CheckboxItem
            key={key}
            checked={item.checked}
            onCheckedChange={item.onCheckedChange}
            disabled={item.disabled}
            className={itemClasses(false, false)}
          >
            <span className="d:f ai:c jc:c fs:0 w:4 h:4 bc:rim br:sm bw:1">
              <Menu.CheckboxItemIndicator>
                <CheckIcon className="w:3 h:3" />
              </Menu.CheckboxItemIndicator>
            </span>
            {item.label}
          </Menu.CheckboxItem>
        );
      }

      if ("type" in item && item.type === "radio") {
        return (
          <Menu.RadioGroup
            key={key}
            value={item.value}
            onValueChange={item.onValueChange}
          >
            {item.options.map((option) => (
              <Menu.RadioItem
                key={option.value}
                value={option.value}
                className={itemClasses(false, false)}
              >
                <span className="d:f ai:c jc:c fs:0 w:4 h:4 bc:rim br:9999 bw:1">
                  <Menu.RadioItemIndicator>
                    <span className="d:b w:2 h:2 br:9999 bg:current" />
                  </Menu.RadioItemIndicator>
                </span>
                {option.label}
              </Menu.RadioItem>
            ))}
          </Menu.RadioGroup>
        );
      }

      if ("type" in item && item.type === "submenu") {
        return (
          <Menu.SubmenuRoot key={key}>
            <Menu.SubmenuTrigger className={itemClasses(false, true)}>
              {icon && item.icon && (
                <span className="d:f fs:0 o:70">{item.icon}</span>
              )}
              <span className="fg:1">{item.label}</span>
              <AltArrowRightIcon className="fs:0 w:4 h:4 o:70" />
            </Menu.SubmenuTrigger>

            <Menu.Portal container={container}>
              <Menu.Positioner
                className="ow:0"
                sideOffset={-4}
                alignOffset={-4}
              >
                <Menu.Popup className={popupClasses}>
                  {renderItems(item.items, key)}
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.SubmenuRoot>
        );
      }

      const action = item as MenubarAction;
      const destructive = Boolean(action.destructive);
      const trailing =
        Boolean(action.shortcut) ||
        (icon && Boolean(action.icon) && iconPosition === "trailing");

      return (
        <Menu.Item
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
        </Menu.Item>
      );
    });

  return (
    <Menubar className={barClasses}>
      {menus.map((menu) => (
        <MenubarEntry
          key={menu.label}
          menu={menu}
          animated={animated}
          popupClasses={popupClasses}
          triggerClasses={triggerClasses}
          renderItems={renderItems}
          container={container}
        />
      ))}
    </Menubar>
  );
}

function MenubarEntry({
  menu,
  animated,
  popupClasses,
  triggerClasses,
  renderItems,
  container,
}: {
  menu: MenubarMenu;
  animated: boolean;
  popupClasses: string;
  triggerClasses: (disabled: boolean) => (state: { open: boolean }) => string;
  renderItems: (list: MenubarItem[], keyPrefix: string) => ReactNode;
  container?: HTMLElement | null;
}) {
  const [open, setOpen] = useState(false);
  const disabled = Boolean(menu.disabled);

  const popup = (
    <Menu.Portal container={container} keepMounted>
      <Menu.Positioner className="ow:0" sideOffset={8}>
        <Menu.Popup
          className={`${popupClasses} ${animated ? "tor:var(--transform-origin) tp:a tdu:200 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:100 closing:ttf:eo @prm:tp:none" : ""}`}
        >
          {renderItems(menu.items, menu.label)}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );

  return (
    <Menu.Root open={open} onOpenChange={setOpen} disabled={disabled}>
      <Menu.Trigger className={triggerClasses(disabled)}>
        {menu.label}
      </Menu.Trigger>

      {popup}
    </Menu.Root>
  );
}
