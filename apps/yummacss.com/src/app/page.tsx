import type { Metadata } from "next";
import Field from "@/components/landing/field";
import LandingHeader from "@/components/landing/header";
import { CopyCommand, HotkeyLink } from "@/components/landing/keys";
import FrameMark from "@/components/ui/frame-mark";
import SkipLink from "@/components/ui/skip-link";

export const metadata: Metadata = {
	alternates: { canonical: "/" },
};

export default function Home() {
	return (
		<div className="d:f fd:c min-h:dvh">
			<SkipLink />

			<div className="bbw:1 bc:border">
				<div className="p:r mx:auto max-w:280 blw:1 brw:1 bc:border">
					<LandingHeader />
					<FrameMark className="b:-1 l:-1" />
					<FrameMark className="b:-1 r:-1" />
				</div>
			</div>

			<main
				id="main"
				className="f:1 d:f fd:c w:100% mx:auto max-w:280 blw:1 brw:1 bc:border @lg:p:r"
			>
				<section className="p:r zi:10 d:f fd:c jc:sb g:10 px:6 py:10 bg:page @lg:p:a @lg:t:0 @lg:b:0 @lg:r:0 @lg:w:115 @lg:px:10 @lg:py:12 @lg:blw:1 @lg:bc:border">
					<FrameMark className="d:none t:-1 l:-1 @lg:d:b" />
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
							<HotkeyLink href="/docs/installation" hotkey="D" primary>
								Read the docs
							</HotkeyLink>
							<CopyCommand command="pnpm add yummacss -D" hotkey="C" />
						</div>
					</div>
				</section>

				<div className="p:r h:80 btw:1 bc:border @lg:p:a @lg:t:0 @lg:b:0 @lg:l:0 @lg:r:115 @lg:h:auto @lg:btw:0">
					<FrameMark className="t:-1 l:-1 @lg:d:none" />
					<FrameMark className="t:-1 r:-1 @lg:d:none" />
					<Field />
				</div>
			</main>
		</div>
	);
}
