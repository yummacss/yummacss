"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { AltArrowDownIcon } from "@solar-icons/react/outline";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

const BAR_SHAPES: Record<Shape, string> = {
  rounded: "br:xl",
  square: "",
  squircle: "br:3xl cs:s",
};

const ITEM_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const TILE_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:lg cs:s",
};

// a panel slides in from the side you moved from, and out the other way
const SLIDE =
  "opening:o:0 closing:o:0 opening:from-left:ttx:-12 opening:from-right:ttx:12 closing:from-left:ttx:12 closing:from-right:ttx:-12";

export interface NavigationLink {
  title: string;
  href: string;
  description?: string;
  icon?: ReactNode;
}

export interface NavigationItem {
  label: string;
  /** A plain link in the bar. Ignored when `links` is set. */
  href?: string;
  /** The panel's links. With them the item opens a panel. */
  links?: NavigationLink[];
  /** Lay the panel's links out in two columns. */
  columns?: 1 | 2;
}

export interface NavigationMenuProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /**
   * The bar, left to right. Each item's `label`, plus `links` for a panel (with
   * `columns`) or `href` for a plain link.
   */
  items: NavigationItem[];
  /** The navigation's accessible name. */
  label?: string;
  /** Corner radius on the bar, its items, the panel and its icon tiles. */
  shape?: Shape;
  /**
   * The panel's scale-in, its resize between items and the slide between
   * panels. Turn it off for an instant menu, or when the user has asked for
   * reduced motion.
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
 * A bar of links whose items open panels of links, the panel resizing and
 * sliding as you move between them.
 */
export default function NavigationMenuBase({
  items,
  label = "Main",
  shape = "rounded",
  animated = true,
  className,
  focus = true,
  container,
}: NavigationMenuProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const item = merge(
    outline,
    "d:f ai:c g:1 h:8 px:3 bw:1 bc:transparent fs:sm fw:500 c:label td:none us:none c:p h:bg:well",
    ITEM_SHAPES[shape],
    animated && "tp:c tdu:150 ttf:io @prm:tp:none",
  );

  return (
    <NavigationMenu.Root
      aria-label={label}
      className={merge("d:f c:label", className)}
    >
      <NavigationMenu.List
        className={merge(
          "p:r d:f ai:c g:1 m:0 p:1 bg:raised bw:1 btc:rim blc:rim brc:rim bbc:shadow bs-o:xs",
          BAR_SHAPES[shape],
        )}
      >
        {items.map((entry) => (
          <NavigationMenu.Item key={entry.label}>
            {entry.links ? (
              <>
                <NavigationMenu.Trigger
                  className={(state) => merge(item, state.open && "bg:well")}
                >
                  {entry.label}
                  <NavigationMenu.Icon
                    className={(state) =>
                      merge(
                        "d:f o:70",
                        state.open && "ro:36",
                        animated && "tp:t tdu:200 ttf:out-quart @prm:tp:none",
                      )
                    }
                  >
                    <AltArrowDownIcon className="w:3 h:3" />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className={merge(
                    "p:2 w:max max-w:100%",
                    animated &&
                      `tp:a tdu:350 ttf:out-quart ${SLIDE} @prm:tp:none`,
                  )}
                >
                  <div
                    className={
                      entry.columns === 2
                        ? "d:g gtc:2 g:1 w:120"
                        : "d:g g:1 w:72"
                    }
                  >
                    {entry.links.map((link) => (
                      <NavigationMenu.Link
                        key={link.href}
                        href={link.href}
                        className={merge(
                          outline,
                          "d:f ai:s g:3 p:3 bw:1 bc:transparent c:label td:none h:bg:well",
                          ITEM_SHAPES[shape],
                          animated && "tp:c tdu:150 ttf:io @prm:tp:none",
                        )}
                      >
                        {link.icon && (
                          <span
                            aria-hidden
                            className={merge(
                              "d:f ai:c jc:c fs:0 w:9 h:9 bg:well",
                              TILE_SHAPES[shape],
                            )}
                          >
                            {link.icon}
                          </span>
                        )}
                        <span className="d:f fd:c g:1">
                          <span className="fs:sm fw:600">{link.title}</span>
                          {link.description && (
                            <span className="c:hint fs:xs lh:4">
                              {link.description}
                            </span>
                          )}
                        </span>
                      </NavigationMenu.Link>
                    ))}
                  </div>
                </NavigationMenu.Content>
              </>
            ) : (
              <NavigationMenu.Link href={entry.href} className={item}>
                {entry.label}
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Portal container={container}>
        <NavigationMenu.Positioner
          sideOffset={8}
          align="start"
          collisionPadding={16}
          className={merge(
            "zi:50 w:var(--positioner-width) h:var(--positioner-height) max-w:var(--available-width)",
            animated && "tp:a tdu:350 ttf:out-quart @prm:tp:none",
          )}
        >
          <NavigationMenu.Popup
            className={merge(
              "p:r w:var(--popup-width) h:var(--popup-height) tor:var(--transform-origin) bg:raised c:label bw:1 bc:line bs-o:xl",
              BAR_SHAPES[shape],
              animated &&
                "tp:a tdu:350 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:150 closing:ttf:in-out-cubic @prm:tp:none",
            )}
          >
            <NavigationMenu.Viewport className="p:r w:100% h:100% o:h" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}
