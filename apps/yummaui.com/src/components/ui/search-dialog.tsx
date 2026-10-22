"use client";

import { Button } from "@base-ui/react";
import { Dialog } from "@base-ui/react/dialog";
import { Input } from "@base-ui/react/input";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Scroller from "@/components/ui/scroller";
import {
  LongArrowDownLeftSolid,
  NavArrowDown,
  NavArrowLeft,
  NavArrowRight,
  NavArrowUp,
  Search,
} from "@/icons";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  filterSearchResults,
  groupByCategory,
  loadSearchIndex,
  type SearchCategory,
  type SearchIndex,
  type SearchItem,
  searchCategories,
} from "@/utils/search-data";
import Match from "./match";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const KBD = "d:if ai:c jc:c h:5 px:1 bc:border bw:1 c:ink/60 fs:xs";
const LABEL = "px:3 py:1 c:ink/50 fs:xs ls:2 tt:u";

/** The highlighted page's details, shown once, on the right. */
function Details({ item }: { item: SearchItem }) {
  return (
    <div className="d:f fd:c g:3 p:5">
      <span className="c:ink/50 fs:xs ls:2 tt:u">
        {CATEGORY_LABELS[item.category]}
      </span>
      <span className="c:ink ff:display fs:xxl">{item.title}</span>
      {item.description && (
        <span className="c:ink/70 fs:sm lh:5">{item.description}</span>
      )}
      <span className="mt:2 c:ink/40 fs:xs">{item.path}</span>
    </div>
  );
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // the navbar starts the fetch on hover or focus; opening loads it otherwise, and retries a failure
  useEffect(() => {
    if (index || !open) return;
    let live = true;
    loadSearchIndex().then(
      (loaded) => live && setIndex(loaded),
      () => {},
    );
    return () => {
      live = false;
    };
  }, [index, open]);

  const categories = useMemo(() => searchCategories(index), [index]);

  const searching = query.trim() !== "";
  const browsing = !searching && !category;

  // inside a category, typing searches its pages only
  const results = useMemo(() => {
    const found = filterSearchResults(query, index);
    if (!category) return found;
    const paths = new Set(category.pages.map((page) => page.path));
    return found.filter((item) => paths.has(item.path.split("#")[0]));
  }, [query, index, category]);

  const groupedResults = useMemo(() => groupByCategory(results), [results]);

  // what the arrow keys walk through, in the order it is drawn
  const rows: (SearchItem | SearchCategory)[] = useMemo(() => {
    if (browsing) return categories;
    if (!searching && category) return category.pages;
    return CATEGORY_ORDER.flatMap((group) => groupedResults[group] ?? []);
  }, [browsing, searching, category, categories, groupedResults]);

  const reset = useCallback(() => {
    setQuery("");
    setCategory(null);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    if (open) {
      reset();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, reset]);

  const enter = useCallback((next: SearchCategory) => {
    setCategory(next);
    setQuery("");
    setSelectedIndex(0);
    inputRef.current?.focus();
  }, []);

  const leave = useCallback(() => {
    if (!category) return;
    const at = categories.indexOf(category);
    setCategory(null);
    setQuery("");
    setSelectedIndex(Math.max(at, 0));
    inputRef.current?.focus();
  }, [category, categories]);

  const choose = useCallback(
    (row: SearchItem | SearchCategory) => {
      if ("pages" in row) return enter(row);
      router.push(row.path);
      onClose();
    },
    [enter, router, onClose],
  );

  const current = rows[selectedIndex];

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(
            Math.min(
              Math.max(selectedIndex + (e.key === "ArrowDown" ? 1 : -1), 0),
              rows.length - 1,
            ),
          );
          break;
        case "ArrowRight":
          if (browsing) {
            e.preventDefault();
            const row = rows[selectedIndex];
            if (row && "pages" in row) enter(row);
          }
          break;
        case "ArrowLeft":
          if (category && !searching) {
            e.preventDefault();
            leave();
          }
          break;
        case "Backspace":
          if (category && query === "") {
            e.preventDefault();
            leave();
          }
          break;
        case "Enter": {
          e.preventDefault();
          const row = rows[selectedIndex];
          if (row) choose(row);
          break;
        }
        case "a":
          // select-all belongs to the field, not to the page behind the dialog
          if ((e.ctrlKey || e.metaKey) && e.target !== inputRef.current) {
            e.preventDefault();
            inputRef.current?.focus();
            inputRef.current?.select();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [
      rows,
      selectedIndex,
      browsing,
      category,
      searching,
      query,
      enter,
      leave,
      choose,
      onClose,
    ],
  );

  useEffect(() => {
    if (listRef.current && rows.length > 0) {
      const items = listRef.current.querySelectorAll("[data-search-item]");
      const selected = items[selectedIndex] as HTMLElement | undefined;
      selected?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, rows.length]);

  const highlighted = current;
  const rowClass = (selected: boolean) =>
    `d:f b:0 ai:c g:3 w:100% px:3 py:2 ta:l c:p ${selected ? "bg:hover" : "bg:transparent"}`;

  // the word set huge at the foot of the right side
  const wash = highlighted?.title;

  let rowIndex = -1;
  const row = (
    item: SearchItem,
    { description }: { description: boolean } = { description: true },
  ) => {
    rowIndex++;
    const current = rowIndex;
    const selected = selectedIndex === current;
    return (
      <Button
        key={`${item.path}-${item.title}`}
        data-search-item
        type="button"
        onClick={() => {
          setSelectedIndex(current);
          choose(item);
        }}
        onMouseEnter={() => setSelectedIndex(current)}
        className={rowClass(selected)}
      >
        <span className="d:f f:1 min-w:0 ai:b g:3">
          <span className="fs:0 c:ink fs:md ws:nw">
            <Match text={item.title} query={query} />
          </span>
          {description && item.description && (
            <span className="o:h c:ink/50 fs:sm to:e ws:nw @md:d:none">
              {item.description}
            </span>
          )}
        </span>
        {selected && (
          <LongArrowDownLeftSolid className="fs:0 w:4 h:4 c:ink/50" />
        )}
      </Button>
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="tp:o tdu:150 ttf:eo opening:o:0 closing:o:0 @prm:tp:none p:f zi:10 t:0 l:0 r:0 b:0 bg:black/60 bf-b:sm fgr:90" />
        <div className="d:f p:f zi:10 t:0 l:0 r:0 b:0 ai:fs jc:c pe:none @md:pt:24">
          <Dialog.Popup
            data-chrome
            aria-label="Search"
            className="tp:o tdu:150 ttf:eo opening:o:0 closing:o:0 @prm:tp:none d:f fd:c o:h w:100% h:dvh bg:page pe:auto @md:w:224 @md:max-w:calc(100vw-4rem) @md:h:144 @md:max-h:calc(100dvh-8rem) @md:bc:border @md:bw:1"
            onKeyDown={handleKeyDown}
          >
            <div className="d:f fs:0 ai:c g:3 px:4 h:14 bc:border bbw:1">
              <Search className="fs:0 w:5 h:5 c:ink/60" />
              {category && (
                <Button
                  type="button"
                  onClick={leave}
                  aria-label={`Back from ${category.title}`}
                  className="d:if fs:0 ai:c g:1 h:6 px:2 bc:border bg:transparent h:bg:hover c:ink/80 bw:1 fs:sm fv:oc:ink fv:ow:2"
                >
                  <NavArrowLeft className="w:3 h:3" />
                  {category.title}
                </Button>
              )}
              <Input
                ref={inputRef}
                type="text"
                aria-label="Search the docs"
                placeholder={
                  category
                    ? `Search ${category.title}`
                    : "Search components, props, options"
                }
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                autoFocus
                className="f:1 min-w:0 bg:transparent c:ink os:none fs:md"
              />
              <Dialog.Close
                aria-label="Close search"
                className="d:if fs:0 ai:c jc:c h:6 px:2 bc:border bg:transparent c:ink/60 bw:1 fs:xs fv:oc:ink fv:ow:2"
              >
                Esc
              </Dialog.Close>
            </div>

            <div className="d:f f:1 min-h:0">
              <Scroller
                viewportRef={listRef}
                viewportClassName="px:2 py:2"
                className="f:1 min-h:0 min-w:0"
              >
                {browsing &&
                  categories.map((section, at) => {
                    const selected = selectedIndex === at;
                    return (
                      <div key={section.title}>
                        <Button
                          data-search-item
                          type="button"
                          onClick={() => {
                            setSelectedIndex(at);
                            enter(section);
                          }}
                          onMouseEnter={() => setSelectedIndex(at)}
                          className={rowClass(selected)}
                        >
                          <span className="f:1 c:ink fs:md">
                            {section.title}
                          </span>
                          <span className="d:f ai:c g:2 c:ink/40 fs:sm">
                            {section.pages.length}
                            <NavArrowRight
                              className={`w:4 h:4 ${selected ? "" : "@md:o:0"}`}
                            />
                          </span>
                        </Button>
                      </div>
                    );
                  })}

                {!searching && category && (
                  <>
                    <div className={LABEL}>
                      {category.title} · {category.pages.length}
                    </div>
                    {category.pages.map((page) => row(page))}
                  </>
                )}

                {searching &&
                  CATEGORY_ORDER.map((group) => {
                    const items = groupedResults[group];
                    if (!items || items.length === 0) return null;

                    return (
                      <div key={group} className="mb:2">
                        <div className={LABEL}>{CATEGORY_LABELS[group]}</div>
                        {items.map((item) => row(item))}
                      </div>
                    );
                  })}

                {searching && rows.length === 0 && (
                  <div className="px:4 py:8 c:ink/50 ta:c fs:md">
                    No results for "{query}"
                    {category ? ` in ${category.title}` : ""}
                  </div>
                )}
              </Scroller>

              <div className="d:none p:r w:40% fs:0 o:h bc:border blw:1 @md:d:b">
                <div className="p:r zi:10 h:100% oy:auto">
                  {highlighted && "pages" in highlighted ? (
                    <div className="py:2 px:2">
                      <div className={LABEL}>
                        {highlighted.title} · {highlighted.pages.length}
                      </div>
                      {highlighted.pages.slice(0, 12).map((page) => (
                        <div key={page.path} className="px:3 py:2 c:ink">
                          {page.title}
                        </div>
                      ))}
                      {highlighted.pages.length > 12 && (
                        <div className="px:3 py:1 c:ink/50 fs:sm">
                          {highlighted.pages.length - 12} more
                        </div>
                      )}
                    </div>
                  ) : highlighted ? (
                    <Details item={highlighted} />
                  ) : null}
                </div>
                {wash && (
                  // the footer's version treatment: huge, dim, cut off by the edge
                  <span
                    aria-hidden="true"
                    className="p:a l:5 ff:display ws:nw us:none pe:none footer-version"
                    style={{ bottom: "-0.18em", fontSize: "9rem" }}
                  >
                    {wash}
                  </span>
                )}
              </div>
            </div>

            {/* keys to press, so only where a keyboard is likely: the navbar's Ctrl K hint shows from the same width */}
            <div className="d:none fs:0 ai:c g:4 px:4 h:10 bc:border c:ink/50 btw:1 fs:xs @lg:d:f">
              <span className="d:f ai:c g:1">
                <kbd className={KBD}>
                  <NavArrowUp className="w:3 h:3" />
                </kbd>
                <kbd className={KBD}>
                  <NavArrowDown className="w:3 h:3" />
                </kbd>
                <span className="ml:1">to move</span>
              </span>
              {browsing && (
                <span className="d:f ai:c g:1">
                  <kbd className={KBD}>
                    <NavArrowRight className="w:3 h:3" />
                  </kbd>
                  <span className="ml:1">to open a category</span>
                </span>
              )}
              {category && !searching && (
                <span className="d:f ai:c g:1">
                  <kbd className={KBD}>
                    <NavArrowLeft className="w:3 h:3" />
                  </kbd>
                  <span className="ml:1">to go back</span>
                </span>
              )}
              {!browsing && (
                <span className="d:f ai:c g:1">
                  <kbd className={KBD}>
                    <LongArrowDownLeftSolid className="w:3 h:3" />
                  </kbd>
                  <span className="ml:1">to open</span>
                </span>
              )}
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
