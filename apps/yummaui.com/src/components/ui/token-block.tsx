"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { CopyButton, TitleBar } from "@/components/ui/code";
import { TOKEN_COLORS, type Token, tokensToText } from "@/utils/snippet";

export default function TokenBlock({
  tokens,
  className = "bc:border btw:1",
  title,
  fill = false,
  bar = true,
}: {
  tokens: Token[];
  className?: string;
  title?: string;
  fill?: boolean;
  /** Off where a tab already names the file: the copy button floats instead. */
  bar?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tokensToText(tokens));
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const action: ReactNode = <CopyButton copied={copied} onCopy={copy} />;

  return (
    <div className={`cs:d bg:surface ${bar ? "" : "p:r"} ${className}`}>
      {bar ? (
        <TitleBar title={title} action={action} />
      ) : (
        <div className="p:a t:2 r:3 zi:10">{action}</div>
      )}
      <pre
        className={`ox:auto px:4 py:3 ff:m lh:5 ws:pw ${
          fill ? "f:1 min-h:0 oy:auto" : ""
        }`}
      >
        <code>
          {tokens.map((token) => (
            <span key={token.id} style={{ color: TOKEN_COLORS[token.kind] }}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
