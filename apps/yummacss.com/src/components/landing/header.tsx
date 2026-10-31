"use client";

import { Button } from "@base-ui/react";
import { useHotkey } from "@tanstack/react-hotkeys";
import Link from "next/link";
import { useState } from "react";
import { GitHub, Search } from "@/icons";
import { loadSearchIndex } from "@/utils/search-data";
import { YummaCSSLogo } from "../icons/yumma-logo";
import { SearchDialog } from "../ui/search-dialog";
import { HotkeyLink } from "./keys";

const preloadSearch = () => {
	loadSearchIndex().catch(() => {});
};

const SQUARE =
	"d:f ai:c jc:c w:9 h:9 bc:border bg:surface a:bg:press c:ink bw:1 fv:oc:ink fv:ow:2";

/** The landing page's bar: the logo, search, GitHub and Get started, with no links in between. */
export default function LandingHeader() {
	const [searchOpen, setSearchOpen] = useState(false);

	useHotkey("Mod+K", () => setSearchOpen(true));

	return (
		<>
			<header className="d:f ai:c jc:sb h:16 px:4">
				<Link
					href="/"
					aria-label="Yumma CSS"
					className="d:b w:fc fv:oc:ink fv:ow:2"
				>
					<YummaCSSLogo className="d:b h:6 w:auto c:ink" />
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
					<HotkeyLink
						href="/docs/installation"
						hotkey="G"
						primary
						className="d:none ai:c g:3 h:9 px:4 fs:sm td:none bw:1 fv:oc:ink fv:ow:2 @sm:d:if"
					>
						Get started
					</HotkeyLink>
				</div>
			</header>

			<SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
		</>
	);
}
