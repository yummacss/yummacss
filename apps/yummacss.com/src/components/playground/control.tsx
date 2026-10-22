"use client";

import { Button } from "@base-ui/react";
import { Select } from "@base-ui/react/select";
import { useState } from "react";
import { NavArrowDown } from "@/icons";

export function EnumSelect({
  name,
  values,
  value,
  onChange,
  inert,
  blocked = [],
}: {
  name: string;
  values: string[];
  value: string | null;
  onChange: (value: unknown) => void;
  inert?: boolean;
  blocked?: string[];
}) {
  const [open, setOpen] = useState(false);

  const popup = (
    <Select.Popup className="tp:a tdu:200 ttf:eo opening:o:0 opening:s:90 closing:o:0 closing:s:90 @prm:tp:none p:1 oy:auto w:32 max-h:40 bc:border bg:surface bw:1">
      <Select.List>
        {values.map((option) => (
          <Select.Item
            key={option}
            value={option}
            disabled={blocked.includes(option)}
            className={(state) =>
              `d:b px:2 py:1 ff:m fs:xs us:none ${
                state.disabled
                  ? "c:ink/30 c:na tdl:lt"
                  : state.highlighted
                    ? "bg:border c:accent c:p"
                    : "c:accent-dim c:p"
              }`
            }
          >
            <Select.ItemText>{option}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.List>
    </Select.Popup>
  );

  return (
    <Select.Root
      value={value}
      onValueChange={onChange}
      disabled={inert}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger
        aria-label={name}
        className={`d:f fs:0 ai:c jc:sb g:1 px:2 py:1 w:32 bg:surface a:bg:press bw:1 ff:m fs:xs us:none fv:oo:-1 fv:oc:accent ${
          inert ? "bc:border c:ink/40 c:na" : "bc:border c:ink c:p"
        }`}
      >
        <Select.Value className="o:h to:e ws:nw" />
        <NavArrowDown className="fs:0 w:3 h:3 c:ink/50" aria-hidden />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          data-chrome
          side="bottom"
          sideOffset={4}
          alignItemWithTrigger={false}
          collisionAvoidance={{ side: "none", fallbackAxisSide: "none" }}
          className="zi:50"
        >
          {popup}
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

/** Steps through named values, as the stepper does for numbers. */
export function StepSelect({
  name,
  values,
  value,
  min = 0,
  max = values.length - 1,
  onChange,
}: {
  name: string;
  values: string[];
  value: string;
  min?: number;
  max?: number;
  onChange: (value: string) => void;
}) {
  const index = values.indexOf(value);
  const button = (spent: boolean) =>
    `d:f fs:0 ai:c jc:c w:6 h:6 bw:0 bg:transparent ff:m fs:xs fv:oo:-1 fv:oc:accent ${
      spent ? "c:ink/25 c:na" : "c:ink/50 h:c:ink a:bg:press c:p"
    }`;

  return (
    <div className="d:f fs:0 ai:c jc:sb w:32 bc:border bg:surface bw:1">
      <Button
        type="button"
        aria-label={`Smaller ${name}`}
        disabled={index <= min}
        onClick={() => onChange(values[index - 1])}
        className={button(index <= min)}
      >
        &minus;
      </Button>
      <span aria-live="polite" className="ff:m fs:xs c:ink">
        {value}
      </span>
      <Button
        type="button"
        aria-label={`Larger ${name}`}
        disabled={index >= max}
        onClick={() => onChange(values[index + 1])}
        className={button(index >= max)}
      >
        +
      </Button>
    </div>
  );
}

function Bars({ colors }: { colors: string[] }) {
  return (
    <span aria-hidden className="d:f fs:0 g:px">
      {colors.map((color) => (
        <span
          key={color}
          className="d:b w:1 h:3"
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  );
}

/** A select whose options are colour families, each drawn as its shades. */
export function SwatchSelect({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; colors: string[] }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((option) => option.value === value);

  return (
    <Select.Root
      value={value}
      onValueChange={(next) => next && onChange(String(next))}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger
        aria-label={name}
        className="d:f fs:0 ai:c g:2 px:2 py:1 w:32 bg:surface a:bg:press bw:1 bc:border c:ink c:p ff:m fs:xs us:none fv:oo:-1 fv:oc:accent"
      >
        {current && <Bars colors={current.colors} />}
        <Select.Value className="f:1 o:h to:e ws:nw ta:l" />
        <NavArrowDown className="fs:0 w:3 h:3 c:ink/50" aria-hidden />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          data-chrome
          side="bottom"
          sideOffset={4}
          alignItemWithTrigger={false}
          collisionAvoidance={{ side: "none", fallbackAxisSide: "none" }}
          className="zi:50"
        >
          <Select.Popup className="tp:a tdu:200 ttf:eo opening:o:0 opening:s:90 closing:o:0 closing:s:90 @prm:tp:none p:1 oy:auto w:32 max-h:72 bc:border bg:surface bw:1">
            <Select.List>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={(state) =>
                    `d:f ai:c g:2 px:2 py:1 ff:m fs:xs us:none c:p ${
                      state.highlighted
                        ? "bg:border c:accent"
                        : state.selected
                          ? "c:ink"
                          : "c:accent-dim"
                    }`
                  }
                >
                  <Bars colors={option.colors} />
                  <Select.ItemText>{option.value}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
