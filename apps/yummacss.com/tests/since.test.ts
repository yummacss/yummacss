import { describe, expect, it } from "vitest";
import { NEW_FOR_DAYS, newIn } from "../src/utils/since";
import { ver } from "../src/utils/version";

const minor = ver.split(".").slice(0, 2).join(".");
const day = 86_400_000;

describe("what is new", () => {
  it("marks a page from the current minor with its version", () => {
    expect(newIn(minor)).toBe(minor);
    expect(newIn("3.0")).toBeUndefined();
  });

  it("marks a component as new for its window after it is added", () => {
    const added = "2026-09-28";
    const at = Date.parse(added);
    expect(newIn(undefined, added, at + day)).toBe("New");
    expect(newIn(undefined, added, at + NEW_FOR_DAYS * day)).toBeUndefined();
  });
});
