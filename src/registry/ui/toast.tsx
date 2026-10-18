"use client";

import { Button } from "@base-ui/react/button";
import { Toast } from "@base-ui/react/toast";
import { CloseIcon } from "@solar-icons/react/outline";
import type { CSSProperties, ReactNode } from "react";
import { merge } from "yummacss/merge";

type Shape = "rounded" | "square" | "squircle";
type TriggerTone = "neutral" | "danger";

const TOAST_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const BUTTON_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const ACTION_SHAPES: Record<Shape, string> = {
  rounded: "br:md",
  square: "",
  squircle: "br:lg cs:s",
};

const CLOSE_SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:lg cs:s",
};

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const RAISED =
  "bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label h:bg:well";

const DANGER_OUTLINE = "fv:oc:red-2/60 fv:bc:red-3";

const TRIGGER_TONES: Record<TriggerTone, string> = {
  neutral: RAISED,
  danger:
    "bg:red h:bg:red-8 btc:red-5 blc:red-8 brc:red-8 bbc:red-9 c:white bs-o:sm",
};

const BUTTON_BASE = "bw:1 fw:500 tp:c tdu:150 ttf:io us:none c:p";

// a collapsed toast peeks out under the one in front and shrinks with depth
const STACK = {
  "--gap": "0.75rem",
  "--peek": "0.75rem",
  "--scale": "calc(max(0, 1 - (var(--toast-index) * 0.1)))",
  "--shrink": "calc(1 - var(--scale))",
  "--height": "var(--toast-frontmost-height, var(--toast-height))",
  "--offset-y":
    "calc(var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) + var(--toast-swipe-movement-y))",
  zIndex: "calc(1000 - var(--toast-index))",
} as CSSProperties;

const COLLAPSED =
  "translateX(var(--toast-swipe-movement-x)) translateY(calc(var(--toast-swipe-movement-y) - (var(--toast-index) * var(--peek)) - (var(--shrink) * var(--height)))) scale(var(--scale))";
const EXPANDED =
  "translateX(var(--toast-swipe-movement-x)) translateY(var(--offset-y))";

// where a toast goes as it leaves: off the edge it was swiped toward, else down
const LEAVING: Record<string, string> = {
  up: "translateY(calc(var(--toast-swipe-movement-y) - 150%))",
  down: "translateY(calc(var(--toast-swipe-movement-y) + 150%))",
  left: "translateX(calc(var(--toast-swipe-movement-x) - 150%)) translateY(var(--offset-y))",
  right:
    "translateX(calc(var(--toast-swipe-movement-x) + 150%)) translateY(var(--offset-y))",
};

function place(state: Toast.Root.State): CSSProperties {
  let transform = state.expanded ? EXPANDED : COLLAPSED;
  if (state.transitionStatus === "starting") transform = "translateY(150%)";
  if (state.transitionStatus === "ending") {
    transform = LEAVING[state.swipeDirection ?? ""] ?? "translateY(150%)";
  }
  return {
    ...STACK,
    height: state.expanded ? "var(--toast-height)" : "var(--height)",
    transform,
  };
}

export interface ToastProps {
  /** The button that raises a toast. Each press adds one to the stack. */
  trigger: ReactNode;
  /** The toast's first line. */
  title: string;
  /** A line under the title. */
  description?: string;
  /** A button in the toast, `Undo` usually. Leave it out for none. */
  actionLabel?: string;
  /** Called when the action is pressed. The toast closes either way. */
  onAction?: () => void;
  /** Milliseconds before a toast closes by itself. `0` keeps it open. */
  timeout?: number;
  /** How many toasts stay visible; older ones wait until there is room. */
  limit?: number;
  /**
   * The trigger's color: `danger` when the action it reports destroys
   * something.
   */
  triggerTone?: TriggerTone;
  /**
   * Corner radius of the toast and its buttons. `squircle` uses `corner-shape`,
   * which degrades to a rounded square where that is unsupported.
   */
  shape?: Shape;
  /**
   * Toasts slide in, stack and swipe away. Turn it off for an instant change,
   * or when the user has asked for reduced motion.
   */
  animated?: boolean;
  /** Extra classes for the trigger. */
  className?: string;
  /**
   * The focus outline. `true` draws it, `false` removes it, and a string of
   * Yumma CSS utilities restyles it on every focusable part of the component,
   * which is more than `className` reaches. Removing it outright and putting
   * nothing back fails WCAG 2.4.7.
   */
  focus?: boolean | string;
  /**
   * Where the toasts are portalled. Leave it empty for the document body; set
   * it inside a frame or a container that owns its own stacking context.
   */
  container?: HTMLElement | null;
}

/**
 * A trigger that raises a toast, with a title, an optional description and
 * action, stacked at the bottom of the screen and swiped away.
 */
export default function ToastBase({
  trigger,
  title,
  description,
  actionLabel,
  onAction,
  timeout = 5000,
  limit = 3,
  triggerTone = "neutral",
  shape = "rounded",
  animated = true,
  className,
  focus = true,
  container,
}: ToastProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";
  const triggerOutline =
    focus && triggerTone === "danger" ? merge(FOCUS, DANGER_OUTLINE) : outline;

  return (
    <Toast.Provider timeout={timeout} limit={limit}>
      <Trigger
        className={merge(
          triggerOutline,
          "d:if ai:c g:2 px:4 py:2 fs:sm",
          BUTTON_BASE,
          BUTTON_SHAPES[shape],
          TRIGGER_TONES[triggerTone],
          className,
        )}
        title={title}
        description={description}
        actionLabel={actionLabel}
        onAction={onAction}
      >
        {trigger}
      </Trigger>
      <Toast.Portal container={container}>
        <Toast.Viewport className="p:f r:4 b:4 l:4 zi:50 os:none @sm:l:auto @sm:w:90">
          <Stack shape={shape} animated={animated} outline={outline} />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function Trigger({
  className,
  title,
  description,
  actionLabel,
  onAction,
  children,
}: Pick<ToastProps, "title" | "description" | "actionLabel" | "onAction"> & {
  className: string;
  children: ReactNode;
}) {
  const manager = Toast.useToastManager();
  const raise = () => {
    // the action runs, then its toast goes: an undone change needs no message
    const id = manager.add({
      title,
      description,
      actionProps: actionLabel
        ? {
            children: actionLabel,
            onClick: () => {
              onAction?.();
              manager.close(id);
            },
          }
        : undefined,
    });
  };
  return (
    <Button className={className} onClick={raise}>
      {children}
    </Button>
  );
}

function Stack({
  shape,
  animated,
  outline,
}: {
  shape: Shape;
  animated: boolean;
  outline: string;
}) {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      swipeDirection={["down", "right"]}
      style={place}
      className={(state) =>
        merge(
          outline,
          "p:a r:0 b:0 w:100% bg:raised bc:line bw:1 bs-o:xl us:none",
          TOAST_SHAPES[shape],
          animated ? "tp:a tdu:500 ttf:out-quart @prm:tp:none" : "",
          state.transitionStatus === "ending" || state.limited ? "o:0" : "",
        )
      }
    >
      {/* bridges the gap between toasts, so the stack stays open as the pointer crosses it */}
      <span aria-hidden className="p:a t:100% l:0 w:100% h:4" />
      <Toast.Content
        className={(state) =>
          [
            "d:f ai:c g:3 py:3 pl:4 pr:3 o:h",
            animated ? "tp:o tdu:250 ttf:out-quart @prm:tp:none" : "",
            state.behind && !state.expanded ? "o:0" : "",
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        <div className="d:f fd:c g:1 f:1 min-w:0">
          <Toast.Title className="m:0 c:label fs:sm fw:600" />
          <Toast.Description className="m:0 c:hint fs:sm" />
        </div>
        <Toast.Action
          className={merge(
            outline,
            "fs:0 px:3 py:1 fs:xs",
            BUTTON_BASE,
            ACTION_SHAPES[shape],
            RAISED,
          )}
        />
        <Toast.Close
          aria-label="Dismiss"
          render={
            <Button
              className={merge(
                outline,
                "d:f fs:0 ai:c jc:c w:7 h:7 p:0 c:hint bw:0 bg:transparent c:p h:bg:well h:c:hint",
                CLOSE_SHAPES[shape],
              )}
            />
          }
        >
          <CloseIcon aria-hidden className="w:4 h:4" />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}
