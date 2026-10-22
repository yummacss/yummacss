import { Children, type ReactNode } from "react";
import { merge } from "yummacss/merge";
import Avatar from "./avatar";

type Size = "sm" | "md" | "lg";
type Overlap = "none" | "sm" | "md" | "lg";

const OVERLAPS: Record<Overlap, string> = {
  none: "",
  sm: "ml:-1",
  md: "ml:-2",
  lg: "ml:-3",
};

export interface AvatarStackProps {
  /** Merged with the stack's own classes, so a utility you pass wins. */
  className?: string;
  /** The avatars. Each one overlaps the one before it. */
  children: ReactNode;
  /**
   * How far each avatar sits over the one before it. `none` spaces them
   * normally.
   */
  overlap?: Overlap;
  /**
   * Show at most this many avatars, then one more reading `+N` for the rest.
   * Unset shows every avatar you pass.
   */
  max?: number;
  /**
   * Size of the `+N` avatar only. The avatars you pass carry their own `size`.
   */
  size?: Size;
}

/**
 * Overlapping avatars in one row, with an optional cap that collapses the rest
 * into a +N avatar.
 */
export default function AvatarStack({
  className,
  children,
  overlap = "md",
  max,
  size = "sm",
}: AvatarStackProps) {
  const items = Children.toArray(children);
  const shown = max === undefined ? items : items.slice(0, max);
  const hidden = items.length - shown.length;

  return (
    <div className={merge("d:f ai:c", className)}>
      {shown.map((child, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: position is the identity here
        <span key={index} className={index > 0 ? OVERLAPS[overlap] : undefined}>
          {child}
        </span>
      ))}
      {hidden > 0 && (
        <span className={OVERLAPS[overlap]}>
          <Avatar size={size} fallback={`+${hidden}`} />
        </span>
      )}
    </div>
  );
}
