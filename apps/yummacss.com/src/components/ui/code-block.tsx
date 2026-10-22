import CodeChrome from "@/components/ui/code";
import { highlight } from "@/lib/highlighter";

interface Props {
  code?: string;
  meta?: string;
  title?: string;
  lang?: string;
  preview?: boolean;
  grouped?: boolean;
}

export default function CodeBlock({ code = "", meta, title, ...rest }: Props) {
  const html = highlight(code, rest.lang, meta, title);

  return <CodeChrome {...rest} title={title} html={html} raw={code} />;
}
