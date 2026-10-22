import type { ReactNode } from "react";
import Scroller from "@/components/ui/scroller";
import { generateId } from "@/utils/doc-properties";
import {
  type Category,
  getPrefix,
  getReferenceData,
  type ReferenceRow,
  variantGroups,
  variantsLead,
} from "@/utils/yummacss";

interface Props {
  category: Category;
  /** One property, or several that share one scale: the first one's classes show. */
  name?: string;
  names?: string[];
}

// a scrolling table draws no outer border: its box does
const TABLE = "w:100% bc:c bc:border bg:surface ff:m fs:sm";
const EDGE = "bw:1";
const HEAD =
  "px:4 py:2 bbw:1 bc:border ta:l ff:system fs:xs fw:600 ls:2 tt:u c:silver-8";
const CELL = "px:4 py:2";
// rows draw the lines between them, so the last one leaves the edge to the box
const ROW = "bbw:1 bc:border lc:bbw:0";

function Rows({ rows }: { rows: ReferenceRow[] }) {
  return rows.map((row) => (
    <tr key={row.className} className={ROW}>
      <td className={`${CELL} w:30% c:code ws:nw`}>{row.className}</td>
      <td className={`${CELL} c:ink/70`}>{row.details.join(" ")}</td>
    </tr>
  ));
}

// a table this long scrolls in its own box, so every class is on the page
const LONG = 12;

/** A table under a sticky header; past LONG rows it scrolls in its own box. */
function Table({
  head,
  rows,
  children,
}: {
  head: [string, string];
  rows: number;
  children: ReactNode;
}) {
  const long = rows > LONG;
  const table = (
    <table className={long ? TABLE : `${TABLE} ${EDGE}`}>
      <thead>
        <tr>
          <th className={`${HEAD} w:30% p:st t:0 zi:10 bg:surface`}>
            {head[0]}
          </th>
          <th className={`${HEAD} p:st t:0 zi:10 bg:surface`}>{head[1]}</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
  if (!long) return <div className="ox:auto">{table}</div>;
  return (
    <Scroller
      className="max-h:96 bc:border bw:1 bg:surface"
      viewportClassName="ox:auto"
    >
      {table}
    </Scroller>
  );
}

/** A real class from the table, with another prefix in front of its value. */
const example = (rows: ReferenceRow[], from: string, to: string) => {
  const row = rows[Math.min(4, rows.length - 1)];
  return row ? `${to}${row.className.slice(from.length)}` : to;
};

export default function Reference({ category, name, names }: Props) {
  const all = names ?? (name ? [name] : []);
  const first = all[0];
  if (!first) return null;
  const rows = getReferenceData(category, first)?.rows ?? [];
  const others = all.slice(1);

  return (
    <div className="my:6">
      <Table head={["Class", "CSS"]} rows={rows.length}>
        <Rows rows={rows} />
      </Table>
      {others.length > 0 && (
        // each prefix keeps its property's anchor, which search links to
        <p className="my:4 c:ink/80">
          The same values work with{" "}
          {others.map((n, i) => (
            <span key={n}>
              {i > 0 && (i === others.length - 1 ? " & " : ", ")}
              <code id={generateId(n)} className="c:code ff:m fs:md smt:24">
                {getPrefix(category, n)}
              </code>
            </span>
          ))}
          , as in{" "}
          <code className="c:code ff:m fs:md">
            {example(
              rows,
              getPrefix(category, first),
              getPrefix(category, others.at(-1) as string),
            )}
          </code>
          .
        </p>
      )}
    </div>
  );
}

/** A sentence with `code` in backticks, set the way the page sets inline code. */
function Prose({ text }: { text: string }) {
  return (
    <p className="my:4 c:ink/80">
      {text.split(/`([^`]+)`/).map((part, i) =>
        i % 2 ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: the split's order is the identity
          <code key={i} className="c:code ff:m fs:md">
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </p>
  );
}

/** Every kind of variant the utility takes, a table per kind, each row a class to copy. */
export function Variants({
  category,
  name,
  negative = false,
}: {
  category: Category;
  name: string;
  negative?: boolean;
}) {
  const groups = variantGroups(category, name, negative);
  if (groups.length === 0) return null;
  return (
    <>
      <Prose text={variantsLead(category, name)} />
      {groups.map((group) => (
        <section key={group.title}>
          <h3
            id={generateId(group.title)}
            className="mt:8 mb:4 ff:display c:ink fs:xl fw:400 lh:1 smt:24"
          >
            {group.title}
          </h3>
          <Prose text={group.description} />
          <div className="ox:auto">
            <table className={`${TABLE} ${EDGE}`}>
              <tbody>
                {group.lines.map((line) => (
                  <tr key={line.className} className={ROW}>
                    <td className={`${CELL} w:30% c:code ws:nw`}>
                      {line.className}
                    </td>
                    <td className={`${CELL} c:ink/70 ff:body`}>{line.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  );
}
