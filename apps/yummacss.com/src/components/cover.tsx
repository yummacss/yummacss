import { getImageProps } from "next/image";

const IMAGE = {
	alt: "Yumma CSS",
	width: 1200,
	height: 630,
	sizes: "(min-width: 48rem) 48rem, 100vw",
};

/** The site's cover, in the reader's colour scheme. */
export default function Cover() {
	const dark = getImageProps({ ...IMAGE, src: "/og-dark.png" }).props.srcSet;
	const { props } = getImageProps({
		...IMAGE,
		src: "/og.png",
		loading: "eager",
		fetchPriority: "high",
	});

	return (
		<picture>
			<source media="(prefers-color-scheme: dark)" srcSet={dark} />
			<img
				{...props}
				className="d:b w:100% h:auto mb:4 bc:border bg:surface bw:1"
			/>
		</picture>
	);
}
