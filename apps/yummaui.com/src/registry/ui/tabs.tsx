"use client";

import { Tabs } from "@base-ui/react/tabs";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Orientation = "horizontal" | "vertical";
type Size = "sm" | "md" | "lg";
type Shape = "pill" | "rounded" | "square" | "squircle";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";
type IconPosition = "leading" | "trailing";

const SIZES: Record<Size, { tab: string; text: string }> = {
  sm: { tab: "py:1 px:2", text: "fs:xs" },
  md: { tab: "py:2 px:3", text: "fs:sm" },
  lg: { tab: "py:3 px:4", text: "fs:md" },
};

const LIST_SHAPES: Record<Shape, string> = {
  pill: "br:9999",
  rounded: "br:xl",
  square: "",
  squircle: "br:3xl cs:s",
};

const TAB_SHAPES: Record<Shape, string> = {
  pill: "br:9999",
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  iconOnly?: boolean;
  count?: string | number;
  disabled?: boolean;
  panel?: ReactNode;
}

export interface TabsProps {
  /**
   * Each tab's `value` and `label`, plus optional `icon`, `iconOnly`, `count`,
   * `disabled` and `panel`. `label` stays the accessible name when `iconOnly`
   * hides it.
   */
  items: TabItem[];
  /**
   * The tab selected on first render. Falls back to the first item. Pair
   * `value` with `onValueChange` instead if you are controlling it.
   */
  defaultValue?: string;
  /** Controlled selection. */
  value?: string;
  /** Called with the newly selected tab's `value`. */
  onValueChange?: (value: string) => void;
  /**
   * `vertical` stacks the tabs and sits any panels beside them rather than
   * below.
   */
  orientation?: Orientation;
  /** Tab padding and label size together. */
  size?: Size;
  /**
   * Corner radius on the track and the tabs. `pill` steps down to `rounded`
   * when `orientation` is vertical: a capsule resolves its radius against the
   * narrow axis, so the track becomes a blob and the selected tab's indicator
   * is clipped to the curve.
   */
  shape?: Shape;
  /**
   * Draws each tab's icon. `false` drops them, so every tab shows its label,
   * including one set to `iconOnly`.
   */
  icon?: boolean;
  /** Which end of a tab its `icon` sits at. Ignored when `iconOnly` is set. */
  iconPosition?: IconPosition;
  /**
   * The indicator's slide between tabs. Turn it off for an instant jump, or
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
 * A tab list with a sliding indicator, horizontal or vertical, in three sizes
 * and four shapes, with optional icons, counters and panels.
 */
export default function TabsBase({
  items,
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = "horizontal",
  size = "md",
  shape = "rounded",
  icon = true,
  iconPosition = "leading",
  animated = true,
  className,
  focus = true,
}: TabsProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [internalValue, setInternalValue] = useState(
    defaultValue ?? controlledValue ?? items[0]?.value,
  );
  const value = controlledValue ?? internalValue;

  const handleValueChange = (next: string) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const spec = SIZES[size];
  const isVertical = orientation === "vertical";
  const hasPanels = items.some((item) => item.panel !== undefined);

  const rootClasses = merge(
    isVertical ? "d:f ai:s g:4" : hasPanels ? "w:112 max-w:100%" : "w:fc",
    className,
  );

  const listShape = isVertical && shape === "pill" ? "rounded" : shape;

  const listClasses = merge(
    "d:f p:r g:1 p:1 w:fc bg:well",
    LIST_SHAPES[listShape],
    isVertical && "fd:c",
    hasPanels && !isVertical && "mb:3",
  );

  const indicatorClasses = merge(
    "p:a l:0 t:0 zi:0 bg:raised bw:1 btc:rim blc:rim brc:rim bbc:shadow bs-o:xs",
    TAB_SHAPES[shape],
    animated && "tp:a tdu:300 ttf:out-quart @prm:tp:none",
  );

  return (
    <Tabs.Root
      value={value}
      onValueChange={handleValueChange}
      orientation={orientation}
      className={rootClasses}
    >
      <Tabs.List className={listClasses}>
        {items.map((item) => {
          const isSelected = value === item.value;
          const glyph = icon ? item.icon : undefined;
          const iconOnly = Boolean(glyph) && item.iconOnly;

          const tabClasses = merge(
            outline,
            "p:r zi:10 fg:1 d:f ai:c jc:c bg:transparent us:none",
            glyph && !iconOnly ? "g:2" : "",
            item.count !== undefined ? "g:2" : "",
            spec.tab,
            TAB_SHAPES[shape],
            item.disabled
              ? "c:hint o:60 c:na"
              : isSelected
                ? "c:label"
                : "c:hint h:c:label",
          );

          const labelClasses = ["p:r zi:10 fw:500", spec.text]
            .filter(Boolean)
            .join(" ");

          return (
            <Tabs.Tab
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={tabClasses}
              aria-label={iconOnly ? item.label : undefined}
            >
              {glyph && iconPosition === "leading" && (
                <span className="d:f p:r zi:10">{glyph}</span>
              )}
              {!iconOnly && <span className={labelClasses}>{item.label}</span>}
              {glyph && iconPosition === "trailing" && (
                <span className="d:f p:r zi:10">{glyph}</span>
              )}
              {item.count !== undefined && (
                <span className="d:f p:r zi:10 ai:c jc:c h:5 px:2 br:9999 fs:xs fw:500 fvn:tn bg:fill c:on-fill">
                  {item.count}
                </span>
              )}
            </Tabs.Tab>
          );
        })}

        {}
        <Tabs.Indicator
          className={indicatorClasses}
          style={{
            translate: "var(--active-tab-left) var(--active-tab-top)",
            width: "var(--active-tab-width)",
            height: "var(--active-tab-height)",
          }}
        />
      </Tabs.List>

      {hasPanels &&
        items.map((item) => (
          <Tabs.Panel
            key={item.value}
            value={item.value}
            className="f:1 p:4 br:xl bw:1 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:hint fs:sm os:none"
          >
            {item.panel}
          </Tabs.Panel>
        ))}
    </Tabs.Root>
  );
}
