import type { Metadata } from "next";
import type { CSSProperties } from "react";
import LandingHeader from "@/components/landing/header";
import SkipLink from "@/components/ui/skip-link";
import { CEMETERY_END, CEMETERY_START, GRAVES } from "@/utils/cemetery";

export const metadata: Metadata = {
	title: "Cemetery",
	description: "Every project Yumma CSS outlived, drawn to scale.",
	alternates: { canonical: "/cemetery" },
};

const start = Date.parse(CEMETERY_START);
const span = Date.parse(CEMETERY_END) - start;
const at = (date: string) => ((Date.parse(date) - start) / span) * 100;
const pct = (value: number) => `${value.toFixed(2)}%`;

const month = new Intl.DateTimeFormat("en-US", {
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

const YEARS = ["2024", "2025", "2026"].map((year) => ({
	year,
	left: pct(at(`${year}-01-01`)),
}));

const ROWS = GRAVES.map((grave) => {
	const anchor = grave.seen ?? grave.born ?? grave.died ?? CEMETERY_START;
	const left = at(grave.born ?? anchor);
	const right = at(grave.died ?? anchor);
	// a life that ends near today puts its label before the bar
	const late = right > 72;
	const day = (date: string | null) =>
		date ? month.format(Date.parse(date)) : "?";
	return {
		...grave,
		late,
		dates: `${day(grave.born)} to ${day(grave.died)}`,
		style: {
			"--l": pct(left),
			"--w": pct(right - left),
			"--r": pct(right),
			"--tr": pct(100 - left),
		} as CSSProperties,
	};
});

const known = GRAVES.filter(
	(grave): grave is typeof grave & { born: string; died: string } =>
		grave.born !== null && grave.died !== null,
);
const life = (grave: { born: string; died: string }) =>
	Date.parse(grave.died) - Date.parse(grave.born);
const shortest = known.reduce((a, b) => (life(b) < life(a) ? b : a));

export default function Cemetery() {
	return (
		<div className="d:f fd:c min-h:dvh">
			<SkipLink />

			<div className="bbw:1 bc:border">
				<div className="p:r mx:auto max-w:280 blw:1 brw:1 bc:border">
					<LandingHeader />
				</div>
			</div>

			<main
				id="main"
				className="f:1 w:100% mx:auto max-w:280 blw:1 brw:1 bc:border"
			>
				<section className="d:f fd:c g:4 px:6 pt:14 pb:10 bbw:1 bc:border @lg:px:10 @lg:pt:18 @lg:pb:12">
					<p className="m:0 fs:xs ls:5 tt:u c:ink/70">2023 – 2026</p>
					<h1 className="m:0 ff:display fw:400 fs:4xl lh:1 c:ink @sm:fs:5xl">
						Cemetery
					</h1>
					<p className="m:0 max-w:130 fs:sm lh:5 ls:3 c:ink/80">
						Everything Yumma CSS outlived, drawn to scale. The shortest bar is{" "}
						{shortest.lived}.
					</p>
				</section>

				<div className="ox:auto">
					<div className="min-w:225 px:6 pt:8 pb:6 @lg:px:10">
						<div className="d:f g:6 pb:3 bbw:1 bc:border">
							<span className="fs:0 w:64" />
							<div className="p:r f:1 h:4 fs:xs c:ink/70 fvn:tn">
								{YEARS.map(({ year, left }) => (
									<span
										key={year}
										className="p:a t:0 l:var(--x) ml:-4"
										style={{ "--x": left } as CSSProperties}
									>
										{year}
									</span>
								))}
							</div>
						</div>

						<ol className="m:0 p:0 lst:none">
							{ROWS.map((row) => (
								<li
									key={row.name}
									className="d:f g:6 ai:c bbw:1 bc:border"
									style={row.style}
								>
									<div className="d:f fd:c g:1 fs:0 w:64 min-w:0 py:3">
										<span className="ff:display fs:lg c:ink">{row.name}</span>
										<span className="fs:xs c:ink/70">{row.note}</span>
									</div>
									<div
										role="img"
										aria-label={`${row.dates}, ${row.lived}`}
										className="p:r f:1 min-w:0 as:s"
									>
										{YEARS.map(({ year, left }) => (
											<span
												key={year}
												aria-hidden="true"
												className="p:a t:0 b:0 l:var(--x) blw:1 bc:border"
												style={{ "--x": left } as CSSProperties}
											/>
										))}
										<span
											aria-hidden="true"
											className={`p:a t:50% mt:-1 h:2 l:var(--l) w:var(--w) min-w:1 ${row.name === shortest.name ? "bg:brand" : "bg:ink"}`}
										/>
										{row.born === null && (
											<span
												aria-hidden="true"
												className="p:a t:50% r:calc(100%-var(--l)) w:8 btw:2 bs:d bc:ink/40"
											/>
										)}
										{row.died === null && (
											<span
												aria-hidden="true"
												className="p:a t:50% l:var(--r) w:8 btw:2 bs:d bc:ink/40"
											/>
										)}
										{row.reborn && (
											<span
												aria-hidden="true"
												className="p:a t:50% l:var(--r) r:0 btw:2 bs:d bc:brand"
											/>
										)}
										<span
											aria-hidden="true"
											className={`p:a t:50% mt:-2 fs:xs ws:nw c:ink/80 fvn:tn ${row.late ? "r:var(--tr) pr:2" : row.died === null ? "l:var(--r) pl:10" : "l:var(--r) pl:2"}`}
										>
											{row.lived}
										</span>
									</div>
								</li>
							))}
						</ol>

						<div className="d:f fw:w g:6 pt:5 fs:xs c:ink/80">
							<span className="d:f ai:c g:2">
								<span aria-hidden="true" className="w:5 h:2 bg:ink" />A life
							</span>
							<span className="d:f ai:c g:2">
								<span
									aria-hidden="true"
									className="w:5 h:0 btw:2 bs:d bc:brand"
								/>
								Lives on under another name
							</span>
							<span className="d:f ai:c g:2">
								<span
									aria-hidden="true"
									className="w:5 h:0 btw:2 bs:d bc:ink/40"
								/>
								Date unknown
							</span>
						</div>
					</div>
				</div>

				<p className="m:0 px:6 pt:6 pb:18 fs:sm c:ink/70 @lg:px:10">
					Missing one? Graves are added in{" "}
					<a
						href="https://github.com/yummacss/yummacss/blob/main/apps/yummacss.com/src/utils/cemetery.ts"
						className="c:accent td:u tdc:accent-dim tuo:2 h:c:ink fv:oc:ink fv:ow:2"
					>
						cemetery.ts
					</a>
					.
				</p>
			</main>
		</div>
	);
}
