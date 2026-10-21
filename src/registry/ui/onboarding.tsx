"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { Toggle } from "@base-ui/react/toggle";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { merge } from "yummacss/merge";

type IconPosition = "leading" | "trailing";
type Shape = "rounded" | "square" | "squircle";

const POPUP_SHAPES: Record<Shape, string> = {
  rounded: "br:xl",
  square: "",
  squircle: "br:3xl cs:s",
};

const CONTROL_SHAPES: Record<Shape, string> = {
  rounded: "br:lg",
  square: "",
  squircle: "br:xxl cs:s",
};

const STEP_SHAPES: Record<Shape, string> = {
  rounded: "br:9999",
  square: "",
  squircle: "br:xxl cs:s",
};

const FOCUS = "fv:os:s fv:ow:3 fv:oo:0 fv:oc:focus/40 fv:bc:focus";

const BUTTON =
  "d:if ai:c jc:c g:2 px:4 py:2 bw:1 fs:sm fw:600 tp:c tdu:150 ttf:io us:none c:p";
const RAISED =
  "bg:raised btc:rim blc:rim brc:rim bbc:shadow bs-o:xs c:label h:bg:well";
const FILLED =
  "bg:fill btc:white/20 blc:black/40 brc:black/40 bbc:black/60 bs-o:sm h:o:90 c:on-fill";

// a picked choice sinks in, like a pressed toggle
const PICKED = "bg:well bs-i:md btc:shadow blc:line brc:line bbc:rim c:check";

export interface OnboardingChoice {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Picked when the step first shows. */
  picked?: boolean;
}

export interface OnboardingStep {
  title: string;
  description: string;
  /** Things to pick on this step, each a toggle that stays pressed in. */
  choices?: OnboardingChoice[];
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
   * Each step's `title`, `description` and optional `choices`. Steps advance
   * one at a time and the dialog resets to the first when it closes.
   */
  steps: OnboardingStep[];
  /** Called on the last step's Done with the id of every picked choice. */
  onFinish?: (picked: string[]) => void;
  /** The last step's button. */
  finishLabel?: string;
  /**
   * Esc closes the tour, as it does any dialog. Turn it off for a tour that
   * must be finished or closed from its last step.
   */
  closeOnEscape?: boolean;
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

function initialPicks(steps: OnboardingStep[]): Set<string> {
  return new Set(
    steps.flatMap((step) =>
      (step.choices ?? []).filter((c) => c.picked).map((c) => c.id),
    ),
  );
}

/**
 * A paged setup in a dialog, one step at a time, with a step bar and choices to
 * pick on the way.
 */
export default function OnboardingBase({
  trigger,
  triggerIcon,
  iconPosition = "leading",
  steps,
  onFinish,
  finishLabel = "Done",
  closeOnEscape = true,
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
  const [picked, setPicked] = useState(() => initialPicks(steps));

  const step = steps[page];
  const isFirst = page === 0;
  const isLast = page === steps.length - 1;

  const go = (next: number) => {
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  const pick = (id: string, on: boolean) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  const control = merge(outline, BUTTON, CONTROL_SHAPES[shape]);

  const slide = (
    <div className="d:f fd:c g:2">
      <AlertDialog.Title className="m:0 c:label fs:md fw:700">
        {step.title}
      </AlertDialog.Title>
      <AlertDialog.Description className="m:0 c:hint fs:sm">
        {step.description}
      </AlertDialog.Description>
      {step.choices && step.choices.length > 0 && (
        <div className="d:f fw:w g:2 pt:2">
          {step.choices.map((choice) => (
            <Toggle
              key={choice.id}
              pressed={picked.has(choice.id)}
              onPressedChange={(on) => pick(choice.id, on)}
              className={(state) =>
                merge(
                  outline,
                  "d:if ai:c g:2 px:3 py:2 bw:1 fs:sm fw:500 us:none c:p tp:c tdu:150 ttf:io",
                  CONTROL_SHAPES[shape],
                  state.pressed ? PICKED : RAISED,
                )
              }
            >
              {choice.icon}
              {choice.label}
            </Toggle>
          ))}
        </div>
      )}
    </div>
  );

  const popup = (
    <AlertDialog.Portal container={container} keepMounted>
      <AlertDialog.Backdrop
        className={`p:f i:0 min-h:dvh bg:shadow/30 bf-b:xs ${animated ? "tp:o tdu:250 ttf:out-quart opening:o:0 closing:o:0 closing:tdu:150 closing:ttf:eo @prm:tp:none" : ""}`}
      />
      <AlertDialog.Viewport className="d:f p:f i:0 ai:c jc:c p:4">
        {/* no display on the popup: a class would beat the `hidden` Base UI sets once it closes */}
        <AlertDialog.Popup
          ref={popupRef}
          initialFocus={(type) => type === "keyboard" || popupRef.current}
          className={merge(
            "o:h w:112 max-w:100% p:5 bg:raised bc:line c:label bw:1 os:none bs-o:xl",
            POPUP_SHAPES[shape],
            animated &&
              "tp:a tdu:250 ttf:out-quart opening:o:0 opening:s:95 closing:o:0 closing:s:95 closing:tdu:150 closing:ttf:eo @prm:tp:none",
          )}
        >
          <div className="d:f fd:c g:4">
            <div className="d:f ai:c jc:sb g:3">
              <div aria-hidden className="d:f g:2">
                {steps.map((_, index) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: steps are positional
                    key={index}
                    className={merge(
                      "w:6 h:1",
                      STEP_SHAPES[shape],
                      index <= page ? "bg:check" : "bg:rim",
                      animated && "tp:c tdu:250 ttf:out-quart @prm:tp:none",
                    )}
                  />
                ))}
              </div>
              <span className="c:hint fs:xs">
                Step {page + 1} of {steps.length}
              </span>
            </div>

            {animated ? (
              <div
                key={page}
                className={
                  direction > 0
                    ? "tp:a tdu:250 ttf:out-quart @st:o:0 @st:ttx:10 @prm:tp:none"
                    : direction < 0
                      ? "tp:a tdu:250 ttf:out-quart @st:o:0 @st:ttx:-10 @prm:tp:none"
                      : ""
                }
              >
                {slide}
              </div>
            ) : (
              slide
            )}

            <div className="d:f ai:c jc:sb g:2 pt:2">
              {isFirst ? (
                <AlertDialog.Close
                  render={<Button className={merge(control, RAISED)} />}
                >
                  Skip
                </AlertDialog.Close>
              ) : (
                <Button
                  onClick={() => go(page - 1)}
                  className={merge(control, RAISED)}
                >
                  Back
                </Button>
              )}
              {isLast ? (
                <AlertDialog.Close
                  render={<Button className={merge(control, FILLED)} />}
                  onClick={() => onFinish?.([...picked])}
                >
                  {finishLabel}
                </AlertDialog.Close>
              ) : (
                <Button
                  onClick={() => go(page + 1)}
                  className={merge(control, FILLED)}
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
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
          setPicked(initialPicks(steps));
        }
      }}
    >
      <AlertDialog.Trigger
        render={
          <Button
            className={merge(
              outline,
              "d:if ai:c g:2 px:3 py:2 bw:1 fs:sm fw:500 tp:c tdu:150 ttf:io us:none",
              RAISED,
              CONTROL_SHAPES[shape],
              className,
            )}
          />
        }
      >
        {triggerIcon && iconPosition === "leading" && triggerIcon}
        <span>{trigger}</span>
        {triggerIcon && iconPosition === "trailing" && triggerIcon}
      </AlertDialog.Trigger>

      {popup}
    </AlertDialog.Root>
  );
}
