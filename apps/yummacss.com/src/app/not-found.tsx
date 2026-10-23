import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "404 - Page Not Found",
	robots: { index: false },
};

export default function NotFound() {
	return (
		<div className="d:f fd:c ai:c jc:c min-h:dvh c:ink ta:c">
			<div className="d:f ai:c">
				<h1 className="mr:5 pr:6 bc:ink/20 brw:1 ff:display fs:4xl">404</h1>
				<h2 className="ff:system m:0 fs:md fw:400">
					This page could not be found.
				</h2>
			</div>
		</div>
	);
}
