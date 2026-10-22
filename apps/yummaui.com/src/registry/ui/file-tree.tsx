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
import type { KeyboardEvent } from "react";
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

// a file's icon and tint come from its extension
const KINDS = [
  { match: /\.(pdf|txt|md|docx?)$/i, Icon: FileTextIcon, tint: "c:blue" },
  { match: /\.(xlsx?|csv)$/i, Icon: FileSpreadsheetIcon, tint: "c:mint" },
  {
    match: /\.(png|jpe?g|gif|webp|svg)$/i,
    Icon: FileImageIcon,
    tint: "c:mint",
  },
  { match: /\.(mov|mp4|webm)$/i, Icon: FileVideoCameraIcon, tint: "c:red" },
  { match: /\.(zip|gz|7z)$/i, Icon: FileZipIcon, tint: "c:yellow" },
];

interface Node {
  path: string;
  name: string;
  parent: string | null;
  children?: Node[];
}

// "Documents/budget.xlsx" becomes a Documents folder holding budget.xlsx
function toTree(paths: string[]): Node[] {
  const root: Node[] = [];
  const folders = new Map<string, Node>();
  for (const path of paths) {
    const parts = path.split("/").filter(Boolean);
    let siblings = root;
    parts.forEach((name, index) => {
      const at = parts.slice(0, index + 1).join("/");
      const isFolder = index < parts.length - 1 || path.endsWith("/");
      let node = isFolder ? folders.get(at) : undefined;
      if (!node) {
        const parent = index ? parts.slice(0, index).join("/") : null;
        node = { path: at, name, parent, children: isFolder ? [] : undefined };
        if (isFolder) folders.set(at, node);
        siblings.push(node);
      }
      siblings = node.children ?? siblings;
    });
  }
  const sort = (nodes: Node[]): Node[] =>
    nodes
      .sort(
        (a, b) =>
          Number(!a.children) - Number(!b.children) ||
          a.name.localeCompare(b.name),
      )
      .map((node) =>
        node.children ? { ...node, children: sort(node.children) } : node,
      );
  return sort(root);
}

export interface FileTreeProps {
  /**
   * Every file by its path, `Documents/budget.xlsx`. Folders come from the
   * paths; end one with `/` for an empty folder.
   */
  paths: string[];
  /** The tree's accessible name. */
  label?: string;
  /** The folders open on first render, by path. */
  defaultExpanded?: string[];
  /**
   * The row picked on first render, by path. Pair `selected` with
   * `onSelectedChange` instead if you are controlling it.
   */
  defaultSelected?: string;
  /** The controlled picked row, by path. */
  selected?: string;
  /** Called with the path of the row just picked. */
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

/**
 * Folders and files from a list of paths, opening folder by folder, with a
 * picked row and the arrow keys.
 */
export default function FileTree({
  paths,
  label = "Files",
  defaultExpanded = [],
  defaultSelected,
  selected: controlledSelected,
  onSelectedChange,
  shape = "rounded",
  animated = true,
  className,
  focus = true,
}: FileTreeProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const tree = useMemo(() => toTree(paths), [paths]);

  const [expanded, setExpanded] = useState(defaultExpanded);
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const selected = controlledSelected ?? internalSelected;
  const [active, setActive] = useState<string>();
  const rows = useRef(new Map<string, HTMLDivElement>());

  // the rows on screen, top to bottom: what the arrow keys walk
  const visible: Node[] = [];
  const walk = (nodes: Node[]) => {
    for (const node of nodes) {
      visible.push(node);
      if (node.children && expanded.includes(node.path)) walk(node.children);
    }
  };
  walk(tree);
  const current = visible.some((node) => node.path === active)
    ? active
    : (selected ?? visible[0]?.path);

  const toggle = (path: string, open: boolean) =>
    setExpanded((now) =>
      open ? [...now, path] : now.filter((entry) => entry !== path),
    );

  const pick = (path: string) => {
    setInternalSelected(path);
    onSelectedChange?.(path);
  };

  const moveTo = (path?: string | null) => {
    if (path) rows.current.get(path)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent, node: Node) => {
    const at = visible.indexOf(node);
    const isOpen = expanded.includes(node.path);
    const keys: Record<string, () => void> = {
      ArrowDown: () => moveTo(visible[at + 1]?.path),
      ArrowUp: () => moveTo(visible[at - 1]?.path),
      Home: () => moveTo(visible[0]?.path),
      End: () => moveTo(visible.at(-1)?.path),
      ArrowRight: () =>
        node.children &&
        (isOpen ? moveTo(node.children[0]?.path) : toggle(node.path, true)),
      ArrowLeft: () =>
        node.children && isOpen
          ? toggle(node.path, false)
          : moveTo(node.parent),
      Enter: () => {
        if (node.children) toggle(node.path, !isOpen);
        pick(node.path);
      },
    };
    const action = keys[event.key === " " ? "Enter" : event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  const render = (nodes: Node[], level: number) =>
    nodes.map((node, index) => {
      const isOpen = Boolean(node.children) && expanded.includes(node.path);
      const isPicked = selected === node.path;
      const kind = KINDS.find((entry) => entry.match.test(node.name));
      const Glyph = node.children
        ? isOpen
          ? FolderOpenIcon
          : FolderIcon
        : (kind?.Icon ?? FileIcon);
      const tint = isPicked
        ? "c:white"
        : node.children
          ? "c:yellow"
          : (kind?.tint ?? "c:hint");

      const row = (
        <div
          ref={(element) => {
            if (element) rows.current.set(node.path, element);
            else rows.current.delete(node.path);
          }}
          role="treeitem"
          aria-level={level}
          aria-posinset={index + 1}
          aria-setsize={nodes.length}
          aria-expanded={node.children ? isOpen : undefined}
          aria-selected={isPicked}
          tabIndex={node.path === current ? 0 : -1}
          onFocus={() => setActive(node.path)}
          onClick={() => {
            if (node.children) toggle(node.path, !isOpen);
            pick(node.path);
          }}
          onKeyDown={(event) => onKeyDown(event, node)}
          className={merge(
            outline,
            "d:f ai:c g:2 h:8 pl:1 pr:2 bw:1 fs:sm us:none c:p",
            ROW_SHAPES[shape],
            animated && "tp:c tdu:150 ttf:io @prm:tp:none",
            isPicked ? PICKED : "bc:transparent c:label h:bg:well",
          )}
        >
          <span aria-hidden className="d:f ai:c jc:c fs:0 w:4 h:4">
            {node.children && (
              <AltArrowRightIcon
                className={merge(
                  "w:3 h:3 o:70",
                  isOpen && "ro:18",
                  animated && "tp:t tdu:200 ttf:out-quart @prm:tp:none",
                )}
              />
            )}
          </span>
          <Glyph aria-hidden className={`fs:0 w:4 h:4 ${tint}`} />
          <span className="f:1 min-w:0 o:h to:e ws:nw">{node.name}</span>
        </div>
      );

      if (!node.children) return <div key={node.path}>{row}</div>;

      return (
        <Collapsible.Root key={node.path} open={isOpen}>
          {row}
          <Collapsible.Panel
            role="group"
            className={merge(
              "ml:3 pl:1 blw:1 blc:line",
              animated &&
                "h:var(--collapsible-panel-height) o:h tp:a tdu:250 ttf:out-quart opening:h:0 opening:o:0 closing:h:0 closing:o:0 closing:tdu:150 closing:ttf:in-out-cubic @prm:tp:none",
            )}
          >
            {render(node.children, level + 1)}
          </Collapsible.Panel>
        </Collapsible.Root>
      );
    });

  return (
    <div
      role="tree"
      aria-label={label}
      className={merge(
        "d:f fd:c g:px w:64 max-w:100% p:1 bg:raised c:label bw:1 btc:rim blc:rim brc:rim bbc:shadow bs-o:xs",
        TREE_SHAPES[shape],
        className,
      )}
    >
      {render(tree, 1)}
    </div>
  );
}
