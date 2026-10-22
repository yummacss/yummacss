"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ComponentType, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
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
import { type DemoProps, renderScene, sceneIds } from "@/utils/demo";
import {
  getCachedRegistryComponent,
  loadRegistryComponent,
} from "@/utils/prefetch-registry";
import { schemeCss } from "@/utils/scheme";
import { buildConfig, buildScene } from "@/utils/snippet";
import { DEFAULT_STYLE, radiusCss, STYLES } from "@/utils/styles.mjs";

const FILL = "d:f fd:c f:1 min-h:0";

// the markdown code tabs' own classes (code-tabs.tsx): the open tab has no bottom edge
const FILE_TAB =
  "d:f ai:c px:4 py:2 @sm:px:6 m:0 brw:1 bc:border fs:sm ff:m ws:nw c:p a:none fv:os:s fv:ow:2 fv:oo:-2 fv:oc:accent";

const LANGUAGE: Record<string, string> = {
  preview: "Preview",
  code: "TSX",
  config: "JavaScript",
};

export default function ComponentPlayground() {
  const playground = usePlayground();
  const [tab, setTab] = useState("preview");

  const id = playground?.id ?? "";
  const scene = playground?.meta?.scene;
  if (!id || !scene) return null;
  const style = playground?.style ?? DEFAULT_STYLE;
  const accent = playground?.accent ?? DEFAULT_ACCENT;
  const scheme = playground?.scheme ?? "light";
  const radius = playground?.radius ?? STYLES[DEFAULT_STYLE].radius;
  const usage = buildScene(scene);

  const config = registryConfig[getRegistryTarget(id).install];
  // a page without a config tab falls back to the code it does have
  const active = tab === "config" && !config ? "code" : tab;

  return (
    // below @lg: the stage fills the screen under the navbar, so a popup fits it
    <div className="d:f fd:c h:calc(100svh-5rem) mt:6 bg:page @lg:f:1 @lg:min-h:0 @lg:h:auto @lg:mt:0">
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
            <Scene scene={scene} style={style} radius={radius} />
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
