import { AltArrowRightIcon } from "@solar-icons/react/outline";
import type { ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Size = "sm" | "md" | "lg";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";
type Separator = "chevron" | "slash";

const SIZES: Record<Size, string> = {
  sm: "fs:xs",
  md: "fs:sm",
  lg: "fs:md",
};

const SEPARATOR_SIZES: Record<Size, string> = {
  sm: "w:4 h:4",
  md: "w:5 h:5",
  lg: "w:6 h:6",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  iconOnly?: boolean;
}

export interface BreadcrumbProps {
  /**
   * Each item's `label`, `href`, optional `icon` and `iconOnly`. The last item
   * is always rendered as the current page: a plain span with
   * `aria-current="page"`, never a link, regardless of whether it has an
   * `href`.
   */
  items: BreadcrumbItem[];
  /** Wraps the trail in a bordered card. */
  bordered?: boolean;
  /** Corner radius. Only visible when `bordered` is set. */
  shape?: Shape;
  /** Text size of every item. */
  size?: Size;
  /** The mark between items. */
  separator?: Separator;
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
 * A navigation trail, plain or in a bordered card, with three sizes and two
 * separator styles.
 */
export default function BreadcrumbBase({
  items,
  bordered = false,
  shape = "rounded",
  size = "md",
  separator = "chevron",
  className,
  focus = true,
}: BreadcrumbProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const navClasses = merge(
    "d:f ai:c g:2",
    bordered
      ? "px:3 py:2 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs bw:1"
      : "",
    bordered ? SHAPES[shape] : "",
    className,
  );

  const labelClasses = [SIZES[size], "fw:400"].filter(Boolean).join(" ");
  const currentClasses = [SIZES[size], "fw:500 c:label"]
    .filter(Boolean)
    .join(" ");

  return (
    <nav aria-label="Breadcrumb" className={navClasses}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        const linkClasses = merge(
          outline,
          item.icon ? "d:f ai:c g:2" : "",
          "c:hint h:c:label",
        );

        return (
          <span key={item.label} className="d:f ai:c g:2">
            {isLast ? (
              <span
                className={["d:f ai:c g:1", currentClasses].join(" ")}
                aria-current="page"
              >
                {item.label}
                {item.icon}
              </span>
            ) : (
              <a
                href={item.href ?? "#"}
                className={linkClasses}
                aria-label={item.iconOnly ? item.label : undefined}
              >
                {item.icon}
                {!item.iconOnly && (
                  <span className={labelClasses}>{item.label}</span>
                )}
              </a>
            )}
            {!isLast &&
              (separator === "chevron" ? (
                <AltArrowRightIcon
                  className={`c:hint ${SEPARATOR_SIZES[size]}`}
                  aria-hidden="true"
                />
              ) : (
                <span className={`c:hint ${SIZES[size]}`} aria-hidden="true">
                  /
                </span>
              ))}
          </span>
        );
      })}
    </nav>
  );
}
