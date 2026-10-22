/** The version a page arrived in, or `New`, drawn beside its link while it applies. */
export default function NewBadge({ since }: { since?: string }) {
  if (!since) return null;
  return (
    <span
      aria-hidden
      className="d:ib px:1 bw:1 bc:accent/40 c:accent fs:xs ff:m lh:4 us:none"
    >
      {since}
    </span>
  );
}

/** The badge's words for a screen reader. Absolute, so its link must be `p:r` or it stretches the page. */
export function NewLabel({ since }: { since?: string }) {
  if (!since) return null;
  return (
    <span className="p:a w:px h:px o:h ws:nw" style={{ clip: "rect(0 0 0 0)" }}>
      {/^\d/.test(since) ? `, new in ${since}` : ", new"}
    </span>
  );
}
