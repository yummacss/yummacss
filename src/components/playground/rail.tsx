"use client";

import { Button } from "@base-ui/react";
import { Collapsible } from "@base-ui/react/collapsible";
import Link from "next/link";
import { useState } from "react";
import { BaseUI } from "@/components/icons/icons";
import { usePlayground } from "@/components/playground/context";
import Control, {
  EnumSelect,
  StepSelect,
  SwatchSelect,
} from "@/components/playground/control";
import PropDescription from "@/components/prop-description";
import Scroller from "@/components/ui/scroller";
import { NavArrowDown } from "@/icons";
import { getRegistryTarget, type RegistryProp } from "@/registry";
import { ACCENTS, accentBars } from "@/utils/accent";
import { type Primitives, primitiveSlug } from "@/utils/primitive";
import { isControllable, isInert, STYLE_OWNED, typeOf } from "@/utils/props";
import { SCHEMES, type Scheme } from "@/utils/scheme";
import { RADIUS, STYLES } from "@/utils/styles.mjs";

export default function PlaygroundRail({
  primitives,
}: {
  primitives: Primitives;
}) {
  const playground = usePlayground();
  const [open, setOpen] = useState<string | null>(null);

  const props = playground?.meta?.props ?? [];

  const target = playground ? getRegistryTarget(playground.id) : null;
  const primitive = target
    ? primitiveSlug(primitives, target.component, target.install)
    : null;

  const [more, setMore] = useState(false);

  const toggle = (name: string) =>
    setOpen((current) => (current === name ? null : name));

  // an Example shows the props in use, so the rail lists them rather than setting them
  const example = Boolean(playground?.meta?.scene);
  const listed = props.filter((prop) => !STYLE_OWNED.includes(prop.name));
  const settable = example ? [] : props.filter(isControllable);
  const inCode = example ? [] : listed.filter((prop) => !isControllable(prop));

  const row = (prop: RegistryProp) => {
    const inert = example
      ? null
      : isInert(prop, playground?.values ?? {}, props);
    return (
      <Row
        key={prop.name}
        prop={prop}
        inert={inert}
        open={open === prop.name}
        onToggle={() => toggle(prop.name)}
      >
        {!example && isControllable(prop) ? (
          <Control
            prop={prop}
            inert={Boolean(inert)}
            value={playground?.values[prop.name]}
            onChange={(value) => playground?.setValue(prop.name, value)}
          />
        ) : (
          <code className="fs:0 c:ink/70 fs:xs ff:m">{typeOf(prop)}</code>
        )}
      </Row>
    );
  };

  return (
    <aside className="bc:border btw:1 @lg:btw:0 @lg:blw:1 @lg:gc-s:3">
      <Scroller className="@lg:p:st @lg:t:20 @lg:max-h:calc(100dvh-5rem)">
        <div className="pt:8 pb:12 @lg:pt:0 @lg:px:8">
          {playground && <Look />}

          <div className="d:f ai:c jc:sb g:2 mb:3">
            <h3 className="ff:system c:silver-8 fs:xs fw:600 ls:2 tt:u">
              Component API
            </h3>
            {primitive && (
              <Link
                href={`https://base-ui.com/react/components/${primitive}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Base UI reference"
                className="d:f ai:c jc:c fs:0 c:ink/70 td:none h:c:ink fv:oc:accent fv:ow:2"
              >
                <BaseUI className="w:4 h:4" />
              </Link>
            )}
          </div>

          <p className="m:0 mb:3 c:ink/60 fs:xs lh:4">
            The file you copy is yours. Change anything in it.
          </p>

          {example
            ? listed.map((prop) => row(prop))
            : settable.map((prop) => row(prop))}

          {inCode.length > 0 && (
            <Collapsible.Root open={more} onOpenChange={setMore}>
              <Collapsible.Trigger className="d:f ai:c jc:sb w:100% px:0 py:3 bg:transparent bw:0 bc:border bbw:1 ta:l c:silver-8 fs:xs c:p h:c:ink fv:oo:-1 fv:oc:accent">
                {more
                  ? `Hide the ${inCode.length} set in code`
                  : `${inCode.length} more, set in code`}
                <NavArrowDown
                  aria-hidden
                  className={`fs:0 w:3 h:3 tp:t tdu:150 ${more ? "ro:36" : ""}`}
                />
              </Collapsible.Trigger>
              <Collapsible.Panel>
                {inCode.map((prop) => row(prop))}
              </Collapsible.Panel>
            </Collapsible.Root>
          )}
        </div>
      </Scroller>
    </aside>
  );
}

function Row({
  prop,
  inert,
  open,
  onToggle,
  children,
}: {
  prop: RegistryProp;
  inert?: string | null;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  // a long name ends in an ellipsis; the control wraps only when even 3rem of name will not fit
  const name = (
    // open, a truncated name wraps to show in full
    <code
      className={`min-w:0 c:code fs:xs ff:m ${open ? "ow:ba" : "o:h to:e ws:nw"}`}
    >
      {prop.name}
    </code>
  );

  return (
    <div className="py:2 bc:border bbw:1">
      <div className="d:f fw:w ai:c jc:sb g:2">
        {prop.description ? (
          <Button
            onClick={onToggle}
            aria-expanded={open}
            className={`d:f f:1 min-w:12 ai:c g:1 p:0 bg:transparent bw:0 ta:l c:p fv:oo:-1 fv:oc:accent ${open ? "fb:100%" : ""}`}
          >
            {name}
            <NavArrowDown
              aria-hidden
              className={`fs:0 w:3 h:3 tp:c tdu:150 ${
                open ? "ro:36 c:accent" : "c:ink/25"
              }`}
            />
          </Button>
        ) : (
          <span className="d:f f:1 min-w:12">{name}</span>
        )}
        {children}
      </div>

      {inert && (
        <div className="mt:1 c:ink/50 fs:xs">
          Does nothing while <code className="ff:m">{inert}</code>.
        </div>
      )}

      {open && (
        <div className="mt:2 c:ink/60 fs:sm lh:4">
          <PropDescription text={prop.description} />
        </div>
      )}
    </div>
  );
}

const SPECS: Record<string, { allow: string[] }> = STYLES;

const SWATCHES = ACCENTS.map((family) => ({
  value: family,
  colors: accentBars(family),
}));

/** Style, Radius, Accent and Scheme, as rows like the Component API's. */
function Look() {
  const playground = usePlayground();
  if (!playground) return null;
  const spec = SPECS[playground.style];
  const allowed = RADIUS.map((step) => spec.allow.includes(step));
  const line = (name: string, control: React.ReactNode) => (
    <div className="d:f fw:w ai:c jc:sb g:2 py:2 bc:border bbw:1">
      <code className="c:code fs:xs ff:m">{name}</code>
      {control}
    </div>
  );

  return (
    <div className="d:f fd:c pb:4 mb:4">
      <h3 className="ff:system mb:1 c:silver-8 fs:xs fw:600 ls:2 tt:u">Look</h3>
      <p className="m:0 mb:1 c:ink/60 fs:xs lh:4">
        The accent & scheme tint the preview only.
      </p>
      {line(
        "style",
        <EnumSelect
          name="style"
          values={Object.keys(STYLES)}
          value={playground.style}
          onChange={(value) => playground.setStyle(String(value))}
        />,
      )}
      {line(
        "radius",
        <StepSelect
          name="radius"
          values={RADIUS}
          value={playground.radius}
          min={allowed.indexOf(true)}
          max={allowed.lastIndexOf(true)}
          onChange={playground.setRadius}
        />,
      )}
      {line(
        "accent",
        <SwatchSelect
          name="accent"
          options={SWATCHES}
          value={playground.accent}
          onChange={playground.setAccent}
        />,
      )}
      {line(
        "scheme",
        <EnumSelect
          name="scheme"
          values={[...SCHEMES]}
          value={playground.scheme}
          onChange={(value) => playground.setScheme(value as Scheme)}
        />,
      )}
    </div>
  );
}
