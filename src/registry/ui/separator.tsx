import { Button } from "@base-ui/react/button";
import { Separator } from "@base-ui/react/separator";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle" | "circle";

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
  circle: "br:9999",
};

type Orientation = "horizontal" | "vertical";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

export interface SeparatorProps {
  /**
   * Renders as a clickable button in the middle, sized & shaped to match. Wins
   * over `label` if both are set.
   */
  icon?: ReactNode;
  /** Called when the icon button is pressed. */
  onIconClick?: () => void;
  /** Renders as plain text in the middle. Ignored if `icon` is set. */
  label?: ReactNode;
  /**
   * Corner radius on the icon button, which is the only part with corners. Only
   * visible alongside `icon`.
   */
  iconShape?: Shape;
  /**
   * A vertical rule for a row layout, like a button group. Applies to the
   * `icon` and `label` forms too, which turn with it.
   */
  orientation?: Orientation;
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
 * A horizontal or vertical divider, plain, or with a clickable icon or a text
 * label in the middle.
 */
export default function SeparatorBase({
  icon,
  onIconClick,
  label,
  iconShape = "rounded",
  orientation = "horizontal",
  className,
  focus = true,
}: SeparatorProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const vertical = orientation === "vertical";

  // a percentage height beats align-self: stretch, so a vertical rule in a row
  // that sizes to its content measures zero
  const rule = vertical ? "w:px as:s" : "h:px w:100%";

  if (!icon && !label) {
    return (
      <Separator
        orientation={orientation}
        className={merge(rule, "bg:line", className)}
      />
    );
  }

  const buttonClasses = merge(
    outline,
    "d:if ai:c jc:c w:8 h:8 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label bw:1 tp:c tdu:150 ttf:io us:none c:p h:bg:well",
    SHAPES[iconShape],
  );

  const half = `fg:1 bg:line ${vertical ? "w:px" : "h:px"}`;

  return (
    <div
      className={merge(
        `d:f ai:c g:2 ${vertical ? "fd:c h:100% as:s" : "w:100%"}`,
        className,
      )}
    >
      <Separator orientation={orientation} className={half} />
      {icon ? (
        <Button className={buttonClasses} onClick={onIconClick}>
          {icon}
        </Button>
      ) : (
        <span className="fs:0 c:hint fs:xs fw:500 tt:u ls:3">{label}</span>
      )}
      <Separator orientation={orientation} className={half} />
    </div>
  );
}
