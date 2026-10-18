"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import {
  FileIcon,
  FileImageIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  FileVideoCameraIcon,
  FileZipIcon,
  FolderIcon,
  FolderOpenIcon,
} from "@solar-icons/react/bold";
import { AltArrowRightIcon } from "@solar-icons/react/outline";
import type { KeyboardEvent, ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

const TREE_SHAPES: Record<Shape, string> = {
  rounded: "br:xl",
  square: "",
  squircle: "br:3xl cs:s",
};

const ROW_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:lg cs:s",
};

const PICKED =
  "bg:check c:white btc:white/25 blc:black/15 brc:black/15 bbc:black/30";

// a file's icon and its colour, by extension; anything else is a plain file
const KINDS: { match: RegExp; Icon: typeof FileIcon; tint: string }[] = [
  { match: /\.(pdf|txt|md|docx?|rtf)$/i, Icon: FileTextIcon, tint: "c:blue" },
  {
    match: /\.(xlsx?|csv|numbers)$/i,
    Icon: FileSpreadsheetIcon,
    tint: "c:mint",
  },
  {
    match: /\.(png|jpe?g|gif|webp|heic|svg)$/i,
    Icon: FileImageIcon,
    tint: "c:mint",
  },
  { match: /\.(mov|mp4|mkv|webm)$/i, Icon: FileVideoCameraIcon, tint: "c:red" },
  { match: /\.(zip|tar|gz|7z)$/i, Icon: FileZipIcon, tint: "c:yellow" },
];

export interface FileTreeItem {
  id: string;
  name: string;
  /** A folder has `children`, even an empty list. */
  children?: FileTreeItem[];
  /** Small text at the end of the row, such as a size or a count. */
  detail?: string;
  /** Replaces the icon the extension picks. */
  icon?: ReactNode;
}

export interface FileTreeProps {
  /**
   * The tree, top level first. Each item's `id` and `name`, plus `children`
   * for a folder and an optional `detail` and `icon`.
   */
  items: FileTreeItem[];
  /** The tree's accessible name. */
  label?: string;
  /**
   * The folders open on first render, by `id`. Pair `expanded` with
   * `onExpandedChange` instead if you are controlling it.
   */
  defaultExpanded?: string[];
  /** Controlled open folders, by `id`. */
  expanded?: string[];
  /** Called with every open folder's `id` when one opens or closes. */
  onExpandedChange?: (expanded: string[]) => void;
  /**
   * The row picked on first render, by `id`. Pair `selected` with
   * `onSelectedChange` instead if you are controlling it.
   */
  defaultSelected?: string;
  /** The controlled picked row, by `id`. */
  selected?: string;
  /** Called with the `id` of the row just picked. */
  onSelectedChange?: (selected: string) => void;
  /** Corner radius on the tree and on each row. */
  shape?: Shape;
  /**
   * The chevron's turn and the folder's open and close. Turn it off for an
   * instant tree, or when the user has asked for reduced motion.
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

interface Placed {
  item: FileTreeItem;
  parent: string | null;
}

/**
 * Folders and files in a tree that opens folder by folder, with a picked row
 * and the arrow keys, built on Base UI.
 */
export default function FileTree({
  items,
  label = "Files",
  defaultExpanded,
  expanded: controlledExpanded,
  onExpandedChange,
  defaultSelected,
  selected: controlledSelected,
  onSelectedChange,
  shape = "rounded",
  animated = true,
  className,
  focus = true,
}: FileTreeProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [internalExpanded, setInternalExpanded] = useState<string[]>(
    defaultExpanded ?? controlledExpanded ?? [],
  );
  const expanded = controlledExpanded ?? internalExpanded;
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const selected = controlledSelected ?? internalSelected;

  const placed = useMemo(() => {
    const map = new Map<string, Placed>();
    const walk = (nodes: FileTreeItem[], parent: string | null) => {
      for (const item of nodes) {
        map.set(item.id, { item, parent });
        if (item.children) walk(item.children, item.id);
      }
    };
    walk(items, null);
    return map;
  }, [items]);

  // the rows on screen, top to bottom: what the arrow keys walk
  const visible = useMemo(() => {
    const out: string[] = [];
    const walk = (nodes: FileTreeItem[]) => {
      for (const item of nodes) {
        out.push(item.id);
        if (item.children && expanded.includes(item.id)) walk(item.children);
      }
    };
    walk(items);
    return out;
  }, [items, expanded]);

  const [active, setActive] = useState<string | undefined>(undefined);
  const current =
    active && visible.includes(active) ? active : (selected ?? visible[0]);
  const rows = useRef(new Map<string, HTMLDivElement>());

  const setOpen = (id: string, open: boolean) => {
    const next = open
      ? [...expanded, id]
      : expanded.filter((entry) => entry !== id);
    setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  const pick = (id: string) => {
    setInternalSelected(id);
    onSelectedChange?.(id);
  };

  const moveTo = (id: string | undefined) => {
    if (!id) return;
    setActive(id);
    rows.current.get(id)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent, id: string) => {
    const entry = placed.get(id);
    if (!entry) return;
    const isFolder = Boolean(entry.item.children);
    const isOpen = expanded.includes(id);
    const at = visible.indexOf(id);
    let handled = true;

    if (event.key === "ArrowDown") moveTo(visible[at + 1]);
    else if (event.key === "ArrowUp") moveTo(visible[at - 1]);
    else if (event.key === "Home") moveTo(visible[0]);
    else if (event.key === "End") moveTo(visible[visible.length - 1]);
    else if (event.key === "ArrowRight") {
      if (isFolder && !isOpen) setOpen(id, true);
      else if (isFolder) moveTo(entry.item.children?.[0]?.id);
    } else if (event.key === "ArrowLeft") {
      if (isFolder && isOpen) setOpen(id, false);
      else moveTo(entry.parent ?? undefined);
    } else if (event.key === "Enter" || event.key === " ") {
      if (isFolder) setOpen(id, !isOpen);
      pick(id);
    } else if (event.key.length === 1 && /\S/.test(event.key)) {
      // typing a letter jumps to the next row that starts with it
      const key = event.key.toLowerCase();
      const order = [...visible.slice(at + 1), ...visible.slice(0, at + 1)];
      moveTo(
        order.find((entry) =>
          placed.get(entry)?.item.name.toLowerCase().startsWith(key),
        ),
      );
    } else handled = false;

    if (handled) event.preventDefault();
  };

  const renderRow = (
    item: FileTreeItem,
    level: number,
    position: number,
    count: number,
  ) => {
    const isFolder = Boolean(item.children);
    const isOpen = isFolder && expanded.includes(item.id);
    const isPicked = selected === item.id;

    const kind = KINDS.find((entry) => entry.match.test(item.name));
    const Glyph = isFolder
      ? isOpen
        ? FolderOpenIcon
        : FolderIcon
      : (kind?.Icon ?? FileIcon);
    const tint = isPicked
      ? "c:white"
      : isFolder
        ? "c:yellow"
        : (kind?.tint ?? "c:hint");

    const row = (
      <div
        ref={(node) => {
          if (node) rows.current.set(item.id, node);
          else rows.current.delete(item.id);
        }}
        role="treeitem"
        aria-level={level}
        aria-posinset={position}
        aria-setsize={count}
        aria-expanded={isFolder ? isOpen : undefined}
        aria-selected={isPicked}
        tabIndex={item.id === current ? 0 : -1}
        onClick={() => {
          setActive(item.id);
          if (isFolder) setOpen(item.id, !isOpen);
          pick(item.id);
        }}
        onKeyDown={(event) => onKeyDown(event, item.id)}
        onFocus={() => setActive(item.id)}
        className={merge(
          outline,
          "d:f ai:c g:2 h:8 pl:1 pr:2 bw:1 fs:sm us:none c:p",
          ROW_SHAPES[shape],
          animated && "tp:c tdu:150 ttf:io @prm:tp:none",
          isPicked ? PICKED : "bc:transparent c:label h:bg:well",
        )}
      >
        <span aria-hidden className="d:f ai:c jc:c fs:0 w:4 h:4">
          {isFolder && (
            <AltArrowRightIcon
              className={merge(
                "w:3 h:3 o:70",
                isOpen && "ro:18",
                animated && "tp:t tdu:200 ttf:out-quart @prm:tp:none",
              )}
            />
          )}
        </span>
        <span aria-hidden className="d:f fs:0">
          {item.icon ?? <Glyph className={`w:4 h:4 ${tint}`} />}
        </span>
        <span className="f:1 min-w:0 o:h to:e ws:nw">{item.name}</span>
        {item.detail && (
          <span
            className={`fs:0 fs:xs ${isPicked ? "c:white o:70" : "c:hint"}`}
          >
            {item.detail}
          </span>
        )}
      </div>
    );

    if (!isFolder) return <div key={item.id}>{row}</div>;

    return (
      <Collapsible.Root
        key={item.id}
        open={isOpen}
        onOpenChange={(open) => setOpen(item.id, open)}
      >
        {row}
        <Collapsible.Panel
          role="group"
          className={merge(
            "ml:3 pl:1 blw:1 blc:line",
            animated &&
              "h:var(--collapsible-panel-height) o:h tp:a tdu:250 ttf:out-quart opening:h:0 opening:o:0 closing:h:0 closing:o:0 closing:tdu:150 closing:ttf:in-out-cubic @prm:tp:none",
          )}
        >
          {item.children?.map((child, index, all) =>
            renderRow(child, level + 1, index + 1, all.length),
          )}
        </Collapsible.Panel>
      </Collapsible.Root>
    );
  };

  return (
    <div
      role="tree"
      aria-label={label}
      className={merge(
        "d:f fd:c g:px w:72 max-w:100% p:1 bg:raised c:label bw:1 btc:rim blc:rim brc:rim bbc:shadow bs-o:xs",
        TREE_SHAPES[shape],
        className,
      )}
    >
      {items.map((item, index, all) =>
        renderRow(item, 1, index + 1, all.length),
      )}
    </div>
  );
}
