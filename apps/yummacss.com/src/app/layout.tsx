import "@fontsource/ia-writer-quattro/latin-400.css";
import "@fontsource/ia-writer-quattro/latin-400-italic.css";
import "@fontsource/ia-writer-quattro/latin-700.css";
import "@fontsource/ia-writer-quattro/latin-700-italic.css";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSerifSquare } from "geist/font/serif/square";
import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";

const description =
	"Fixed scales for spacing, colors, type and radius without arbitrary utilities.";

export const metadata: Metadata = {
	title: {
		default: "Yumma CSS - An atomic CSS framework",
		template: "%s · Yumma CSS",
	},
	description,
	keywords: [
		"utility css",
		"css framework",
		"derived class names",
		"css-native",
		"utility classes",
	],
	icons: {
		apple: "/apple-touch-icon.png",
		// the .ico first, for browsers without SVG icons; the SVG last, so the rest pick it and follow the theme
		icon: [
			{ url: "/favicon.ico", sizes: "32x32" },
			{ url: "/favicon.svg", type: "image/svg+xml" },
		],
	},
	metadataBase: new URL("https://yummacss.com"),
	openGraph: {
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "Yumma CSS - An atomic CSS framework",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Yumma CSS - An atomic CSS framework",
		description,
		images: ["/og.png"],
	},
	other: {
		llms: "/llms.txt",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className={`sb:s spt:20 cs:ld s::bg:accent-dim/10 ${GeistSerifSquare.variable}`}
			lang="en"
			data-scroll-behavior="smooth"
		>
			<body className="bg:page ff:body">
				{children}
				<Analytics />
				<SpeedInsights />
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "WebSite",
						name: "Yumma CSS",
						url: "https://yummacss.com",
						description,
					}}
				/>
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "SoftwareApplication",
						name: "Yumma CSS",
						applicationCategory: "DeveloperApplication",
						operatingSystem: "Any",
						description,
						url: "https://yummacss.com",
					}}
				/>
			</body>
		</html>
	);
}
