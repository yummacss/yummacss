import { describe, expect, it } from "vitest";
import { badgeFor } from "../src/utils/since";
import { ver } from "../src/utils/version";

const minor = ver.split(".").slice(0, 2).join(".");

describe("what is new", () => {
  it("marks a page from the current minor with its version", () => {
    expect(badgeFor({ since: minor })).toBe(minor);
    expect(badgeFor({ since: "3.0" })).toBeUndefined();
    expect(badgeFor()).toBeUndefined();
  });
});
