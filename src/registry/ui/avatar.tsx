import { Avatar } from "@base-ui/react/avatar";
import { UserIcon, VerifiedCheckIcon } from "@solar-icons/react/bold";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "circle" | "square" | "squircle";
type Status = "none" | "online" | "offline" | "busy";
type Tint = "lime" | "cyan" | "indigo";

const ROOT = "d:if o:h ai:c jc:c va:m us:none";

const TINTS: Record<Tint, { bg: string; fg: string }> = {
  lime: { bg: "bg:lime-2 bc:lime-3", fg: "c:lime" },
  cyan: { bg: "bg:cyan-2 bc:cyan-3", fg: "c:cyan" },
  indigo: { bg: "bg:indigo-2 bc:indigo-3", fg: "c:indigo" },
};

const SIZES: Record<Size, string> = {
  sm: "w:8 h:8",
  md: "w:12 h:12",
  lg: "w:14 h:14",
};

const INITIAL_SIZES: Record<Size, string> = {
  sm: "fs:xs",
  md: "fs:md",
  lg: "fs:lg",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "w:4 h:4",
  md: "w:6 h:6",
  lg: "w:7 h:7",
};

const BADGE_SIZES: Record<Size, string> = {
  sm: "w:3 h:3",
  md: "w:4 h:4",
  lg: "w:4 h:4",
};

const SHAPES: Record<Shape, string> = {
  circle: "br:9999",
  square: "br:0",
  squircle: "cs:s",
};

const SQUIRCLE_RADII: Record<Size, string> = {
  sm: "br:lg",
  md: "br:xl",
  lg: "br:xxl",
};

const STATUSES: Record<Exclude<Status, "none">, string> = {
  online: "bg:green-6",
  offline: "bg:hint",
  busy: "bg:red-6",
};

export interface AvatarProps {
  /** The image. Leave it out, or let it fail, and the fallback takes over. */
  src?: string;
  /**
   * Alt text for the image, and the source of the initials when there is no
   * image. Without it the fallback is a generic person icon.
   */
  name?: string;
  /** Diameter, and the size of the initials or icon inside it. */
  size?: Size;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;
  /**
   * A presence dot in the bottom right corner. It carries meaning, so it is
   * labelled for screen readers rather than left decorative.
   */
  status?: Status;
  /**
   * A badge in the top right corner. `status` takes the bottom right, so the
   * two never collide and both can be on at once.
   */
  badge?: boolean;
  /**
   * The badge's icon, in place of the verified check. Give it `w:100% h:100%`
   * to fill the badge.
   */
  badgeIcon?: ReactNode;
  /** The badge's accessible name. */
  badgeLabel?: string;
  /**
   * What shows when there is no image, in place of the initials. Leave it empty
   * for the initials, or for the person icon when there is no `name` either.
   */
  fallback?: ReactNode;
  /**
   * Recolors the fallback. It reaches the initials and the icon, never an
   * image.
   */
  tint?: Tint;
  /** Drawn inside the avatar, in place of an image or initials. */
  children?: ReactNode;
  /**
   * Extra classes. `merge` folds them in last, so one here replaces the
   * component's own class for the same utility.
   */
  className?: string;
}

/**
 * A user's picture, in three sizes and three shapes, falling back to their
 * initials and then to an icon, with an optional presence dot and badge.
 */
export default function AvatarBase({
  src,
  name,
  size = "md",
  shape = "circle",
  status = "none",
  badge = false,
  badgeIcon,
  badgeLabel = "Verified",
  fallback,
  tint,
  children,
  className,
}: AvatarProps) {
  const classes = merge(
    ROOT,
    SIZES[size],
    shape === "squircle" ? `cs:s ${SQUIRCLE_RADII[size]}` : SHAPES[shape],
    tint ? `${TINTS[tint].bg} bw:1` : "bg:well bc:raised bw:1",
    className,
  );

  const fallbackClasses = [
    "d:f ai:c jc:c w:100% h:100% fw:500",
    INITIAL_SIZES[size],
    tint ? TINTS[tint].fg : "c:hint",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className="d:if p:r w:fc va:m">
      <Avatar.Root className={classes}>
        {src && (
          <Avatar.Image
            src={src}
            alt={name ?? ""}
            className="of:c w:100% h:100%"
          />
        )}
        <Avatar.Fallback className={fallbackClasses}>
          {fallback ??
            (name ? initials(name) : <UserIcon className={ICON_SIZES[size]} />)}
        </Avatar.Fallback>
      </Avatar.Root>

      {status !== "none" && (
        <span
          role="img"
          aria-label={status}
          className={`p:a b:0 r:0 bc:raised br:9999 bw:2 ${BADGE_SIZES[size]} ${STATUSES[status]}`}
        />
      )}

      {badge && (
        <span
          role="img"
          aria-label={badgeLabel}
          className={`d:f p:a t:0 r:0 ai:c jc:c bg:raised bc:raised br:9999 bw:1 ${BADGE_SIZES[size]}`}
        >
          {badgeIcon ?? <VerifiedCheckIcon className="w:100% h:100% c:label" />}
        </span>
      )}

      {children}
    </span>
  );
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
