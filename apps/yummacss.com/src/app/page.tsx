import type { Metadata } from "next";
import Link from "next/link";
import Field from "@/components/landing/field";
import LandingHeader from "@/components/landing/header";
import SkipLink from "@/components/ui/skip-link";

export const metadata: Metadata = {
	alternates: { canonical: "/" },
};

/** A registration mark where two frame lines cross. */
function Mark({ className }: { className: string }) {
	return (
		<svg
			viewBox="0 0 11 11"
			aria-hidden="true"
			className={`p:a zi:10 w:2 h:2 c:accent-dim ${className}`}
		>
			<path d="M5.5 0v11M0 5.5h11" stroke="currentColor" />
			<circle
				cx="5.5"
				cy="5.5"
				r="2"
				className="f:page"
				stroke="currentColor"
			/>
		</svg>
	);
}

const BUTTON = "d:if ai:c jc:c g:3 h:11 px:5 fs:sm td:none fv:oc:ink fv:ow:2";

export default function Home() {
	return (
		<div className="d:f fd:c min-h:dvh">
			<SkipLink />

			<div className="bbw:1 bc:border">
				<div className="p:r mx:auto max-w:280 blw:1 brw:1 bc:border">
					<LandingHeader />
					<Mark className="b:-1 l:-1" />
					<Mark className="b:-1 r:-1" />
				</div>
			</div>

			<main
				id="main"
				className="f:1 d:f fd:c w:100% mx:auto max-w:280 blw:1 brw:1 bc:border @lg:p:r"
			>
				<section className="p:r zi:10 d:f fd:c jc:sb g:10 px:6 py:10 bg:page @lg:p:a @lg:t:0 @lg:b:0 @lg:r:0 @lg:w:115 @lg:px:10 @lg:py:12 @lg:blw:1 @lg:bc:border">
					<p className="m:0 fs:xs ls:5 tt:u c:ink/60">Vite · PostCSS · CLI</p>
					<div className="d:f fd:c g:6">
						<h1 className="m:0 ff:display fw:400 fs:4xl lh:1 c:ink @sm:fs:5xl">
							An atomic CSS framework.
						</h1>
						<p className="m:0 fs:sm lh:5 ls:3 c:ink/70">
							Every class is a property and its value, by their initials. d:f is
							display: flex.
						</p>
						<div className="d:f fd:c g:2 @lg:ai:fs">
							<Link
								href="/docs/installation"
								className={`${BUTTON} bg:brand c:white bbw:2 bc:black/20`}
							>
								Read the docs
							</Link>
							<Link
								href="/docs/installation"
								className={`${BUTTON} bg:surface c:ink bw:1 bbw:2 bc:border`}
							>
								pnpm add yummacss -D
							</Link>
						</div>
					</div>
				</section>

				<div className="p:r h:80 btw:1 bc:border @lg:p:a @lg:t:0 @lg:b:0 @lg:l:0 @lg:r:115 @lg:h:auto @lg:btw:0">
					<Field />
				</div>
			</main>
		</div>
	);
}
