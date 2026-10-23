"use client";

import type { ErrorInfo } from "next/error";

type Props = ErrorInfo & {
	unstable_retry?: () => void;
};

export default function ErrorPage({ error }: Props) {
	const message = error instanceof Error ? error.message : undefined;

	return (
		<div className="d:f fd:c ai:c jc:c min-h:dvh c:ink ta:c">
			<div className="d:f fd:c ai:c">
				<div className="d:f ai:c mb:4">
					<h1 className="mr:5 pr:6 bc:ink/20 brw:1 ff:display fs:4xl">500</h1>
					{message && <h2 className="ff:system m:0 fs:md fw:400">{message}</h2>}
				</div>
			</div>
		</div>
	);
}
