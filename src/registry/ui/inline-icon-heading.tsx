import {
  MicrophoneIcon,
  PenIcon,
  VideocameraIcon,
} from "@solar-icons/react/bold";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "square" | "rounded" | "pill" | "squircle";

const SIZES: Record<Size, string> = {
  sm: "fs:xxl",
  md: "fs:3xl",
  lg: "fs:4xl",
};

const CHIP_SHAPES: Record<Shape, string> = {
  square: "",
  rounded: "br:lg",
  pill: "br:9999",
  squircle: "br:xxl cs:s",
};

// the tile sits inside the chip, so it takes the next radius down
const TILE_SHAPES: Record<Shape, string> = {
  square: "",
  rounded: "br:md",
  pill: "br:9999",
  squircle: "br:lg cs:s",
};

// each icon arrives in turn, so the eye reads the three words in order
const DELAYS = ["td:200", "td:350", "td:500"];

export interface InlineIconHeadingProps {
  /** Text size of the whole heading; the chips scale with it. */
  size?: Size;
  /** The corners of each chip & of the icon tile inside it. */
  shape?: Shape;
  /**
   * The icons pop in one after another as the heading first renders. Turn it
   * off for a heading that is simply there, or when the user has asked for
   * reduced motion.
   */
  animated?: boolean;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

function Chip({
  icon,
  index,
  shape,
  animated,
  after,
  children,
}: {
  icon: ReactNode;
  index: number;
  shape: Shape;
  animated: boolean;
  after?: string;
  children: ReactNode;
}) {
  // the comma after a chip stays on its line
  return (
    <span className="ws:nw">
      <span
        className={`d:if ai:c g:calc(.2em) py:calc(.08em) pl:calc(.1em) pr:calc(.3em) bg:indigo-1/50 bw:1 bc:indigo-1 c:indigo-6 lh:1 ws:nw va:m ${CHIP_SHAPES[shape]}`}
      >
        <span
          aria-hidden
          className={`d:if ai:c jc:c w:calc(1em) h:calc(1em) bg:indigo-4 c:white ${TILE_SHAPES[shape]} ${
            animated
              ? `tp:a tdu:500 ttf:out-back @st:s:30 @st:o:0 @st:ro:-20 @prm:tp:none ${DELAYS[index]}`
              : ""
          }`}
        >
          {icon}
        </span>
        {children}
      </span>
      {after}
    </span>
  );
}

/**
 * A centered heading whose key words each sit in an indigo chip with the icon
 * that names them: a pen for written, a camera for filmed, a microphone for
 * recorded.
 */
export default function InlineIconHeading({
  size = "md",
  shape = "rounded",
  animated = true,
  className,
}: InlineIconHeadingProps) {
  const icon = "w:calc(.62em) h:calc(.62em)";
  return (
    <h2
      className={merge(
        "m:0 mx:auto max-w:md ta:c tw:b c:slate-10 fw:600 lh:3",
        SIZES[size],
        className,
      )}
    >
      Everything you have{" "}
      <Chip
        icon={<PenIcon className={icon} />}
        index={0}
        shape={shape}
        animated={animated}
        after=","
      >
        written
      </Chip>{" "}
      <Chip
        icon={<VideocameraIcon className={icon} />}
        index={1}
        shape={shape}
        animated={animated}
      >
        filmed
      </Chip>{" "}
      &amp;{" "}
      <Chip
        icon={<MicrophoneIcon className={icon} />}
        index={2}
        shape={shape}
        animated={animated}
        after=","
      >
        recorded
      </Chip>{" "}
      kept in one folder.
    </h2>
  );
}
