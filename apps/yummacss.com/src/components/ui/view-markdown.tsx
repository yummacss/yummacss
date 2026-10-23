"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileMd } from "@/icons";

export default function ViewMarkdown() {
	const pathname = usePathname();
	let mdPath = pathname.replace(/\/$/, "");

	if (mdPath.startsWith("/components/")) {
		const slug = mdPath.replace(/^\/components\//, "");
		mdPath = `/components/${slug}.md`;
	} else if (mdPath.startsWith("/docs/") && mdPath !== "/docs") {
		const slug = mdPath.replace(/^\/docs\//, "");
		mdPath = `/docs/${slug}.md`;
	} else {
		return null;
	}

	return (
		<Link
			href={mdPath}
			className="d:if ai:c g:2 w:fc mt:4 c:ink/70 fs:sm td:none h:c:ink fv:oc:ink fv:ow:2"
		>
			<FileMd className="w:4 h:4" />
			View as Markdown
		</Link>
	);
}
