"use client";

import { Button } from "@base-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GitHub, Search } from "@/icons";
import { loadSearchIndex } from "@/utils/search-data";
import { YummaCSSMark } from "../icons/yummacss-mark";
import { SearchDialog } from "../ui/search-dialog";

const preloadSearch = () => {
	loadSearchIndex().catch(() => {});
};

const SQUARE =
	"d:f ai:c jc:c w:9 h:9 bc:border bg:surface a:bg:press c:ink bw:1 bbw:2 fv:oc:ink fv:ow:2";

/** The landing page's bar: the mark, search, GitHub and Get started, with no links in between. */
export default function LandingHeader() {
	const [searchOpen, setSearchOpen] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				setSearchOpen(true);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<>
			<header className="d:f ai:c jc:sb h:16 px:4">
				<Link
					href="/"
					aria-label="Yumma CSS"
					className="d:b w:fc fv:oc:ink fv:ow:2"
				>
					<YummaCSSMark product="css" className="d:b h:8 w:auto" />
				</Link>

				<div className="d:f ai:c g:2">
					<Button
						type="button"
						onClick={() => setSearchOpen(true)}
						onPointerEnter={preloadSearch}
						onFocus={preloadSearch}
						aria-label="Search"
						className={SQUARE}
					>
						<Search className="w:4 h:4" />
					</Button>
					<a
						href="https://github.com/yummacss/yummacss"
						aria-label="GitHub"
						className={SQUARE}
					>
						<GitHub className="w:4 h:4" />
					</a>
					<Link
						href="/docs/installation"
						className="d:none ai:c h:9 px:4 bg:brand c:white fs:sm td:none bbw:2 bc:black/20 fv:oc:ink fv:ow:2 @sm:d:f"
					>
						Get started
					</Link>
				</div>
			</header>

			<SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
		</>
	);
}
