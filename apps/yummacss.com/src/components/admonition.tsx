import type { ReactNode } from "react";
import { Diamond, TextLayer } from "@/icons";

type Kind = "note" | "warning";

// the cover's tag on a tinted box; a flex column keeps the paragraphs' margins inside the tint
const KINDS: Record<
	Kind,
	{ label: string; box: string; tag: string; Icon: typeof TextLayer }
> = {
	note: {
		label: "Note",
		box: "bc:accent bg:accent/10",
		tag: "bg:accent",
		Icon: TextLayer,
	},
	warning: {
		label: "Warning",
		box: "bc:warning bg:warning/10",
		tag: "bg:warning",
		Icon: Diamond,
	},
};

interface Props {
	kind?: Kind;
	title?: string;
	children: ReactNode;
}

export default function Admonition({ kind = "note", title, children }: Props) {
	const { label, box, tag, Icon } = KINDS[kind] ?? KINDS.note;

	return (
		<aside
			aria-label={title ?? label}
			className={`p:r d:f fd:c mt:10 mb:6 px:4 blw:2 ${box}`}
		>
			<span
				className={`p:a l:calc(-2px) b:100% d:if ai:c g:1 px:2 py:1 c:surface ff:m fs:xs lh:1 ${tag}`}
				aria-hidden
			>
				<Icon className="w:3 h:3" />
				{title ?? label}
			</span>
			{children}
		</aside>
	);
}

export const Note = ({ children }: { children: ReactNode }) => (
	<Admonition kind="note">{children}</Admonition>
);
export const Warning = ({ children }: { children: ReactNode }) => (
	<Admonition kind="warning">{children}</Admonition>
);
