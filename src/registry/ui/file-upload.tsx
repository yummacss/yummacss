"use client";

import { Button } from "@base-ui/react/button";
import { Fieldset } from "@base-ui/react/fieldset";
import { Input } from "@base-ui/react/input";
import { CloudUploadIcon, DocumentIcon } from "@solar-icons/react/bold";
import { CheckIcon, CloseIcon } from "@solar-icons/react/outline";
import type { ChangeEvent, DragEvent, ReactNode } from "react";
import { useId, useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Border = "dashed" | "solid" | "none";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const ZONE = "d:f fd:c ai:c g:3 m:0 p:0 w:100% min-w:0 bg:transparent";

const SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "br:0",
  squircle: "br:3xl cs:s",
};

const ROW_SHAPES: Record<Shape, string> = {
  rounded: "br:xl",
  square: "br:0",
  squircle: "br:xxl cs:s",
};

const TILE_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "br:0",
  squircle: "br:xl cs:s",
};

const BORDERS: Record<Border, string> = {
  dashed: "bw:2 bs:d",
  solid: "bw:1",
  none: "bw:0",
};

const UNITS = ["B", "KB", "MB", "GB"];

function formatSize(bytes: number) {
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < UNITS.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return `${size < 10 && unit > 0 ? size.toFixed(1) : Math.round(size)} ${UNITS[unit]}`;
}

export interface FileUploadItem {
  id: string;
  name: string;
  /** A size or a status, such as "1.4 of 2.2 GB" or "Uploaded, 12 KB". */
  detail?: string;
  /** From 0 to 1 while the file uploads, drawn as a bar under its name. */
  progress?: number;
  /** Marks the file as finished with a check instead of a cancel button. */
  done?: boolean;
  /** The file's glyph in its tile. Defaults to a document. */
  icon?: ReactNode;
}

export interface FileUploadProps {
  /** The zone's title. */
  label?: string;
  /** The link in the line under the title that opens the file picker. */
  browseLabel?: string;
  /** The rest of that line, after the link, for what this zone accepts. */
  hint?: string;
  /**
   * Files your app is uploading, each with its own progress, listed under the
   * zone in place of the picked ones. Pair with `onCancel`.
   */
  items?: FileUploadItem[];
  /** Called with an item's `id` when its cancel button is pressed. */
  onCancel?: (id: string) => void;
  /**
   * A line outside the zone, for formats and limits. Replaced by `error`'s
   * message when it is set.
   */
  description?: string;
  /**
   * Replaces the cloud glyph in the tile. It is sized and colored by the zone,
   * so pass the glyph and nothing else.
   */
  icon?: ReactNode;
  /**
   * Passed to the file input, so the picker filters by it. A comma separated
   * list of extensions or MIME types, `image/*,.pdf`. A drop is not filtered:
   * the browser only applies this to the picker, so check the type yourself in
   * `onFilesChange`.
   */
  accept?: string;
  /**
   * Lets the zone hold more than one file. Each pick or drop adds to the list,
   * and a file already in it is not added twice; off, the newest file replaces
   * the old one.
   */
  multiple?: boolean;
  /**
   * Called with the whole list whenever it changes, on a pick, a drop or a
   * removal.
   */
  onFilesChange?: (files: File[]) => void;
  /**
   * Corner radius. `squircle` uses `corner-shape`, which degrades to a rounded
   * square where that is unsupported.
   */
  shape?: Shape;
  /**
   * `dashed` is the drop-zone convention and carries the extra width it needs
   * to read as one. `solid` is a heavier, more permanent box, so it stays thin.
   * `none` leaves the zone to its background.
   */
  border?: Border;
  /**
   * Turns the border, tile and text red & shows this message in place of
   * `description`. Crosses with `border`, so a solid zone can be in error too.
   */
  error?: string;
  /**
   * Blocks the picker and refuses drops, dims the zone and fills it, so it
   * reads as unavailable rather than merely empty.
   */
  disabled?: boolean;
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
 * A drop zone for files, in three shapes, dashed or solid, that picks by click
 * or by drop and lists what it holds.
 */
export default function FileUploadBase({
  label = "Drop files to upload",
  browseLabel = "choose from your computer",
  hint,
  items,
  onCancel,
  description,
  icon,
  accept,
  multiple = false,
  onFilesChange,
  shape = "rounded",
  border = "dashed",
  error,
  disabled = false,
  className,
  focus = true,
}: FileUploadProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const browseOutline = focus
    ? merge(
        FOCUS,
        "fv:oo:1",
        error ? "fv:oc:red-2/60" : "",
        focus === true ? "" : focus,
      )
    : "";

  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const message = error ?? description;

  const commit = (next: File[]) => {
    setFiles(next);
    onFilesChange?.(next);
  };

  const identity = (file: File) =>
    `${file.name}:${file.size}:${file.lastModified}`;

  const add = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    const picked = Array.from(incoming);

    if (!multiple) {
      commit(picked.slice(0, 1));
      return;
    }

    const held = new Set(files.map(identity));
    const fresh = picked.filter((file) => {
      const key = identity(file);
      if (held.has(key)) return false;
      held.add(key);
      return true;
    });

    if (fresh.length > 0) commit([...files, ...fresh]);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    add(event.target.files);
    event.target.value = "";
  };

  const onDragOver = (event: DragEvent) => {
    if (disabled) return;
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (event: DragEvent) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null))
      return;
    setDragging(false);
  };

  const onDrop = (event: DragEvent) => {
    if (disabled) return;
    event.preventDefault();
    setDragging(false);
    add(event.dataTransfer.files);
  };

  const zone = merge(
    ZONE,
    SHAPES[shape],
    BORDERS[border],
    error ? "bc:red-5" : "bc:rim",
    disabled ? "bg:well c:hint c:na" : dragging ? "bc:check bg:well" : "",
    className,
  );

  const rows: FileUploadItem[] =
    items ??
    files.map((file) => ({
      id: identity(file),
      name: file.name,
      detail: formatSize(file.size),
    }));

  const remove = (id: string) => {
    if (items) onCancel?.(id);
    else commit(files.filter((file) => identity(file) !== id));
  };

  return (
    <div className="d:f fd:c g:2 w:100 min-w:0">
      <Fieldset.Root
        aria-label={label}
        className={zone}
        onDragEnter={onDragOver}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <Input
          ref={input}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={onChange}
          className="d:none"
        />

        <div className="d:f fd:c ai:c g:2 p:6 ta:c">
          <div
            className={merge(
              "d:f ai:c jc:c w:10 h:10 br:9999",
              error ? "bg:red-1/50 c:red-5" : "bg:well c:check",
            )}
          >
            {icon ?? <CloudUploadIcon className="w:5 h:5" />}
          </div>
          <div className="d:f fd:c ai:c g:1">
            <span className={`fs:sm fw:600 ${error ? "c:red-5" : "c:label"}`}>
              {label}
            </span>
            <span className={`fs:xs ${error ? "c:red-5" : "c:hint"}`}>
              or{" "}
              <Button
                disabled={disabled}
                onClick={() => input.current?.click()}
                className={merge(
                  browseOutline,
                  "p:0 bg:transparent bw:0 fs:xs td:u tuo:2 c:p d:c:na",
                  error ? "c:red-5" : "c:hint h:c:label",
                )}
              >
                {browseLabel}
              </Button>
              {hint && `, ${hint}`}
            </span>
          </div>
        </div>

        {message && (
          <p
            className={`w:100% m:0 pb:6 fs:xs ta:c ${error ? "c:red-5" : "c:hint"}`}
          >
            {message}
          </p>
        )}
      </Fieldset.Root>

      {rows.map((row) => (
        <div
          key={row.id}
          className={merge(
            "d:f ai:c g:3 px:2 py:2 bw:1 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs",
            ROW_SHAPES[shape],
          )}
        >
          <span
            className={merge(
              "d:f ai:c jc:c fs:0 w:9 h:9 bg:well c:hint",
              TILE_SHAPES[shape],
            )}
          >
            {row.icon ?? <DocumentIcon className="w:5 h:5" />}
          </span>
          <div className="d:f fd:c g:1 f:1 min-w:0">
            <div className="d:f ai:c jc:sb g:2">
              <span className="o:h fs:sm fw:600 c:label to:e ws:nw">
                {row.name}
              </span>
              {row.progress !== undefined && !row.done && row.detail && (
                <span className="c:hint fs:xs ws:nw">{row.detail}</span>
              )}
            </div>
            {row.progress !== undefined && !row.done ? (
              <div className="h:1 br:9999 bg:rim o:h">
                <div
                  className="h:100% br:9999 bg:check tp:w tdu:300 ttf:out-quart"
                  style={{
                    width: `${Math.min(Math.max(row.progress, 0), 1) * 100}%`,
                  }}
                />
              </div>
            ) : (
              row.detail && <span className="c:hint fs:xs">{row.detail}</span>
            )}
          </div>
          {row.done ? (
            <CheckIcon aria-label="Uploaded" className="w:4 h:4 c:on" />
          ) : (
            <Button
              aria-label={`${items ? "Cancel" : "Remove"} ${row.name}`}
              disabled={disabled}
              onClick={() => remove(row.id)}
              className={merge(
                outline,
                "d:f ai:c jc:c w:8 h:8 p:0 bw:1 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label c:p h:bg:well",
                TILE_SHAPES[shape],
              )}
            >
              <CloseIcon className="w:4 h:4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
