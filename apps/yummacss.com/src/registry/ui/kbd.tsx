import { merge } from "yummacss/merge";

export interface KbdProps {
  /** The keys to press together, each drawn as its own keycap. */
  keys: string[];
  /**
   * Extra classes on each keycap. `merge` folds them in last, so one here
   * replaces the component's own class for the same utility.
   */
  className?: string;
}

/** A keyboard shortcut as raised keycaps, for hints in running text. */
export default function Kbd({ keys, className }: KbdProps) {
  return (
    <span className="d:if ai:c g:1 va:m">
      {keys.map((key) => (
        <kbd
          key={key}
          className={merge(
            "d:if ai:c jc:c min-w:6 h:6 px:1 br:md bg:raised c:label btw:1 blw:1 brw:1 bbw:3 btc:rim blc:rim brc:rim bbc:shadow bs-o:xs fs:xs fw:500 lh:1 ff:d",
            className,
          )}
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}
