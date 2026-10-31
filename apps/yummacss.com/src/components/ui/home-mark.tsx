"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { YummaCSSLogo } from "../icons/yumma-logo";

/** The logo, linking to the landing page; a right-click opens the brand page, which is what someone right-clicking a logo is after. */
export default function HomeMark({ className }: { className: string }) {
	const router = useRouter();
	return (
		<Link
			href="/"
			aria-label="Yumma CSS"
			onContextMenu={(event) => {
				event.preventDefault();
				router.push("/docs/brand");
			}}
			className="d:b w:fc fv:oc:ink fv:ow:2"
		>
			<YummaCSSLogo className={className} />
		</Link>
	);
}
