import type { ComponentType } from "react";
import { getRegistryImport } from "@/registry";

type RegistryComponent = ComponentType<Record<string, unknown>>;

const resolved = new Map<string, RegistryComponent>();
const pending = new Map<string, Promise<RegistryComponent | null>>();

export function getCachedRegistryComponent(
  id: string,
): RegistryComponent | null {
  return resolved.get(id) ?? null;
}

export function loadRegistryComponent(
  id: string,
): Promise<RegistryComponent | null> {
  const cached = resolved.get(id);
  if (cached) return Promise.resolve(cached);

  const inFlight = pending.get(id);
  if (inFlight) return inFlight;

  const importFn = getRegistryImport(id);
  if (!importFn) return Promise.resolve(null);

  const request = importFn()
    .then((module) => {
      const component = module.default as RegistryComponent;
      resolved.set(id, component);
      pending.delete(id);
      return component;
    })
    .catch((error) => {
      pending.delete(id);
      throw error;
    });

  pending.set(id, request);
  return request;
}

export function prefetchRegistry(id: string) {
  void loadRegistryComponent(id);
}
