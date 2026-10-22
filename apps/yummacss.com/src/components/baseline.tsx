import { Chrome, Edge, Firefox, Safari } from "@ridemountainpig/svgl-react";
import { baselineFor } from "../utils/baseline";

const ICONS = {
  chrome: Chrome,
  edge: Edge,
  firefox: Firefox,
  safari: Safari,
} as const;

const TONE = {
  high: { text: "c:diff-add", bg: "bg:diff-add/5" },
  low: { text: "c:accent", bg: "bg:accent/5" },
  none: { text: "c:warning", bg: "bg:warning/5" },
} as const;

interface Props {
  path: string;
}

export default function Baseline({ path }: Props) {
  const baseline = baselineFor(path);
  if (!baseline) return null;

  const { level, label, browsers } = baseline;
  const tone = TONE[level || "none"];

  return (
    <div className="mb:6 bc:border bg:surface bw:1">
      <div
        className={`d:f fw:w ai:c jc:sb g:3 py:3 px:4 ff:m fs:sm ${tone.bg}`}
      >
        <code className={tone.text}>baseline</code>
        <span className="d:f ai:c g:2 c:ink/60">
          {label.split(" ")[0].toLowerCase()}
          {browsers.map((browser) => {
            const Icon = ICONS[browser.key as keyof typeof ICONS];
            return (
              <Icon
                key={browser.key}
                aria-label={`${browser.name} ${browser.version ?? "unsupported"}`}
                role="img"
                className={`w:4 h:4 ${browser.supported ? "" : "fgr:100 o:40"}`}
              />
            );
          })}
        </span>
      </div>
    </div>
  );
}
