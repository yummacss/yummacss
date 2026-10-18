"use client";

import { Button } from "@base-ui/react/button";
import { Fieldset } from "@base-ui/react/fieldset";
import { Input } from "@base-ui/react/input";
import { CloudUploadIcon } from "@solar-icons/react/bold";
import { CloseIcon } from "@solar-icons/react/outline";
import type { ChangeEvent, DragEvent, ReactNode } from "react";
import { useId, useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type Border = "dashed" | "solid" | "none";

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const ZONE = "d:f fd:c ai:c g:3 m:0 p:0 w:100 min-w:0 bg:transparent";

const SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "br:0",
  squircle: "br:3xl cs:s",
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

export interface FileUploadProps {
  /** The clickable part of the prompt, before "or drag and drop". */
  label?: string;
  /** The quieter line under the prompt, for what this zone accepts. */
  hint?: string;
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
  label = "Upload files",
  hint = "Drag and drop files here",
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

  return (
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

      <div className="d:f fd:c ai:c g:2 p:8 ta:c">
        <div
          className={merge(
            "d:f ai:c jc:c w:10 h:10 bw:1",
            SHAPES[shape],
            error
              ? "bg:red-1/50 bc:red-5"
              : "bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs",
          )}
        >
          {icon ?? (
            <CloudUploadIcon
              className={`w:5 h:5 ${error ? "c:red-5" : "c:hint"}`}
            />
          )}
        </div>
        <div className="d:f fd:c ai:c g:1">
          <span className={`fs:sm fw:500 ${error ? "c:red-5" : "c:label"}`}>
            <Button
              disabled={disabled}
              onClick={() => input.current?.click()}
              className={merge(
                browseOutline,
                "p:0 bg:transparent bw:0 fs:sm fw:500 c:p d:c:na",
                error ? "c:red-5" : "c:label",
              )}
            >
              {label}
            </Button>{" "}
            or drag and drop
          </span>
          <span className={`fs:xs fw:400 ${error ? "c:red-5" : "c:hint"}`}>
            {hint}
          </span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="d:f fd:c g:1 w:100% px:6 pb:6">
          {files.map((file) => (
            <div
              key={identity(file)}
              className={merge(
                "d:f ai:c jc:sb g:3 px:3 py:2 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs bw:1",
                SHAPES[shape],
              )}
            >
              <span className="o:h fs:xs c:label to:e ws:nw">{file.name}</span>
              <span className="d:f ai:c g:2 fs:xs c:hint">
                {formatSize(file.size)}
                <Button
                  aria-label={`Remove ${file.name}`}
                  disabled={disabled}
                  onClick={() =>
                    commit(files.filter((entry) => entry !== file))
                  }
                  className={merge(
                    outline,
                    "d:f ai:c jc:c w:5 h:5 p:0 bg:transparent bw:0 c:hint c:p h:c:label",
                    SHAPES[shape],
                  )}
                >
                  <CloseIcon className="w:4 h:4" />
                </Button>
              </span>
            </div>
          ))}
        </div>
      )}

      {message && (
        <p
          className={`w:100% m:0 pb:6 fs:xs ta:c ${error ? "c:red-5" : "c:hint"}`}
        >
          {message}
        </p>
      )}
    </Fieldset.Root>
  );
}
