"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import { Avatar } from "@base-ui/react/avatar";
import { type ReactNode, useEffect, useId, useState } from "react";
import { merge } from "yummacss/merge";

type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "squircle";
type IconSide = "leading" | "trailing";

export interface AutocompleteItem {
  label: string;
  description?: string;
  avatar?: string;
  icon?: ReactNode;
}

export interface AutocompleteGroup {
  group: string;
  items: AutocompleteItem[];
}

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

const INPUT =
  "bg:field btc:shadow blc:line brc:line bbc:rim c:label bw:1 fs:sm";

const SIZES: Record<Size, string> = {
  sm: "h:8 w:56",
  md: "h:9 w:64",
  lg: "h:11 w:72",
};

const ITEM_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:lg cs:s",
};

const POPUP_SIZES: Record<Size, string> = {
  sm: "w:56",
  md: "w:64",
  lg: "w:72",
};

const SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "br:0",
  squircle: "br:xxl cs:s",
};

const ICON_PADDING: Record<IconSide, string> = {
  leading: "pl:10 pr:4",
  trailing: "pl:4 pr:10",
};

export interface AutocompleteProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /**
   * What to search. `label` is matched and shown; `description` and `avatar`
   * are optional. The shape is fixed rather than generic because you own the
   * file: data that does not fit is an edit to the item body, not an API.
   */
  items: AutocompleteItem[] | AutocompleteGroup[];
  /**
   * Field label above the input. Leave it out and the input is described by its
   * placeholder alone.
   */
  label?: ReactNode;
  /**
   * A line under the input, for what the field expects rather than a
   * restatement of the label.
   */
  description?: string;
  /** Placeholder text. */
  placeholder?: string;
  /**
   * Height and width of the input. The popup matches it, or it reads as a
   * different control.
   */
  size?: Size;
  /**
   * Corner radius, applied to the input and the popup together. `squircle` uses
   * `corner-shape`.
   */
  shape?: Shape;
  /**
   * Any icon. It is positioned over the input and the text is padded around it,
   * so pass the glyph and nothing else.
   */
  icon?: ReactNode;
  /** Which end `icon` sits at. */
  iconPosition?: IconSide;
  /** Blocks interaction and dims the field. */
  disabled?: boolean;
  /**
   * Replaces the results with a loading row, for an async source. The fetching
   * itself is yours; this is only the state.
   */
  loading?: boolean;
  /**
   * Highlights the first match as you type, so Enter takes it without an arrow
   * key first.
   */
  autoHighlight?: boolean;
  /** Cap on how many matches are listed. `0` lists them all. */
  limit?: number;
  /**
   * Fades the popup in and out. Turn it off for a static popup, or when the
   * user has asked for reduced motion.
   */
  animated?: boolean;
  /** Shown when nothing matches. */
  emptyMessage?: string;
  /** Called with the text as it is typed. */
  onQueryChange?: (value: string) => void;
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

function isGroupEntry(
  entry: AutocompleteItem | AutocompleteGroup,
): entry is AutocompleteGroup {
  return "items" in entry;
}

// the part of the label the query matched, in bold
function marked(label: string, query: string): ReactNode {
  const at = query ? label.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (at < 0) return label;
  return (
    <>
      {label.slice(0, at)}
      <span className="fw:700">{label.slice(at, at + query.length)}</span>
      {label.slice(at + query.length)}
    </>
  );
}

function renderItem(item: AutocompleteItem, shape: Shape, query: string) {
  return (
    <Autocomplete.Item
      key={item.label}
      value={item.label}
      render={(props, state) => (
        <div
          {...props}
          className={`d:f ai:c g:3 py:2 px:3 mx:1 bw:1 bc:transparent c:label ${ITEM_SHAPES[shape]} fs:sm us:none c:p ${
            state.highlighted
              ? "bg:check c:white btc:white/25 blc:black/15 brc:black/15 bbc:black/30"
              : "bg:transparent"
          }`}
        >
          {item.icon ? (
            <span
              className={`d:f fs:0 ai:c jc:c w:6 h:6 ${state.highlighted ? "" : "c:hint"}`}
            >
              {item.icon}
            </span>
          ) : (
            item.avatar && (
              <Avatar.Root className="fs:0 w:6 h:6 bc:raised br:9999 bw:1">
                <Avatar.Image
                  src={item.avatar}
                  alt=""
                  className="of:c w:100% h:100% br:9999"
                />
                <Avatar.Fallback className="d:f ai:c jc:c w:100% h:100% bg:well c:hint fs:xs">
                  {item.label[0]}
                </Avatar.Fallback>
              </Avatar.Root>
            )
          )}
          <span className="f:1 min-w:0 o:h to:e ws:nw">
            {marked(item.label, query)}
          </span>
          {item.description && (
            <span className="fs:xs o:80 ws:nw">{item.description}</span>
          )}
        </div>
      )}
    />
  );
}

/**
 * A text input that filters a list as you type, in three sizes and three
 * shapes, with an optional icon and a loading state.
 */
export default function AutocompleteBase({
  items,
  label,
  description,
  placeholder = "Search",
  size = "md",
  shape = "rounded",
  icon,
  iconPosition = "leading",
  disabled = false,
  loading = false,
  autoHighlight = false,
  limit = 0,
  animated = true,
  emptyMessage = "No results found.",
  onQueryChange,
  className,
  focus = true,
  container,
}: AutocompleteProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);
  const id = useId();

  const inputClasses = merge(
    outline,
    INPUT,
    SIZES[size],
    SHAPES[shape],
    icon ? ICON_PADDING[iconPosition] : "pl:4",
    className,
  );

  const popup = (
    <Autocomplete.Popup
      className={`o:h bg:raised bc:line bs-o:xl c:label bw:1 ${POPUP_SIZES[size]} ${SHAPES[shape]} ${animated ? "tor:var(--transform-origin) tp:a tdu:200 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:100 closing:ttf:eo @prm:tp:none" : ""}`}
    >
      {loading ? (
        <div
          className="d:f py:3 px:4 ai:c g:2 c:hint fs:sm us:none"
          role="status"
        >
          <span
            aria-hidden
            className={`d:b w:4 h:4 bc:rim btc:hint bw:2 br:9999 ${
              animated ? "an:spin adu:700 atf:l aic:inf" : ""
            }`}
          />
          Loading
        </div>
      ) : (
        <>
          <Autocomplete.List className="oy:auto max-h:72 py:1 ow:0">
            {(entry: AutocompleteItem | AutocompleteGroup) =>
              isGroupEntry(entry) ? (
                <Autocomplete.Group key={entry.group}>
                  <Autocomplete.GroupLabel className="px:3 pt:2 pb:1 fs:xs fw:500 c:hint us:none">
                    {entry.group}
                  </Autocomplete.GroupLabel>
                  {entry.items.map((entry) => renderItem(entry, shape, query))}
                </Autocomplete.Group>
              ) : (
                renderItem(entry, shape, query)
              )
            }
          </Autocomplete.List>
          <Autocomplete.Empty className="c:hint fs:sm">
            <div className="pt:2 pb:3 px:4 us:none">{emptyMessage}</div>
          </Autocomplete.Empty>
        </>
      )}
    </Autocomplete.Popup>
  );

  return (
    <Autocomplete.Root
      items={items as AutocompleteItem[]}
      open={open}
      onOpenChange={setOpen}
      onValueChange={(next: string) => {
        setQuery(next);
        onQueryChange?.(next);
      }}
      disabled={disabled}
      autoHighlight={autoHighlight}
      limit={limit > 0 ? limit : undefined}
    >
      <div className={`d:f fd:c g:2 ${disabled ? "o:60 c:na" : ""}`}>
        {label && (
          <label htmlFor={id} className="c:label fs:sm fw:600 us:none">
            {label}
          </label>
        )}
        <div className="d:f p:r ai:c">
          {icon && (
            <span
              className={`d:f p:a ai:c c:hint pe:none ${iconPosition === "leading" ? "l:3" : "r:3"}`}
            >
              {icon}
            </span>
          )}
          <Autocomplete.Input
            id={id}
            placeholder={placeholder}
            className={inputClasses}
          />
        </div>
        {description && <p className="m:0 c:hint fs:xs">{description}</p>}
      </div>
      <Autocomplete.Portal container={container} keepMounted>
        <Autocomplete.Positioner className="ow:0" sideOffset={8}>
          {popup}
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
}
