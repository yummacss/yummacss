"use client";

import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { CloseIcon } from "@solar-icons/react/outline";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type IconPosition = "leading" | "trailing";
type TriggerTone = "neutral" | "danger";
type Size = "sm" | "md" | "lg";
type ConfirmTone = "primary" | "danger";

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "",
  squircle: "br:3xl cs:s",
};

const BUTTON_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const CLOSE_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:lg cs:s",
};

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const BUTTON_BASE = "bw:1 fw:500 tp:c tdu:150 ttf:io us:none";

const NEUTRAL_BUTTON =
  "bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label h:bg:well";

const PRIMARY_BUTTON =
  "bg:fill btc:white/20 blc:black/40 brc:black/40 bbc:black/60 bs-o:sm h:o:90 c:on-fill";

const DANGER_OUTLINE = "fv:oc:red-2/60 fv:bc:red-3";

const TRIGGER_TONES: Record<TriggerTone, string> = {
  neutral: NEUTRAL_BUTTON,
  danger:
    "bg:red h:bg:red-8 btc:red-5 blc:red-8 brc:red-8 bbc:red-9 c:white bs-o:sm",
};

const CONFIRM_TONES: Record<ConfirmTone, string> = {
  primary: PRIMARY_BUTTON,
  danger:
    "bg:red h:bg:red-8 btc:red-5 blc:red-8 brc:red-8 bbc:red-9 c:white bs-o:sm",
};

const SIZES: Record<Size, string> = {
  sm: "px:3 py:1 fs:xs",
  md: "px:4 py:2 fs:sm",
  lg: "px:6 py:3 fs:md",
};

export interface DialogProps {
  /**
   * Where the popup is rendered. Defaults to `document.body`, which is right
   * almost always; pass an element to portal somewhere else, such as inside a
   * frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
  /** The trigger button's label. */
  trigger: ReactNode;
  /** A glyph beside the trigger's label. */
  triggerIcon?: ReactNode;
  /** Which end of the trigger `triggerIcon` sits at. */
  triggerIconPosition?: IconPosition;
  /** Color: `neutral` or `danger`, for a destructive confirmation. */
  triggerTone?: TriggerTone;
  /**
   * Fires when the trigger is pressed, before the dialog opens, for capturing
   * which row triggered it, say, in a dialog reused across a list.
   */
  onTriggerClick?: () => void;
  /**
   * Content above the title: an avatar and name block, say. Centered in its own
   * padded row.
   */
  header?: ReactNode;
  /** The dialog's heading, wired up by Base UI's own Dialog.Title. */
  title: string;
  /** The body text, wired up by Base UI's own Dialog.Description. */
  description?: ReactNode;
  /**
   * The body, below the description. Form fields and anything else go here.
   * Style them yourself.
   */
  children?: ReactNode;
  /** The dismissing button's label. */
  cancelLabel?: string;
  /**
   * The confirming button's label. No footer renders without this, so an
   * informational dialog closes by its X alone.
   */
  confirmLabel?: string;
  /**
   * Called when the confirm button is pressed. The dialog closes either way.
   */
  onConfirm?: () => void;
  /**
   * Color of the confirm button: `primary` or `danger`, for a destructive
   * action like a delete.
   */
  confirmTone?: ConfirmTone;
  /** The X in the corner. */
  showClose?: boolean;
  /**
   * Padding and text size of the trigger and the popup's buttons, on the same
   * scale as Button, so a dialog matches the buttons beside it.
   */
  size?: Size;
  /** Corner radius on the popup and its buttons. */
  shape?: Shape;
  /**
   * The backdrop's fade and the popup's scale-in. Turn it off for an instant
   * dialog, or when the user has asked for reduced motion.
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
 * A modal dialog with a title, optional description and body, and an optional
 * cancel/confirm pair.
 */
export default function DialogBase({
  trigger,
  triggerIcon,
  triggerIconPosition = "leading",
  triggerTone = "neutral",
  size = "md",
  onTriggerClick,
  header,
  title,
  description,
  children,
  cancelLabel = "Cancel",
  confirmLabel,
  onConfirm,
  confirmTone = "primary",
  showClose = true,
  shape = "rounded",
  animated = true,
  className,
  focus = true,
  container,
}: DialogProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const triggerOutline =
    focus && triggerTone === "danger" ? merge(FOCUS, DANGER_OUTLINE) : outline;
  const confirmOutline =
    focus && confirmTone === "danger" ? merge(FOCUS, DANGER_OUTLINE) : outline;

  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const triggerClasses = merge(
    triggerOutline,
    "d:if ai:c g:2",
    BUTTON_BASE,
    SIZES[size],
    BUTTON_SHAPES[shape],
    TRIGGER_TONES[triggerTone],
    className,
  );

  const popupClasses = [
    "o:h p:r w:96 bg:raised bc:line c:label bw:1 os:none bs-o:xl",
    POPUP_SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  const cancelClasses = merge(
    outline,
    BUTTON_BASE,
    SIZES[size],
    BUTTON_SHAPES[shape],
    NEUTRAL_BUTTON,
  );

  const confirmClasses = merge(
    confirmOutline,
    BUTTON_BASE,
    SIZES[size],
    BUTTON_SHAPES[shape],
    CONFIRM_TONES[confirmTone],
  );

  const popup = (
    <Dialog.Portal container={container} keepMounted>
      <Dialog.Backdrop
        className={`p:f i:0 min-h:dvh bg:shadow/30 bf-b:xs ${
          animated
            ? "tp:o tdu:250 ttf:out-quart opening:o:0 closing:o:0 closing:tdu:150 closing:ttf:eo @prm:tp:none"
            : ""
        }`}
      />
      <Dialog.Viewport className="d:f p:f i:0 ai:c jc:c">
        <Dialog.Popup
          ref={popupRef}
          initialFocus={(type) => type === "keyboard" || popupRef.current}
          className={`${popupClasses} ${animated ? "tp:a tdu:250 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:150 closing:ttf:eo @prm:tp:none" : ""}`}
          style={{ maxWidth: "90vw" }}
        >
          {showClose && (
            <Dialog.Close
              render={
                <Button
                  className={merge(
                    outline,
                    "d:f p:a r:4 t:4 ai:c jc:c w:7 h:7 p:0 bw:1 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label h:bg:well",
                    CLOSE_SHAPES[shape],
                  )}
                />
              }
              aria-label="Close"
            >
              <CloseIcon aria-hidden className="w:4 h:4" />
            </Dialog.Close>
          )}

          {header && (
            <div className="d:f fd:c ai:fs g:3 px:5 pt:5">{header}</div>
          )}

          <div className={`d:f fd:c g:3 px:5 pb:4 ${header ? "pt:3" : "pt:5"}`}>
            <Dialog.Title
              className={`m:0 c:label fs:md fw:600 ${showClose ? "pr:10" : ""}`}
            >
              {title}
            </Dialog.Title>

            {description && (
              <Dialog.Description className="m:0 c:hint fs:sm lh:4">
                {description}
              </Dialog.Description>
            )}

            {children}
          </div>

          {confirmLabel && (
            <div className="d:f jc:fe g:2 px:5 pb:5">
              <Dialog.Close render={<Button className={cancelClasses} />}>
                {cancelLabel}
              </Dialog.Close>
              <Dialog.Close
                render={<Button className={confirmClasses} />}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Dialog.Close>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        onClick={onTriggerClick}
        render={<Button className={triggerClasses} />}
      >
        {triggerIcon && triggerIconPosition === "leading" && triggerIcon}
        {trigger}
        {triggerIcon && triggerIconPosition === "trailing" && triggerIcon}
      </Dialog.Trigger>

      {popup}
    </Dialog.Root>
  );
}
