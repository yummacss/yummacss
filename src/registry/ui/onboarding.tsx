"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { Tabs } from "@base-ui/react/tabs";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@solar-icons/react/outline";
import type { ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import { merge } from "yummacss/merge";

type Indicator = "count" | "progress" | "dots" | "checklist";
type IconPosition = "leading" | "trailing";
type Shape = "rounded" | "square" | "squircle";

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br:xxl",
  square: "",
  squircle: "br:3xl cs:s",
};

const CONTROL_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

// the step's icon tile and the two cards fanned behind it
const TILE_SHAPES: Record<Shape, string> = {
  rounded: "br:xl",
  square: "",
  squircle: "br:xxl cs:s",
};

const CHECK_SHAPES: Record<Shape, string> = {
  rounded: "br:sm",
  square: "",
  squircle: "br:md cs:s",
};

// the progress track and the step dots, as Progress draws its track
const TRACK_SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:slate-4/60 fv:bc:slate-6";

const CONTROL_BASE = "d:f ai:c jc:c w:8 h:8 bw:1 tp:c tdu:150 ttf:io us:none";

export interface OnboardingTask {
  id: string;
  label: string;
}

export interface OnboardingStep {
  icon: ReactNode;
  title: string;
  description: string;
  tasks?: OnboardingTask[];
}

export interface OnboardingProps {
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
  /** Which end of the trigger its `triggerIcon` sits at. */
  iconPosition?: IconPosition;
  /**
   * Each step's `icon`, `title` and `description`. Steps advance one at a time
   * and the dialog resets to the first when it closes.
   */
  steps: OnboardingStep[];
  /**
   * `count` reads "1 / 3" in the header. `progress` draws a filling bar under
   * the slide. `dots` moves navigation to a bottom row of step dots between
   * prev/next arrows. `checklist` counts the current step's `tasks` instead of
   * the steps, and falls back to the step count on a step with none.
   */
  indicator?: Indicator;
  /**
   * Esc closes the tour, as it does any dialog. Turn it off for a tour that
   * must be finished or closed from its last step.
   */
  closeOnEscape?: boolean;
  /**
   * The popup's grow and shrink as steps of different heights come and go. Only
   * steps with `tasks` change height, so this does nothing without them.
   */
  animatedResize?: boolean;
  /** Corner radius on the trigger, the popup and its controls. */
  shape?: Shape;
  /**
   * The slide transition between steps and the popup's scale-in. Turn it off
   * for an instant tour, or when the user has asked for reduced motion.
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
 * A paged product tour in a dialog, one step at a time, with a count or a
 * progress bar.
 */
export default function OnboardingBase({
  trigger,
  triggerIcon,
  iconPosition = "leading",
  steps,
  indicator = "count",
  closeOnEscape = true,
  animatedResize = true,
  shape = "rounded",
  animated = true,
  className,
  focus = true,
  container,
}: OnboardingProps) {
  const outline = focus ? merge(FOCUS, focus === true ? "" : focus) : "";

  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [checked, setChecked] = useState<Record<number, Set<string>>>({});

  const step = steps[page];
  const isFirst = page === 0;
  const isLast = page === steps.length - 1;
  const doneCount = checked[page]?.size ?? 0;

  const showTasks = indicator === "checklist";
  const tasks = showTasks ? step.tasks : undefined;
  const allTasksDone = !tasks || doneCount >= tasks.length;

  const resizes = animated && animatedResize;
  const watcher = useRef<ResizeObserver | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  const contentRef = useCallback(
    (node: HTMLDivElement | null) => {
      watcher.current?.disconnect();
      if (!node || !resizes) {
        setContentHeight(null);
        return;
      }
      const measure = () => setContentHeight(node.offsetHeight);
      measure();
      watcher.current = new ResizeObserver(measure);
      watcher.current.observe(node);
    },
    [resizes],
  );

  const go = (next: number) => {
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  const toggleTask = (taskId: string) => {
    setChecked((prev) => {
      const next = new Set(prev[page] ?? []);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return { ...prev, [page]: next };
    });
  };

  const triggerClasses = merge(
    outline,
    "bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs d:if ai:c g:2 px:3 py:2 c:label bw:1 fs:sm fw:500 tp:c tdu:150 ttf:io us:none h:bg:well",
    CONTROL_SHAPES[shape],
    className,
  );

  const popupClasses = [
    "o:h p:r w:96 bg:raised bc:line c:label bw:1 os:none bs-o:xl",
    POPUP_SHAPES[shape],
  ]
    .filter(Boolean)
    .join(" ");

  const backClasses = merge(
    outline,
    CONTROL_BASE,
    CONTROL_SHAPES[shape],
    "bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label h:bg:well",
  );

  const forwardClasses = merge(
    outline,
    CONTROL_BASE,
    CONTROL_SHAPES[shape],
    allTasksDone
      ? "bg:fill btc:white/20 blc:black/40 brc:black/40 bbc:black/60 bs-o:sm h:o:90 c:on-fill"
      : "bg:well bc:line c:hint o:60",
  );

  const slide = (
    <div className="d:f fd:c ai:c g:3">
      <div className="d:ib p:r">
        <div
          className={`p:a l:-3 h:12 w:12 bg:raised/70 bc:line bw:1 ro:-3 tty:1 ${TILE_SHAPES[shape]}`}
        />
        <div
          className={`p:a r:-3 h:12 w:12 bg:raised/70 bc:line bw:1 ro:3 tty:1 ${TILE_SHAPES[shape]}`}
        />
        <div
          className={`d:f p:r ai:c jc:c h:14 w:14 bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label bw:1 ${TILE_SHAPES[shape]}`}
        >
          {step.icon}
        </div>
      </div>
      <span className="c:label fs:md fw:500">{step.title}</span>
      <p className="m:0 c:hint fs:sm lh:4">{step.description}</p>
      {tasks && tasks.length > 0 && (
        <div className="d:f fd:c g:2 w:100% pt:2 ta:l">
          {tasks.map((task) => {
            const isChecked = checked[page]?.has(task.id) ?? false;
            return (
              <Button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={merge(
                  outline,
                  "d:f ai:c g:2 px:3 py:2 w:100% bw:0 fs:sm ta:l us:none c:p",
                  CONTROL_SHAPES[shape],
                  "bg:well",
                )}
              >
                <div
                  className={`d:f ai:c jc:c w:4 h:4 bw:1 fs:0 ${CHECK_SHAPES[shape]} ${
                    isChecked ? "bg:check c:white bw:0" : "bc:rim"
                  }`}
                >
                  {isChecked && <CheckIcon className="w:3 h:3" />}
                </div>
                <span className={isChecked ? "c:green-7" : "c:label"}>
                  {task.label}
                </span>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );

  const popup = (
    <AlertDialog.Portal container={container} keepMounted>
      <AlertDialog.Backdrop
        className={`p:f i:0 min-h:dvh bg:shadow/30 bf-b:xs ${animated ? "tp:o tdu:250 ttf:out-quart opening:o:0 closing:o:0 closing:tdu:150 closing:ttf:eo @prm:tp:none" : ""}`}
      />
      <AlertDialog.Viewport className="d:f p:f i:0 ai:c jc:c">
        <AlertDialog.Popup
          ref={popupRef}
          initialFocus={(type) => type === "keyboard" || popupRef.current}
          className={`${popupClasses} ${animated ? "tp:a tdu:250 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:150 closing:ttf:eo @prm:tp:none" : ""}`}
          style={{ maxWidth: "90vw" }}
        >
          {indicator !== "dots" && (
            <div className="d:f ai:c jc:sb px:8 pt:5">
              <div className="d:f ai:c g:2">
                {indicator === "count" && (
                  <span className="c:hint fs:xs">
                    {page + 1} / {steps.length}
                  </span>
                )}
                {indicator === "checklist" && (
                  <span className="c:hint fs:xs">
                    {tasks?.length
                      ? `${doneCount} / ${tasks.length} done`
                      : `${page + 1} / ${steps.length}`}
                  </span>
                )}
              </div>
              <div className="d:f g:2">
                {!isFirst && (
                  <Button
                    onClick={() => go(page - 1)}
                    className={backClasses}
                    aria-label="Previous"
                  >
                    <ArrowLeftIcon className="w:4 h:4" />
                  </Button>
                )}
                {isLast ? (
                  <AlertDialog.Close
                    render={<Button className={forwardClasses} />}
                    aria-label="Finish"
                  >
                    <CheckIcon className="w:4 h:4" />
                  </AlertDialog.Close>
                ) : (
                  <Button
                    onClick={() => go(page + 1)}
                    disabled={!allTasksDone}
                    className={forwardClasses}
                    aria-label="Next"
                  >
                    <ArrowRightIcon className="w:4 h:4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          <div className="px:8 pt:4 pb:10">
            <div
              className={`d:f p:r o:h fd:c jc:c ${resizes ? "tp:h tdu:250 ttf:out-quart" : ""}`}
              style={
                resizes && contentHeight !== null
                  ? { height: contentHeight }
                  : undefined
              }
            >
              <div ref={contentRef} className="d:f fd:c ai:c w:100% ta:c">
                {animated ? (
                  <div
                    key={page}
                    className={`d:f fd:c ai:c g:3 ${
                      direction > 0
                        ? "tp:a tdu:250 ttf:out-quart @st:o:0 @st:ttx:10 @prm:tp:none"
                        : "tp:a tdu:250 ttf:out-quart @st:o:0 @st:ttx:-10 @prm:tp:none"
                    }`}
                  >
                    {slide}
                  </div>
                ) : (
                  slide
                )}
              </div>
            </div>
          </div>

          {indicator === "progress" && (
            <div className="d:f jc:c pb:6">
              <div className={`p:r o:h w:32 h:1 bg:rim ${TRACK_SHAPES[shape]}`}>
                <div
                  className={`p:a l:0 t:0 h:100% bg:fill tp:w tdu:250 ttf:out-quart ${TRACK_SHAPES[shape]}`}
                  style={{ width: `${((page + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {indicator === "dots" && (
            <div className="d:f ai:c jc:c g:4 pb:8">
              <Button
                onClick={() => go(page - 1)}
                disabled={isFirst}
                className={merge(
                  outline,
                  "d:f ai:c jc:c w:8 h:8 bw:0 us:none",
                  CONTROL_SHAPES[shape],
                  isFirst ? "c:hint o:40" : "c:hint h:bg:well h:c:label c:p",
                )}
                aria-label="Previous"
              >
                <ArrowLeftIcon className="w:4 h:4" />
              </Button>
              <Tabs.Root
                value={String(page)}
                onValueChange={(v) => go(Number(v))}
              >
                <Tabs.List className="d:f g:2 jc:c">
                  {steps.map((_, index) => (
                    <Tabs.Tab
                      key={String(index)}
                      value={String(index)}
                      className={(state) =>
                        merge(
                          outline,
                          "d:f ai:c jc:c w:4 h:4 bw:0 us:none c:p",
                          TRACK_SHAPES[shape],
                          state.active ? "bg:fill" : "bg:rim",
                        )
                      }
                    />
                  ))}
                </Tabs.List>
              </Tabs.Root>
              {isLast ? (
                <AlertDialog.Close
                  render={<Button className={forwardClasses} />}
                  aria-label="Finish"
                >
                  <CheckIcon className="w:4 h:4" />
                </AlertDialog.Close>
              ) : (
                <Button
                  onClick={() => go(page + 1)}
                  disabled={!allTasksDone}
                  className={merge(
                    outline,
                    "d:f ai:c jc:c w:8 h:8 bw:0 us:none",
                    CONTROL_SHAPES[shape],
                    allTasksDone
                      ? "c:hint h:bg:well h:c:label c:p"
                      : "c:hint o:40",
                  )}
                  aria-label="Next"
                >
                  <ArrowRightIcon className="w:4 h:4" />
                </Button>
              )}
            </div>
          )}
        </AlertDialog.Popup>
      </AlertDialog.Viewport>
    </AlertDialog.Portal>
  );

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(next, details) => {
        if (!next && !closeOnEscape && details.reason === "escape-key") {
          details.cancel();
          return;
        }
        setOpen(next);
        if (!next) {
          setPage(0);
          setDirection(0);
          setChecked({});
        }
      }}
    >
      <AlertDialog.Trigger render={<Button className={triggerClasses} />}>
        {triggerIcon && iconPosition === "leading" && triggerIcon}
        <span>{trigger}</span>
        {triggerIcon && iconPosition === "trailing" && triggerIcon}
      </AlertDialog.Trigger>

      {popup}
    </AlertDialog.Root>
  );
}
