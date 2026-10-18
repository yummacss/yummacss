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

/**
 * A keyboard shortcut as keycaps, the same keycap the menus and tooltips use,
 * for hints in running text.
 */
export default function Kbd({ keys, className }: KbdProps) {
  return (
    <span className="d:if ai:c g:1 va:m">
      {keys.map((key) => (
        <kbd
          key={key}
          className={merge(
            "px:1 br:sm bw:1 bc:current fs:xs fw:400 lh:4 ff:d",
            className,
          )}
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}
