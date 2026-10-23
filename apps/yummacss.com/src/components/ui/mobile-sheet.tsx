"use client";

import { Drawer } from "@base-ui/react/drawer";
import { Input } from "@base-ui/react/input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, useMemo, useRef, useState } from "react";
import Scroller from "@/components/ui/scroller";
import { Search } from "@/icons";
import { useReveal } from "@/utils/reveal";
import Match from "./match";
import NewBadge, { NewLabel } from "./new-badge";
import ProductLinks from "./product-links";

interface NavItem {
	title: string;
	href: string;
	since?: string;
}

export interface NavSection {
	title: string;
	items: NavItem[];
}

interface Props {
	menu: NavSection[];
	isOpen: boolean;
	onClose: () => void;
}

// Base UI's sheet motion; the notes, "Phone menu", has the reasoning
const MOTION = {
	"--sheet-ease": "cubic-bezier(0.32, 0.72, 0, 1)",
	"--sheet-close": "calc(var(--drawer-swipe-strength, 1) * 400ms)",
	"--sheet-fade": "calc(1 - var(--drawer-swipe-progress, 0))",
	"--sheet-offstage": "0 calc(100% - 3rem + 2px)",
} as CSSProperties;

/** The phone menu: a sheet from the bottom with a filter and the area's links. */
export default function MobileSheet({ menu, isOpen, onClose }: Props) {
	const pathname = usePathname();
	const [query, setQuery] = useState("");
	const popup = useRef<HTMLDivElement>(null);
	const { viewport, active } = useReveal(`${pathname} ${isOpen}`);

	const typed = query.trim();
	const sections = useMemo(() => {
		if (!typed) return menu;
		const needle = typed.toLowerCase();
		return menu
			.map((section) => ({
				...section,
				items: section.items.filter((item) =>
					item.title.toLowerCase().includes(needle),
				),
			}))
			.filter((section) => section.items.length > 0);
	}, [menu, typed]);

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={(next) => !next && onClose()}
			onOpenChangeComplete={(next) => !next && setQuery("")}
			swipeDirection="down"
		>
			<Drawer.Portal>
				<Drawer.Backdrop
					style={MOTION}
					className="p:f i:0 zi:10 min-h:dvh bg:black/60 o:var(--sheet-fade) tp:o tdu:300 ttf:var(--sheet-ease) opening:o:0 closing:o:0 closing:tdu:var(--sheet-close) swiping:tdu:0 @prm:tp:none @lg:d:none"
				/>
				<Drawer.Viewport className="d:f p:f i:0 zi:10 ai:fe jc:c ta:none @lg:d:none">
					<Drawer.Popup
						ref={popup}
						data-chrome
						aria-label="Menu"
						initialFocus={popup}
						style={MOTION}
						className="p:r d:f fd:c o:h w:100% max-w:sm h:calc(100dvh-4rem+3rem) mb:-12 bc:border bg:page c:ink btw:1 os:none ta:none tp:t tdu:300 ttf:var(--sheet-ease) opening:tr:var(--sheet-offstage) closing:tr:var(--sheet-offstage) closing:tdu:var(--sheet-close) swiping:tdu:0 swiping:us:none @prm:tp:none @sm:blw:1 @sm:brw:1"
					>
						<div className="p:r fs:0 px:4 pt:6 pb:3 bc:border bbw:1 ta:none us:none">
							<div
								aria-hidden
								className="p:a t:2 l:0 r:0 w:14 h:1 mx:auto bg:border"
							/>
							<div className="d:f ai:c g:3 h:10 px:3 bc:border bg:surface c:ink/50 bw:1 fw:oc:ink fw:ow:2">
								<Search className="fs:0 w:4 h:4" />
								<Input
									type="text"
									aria-label="Search pages"
									placeholder="Search pages"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									className="f:1 min-w:0 bg:transparent c:ink os:none fs:md"
								/>
							</div>
						</div>

						<Drawer.Content className="d:f f:1 min-h:0 min-w:0 ta:auto">
							<Scroller
								viewportRef={viewport}
								viewportClassName="d:f fd:c g:6 pt:4 pb:16"
								className="f:1 min-h:0 min-w:0"
							>
								{!typed && (
									<ProductLinks
										heading="mb:2 px:7 c:ink/50 fs:sm fw:400"
										link="p:r d:f ai:c g:2 h:10 px:7 fs:md us:none a:bg:surface fv:oc:ink fv:oo:-2 fv:ow:2"
										onNavigate={onClose}
									/>
								)}
								{sections.length === 0 && (
									<p className="px:4 py:8 c:ink/50 ta:c">
										No pages match "{typed}"
									</p>
								)}
								{sections.map((section) => (
									<section key={section.title} className="d:f fd:c">
										<h3 className="mb:2 px:7 c:ink/50 fs:sm fw:400">
											{section.title}
										</h3>
										<ul>
											{section.items.map((item) => {
												const isActive = pathname === item.href;
												return (
													<li
														key={item.href}
														ref={isActive ? active : undefined}
													>
														<Drawer.Close
															nativeButton={false}
															render={<Link href={item.href} />}
															className={`p:r d:f ai:c g:2 h:10 px:7 fs:md us:none a:bg:surface fv:oc:ink fv:oo:-2 fv:ow:2 ${
																isActive
																	? "c:accent td:u tds:d"
																	: "c:ink/80 h:td:u"
															}`}
														>
															<Match text={item.title} query={typed} />
															<NewLabel since={item.since} />
															<NewBadge since={item.since} />
														</Drawer.Close>
													</li>
												);
											})}
										</ul>
									</section>
								))}
							</Scroller>
						</Drawer.Content>
					</Drawer.Popup>
				</Drawer.Viewport>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
