"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FocusEvent, useEffect, useState } from "react";
import Scroller from "@/components/ui/scroller";

interface TocItem {
	id: string;
	// text & inline code, so code keeps its mono face here as in the heading
	parts: { text: string; code: boolean }[];
	level: number;
}

// a heading's line is shorter the deeper it sits
const LINE: Record<number, string> = { 2: "w:6", 3: "w:4", 4: "w:3" };

export default function TableOfContents() {
	const pathname = usePathname();
	const [headings, setHeadings] = useState<TocItem[]>([]);
	const [active, setActive] = useState<string | null>(null);
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);
	const open = hovered || focused;
	// biome-ignore lint/correctness/useExhaustiveDependencies: need this useEffect to re-run this on route change to update the headings
	useEffect(() => {
		const timer = setTimeout(() => {
			const elements = Array.from(
				document.querySelectorAll(
					"article h2, article h3, article h4, main h2, main h3, main h4",
				),
			).filter((el) => !el.closest("[data-meta]") && el.id);

			const items: TocItem[] = elements.map((el) => ({
				id: el.id,
				parts: Array.from(el.childNodes).map((node) => ({
					text: node.textContent ?? "",
					code: node.nodeName === "CODE",
				})),
				level: Number(el.tagName.charAt(1)),
			}));

			setHeadings(items);
		}, 50);

		return () => {
			clearTimeout(timer);
		};
	}, [pathname]);

	// the current section is the last heading scrolled past the navbar
	useEffect(() => {
		if (headings.length === 0) return;
		let frame = 0;
		const update = () => {
			frame = 0;
			let current = headings[0].id;
			for (const heading of headings) {
				const el = document.getElementById(heading.id);
				if (el && el.getBoundingClientRect().top < 120) current = heading.id;
			}
			setActive(current);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(frame);
		};
	}, [headings]);

	const onBlur = (event: FocusEvent<HTMLElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
	};

	if (headings.length === 0) {
		return null;
	}

	return (
		<aside className="d:none @lg:d:b @lg:gc-s:3">
			<div className="p:st t:20 h:0">
				<nav
					aria-label="On this page"
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					onFocus={() => setFocused(true)}
					onBlur={onBlur}
					className={`p:a t:0 r:0 zi:10 d:f fd:c max-h:calc(100dvh-6rem) ${open ? "w:72 bg:page bw:1 bc:border" : ""}`}
				>
					<Scroller className="f:1 min-h:0">
						<ul className={`d:f fd:c g:1 ${open ? "p:4" : "py:4"}`}>
							{headings.map((heading) => {
								const label = heading.parts.map((part) => part.text).join("");
								const current = heading.id === active;
								return (
									<li key={heading.id}>
										<Link
											href={`#${heading.id}`}
											aria-label={label}
											aria-current={current ? "location" : undefined}
											className={`d:f ai:c jc:fe g:3 py:1 fs:sm fv:oc:ink fv:ow:2 ${current ? "c:accent" : "c:ink/70 h:c:ink"}`}
										>
											<span
												aria-hidden
												className={`f:1 min-w:0 ${open ? "d:b" : "d:none"}`}
											>
												{heading.parts.map((part, index) =>
													part.code ? (
														// biome-ignore lint/suspicious/noArrayIndexKey: parts never reorder
														<code key={index} className="ff:m c:code">
															{part.text}
														</code>
													) : (
														part.text
													),
												)}
											</span>
											<span
												aria-hidden
												className={`d:b fs:0 bbw:2 ${LINE[heading.level] ?? "w:3"} ${current ? "bc:accent" : "bc:border"}`}
											/>
										</Link>
									</li>
								);
							})}
						</ul>
					</Scroller>
				</nav>
			</div>
		</aside>
	);
}
