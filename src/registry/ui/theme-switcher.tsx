"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { MonitorIcon, MoonIcon, SunIcon } from "@solar-icons/react/bold";
import { type ComponentType, useEffect, useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Theme = "light" | "dark" | "system";
type Shape = "rounded" | "square" | "squircle";
type Size = "sm" | "md";

const THEMES: {
  value: Theme;
  label: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
];

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const TRACK_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

// one step under the track's own round, so the chip nests inside it
const ITEM_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:xl cs:s",
};

const SIZES: Record<Size, string> = {
  sm: "h:7 px:2 g:1 fs:xs",
  md: "h:8 px:3 g:2 fs:sm",
};

const ICON_ONLY: Record<Size, string> = {
  sm: "w:7 h:7",
  md: "w:8 h:8",
};

// picking one of several: the selected tab's raised chip on the track
const PICKED =
  "bg:white btc:silver-2 blc:silver-2 brc:silver-2 bbc:silver-4 bs-o:xs c:slate-10";
const UNPICKED = "bg:transparent bc:transparent c:slate-8 h:c:slate-10";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export interface ThemeSwitcherProps {
  /** The picked theme, controlled. Pair it with `onValueChange`. */
  value?: Theme;
  /** The theme picked on first render, uncontrolled. */
  defaultValue?: Theme;
  /**
   * Called with the theme whenever it changes, and once with a remembered one.
   * Applying it, a class or an attribute on the page, is yours to do.
   */
  onValueChange?: (value: Theme) => void;
  /**
   * Remembers the choice in `localStorage` under this key and restores it on
   * the next visit. Leave it out and nothing is stored.
   */
  storageKey?: string;
  /** Draws the icons alone, keeping each label as its accessible name. */
  iconOnly?: boolean;
  /** Height of the track and its options. */
  size?: Size;
  /**
   * Corner radius of the track. The options nest one step inside it. `squircle`
   * uses `corner-shape`, which degrades to a rounded square where that is
   * unsupported.
   */
  shape?: Shape;
  /** Blocks every option and dims the control. */
  disabled?: boolean;
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
 * Light, dark & system as one control, with an icon for each, that reports the
 * choice and can remember it.
 */
export default function ThemeSwitcher({
  value,
  defaultValue = "system",
  onValueChange,
  storageKey,
  iconOnly = false,
  size = "md",
  shape = "rounded",
  disabled = false,
  className,
  focus = true,
}: ThemeSwitcherProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const [internal, setInternal] = useState<Theme>(defaultValue);
  const current = value ?? internal;

  const notify = useRef(onValueChange);
  notify.current = onValueChange;

  useEffect(() => {
    if (!storageKey) return;
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(storageKey);
    } catch {}
    if (!isTheme(saved)) return;
    setInternal(saved);
    notify.current?.(saved);
  }, [storageKey]);

  // pressing the picked option again would leave none picked, so it is ignored
  const pick = (next: unknown[]) => {
    const theme = next[0];
    if (!isTheme(theme)) return;
    setInternal(theme);
    if (storageKey) {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch {}
    }
    onValueChange?.(theme);
  };

  return (
    <ToggleGroup
      aria-label="Theme"
      value={[current]}
      onValueChange={pick}
      disabled={disabled}
      className={merge(
        "d:f g:1 p:1 w:fc bg:silver-1 bc:silver-2 bw:1",
        TRACK_SHAPES[shape],
        disabled ? "o:60" : "",
        className,
      )}
    >
      {THEMES.map((theme) => (
        <Toggle
          key={theme.value}
          value={theme.value}
          aria-label={iconOnly ? theme.label : undefined}
          className={(state) =>
            merge(
              outline,
              "d:f ai:c jc:c bw:1 fw:500 us:none tp:c tdu:150 ttf:io @prm:tp:none",
              disabled ? "c:na" : "c:p",
              iconOnly ? ICON_ONLY[size] : SIZES[size],
              ITEM_SHAPES[shape],
              state.pressed ? PICKED : UNPICKED,
            )
          }
        >
          <theme.icon className="w:4 h:4 fs:0" />
          {!iconOnly && theme.label}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}
