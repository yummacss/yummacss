"use client";

import { Button } from "@base-ui/react";
import { type LetterKey, useHotkey } from "@tanstack/react-hotkeys";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";

const BUTTON =
	"d:if ai:c jc:c g:3 h:11 px:5 fs:sm td:none bw:1 fv:oc:ink fv:ow:2";
const PRIMARY = "bg:brand bc:brand c:white";
const SECONDARY = "bg:surface bc:border c:ink";

/** The key that triggers a button, drawn inside it. */
function Key({ hotkey, primary }: { hotkey: LetterKey; primary?: boolean }) {
	return (
		<kbd
			className={`d:none ai:c jc:c w:5 h:5 bw:1 ff:body fs:xs @sm:d:if ${primary ? "bc:white/40 c:white/80" : "bc:border c:ink/60"}`}
		>
			{hotkey}
		</kbd>
	);
}

interface HotkeyLinkProps {
	href: string;
	hotkey: LetterKey;
	primary?: boolean;
	className?: string;
	children: ReactNode;
}

/** A link that its key also follows, wherever focus is outside a field. */
export function HotkeyLink({
	href,
	hotkey,
	primary,
	className = BUTTON,
	children,
}: HotkeyLinkProps) {
	const router = useRouter();
	useHotkey(hotkey, () => router.push(href));

	return (
		<Link
			href={href}
			aria-keyshortcuts={hotkey}
			className={`${className} ${primary ? PRIMARY : SECONDARY}`}
		>
			{children}
			<Key hotkey={hotkey} primary={primary} />
		</Link>
	);
}

/** A command that its button and its key both copy. */
export function CopyCommand({
	command,
	hotkey,
}: {
	command: string;
	hotkey: LetterKey;
}) {
	const [copied, setCopied] = useState(false);
	const copy = async () => {
		await navigator.clipboard.writeText(command);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};
	useHotkey(hotkey, copy);

	return (
		<Button
			type="button"
			onClick={copy}
			aria-keyshortcuts={hotkey}
			aria-label={`Copy ${command}`}
			className={`${BUTTON} ${SECONDARY} ff:body`}
		>
			{copied ? "Copied" : command}
			<Key hotkey={hotkey} />
		</Button>
	);
}
