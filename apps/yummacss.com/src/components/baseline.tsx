import { baselineFor } from "../utils/baseline";

const TONE = {
	high: { text: "c:diff-add", bar: "bg:diff-add" },
	low: { text: "c:accent", bar: "bg:accent" },
	none: { text: "c:warning", bar: "bg:warning" },
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
		<div className="mb:6 d:f fd:c g:3">
			<p className="m:0 d:f ai:c g:3 fs:sm">
				<code className="ff:m c:ink/60">baseline</code>
				<span className={`fw:500 ${tone.text}`}>{label}</span>
			</p>
			<ul className="d:g gtc:2 g:3 m:0 p:0 lst:none @sm:gtc:4 @sm:g:1">
				{browsers.map((browser) => (
					<li key={browser.key} className="d:f fd:c g:2">
						<span
							aria-hidden
							className={`d:b h:2 ${browser.supported ? tone.bar : "bg:border"}`}
						/>
						<span
							className={`d:f fd:c g:1 ff:m fs:xs ${browser.supported ? "c:ink/80" : "c:ink/50"}`}
						>
							<span className="c:ink/60">{browser.name}</span>
							<span>
								{browser.supported
									? `${browser.version}${browser.desktopOnly ? ", desktop only" : ""}`
									: "No"}
							</span>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
