interface Props {
  data: Record<string, unknown>;
}

function serialize(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: the only way to emit a JSON-LD body in React, and `serialize` closes the one hole that makes it dangerous
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
