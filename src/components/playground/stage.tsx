"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ComponentType, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePlayground } from "@/components/playground/context";
import PreviewFrame, { usePreviewContainer } from "@/components/preview-frame";
import { Tabs, TabsPanel } from "@/components/tabs";
import TokenBlock from "@/components/ui/token-block";
import {
  getRegistryTarget,
  type RegistryMeta,
  registryConfig,
} from "@/registry";
import { accentCss, DEFAULT_ACCENT } from "@/utils/accent";
import {
  type DemoProps,
  exampleChildren,
  renderScene,
  resolveIcons,
  sceneIds,
  seedValues,
} from "@/utils/demo";
import {
  getCachedRegistryComponent,
  loadRegistryComponent,
} from "@/utils/prefetch-registry";
import { schemeCss } from "@/utils/scheme";
import { buildConfig, buildScene, buildUsage } from "@/utils/snippet";
import {
  DEFAULT_STYLE,
  radiusCss,
  STYLES,
  styleProps,
} from "@/utils/styles.mjs";

const FILL = "d:f fd:c f:1 min-h:0";

// the markdown code tabs' own classes (code-tabs.tsx): the open tab has no bottom edge
const FILE_TAB =
  "d:f ai:c px:4 py:2 @sm:px:6 m:0 brw:1 bc:border fs:sm ff:m ws:nw c:p a:none fv:os:s fv:ow:2 fv:oo:-2 fv:oc:accent";

const LANGUAGE: Record<string, string> = {
  preview: "Preview",
  code: "TSX",
  config: "JavaScript",
};

interface Frame {
  id: string;
  meta: RegistryMeta;
  values: DemoProps;
  Component: ComponentType<DemoProps>;
}

export default function ComponentPlayground() {
  const playground = usePlayground();
  const playgroundRef = useRef(playground);
  playgroundRef.current = playground;
  const [tab, setTab] = useState("preview");
  const [frame, setFrame] = useState<Frame | null>(() => {
    const cached =
      playground?.meta && getCachedRegistryComponent(playground.id);
    return cached && playground?.meta
      ? {
          id: playground.id,
          meta: playground.meta,
          values: playground.values,
          Component: cached as ComponentType<DemoProps>,
        }
      : null;
  });

  useEffect(() => {
    const id = playground?.id;
    const meta = playground?.meta;
    if (!id || !meta) return;

    let live = true;

    const commit = (Component: ComponentType<DemoProps>) => {
      if (!live) return;
      const current = playgroundRef.current;

      const values =
        current?.id === id && current.meta ? current.values : seedValues(meta);
      setFrame({ id, meta, values, Component });
    };

    const cached = getCachedRegistryComponent(id);
    if (cached) {
      commit(cached as ComponentType<DemoProps>);
      return () => {
        live = false;
      };
    }

    loadRegistryComponent(id).then((Component) => {
      if (Component) commit(Component as ComponentType<DemoProps>);
    });

    return () => {
      live = false;
    };
  }, [playground?.id, playground?.meta]);

  const handlerProps = playground?.meta?.props;
  const handlers = useMemo(
    () =>
      Object.fromEntries(
        (handlerProps ?? [])
          .filter((prop) => prop.handler)
          .map((prop) => [
            prop.handler as string,
            (value: unknown) =>
              playgroundRef.current?.setValue(prop.name, value),
          ]),
      ),
    [handlerProps],
  );

  // a component already loaded swaps in this render; until the first arrives the frame stays empty
  const ready =
    playground && frame?.id !== playground.id
      ? (getCachedRegistryComponent(playground.id) as
          | ComponentType<DemoProps>
          | undefined)
      : undefined;
  const live =
    !frame ||
    Boolean(ready) ||
    (frame.id === playground?.id && Boolean(playground?.meta));
  const id = live ? (playground?.id ?? "") : (frame?.id ?? "");
  const values = live ? (playground?.values ?? {}) : (frame?.values ?? {});
  const meta = live ? playground?.meta : frame?.meta;
  if (!id || !meta) return null;
  const set = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== ""),
  );
  const Component = ready ?? frame?.Component;
  const style = playground?.style ?? DEFAULT_STYLE;
  const accent = playground?.accent ?? DEFAULT_ACCENT;
  const scheme = playground?.scheme ?? "light";
  const radius = playground?.radius ?? STYLES[DEFAULT_STYLE].radius;
  const scene = live ? meta.scene : undefined;
  const usage = scene
    ? buildScene(scene)
    : buildUsage(getRegistryTarget(id).component, meta, set);

  const uncontrolled = Object.entries(set)
    .filter(([name]) => name.startsWith("default"))
    .map(([name, value]) => `${name}:${JSON.stringify(value)}`)
    .join("|");

  const config = registryConfig[getRegistryTarget(id).install];
  // a page without a config tab falls back to the code it does have
  const active = tab === "config" && !config ? "code" : tab;

  return (
    // below @lg: the stage leads the page and fills the screen under the navbar,
    // so an open popup never needs a scroll, which would close it
    <div className="or:l d:f fd:c h:calc(100svh-4rem) mb:6 bg:page @lg:or:0 @lg:f:1 @lg:min-h:0 @lg:h:auto @lg:mb:0">
      <Tabs value={active} onValueChange={setTab} className={FILL}>
        <div className="d:f bg:page">
          <BaseTabs.List className="d:f min-w:0 ox:auto">
            <FileTab value="preview">Preview</FileTab>
            <FileTab value="code">page.tsx</FileTab>
            {config && <FileTab value="config">yumma.config.mjs</FileTab>}
          </BaseTabs.List>
          <div className="f:1 bbw:1 bc:border" />
        </div>

        <TabsPanel value="preview" className={FILL}>
          <PreviewFrame
            className="f:1 min-h:0"
            minHeight={0}
            fill
            accentCss={[
              accentCss(accent),
              radiusCss(style, radius),
              schemeCss(scheme),
            ].join("\n")}
          >
            {scene ? (
              <Scene scene={scene} style={style} radius={radius} />
            ) : (
              Component && (
                <Mounted
                  key={`${id}:${uncontrolled}`}
                  Component={Component}
                  props={{
                    ...(resolveIcons(set) as DemoProps),
                    ...styleProps(meta.props, style, radius),
                    ...handlers,
                  }}
                  portals={meta.props.some((prop) => prop.name === "container")}
                >
                  {exampleChildren(meta)}
                </Mounted>
              )
            )}
          </PreviewFrame>
        </TabsPanel>

        <TabsPanel value="code" className={FILL}>
          <TokenBlock tokens={usage} bar={false} className={FILL} fill />
        </TabsPanel>

        {config && (
          <TabsPanel value="config" className={FILL}>
            <TokenBlock
              tokens={buildConfig(config)}
              bar={false}
              className={FILL}
              fill
            />
          </TabsPanel>
        )}

        <div className="d:f ai:c jc:sb h:6 px:3 btw:1 bc:border bg:page c:ink/60 fs:xs ff:m us:none">
          <span>{getRegistryTarget(id).install}</span>
          <span>{LANGUAGE[active]}</span>
        </div>
      </Tabs>
    </div>
  );
}

function FileTab({ value, children }: { value: string; children: ReactNode }) {
  return (
    <BaseTabs.Tab
      value={value}
      className={(state) =>
        `${FILE_TAB} ${state.active ? "c:accent bg:surface" : "c:accent-dim bg:transparent bbw:1"}`
      }
      style={{ fontFamily: "inherit" }}
    >
      {children}
    </BaseTabs.Tab>
  );
}

function loaded(ids: string[]) {
  return Object.fromEntries(
    ids.map((id) => [id, getCachedRegistryComponent(id)]),
  ) as Record<string, ComponentType<DemoProps> | null>;
}

function Scene({
  scene,
  style,
  radius,
}: {
  scene: NonNullable<RegistryMeta["scene"]>;
  style: string;
  radius: string;
}) {
  const container = usePreviewContainer();
  const playground = usePlayground();
  const ids = useMemo(() => sceneIds(scene), [scene]);
  const [components, setComponents] = useState(() => loaded(ids));

  useEffect(() => {
    let live = true;
    Promise.all(ids.map((id) => loadRegistryComponent(id))).then(() => {
      if (live) setComponents(loaded(ids));
    });
    return () => {
      live = false;
    };
  }, [ids]);

  // a scene draws whole or not at all, so nothing jumps in as it loads
  if (ids.some((id) => !components[id])) return null;
  return renderScene(
    scene,
    components as Record<string, ComponentType<DemoProps>>,
    style,
    radius,
    container,
    {
      values: playground?.sceneValues ?? {},
      set: playground?.setSceneValue ?? (() => {}),
    },
  );
}

function Mounted({
  Component,
  props,
  portals,
  children,
}: {
  Component: ComponentType<DemoProps>;
  props: DemoProps;
  portals: boolean;
  children?: ReactNode;
}) {
  const container = usePreviewContainer();

  return (
    <Component {...props} {...(portals ? { container } : {})}>
      {children}
    </Component>
  );
}
