"use client";

import { Meter } from "@base-ui/react/meter";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";

// one hue per category, in order; a sixth repeats the last
const TONES = [
  { bar: "bg:blue", ink: "c:blue" },
  { bar: "bg:mint", ink: "c:mint" },
  { bar: "bg:red", ink: "c:red" },
  { bar: "bg:yellow", ink: "c:yellow" },
  { bar: "bg:indigo", ink: "c:indigo" },
];

const CARD_SHAPES: Record<Shape, string> = {
  rounded: "br:xl",
  square: "",
  squircle: "br:3xl cs:s",
};

const TILE_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:lg cs:s",
};

const TRACK_SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

export interface StorageCategory {
  /** Its name in the legend. */
  label: string;
  /** How much it takes, in `unit`. */
  value: number;
  /** A glyph beside its name, tinted with its share's color. */
  icon?: ReactNode;
}

export interface StorageBarProps {
  /**
   * What fills the space, biggest first reads best. Each one's `label` and
   * `value`, plus an optional `icon`. Up to five colors.
   */
  categories: StorageCategory[];
  /** The whole space, in `unit`. */
  max: number;
  /** The unit every amount is read in. */
  unit?: string;
  /** The heading over the total, and the meter's accessible name. */
  label?: string;
  /** Names the empty part of the track in the legend. */
  rest?: string;
  /** Corner radius on the card, the track and the icon tiles. */
  shape?: Shape;
  /**
   * The numbers counting up and the shares growing in when it first shows. Turn
   * it off for a bar that is simply there; reduced motion does the same.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

function useArrival(animated: boolean): number {
  const [progress, setProgress] = useState(animated ? 0 : 1);

  useEffect(() => {
    const still =
      !animated ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const began = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - began) / 1100, 1);
      setProgress(1 - (1 - t) ** 4);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animated]);

  return progress;
}

/**
 * How full a disk is, split by what fills it, with the total counting up and
 * each share growing into the track.
 */
export default function StorageBar({
  categories,
  max,
  unit = "GB",
  label = "Storage",
  rest = "Free",
  shape = "rounded",
  animated = true,
  className,
}: StorageBarProps) {
  const progress = useArrival(animated);
  const used = categories.reduce((sum, entry) => sum + entry.value, 0);
  const amount = (count: number) => (Math.round(count * 10) / 10).toFixed(1);
  const tone = (index: number) => TONES[Math.min(index, TONES.length - 1)];

  return (
    <Meter.Root
      value={used}
      max={max}
      getAriaValueText={() => `${amount(used)} of ${amount(max)} ${unit} used`}
      className={merge(
        "d:f fd:c g:4 w:80 max-w:100% p:5 bg:raised c:label bw:1 btc:rim blc:rim brc:rim bbc:shadow bs-o:xs",
        CARD_SHAPES[shape],
        className,
      )}
    >
      <div className="d:f fd:c g:1">
        <Meter.Label className="c:hint fs:xs fw:600 ls:2 tt:u">
          {label}
        </Meter.Label>
        <div className="d:f ai:b g:2">
          <span className="fs:3xl fw:700 lh:1">{amount(used * progress)}</span>
          <span className="c:hint fs:sm">
            of {amount(max)} {unit} used
          </span>
        </div>
      </div>

      <Meter.Track
        className={merge(
          "d:f g:px h:3 o:h bg:field btc:shadow blc:line brc:line bbc:rim bw:1",
          TRACK_SHAPES[shape],
        )}
      >
        {categories.map((entry, index) => (
          <span
            key={entry.label}
            className={`d:b h:100% ${tone(index).bar}`}
            style={{ width: `${(entry.value / max) * 100 * progress}%` }}
          />
        ))}
      </Meter.Track>

      <div className="d:f fd:c g:2">
        {categories.map((entry, index) => (
          <div key={entry.label} className="d:f ai:c g:3 fs:sm">
            <span
              aria-hidden
              className={merge(
                "d:f ai:c jc:c fs:0 w:7 h:7 bg:well",
                TILE_SHAPES[shape],
                tone(index).ink,
              )}
            >
              {entry.icon ?? (
                <span className={`w:2 h:2 br:9999 ${tone(index).bar}`} />
              )}
            </span>
            <span className="f:1">{entry.label}</span>
            <span className="c:hint">
              {amount(entry.value * progress)} {unit}
            </span>
          </div>
        ))}
        <div className="d:f ai:c g:3 fs:sm">
          <span
            aria-hidden
            className={merge(
              "d:f ai:c jc:c fs:0 w:7 h:7 bg:well",
              TILE_SHAPES[shape],
            )}
          >
            <span className="w:2 h:2 br:9999 bw:1 bc:hint" />
          </span>
          <span className="f:1 c:hint">{rest}</span>
          <span className="c:hint">
            {amount(Math.max(max - used, 0))} {unit}
          </span>
        </div>
      </div>
    </Meter.Root>
  );
}
