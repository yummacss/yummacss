"use client";

import { Accordion } from "@base-ui/react/accordion";
import { LockIcon } from "@solar-icons/react/bold";
import {
  AddIcon,
  AltArrowDownIcon,
  MinusIcon,
} from "@solar-icons/react/outline";
import type { ReactNode } from "react";
import { useState } from "react";
import { merge } from "yummacss/merge";

type Variant = "default" | "bordered" | "ghost" | "subtle";
type Shape = "rounded" | "square" | "squircle";

const TURN = "tp:t tdu:300 ttf:out-quart @prm:tp:none";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";
type Indicator = "chevron" | "plus-minus";
type IndicatorPosition = "leading" | "trailing";

export interface AccordionItem {
  value: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

const SHAPES: Record<Shape, { item: string; trigger: string }> = {
  rounded: { item: "br:lg", trigger: "br:sm" },
  square: { item: "", trigger: "" },
  squircle: { item: "br:xxl cs:s", trigger: "br:xxl cs:s" },
};

export interface AccordionProps {
  /**
   * Each item's `value`, `title`, `content` and optional `disabled`. `value` is
   * what `defaultValue`/`value` reference to control which items are open.
   */
  items: AccordionItem[];
  /**
   * `default` is a plain list divided by `separator`. `bordered` boxes each
   * item. `ghost` marks the open item with a left border. `subtle` fills the
   * open item's background.
   */
  variant?: Variant;
  /**
   * Corner radius on `bordered` items. The other variants use a fixed radius,
   * since no shape was ever paired with them.
   */
  shape?: Shape;
  /**
   * Draws a rule between each pair of items. Only visible on the `default`
   * variant.
   */
  separated?: boolean;
  /**
   * Which built-in open/closed mark the trigger draws. `chevron` rotates one
   * glyph 180 degrees. `plus-minus` swaps between two glyphs with a small
   * rotation flourish.
   */
  indicator?: Indicator;
  /** Which end of the trigger the indicator sits at. */
  indicatorPosition?: IndicatorPosition;
  /**
   * Allow more than one item open at once. Off keeps opening one item closed
   * the rest.
   */
  multiple?: boolean;
  /**
   * Which items start open, by `value`. Pair `value` with `onValueChange`
   * instead if you are controlling it.
   */
  defaultValue?: string[];
  /** Controlled open items, by `value`. */
  value?: string[];
  /** Called with the new open items. Required for a controlled accordion. */
  onValueChange?: (value: string[]) => void;
  /**
   * The icon's rotation & the panel's height/opacity animation. Turn it off for
   * an instant expand/collapse, or when the user has asked for reduced motion.
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
 * A vertically stacked set of collapsible panels, in four variants, with single
 * or multiple selection.
 */
export default function AccordionBase({
  items,
  variant = "default",
  shape = "rounded",
  separated = true,
  indicator = "chevron",
  indicatorPosition = "trailing",
  multiple = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  animated = true,
  className,
  focus = true,
}: AccordionProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [internalValue, setInternalValue] = useState<string[]>(
    defaultValue ?? controlledValue ?? [],
  );
  const value = controlledValue ?? internalValue;

  const handleValueChange = (next: string[]) => {
    setInternalValue(next);
    onValueChange?.(next);
  };

  const isCard = variant === "default";

  const rootClasses = merge(
    "d:f fd:c w:100% max-w:96",
    variant === "bordered" || variant === "subtle" ? "g:2" : "",
    isCard
      ? "bg:raised bw:1 btc:rim blc:rim brc:rim bbc:shadow bs-o:xs br:lg"
      : "",
    className,
  );

  return (
    <Accordion.Root
      className={rootClasses}
      value={value}
      onValueChange={handleValueChange}
      multiple={multiple}
    >
      {items.map((item, index) => {
        const isOpen = value.includes(item.value);
        const isLast = index === items.length - 1;

        const itemClasses =
          variant === "bordered"
            ? `bg:raised bw:1 btc:rim blc:rim brc:rim bbc:shadow bs-o:xs ${SHAPES[shape].item}`
            : variant === "ghost"
              ? [
                  "blw:2 pl:4",
                  isOpen ? "blc:label" : "blc:line",
                  isLast ? "" : "mb:3",
                ]
                  .filter(Boolean)
                  .join(" ")
              : variant === "subtle"
                ? [SHAPES[shape].item, isOpen ? "bg:well" : "bg:well h:bg:rim"]
                    .filter(Boolean)
                    .join(" ")
                : separated && !isLast
                  ? "bbw:1 bc:line"
                  : "";

        const triggerRadius =
          variant === "bordered" ? SHAPES[shape].trigger : "br:sm";
        const inset = variant === "bordered" || variant === "subtle" || isCard;
        const triggerPadX = inset ? "px:4" : "px:0";
        const triggerPadY =
          variant === "ghost"
            ? "py:2"
            : variant === "default" && !separated
              ? "py:3"
              : "py:4";
        const panelPadX = inset ? "px:4" : "";

        const titleColor = item.disabled
          ? "c:hint o:60"
          : variant === "ghost"
            ? isOpen
              ? "c:label"
              : "c:hint"
            : variant === "subtle"
              ? isOpen
                ? "c:label"
                : "c:hint"
              : "c:label";
        const contentColor =
          variant === "subtle" && isOpen ? "c:label" : "c:hint";
        const panelClasses = ["m:0 pb:4", panelPadX, "fs:sm lh:4", contentColor]
          .filter(Boolean)
          .join(" ");
        const glyphColor = item.disabled
          ? "c:hint o:60"
          : variant === "ghost"
            ? isOpen
              ? "c:label"
              : "c:hint"
            : variant === "subtle" && isOpen
              ? "c:label"
              : "c:hint";

        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={itemClasses}
          >
            <Accordion.Header className="m:0">
              <Accordion.Trigger
                className={merge(
                  outline,
                  "d:f ai:c",
                  indicatorPosition === "trailing" ? "jc:sb" : "",
                  "g:3 w:100%",
                  triggerPadY,
                  triggerPadX,
                  "bg:transparent bw:0",
                  triggerRadius,
                  "ta:l",
                  item.disabled ? "c:na o:60" : "c:p",
                )}
              >
                {indicator === "plus-minus" &&
                  indicatorPosition === "leading" && (
                    <PlusMinusGlyph
                      isOpen={isOpen}
                      animated={animated}
                      className={glyphColor}
                    />
                  )}
                <div className="d:f ai:c g:3">
                  <span
                    className={["fs:sm fw:600", titleColor]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {item.title}
                  </span>
                  {item.disabled && (
                    <LockIcon className="w:3 h:3 c:hint" aria-hidden />
                  )}
                </div>
                {indicator === "chevron" ? (
                  <ChevronGlyph
                    isOpen={isOpen}
                    animated={animated}
                    className={glyphColor}
                  />
                ) : (
                  indicatorPosition === "trailing" && (
                    <PlusMinusGlyph
                      isOpen={isOpen}
                      animated={animated}
                      className={glyphColor}
                    />
                  )
                )}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel
              keepMounted
              className={
                animated
                  ? "h:var(--accordion-panel-height) o:h tp:a tdu:300 ttf:out-quart opening:h:0 opening:o:0 closing:h:0 closing:o:0 closing:tdu:200 closing:ttf:in-out-cubic @prm:tp:none"
                  : undefined
              }
            >
              <p className={panelClasses}>{item.content}</p>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

function ChevronGlyph({
  isOpen,
  animated,
  className,
}: {
  isOpen: boolean;
  animated: boolean;
  className: string;
}) {
  if (!animated) {
    return (
      <AltArrowDownIcon
        className={merge("fs:0 w:4 h:4", isOpen ? "ro:36" : "ro:0", className)}
        aria-hidden
      />
    );
  }

  return (
    <span className={`d:f ${TURN} ${isOpen ? "ro:36" : "ro:0"}`}>
      <AltArrowDownIcon
        className={merge("fs:0 w:4 h:4", className)}
        aria-hidden
      />
    </span>
  );
}

function PlusMinusGlyph({
  isOpen,
  animated,
  className,
}: {
  isOpen: boolean;
  animated: boolean;
  className: string;
}) {
  const glyphClasses = merge("fs:0 w:4 h:4", className);
  const icon = isOpen ? (
    <MinusIcon className={glyphClasses} aria-hidden />
  ) : (
    <AddIcon className={glyphClasses} aria-hidden />
  );

  if (!animated) {
    return icon;
  }

  return (
    <span className={`d:f ${TURN} ${isOpen ? "ro:18" : "ro:0"}`}>{icon}</span>
  );
}
