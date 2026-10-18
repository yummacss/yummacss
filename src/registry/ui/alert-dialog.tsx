"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { CloseIcon } from "@solar-icons/react/outline";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Tone = "danger" | "neutral";
type Shape = "rounded" | "square" | "squircle";
type IconPosition = "leading" | "trailing";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "px:3 py:1 fs:xs",
  md: "px:4 py:2 fs:sm",
  lg: "px:6 py:3 fs:md",
};

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "",
  squircle: "br:3xl cs:s",
};

const BADGE_SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

const BUTTON_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const CLOSE_SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:lg cs:s",
};

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const DANGER_OUTLINE = "fv:oc:red-2/60 fv:bc:red-3";

const TONE_BUTTON: Record<Tone, string> = {
  danger:
    "bg:red h:bg:red-8 btc:red-5 blc:red-8 brc:red-8 bbc:red-9 c:white bs-o:sm",
  neutral:
    "bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label h:bg:well",
};

const TONE_BADGE: Record<Tone, string> = {
  danger: "bg:red-1/50 c:red",
  neutral: "bg:well c:hint",
};

export interface AlertDialogProps {
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
  /**
   * The trigger's own color, independent of the dialog's `tone` - a neutral
   * button can still open a destructive dialog.
   */
  triggerTone?: Tone;
  /** The glyph in the badge above the title. No badge renders without one. */
  icon?: ReactNode;
  /** Colors the badge and the confirm button together. */
  tone?: Tone;
  /** The dialog's heading, wired up by Base UI's own AlertDialog.Title. */
  title: string;
  /** The body text, wired up by Base UI's own AlertDialog.Description. */
  description: string;
  /** The dismissing button's label. */
  cancelLabel?: string;
  /** The confirming button's label. */
  confirmLabel: string;
  /**
   * Called when the confirm button is pressed. The dialog closes either way.
   */
  onConfirm?: () => void;
  /**
   * The X in the corner. The Cancel button remains either way, so turning this
   * off never traps anyone.
   */
  showClose?: boolean;
  /**
   * Padding and text size of the trigger and the popup's buttons, on the same
   * scale as Button, so a dialog matches the buttons beside it.
   */
  size?: Size;
  /**
   * Corner radius on the popup, the badge and the buttons. `square` squares off
   * the badge too.
   */
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
 * A confirmation dialog with a badge, title, description and a cancel/confirm
 * pair, in two tones.
 */
export default function AlertDialogBase({
  trigger,
  triggerIcon,
  triggerIconPosition = "leading",
  triggerTone = "danger",
  icon,
  tone = "danger",
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel,
  onConfirm,
  showClose = true,
  size = "md",
  shape = "rounded",
  animated = true,
  className,
  focus = true,
  container,
}: AlertDialogProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const triggerOutline =
    focus && triggerTone === "danger" ? merge(FOCUS, DANGER_OUTLINE) : outline;
  const confirmOutline =
    focus && tone === "danger" ? merge(FOCUS, DANGER_OUTLINE) : outline;

  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const base = `${SIZES[size]} bw:1 fw:500 tp:c tdu:150 ttf:io us:none`;

  const triggerClasses = merge(
    triggerOutline,
    "d:if ai:c g:2",
    base,
    BUTTON_SHAPES[shape],
    TONE_BUTTON[triggerTone],
    className,
  );

  const popupClasses = [
    "o:h p:r w:96 bg:raised bc:line c:label bw:1 os:none bs-o:xl",
    POPUP_SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  const badgeClasses = [
    "d:f ai:c jc:c w:12 h:12",
    TONE_BADGE[tone],
    BADGE_SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  const cancelClasses = merge(
    outline,
    base,
    BUTTON_SHAPES[shape],
    TONE_BUTTON.neutral,
  );

  const confirmClasses = merge(
    confirmOutline,
    base,
    BUTTON_SHAPES[shape],
    TONE_BUTTON[tone],
  );

  const popup = (
    <AlertDialog.Portal container={container} keepMounted>
      <AlertDialog.Backdrop
        className={`p:f i:0 min-h:dvh bg:shadow/30 bf-b:xs ${
          animated
            ? "tp:o tdu:250 ttf:out-quart opening:o:0 closing:o:0 closing:tdu:150 closing:ttf:eo @prm:tp:none"
            : ""
        }`}
      />
      <AlertDialog.Viewport className="d:f p:f i:0 ai:c jc:c">
        <AlertDialog.Popup
          ref={popupRef}
          initialFocus={(type) => type === "keyboard" || popupRef.current}
          className={`${popupClasses} ${animated ? "tp:a tdu:250 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:150 closing:ttf:eo @prm:tp:none" : ""}`}
          style={{ maxWidth: "90vw" }}
        >
          {showClose && (
            <AlertDialog.Close
              render={
                <Button
                  className={merge(
                    outline,
                    "d:f p:a r:3 t:3 ai:c jc:c w:7 h:7 p:0 c:hint bw:0 h:bg:well h:c:hint",
                    CLOSE_SHAPES[shape],
                  )}
                />
              }
              aria-label="Close"
            >
              <CloseIcon aria-hidden className="w:5 h:5" />
            </AlertDialog.Close>
          )}

          <div className="d:f fd:c ai:c g:3 pt:10 pb:6 px:4">
            {icon && <span className={badgeClasses}>{icon}</span>}
            <AlertDialog.Title className="c:label fs:md fw:500">
              {title}
            </AlertDialog.Title>
            <AlertDialog.Description className="m:0 c:hint fs:sm lh:4 ta:c">
              {description}
            </AlertDialog.Description>
          </div>

          <div className="d:f jc:c g:3 px:4 pb:4">
            <AlertDialog.Close render={<Button className={cancelClasses} />}>
              {cancelLabel}
            </AlertDialog.Close>
            <AlertDialog.Close
              render={<Button className={confirmClasses} />}
              onClick={onConfirm}
            >
              {confirmLabel}
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Viewport>
    </AlertDialog.Portal>
  );

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger render={<Button className={triggerClasses} />}>
        {triggerIcon && triggerIconPosition === "leading" && triggerIcon}
        {trigger}
        {triggerIcon && triggerIconPosition === "trailing" && triggerIcon}
      </AlertDialog.Trigger>

      {popup}
    </AlertDialog.Root>
  );
}
