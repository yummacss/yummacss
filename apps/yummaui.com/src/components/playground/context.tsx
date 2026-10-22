"use client";

import {
  parseAsJson,
  parseAsStringLiteral,
  useQueryState,
  useQueryStates,
} from "nuqs";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { sidebarConfig } from "@/config/sidebar";
import { getRegistryMeta, type RegistryMeta } from "@/registry";
import { DEFAULT_ACCENT, readAccent, writeAccent } from "@/utils/accent";
import { prefetchRegistry } from "@/utils/prefetch-registry";
import { readScheme, type Scheme, writeScheme } from "@/utils/scheme";
import {
  DEFAULT_STYLE,
  nearestRadius,
  RADIUS,
  STYLES,
} from "@/utils/styles.mjs";

const SPECS: Record<string, { radius: string }> = STYLES;
const STYLE_IDS = Object.keys(STYLES) as [string, ...string[]];
const STYLE_KEYS = {
  style: parseAsStringLiteral(STYLE_IDS).withDefault(DEFAULT_STYLE),
  radius: parseAsStringLiteral(RADIUS as [string, ...string[]]),
};
const STYLE_STORE = "yui:style";

function readStyle(): { style?: string; radius?: string } {
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(STYLE_STORE) ?? "null",
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export type SceneValues = Record<string, string | number | boolean>;

const QUERY = { history: "replace", shallow: true } as const;

function sceneValues(value: unknown): SceneValues | null {
  if (typeof value !== "object" || value === null || Array.isArray(value))
    return null;
  const entries = Object.entries(value).filter(([, entry]) =>
    ["string", "number", "boolean"].includes(typeof entry),
  );
  return Object.fromEntries(entries) as SceneValues;
}

interface Playground {
  id: string;
  meta: RegistryMeta | null;
  /** What the scene's components were changed to, by instance and prop. */
  sceneValues: SceneValues;
  setSceneValue: (key: string, value: unknown, fallback: unknown) => void;
  accent: string;
  setAccent: (family: string) => void;
  scheme: Scheme;
  setScheme: (scheme: Scheme) => void;
  style: string;
  radius: string;
  setStyle: (style: string) => void;
  setRadius: (radius: string) => void;
}

const PlaygroundContext = createContext<Playground | null>(null);

export function usePlayground(): Playground | null {
  return useContext(PlaygroundContext);
}

export function PlaygroundProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  // synchronous, so the server renders the Component API and a switch never empties it
  const meta = useMemo(() => getRegistryMeta(id), [id]);
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);

  useEffect(() => setAccentState(readAccent()), []);

  const setAccent = useCallback((family: string) => {
    setAccentState(family);
    writeAccent(family);
  }, []);

  const [scheme, setSchemeState] = useState<Scheme>("light");

  useEffect(() => setSchemeState(readScheme()), []);

  const setScheme = useCallback((next: Scheme) => {
    setSchemeState(next);
    writeScheme(next);
  }, []);

  const [styleQuery, setStyleQuery] = useQueryStates(STYLE_KEYS, {
    history: "replace",
    clearOnDefault: true,
    shallow: true,
  });
  const style = styleQuery.style;
  const radius = nearestRadius(style, styleQuery.radius ?? SPECS[style].radius);

  const commitStyle = useCallback(
    (next: string, step: string) => {
      const resolved = nearestRadius(next, step);
      const radiusParam = resolved === SPECS[next].radius ? null : resolved;
      setStyleQuery({ style: next, radius: radiusParam });
      try {
        window.localStorage.setItem(
          STYLE_STORE,
          JSON.stringify({ style: next, radius: resolved }),
        );
      } catch {}
    },
    [setStyleQuery],
  );

  // the address wins; otherwise the style carried from the last page
  const arrived = useRef(false);
  useEffect(() => {
    if (arrived.current) return;
    arrived.current = true;
    const named = new URLSearchParams(window.location.search);
    if (named.has("style") || named.has("radius")) {
      if (styleQuery.radius && styleQuery.radius !== radius) {
        commitStyle(style, radius);
      }
      return;
    }
    const stored = readStyle();
    if (stored.style && stored.style in SPECS) {
      commitStyle(stored.style, stored.radius ?? SPECS[stored.style].radius);
    }
  }, [commitStyle, style, radius, styleQuery.radius]);

  const setStyle = useCallback(
    (next: string) => commitStyle(next, SPECS[next].radius),
    [commitStyle],
  );
  const setRadius = useCallback(
    (step: string) => commitStyle(style, step),
    [commitStyle, style],
  );

  // the neighbours too, so the pagination arrows land on a component that is ready
  useEffect(() => {
    prefetchRegistry(id);
    const slugs = sidebarConfig.flatMap((section) => section.items);
    const at = slugs.indexOf(id);
    for (const slug of [slugs[at - 1], slugs[at + 1]]) {
      if (slug && getRegistryMeta(slug)) prefetchRegistry(slug);
    }
  }, [id]);

  // what a visitor changes in the scene lives in the address, so a reload keeps it
  const [sceneQuery, setSceneQuery] = useQueryState(
    "scene",
    parseAsJson(sceneValues).withOptions(QUERY),
  );
  const sceneState = useMemo(() => sceneQuery ?? {}, [sceneQuery]);
  const setSceneValue = useCallback(
    (key: string, value: unknown, fallback: unknown) => {
      setSceneQuery((previous) => {
        const next = { ...(previous ?? {}) };
        if (
          value === fallback ||
          !["string", "number", "boolean"].includes(typeof value)
        )
          delete next[key];
        else next[key] = value as string | number | boolean;
        return Object.keys(next).length > 0 ? next : null;
      });
    },
    [setSceneQuery],
  );

  const playground = useMemo(
    () => ({
      id,
      meta,
      sceneValues: sceneState,
      setSceneValue,
      accent,
      setAccent,
      scheme,
      setScheme,
      style,
      radius,
      setStyle,
      setRadius,
    }),
    [
      id,
      meta,
      sceneState,
      setSceneValue,
      accent,
      setAccent,
      scheme,
      setScheme,
      style,
      radius,
      setStyle,
      setRadius,
    ],
  );

  return <PlaygroundContext value={playground}>{children}</PlaygroundContext>;
}

const ignore = () => {};

/**
 * The playground at its defaults, with nothing to change it. The server
 * renders this while the address is unknown, so the page arrives whole.
 */
export function StaticPlayground({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const playground = useMemo(() => {
    const meta = getRegistryMeta(id);
    return {
      id,
      meta,
      sceneValues: {},
      setSceneValue: ignore,
      accent: DEFAULT_ACCENT,
      setAccent: ignore,
      scheme: "light" as Scheme,
      setScheme: ignore,
      style: DEFAULT_STYLE,
      radius: SPECS[DEFAULT_STYLE].radius,
      setStyle: ignore,
      setRadius: ignore,
    };
  }, [id]);

  return <PlaygroundContext value={playground}>{children}</PlaygroundContext>;
}
