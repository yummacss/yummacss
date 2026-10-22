import data from "web-features/data.json";

interface FeatureStatus {
  baseline: false | "low" | "high";
  support: Record<string, string | undefined>;
}

const { features } = data as {
  features: Record<
    string,
    { compat_features?: string[]; status?: FeatureStatus }
  >;
};

const BROWSERS = [
  { key: "chrome", name: "Chrome", mobileKey: "chrome_android" },
  { key: "edge", name: "Edge", mobileKey: null },
  { key: "firefox", name: "Firefox", mobileKey: "firefox_android" },
  { key: "safari", name: "Safari", mobileKey: "safari_ios" },
] as const;

export interface BaselineBrowser {
  key: string;
  name: string;
  version?: string;
  supported: boolean;
  desktopOnly: boolean;
}

export interface Baseline {
  level: false | "low" | "high";
  label: string;
  description: string;
  browsers: BaselineBrowser[];
}

export function baselineFor(path: string): Baseline | null {
  const match = Object.entries(features).find(([, feature]) =>
    feature.compat_features?.includes(path),
  );

  const status = match?.[1].status;
  if (!status) return null;

  const level = status.baseline;
  const support = status.support ?? {};

  return {
    level,
    label:
      level === "high"
        ? "Widely available"
        : level === "low"
          ? "Newly available"
          : "Limited availability",
    description:
      level === "high"
        ? "This feature is well established and works across many devices and browser versions."
        : level === "low"
          ? "This feature works across the latest devices and browser versions. This feature might not work in older devices or browsers."
          : "This feature does not work in some of the most widely-used browsers.",
    browsers: BROWSERS.map((b) => {
      const version = support[b.key];
      return {
        key: b.key,
        name: b.name,
        version,
        supported: !!version,
        desktopOnly: !!version && b.mobileKey !== null && !support[b.mobileKey],
      };
    }),
  };
}
