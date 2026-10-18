"use client";

import { Button } from "@base-ui/react/button";
import { Drawer } from "@base-ui/react/drawer";
import { CloseIcon } from "@solar-icons/react/outline";
import type { CSSProperties, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Side = "bottom" | "top" | "left" | "right";
type Shape = "rounded" | "square" | "squircle";
type IconPosition = "leading" | "trailing";
type Size = "sm" | "md" | "lg";

const SWIPE: Record<Side, "down" | "up" | "left" | "right"> = {
  bottom: "down",
  top: "up",
  left: "left",
  right: "right",
};

const VIEWPORTS: Record<Side, string> = {
  bottom: "d:f p:f i:0 fd:c ai:c jc:fe",
  top: "d:f p:f i:0 fd:c ai:c jc:fs",
  left: "d:f p:f i:0 jc:fs",
  right: "d:f p:f i:0 jc:fe",
};

const PLACEMENTS: Record<Side, string> = {
  bottom: "w:100% max-w:sm",
  top: "w:100% max-w:sm",
  left: "h:100% w:80",
  right: "h:100% w:80",
};

// `translate` needs both axes, which no class can spell with a percentage, so the
// popup carries them in two variables; the notes, "Drawer", has the measurements
const TRAVEL: Record<Side, { swipe: string; offstage: string }> = {
  bottom: {
    swipe: "0 var(--drawer-swipe-movement-y)",
    offstage: "0 calc(100% + 2px)",
  },
  top: {
    swipe: "0 var(--drawer-swipe-movement-y)",
    offstage: "0 calc(-100% - 2px)",
  },
  left: {
    swipe: "var(--drawer-swipe-movement-x) 0",
    offstage: "calc(-100% - 2px) 0",
  },
  right: {
    swipe: "var(--drawer-swipe-movement-x) 0",
    offstage: "calc(100% + 2px) 0",
  },
};

// only the edge that faces the page is rounded
const EDGE_SHAPES: Record<Side, Record<Shape, string>> = {
  bottom: { rounded: "btr:xxl", square: "", squircle: "btr:3xl cs:s" },
  top: { rounded: "bbr:xxl", square: "", squircle: "bbr:3xl cs:s" },
  left: { rounded: "brr:xxl", square: "", squircle: "brr:3xl cs:s" },
  right: { rounded: "blr:xxl", square: "", squircle: "blr:3xl cs:s" },
};

const BUTTON_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const CLOSE_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:lg cs:s",
};

const HANDLE_SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:9999 cs:s",
};

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const BUTTON =
  "d:if ai:c jc:c g:2 bw:1 fw:500 tp:c tdu:150 ttf:io us:none bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label h:bg:well";

const SIZES: Record<Size, string> = {
  sm: "px:3 py:1 fs:xs",
  md: "px:4 py:2 fs:sm",
  lg: "px:6 py:3 fs:md",
};

export interface DrawerProps {
  /**
   * Where the drawer is rendered. Defaults to `document.body`; pass an element
   * to portal somewhere else, such as inside a frame.
   */
  container?: HTMLElement | null;
  /** The trigger button's label. */
  trigger: ReactNode;
  /** A glyph beside the trigger's label. */
  triggerIcon?: ReactNode;
  /** Which end of the trigger `triggerIcon` sits at. */
  triggerIconPosition?: IconPosition;
  /** The drawer's heading, wired up by Base UI's own Drawer.Title. */
  title: string;
  /** The body text, wired up by Base UI's own Drawer.Description. */
  description?: ReactNode;
  /** The body, below the description. Style it yourself. */
  children?: ReactNode;
  /**
   * A full-width button at the end that closes the drawer. None renders without
   * it.
   */
  closeLabel?: string;
  /** The edge it slides in from, and the direction a swipe closes it. */
  side?: Side;
  /** A grab bar on the edge facing the page, for a `bottom` or `top` drawer. */
  handle?: boolean;
  /**
   * An X in the corner. A swipe, a click outside and Esc close it either way.
   */
  showClose?: boolean;
  /**
   * Padding and text size of the trigger and the close button, on the same
   * scale as Button.
   */
  size?: Size;
  /** Corner radius on the edge that faces the page, and on the buttons. */
  shape?: Shape;
  /**
   * The slide in and out and the backdrop's fade. A swipe follows the finger
   * either way.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
  /**
   * The focus outline. `true` draws it, `false` removes it, and a string of
   * Yumma CSS utilities restyles it on every focusable part of the component,
   * which is more than `className` reaches. Removing it outright and putting
   * nothing back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
}

/**
 * A panel that slides in from any edge and closes by swipe, with a title,
 * description and body.
 */
export default function DrawerBase({
  trigger,
  triggerIcon,
  triggerIconPosition = "leading",
  title,
  description,
  children,
  closeLabel,
  side = "bottom",
  handle = true,
  showClose = false,
  size = "md",
  shape = "rounded",
  animated = true,
  className,
  focus = true,
  container,
}: DrawerProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const vertical = side === "bottom" || side === "top";

  const buttonClasses = merge(
    outline,
    BUTTON,
    SIZES[size],
    BUTTON_SHAPES[shape],
  );

  const popupClasses = [
    "p:r d:f fd:c bg:raised bc:line c:label bw:1 os:none bs-o:xl",
    PLACEMENTS[side],
    EDGE_SHAPES[side][shape],
    "tr:var(--drawer-travel)",
    animated
      ? "opening:tr:var(--drawer-offstage) closing:tr:var(--drawer-offstage) tp:t tdu:300 ttf:out-quart closing:tdu:200 closing:ttf:eo swiping:tp:none @prm:tp:none"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const grip = vertical && handle && (
    <div
      aria-hidden
      className={`fs:0 w:12 h:1 mx:auto bg:rim ${HANDLE_SHAPES[shape]}`}
    />
  );

  return (
    <Drawer.Root swipeDirection={SWIPE[side]}>
      <Drawer.Trigger
        render={<Button className={merge(buttonClasses, className)} />}
      >
        {triggerIcon && triggerIconPosition === "leading" && triggerIcon}
        {trigger}
        {triggerIcon && triggerIconPosition === "trailing" && triggerIcon}
      </Drawer.Trigger>

      <Drawer.Portal container={container}>
        <Drawer.Backdrop
          className={`p:f i:0 min-h:dvh bg:shadow/30 bf-b:xs ${
            animated
              ? "tp:o tdu:300 ttf:out-quart opening:o:0 closing:o:0 closing:tdu:200 closing:ttf:eo swiping:tp:none @prm:tp:none"
              : ""
          }`}
        />
        <Drawer.Viewport className={VIEWPORTS[side]}>
          <Drawer.Popup
            className={popupClasses}
            style={
              {
                "--drawer-travel": TRAVEL[side].swipe,
                "--drawer-offstage": TRAVEL[side].offstage,
              } as CSSProperties
            }
          >
            {side === "bottom" && <div className="pt:3">{grip}</div>}

            {showClose && (
              <Drawer.Close
                render={
                  <Button
                    className={merge(
                      outline,
                      "d:f p:a r:4 t:4 ai:c jc:c w:7 h:7 p:0 bw:1 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label h:bg:well",
                      CLOSE_SHAPES[shape],
                    )}
                  />
                }
                aria-label="Close"
              >
                <CloseIcon aria-hidden className="w:4 h:4" />
              </Drawer.Close>
            )}

            <Drawer.Content className="d:f fd:c g:3 p:6 f:1">
              <Drawer.Title className="m:0 c:label fs:md fw:500">
                {title}
              </Drawer.Title>

              {description && (
                <Drawer.Description className="m:0 c:hint fs:sm lh:4">
                  {description}
                </Drawer.Description>
              )}

              {children}

              {closeLabel && (
                <Drawer.Close
                  render={
                    <Button className={merge(buttonClasses, "w:100% mt:2")} />
                  }
                >
                  {closeLabel}
                </Drawer.Close>
              )}
            </Drawer.Content>

            {side === "top" && <div className="pb:3">{grip}</div>}
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
