import type { Config } from "../config/schema.js";

export type BuildCache = {
  css?: string;
  dependencies?: string[];
  configHash?: string;
};

let cache: BuildCache = {};

export function getCache(): BuildCache {
  return cache;
}

export function setCache(newCache: BuildCache): void {
  cache = newCache;
}

export function configChanged(config: Config): boolean {
  const configHash = JSON.stringify(config);
  return cache.configHash !== configHash;
}