import { Meter } from "@base-ui/react/meter";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

const INTENTS = {
  neutral: "bg:fill",
  info: "bg:blue",
  success: "bg:green",
  warning: "bg:yellow",
  danger: "bg:red",
} satisfies Record<string, string>;

type Intent = keyof typeof INTENTS;

// one step lighter per segment, so the first reads as the biggest share
const SEGMENTS = {
  neutral: ["bg:fill", "bg:hint", "bg:line"],
  info: ["bg:blue", "bg:blue-5", "bg:blue-3"],
  success: ["bg:green", "bg:green-5", "bg:green-3"],
  warning: ["bg:yellow", "bg:yellow-5", "bg:yellow-3"],
  danger: ["bg:red", "bg:red-5", "bg:red-3"],
} satisfies Record<Intent, string[]>;

export interface MeterSegment {
  /** Its name in the legend. */
  label: string;
  /** Its share, in the same units as `max`. */
  value: number;
}

export interface MeterProps {
  /** The current value. With `segments`, their sum takes its place. */
  value?: number;
  /** Defaults to Base UI's own Meter minimum (0). */
  min?: number;
  /** Defaults to Base UI's own Meter maximum (100). */
  max?: number;
  /**
   * Text above the track, correctly wired to it via Base UI's own Meter.Label.
   */
  label: ReactNode;
  /**
   * A line under the label. Only shown alongside `icon` - without one there is
   * no header block for it to sit in.
   */
  description?: string;
  /**
   * A leading avatar. Setting this switches the header to a grouped
   * icon+label+description block & moves the value display below the track
   * instead of beside the label. It sits in a fixed 32px tile that colors the
   * glyph but does not resize it, so pass one sized to fit (`w:4 h:4`).
   */
  icon?: ReactNode;
  /**
   * What the reading means, not which hue it is. The five map to Yumma families
   * in the shipped `INTENTS` table; point one somewhere else and the type
   * follows.
   */
  intent?: Intent;
  /**
   * Splits the bar into shares, each a lighter step of the intent, with a
   * legend under the track. Up to three; a fourth repeats the last color.
   */
  segments?: MeterSegment[];
  /**
   * Reads the value as an amount, `12.7 of 20 GB`, in place of a percentage.
   */
  unit?: string;
  /** Names the empty part of the track in the legend, `Free` for storage. */
  rest?: string;
  /** The indicator's width transition as `value` changes. */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

/**
 * A labelled meter in five intents, split into shares or read as an amount,
 * with an optional icon and description.
 */
export default function MeterBase({
  value,
  min,
  max,
  label,
  description,
  icon,
  intent = "info",
  segments,
  unit,
  rest,
  animated = true,
  className,
}: MeterProps) {
  const hasHeader = Boolean(icon);
  const low = min ?? 0;
  const high = max ?? 100;
  const total =
    segments?.reduce((sum, segment) => sum + segment.value, 0) ?? value ?? 0;
  const amount = (count: number) => String(Math.round(count * 10) / 10);
  const reading = unit
    ? (_: string, current: number) => (
        <>
          <span className="c:label fw:600">{amount(current)}</span> of{" "}
          {amount(high)} {unit}
        </>
      )
    : undefined;
  const shade = (index: number) =>
    SEGMENTS[intent][Math.min(index, SEGMENTS[intent].length - 1)];

  const rootClasses = merge(
    "d:f fd:c w:64",
    hasHeader ? "g:3" : "g:2",
    className,
  );

  const indicatorClasses = merge(
    "d:b h:100%",
    INTENTS[intent],
    animated ? "tp:w tdu:500 ttf:io" : "",
  );

  const motion = animated ? "tp:w tdu:500 ttf:io @prm:tp:none" : "";

  return (
    <Meter.Root
      className={rootClasses}
      value={total}
      min={min}
      max={max}
      getAriaValueText={
        unit
          ? (_, current) => `${amount(current)} of ${amount(high)} ${unit}`
          : undefined
      }
    >
      {hasHeader ? (
        <div className="d:f ai:c g:3">
          <span className="d:f ai:c jc:c fs:0 w:8 h:8 bg:well c:label">
            {icon}
          </span>
          <div className="d:f fd:c">
            <Meter.Label className="c:label fs:sm fw:600">{label}</Meter.Label>
            {description && <span className="c:hint fs:xs">{description}</span>}
          </div>
        </div>
      ) : (
        <div className="d:f jc:sb ai:c">
          <Meter.Label className="c:label fs:sm fw:600">{label}</Meter.Label>
          <Meter.Value className="c:hint fs:sm">{reading}</Meter.Value>
        </div>
      )}

      <Meter.Track className="d:f o:h h:2 bg:rim">
        {segments ? (
          segments.map((segment, index) => (
            <span
              key={segment.label}
              className={`d:b h:100% ${shade(index)} ${motion}`}
              style={{
                width: `${(Math.max(segment.value, 0) / (high - low)) * 100}%`,
              }}
            />
          ))
        ) : (
          <Meter.Indicator className={indicatorClasses} />
        )}
      </Meter.Track>

      {segments && (
        <div className="d:f fw:w g:4 c:hint fs:xs">
          {segments.map((segment, index) => (
            <span key={segment.label} className="d:f ai:c g:1">
              <span aria-hidden className={`w:2 h:2 br:9999 ${shade(index)}`} />
              {segment.label}
            </span>
          ))}
          {rest && (
            <span className="d:f ai:c g:1">
              <span aria-hidden className="w:2 h:2 br:9999 bg:rim" />
              {rest}
            </span>
          )}
        </div>
      )}

      {hasHeader && (
        <Meter.Value className="d:f jc:fe c:hint fs:xs">{reading}</Meter.Value>
      )}
    </Meter.Root>
  );
}
