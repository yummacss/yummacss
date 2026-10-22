import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Children, cloneElement, isValidElement } from "react";
import Admonition, { Note, Warning } from "@/components/admonition";
import Baseline from "@/components/baseline";
import { BrandColors, BrandMarks } from "@/components/brand";
import Cover from "@/components/cover";
import {
  Cursor,
  VisualStudioCode,
  Windsurf,
  Zed,
} from "@/components/icons/icons";
import Palette from "@/components/palette";
import Reference, { Variants } from "@/components/reference";
import Stepper, { Step } from "@/components/stepper";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/tabs";
import Code from "@/components/ui/code-block";
import CodeGroup from "@/components/ui/code-group";

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: React.ReactNode }>(node))
    return textOf(node.props.children);
  return "";
}

function generateId(children: React.ReactNode): string {
  return textOf(children)
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function InlineCode({
  heading,
  ...props
}: React.ComponentProps<"code"> & { heading?: boolean }) {
  // in a heading, code keeps the heading's size
  return (
    <code className={`c:code ff:m ${heading ? "" : "fs:md"}`} {...props} />
  );
}

function MdxCode({
  children,
  className,
  ...props
}: React.ComponentProps<"code"> & { heading?: boolean }) {
  if (className?.includes("language-")) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
  return <InlineCode {...props}>{children}</InlineCode>;
}

const inHeading = (children: React.ReactNode) =>
  Children.map(children, (child) =>
    isValidElement(child) && child.type === MdxCode
      ? cloneElement(child as React.ReactElement<{ heading?: boolean }>, {
          heading: true,
        })
      : child,
  );

const components: MDXComponents = {
  Admonition,
  Baseline,
  BrandColors,
  BrandMarks,
  Code,
  CodeGroup,
  Cover,
  // the UI shell renders the stage, so it stays mounted from one page to the next
  ComponentPlayground: () => null,
  Cursor,
  Note,
  Warning,
  Palette,
  Reference,
  Variants,
  Step,
  Stepper,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  VisualStudioCode,
  Windsurf,
  Zed,
  h1: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return props.className ? (
      <h1 id={id} {...props} className={`ff:display ${props.className}`}>
        {children}
      </h1>
    ) : (
      <h1
        id={id}
        className="ff:display mb:4 c:ink fs:4xl fw:400 lh:1"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return props.className ? (
      <h2 id={id} {...props} className={`ff:display ${props.className}`}>
        {inHeading(children)}
      </h2>
    ) : (
      <h2
        id={id}
        className="ff:display mt:12 mb:4 c:ink fs:xxl fw:400 lh:1"
        {...props}
      >
        {inHeading(children)}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return props.className ? (
      <h3 id={id} {...props} className={`ff:display ${props.className}`}>
        {inHeading(children)}
      </h3>
    ) : (
      <h3
        id={id}
        className="ff:display mt:8 mb:4 c:ink fs:xl fw:400 lh:1"
        {...props}
      >
        {inHeading(children)}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    const id = props.id || generateId(children);
    return props.className ? (
      <h4 id={id} {...props} className={`ff:display ${props.className}`}>
        {inHeading(children)}
      </h4>
    ) : (
      <h4
        id={id}
        className="ff:display mt:6 my:3 c:ink fs:lg fw:500 lh:1"
        {...props}
      >
        {inHeading(children)}
      </h4>
    );
  },
  h5: ({ children, ...props }) =>
    props.className ? (
      <h5 {...props} className={`ff:display ${props.className}`}>
        {children}
      </h5>
    ) : (
      <h5 className="ff:display mt:4 my:3 c:ink fs:md fw:500 lh:1" {...props}>
        {children}
      </h5>
    ),
  h6: ({ children, ...props }) =>
    props.className ? (
      <h6 {...props} className={`ff:display ${props.className}`}>
        {children}
      </h6>
    ) : (
      <h6 className="ff:display mt:4 my:2 c:ink fs:sm fw:500 lh:1" {...props}>
        {children}
      </h6>
    ),
  p: ({ children, ...props }) =>
    props.className ? (
      <p {...props}>{children}</p>
    ) : (
      <p className="my:4 c:ink/80" {...props}>
        {children}
      </p>
    ),
  a: ({ children, ...props }) =>
    props.className ? (
      <a {...props}>{children}</a>
    ) : (
      <a className="c:accent h:td:u fv:oc:ink fv:ow:2" {...props}>
        {children}
      </a>
    ),
  ul: ({ children, ...props }) =>
    props.className ? (
      <ul {...props}>{children}</ul>
    ) : (
      <ul className="my:6 ml:6 lst:d" {...props}>
        {children}
      </ul>
    ),
  ol: ({ children, ...props }) =>
    props.className ? (
      <ol {...props}>{children}</ol>
    ) : (
      <ol className="my:6 ml:6 lst:d" {...props}>
        {children}
      </ol>
    ),
  li: ({ children, ...props }) =>
    props.className ? (
      <li {...props}>{children}</li>
    ) : (
      <li className="my:2 c:ink/80" {...props}>
        {children}
      </li>
    ),
  blockquote: ({ children, ...props }) =>
    props.className ? (
      <blockquote {...props}>{children}</blockquote>
    ) : (
      <blockquote className="pl:2 bc:accent bg:accent-dim/10 blw:2" {...props}>
        {children}
      </blockquote>
    ),
  hr: ({ ...props }) =>
    props.className ? (
      <hr {...props} />
    ) : (
      <hr className="my:8 bc:border bw:1 bs:d" {...props} />
    ),
  table: ({ children, ...props }) =>
    props.className ? (
      <table {...props}>{children}</table>
    ) : (
      <div className="ox:auto my:6">
        <table className="w:100% bc:border bg:transparent bc:c" {...props}>
          {children}
        </table>
      </div>
    ),
  thead: ({ children, ...props }) =>
    props.className ? (
      <thead {...props}>{children}</thead>
    ) : (
      <thead className="bg:surface" {...props}>
        {children}
      </thead>
    ),
  th: ({ children, ...props }) =>
    props.className ? (
      <th {...props}>{children}</th>
    ) : (
      <th className="px:4 py:2 bc:border c:ink bw:1 ta:l fw:500" {...props}>
        {children}
      </th>
    ),
  td: ({ children, ...props }) =>
    props.className ? (
      <td {...props}>{children}</td>
    ) : (
      <td className="px:4 py:2 bc:border c:ink/80 bw:1" {...props}>
        {children}
      </td>
    ),
  code: MdxCode,
  strong: ({ children, ...props }) =>
    props.className ? (
      <strong {...props}>{children}</strong>
    ) : (
      <strong className="fw:600" {...props}>
        {children}
      </strong>
    ),
  img: ({ src, alt, className, ...props }) => (
    <Image
      src={src as string}
      alt={alt || ""}
      className={`${className || "w:100% h:auto my:4"} bc:border bg:surface bw:1`}
      unoptimized
      width={1920}
      height={1080}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      {...props}
    />
  ),
  div: ({ children, ...props }) => <div {...props}>{children}</div>,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
