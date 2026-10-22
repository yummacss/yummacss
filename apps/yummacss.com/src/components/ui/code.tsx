"use client";

import { Button } from "@base-ui/react";
import { type ReactNode, useRef, useState } from "react";
import { Check, Copy } from "@/icons";
import { PRE_CLASSES } from "@/lib/code-decorate.mjs";

interface Props {
  title?: string;
  lang?: string;
  preview?: boolean;
  grouped?: boolean;
  html?: string;
  raw?: string;
  children?: React.ReactNode;
}

export default function Code({
  title,
  preview,
  grouped,
  html,
  raw,
  children,
}: Props) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const text = raw ?? ref.current?.querySelector("pre")?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyAction = <CopyButton copied={copied} onCopy={handleCopy} />;

  const body = html ? (
    <div
      className="ff:m lh:5"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: server-generated Shiki output from repo-local source, never user input
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : null;

  if (preview) {
    return (
      <div ref={ref} className="cs:d bg:surface">
        <TitleBar title={title} action={copyAction} />
        <div className="oy:auto ob:c max-h:80">
          {body ?? <pre className={`${PRE_CLASSES} ff:m lh:5`}>{children}</pre>}
        </div>
      </div>
    );
  }

  if (grouped) {
    return (
      <div ref={ref} className="cs:d">
        {body ?? <pre className={`${PRE_CLASSES} lh:5`}>{children}</pre>}
      </div>
    );
  }

  return (
    <div ref={ref} className="o:h my:4 cs:d bc:border bg:surface bw:1">
      <TitleBar title={title} action={copyAction} />
      {body ?? <pre className={`${PRE_CLASSES} lh:5`}>{children}</pre>}
    </div>
  );
}

export function TitleBar({
  title,
  action,
}: {
  title?: string | null;
  action?: ReactNode;
}) {
  if (!title && !action) return null;

  const heightAnchor = (
    <div className="d:f ai:c py:2 w:0 o:h pe:none v:h" aria-hidden="true">
      <span className="fs:xs ff:m">{"\u200b"}</span>
    </div>
  );

  return (
    <div className="d:f bc:border bg:page">
      {title ? (
        <div className="d:f ai:c px:6 py:2 brw:1 bc:border bg:surface">
          <span className="c:accent fs:xs ff:m">{title}</span>
        </div>
      ) : (
        heightAnchor
      )}
      <div className="f:1 bbw:1 bc:border" />
      {action ? (
        <div className="d:f ai:c px:2 bbw:1 bc:border">{action}</div>
      ) : null}
    </div>
  );
}

export function CopyButton({
  copied,
  onCopy,
}: {
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <Button
      onClick={onCopy}
      className="d:f ai:c g:1 px:2 py:1 c:accent h:c:accent-4 fv:oc:ink fv:ow:2"
      aria-label="Copy code"
    >
      {copied ? <Check className="w:4 h:4" /> : <Copy className="w:4 h:4" />}
      <span className="fs:xs">{copied ? "Copied!" : "Copy"}</span>
    </Button>
  );
}
