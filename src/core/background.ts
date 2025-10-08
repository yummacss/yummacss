import { standardSet } from "@/defaults/variants/sets";
import { Utilities } from "@/interfaces";

export const background: Utilities = {
  "background-attachment": {
    prefix: "ba",
    properties: ["background-attachment"],
    slug: "background-attachment",
    values: {
      f: "fixed",
      l: "local",
      s: "scroll",
    },
    variants: {
      ...standardSet,
    },
  },

  "background-clip": {
    prefix: "bc",
    properties: ["background-clip"],
    slug: "background-clip",
    values: {
      bb: "border-box",
      cb: "content-box",
      pb: "padding-box",
      t: "text",
    },
    variants: {
      ...standardSet,
    },
  },

  "background-origin": {
    prefix: "bo",
    properties: ["background-origin"],
    slug: "background-origin",
    values: {
      bb: "border-box",
      cb: "content-box",
      pb: "padding-box",
    },
    variants: {
      ...standardSet,
    },
  },

  "background-position": {
    prefix: "bp",
    properties: ["background-position"],
    slug: "background-position",
    values: {
      b: "bottom",
      c: "center",
      l: "left",
      lb: "left bottom",
      lt: "left top",
      r: "right",
      rb: "right bottom",
      rt: "right top",
      t: "top",
    },
    variants: {
      ...standardSet,
    },
  },

  "background-repeat": {
    prefix: "br",
    properties: ["background-repeat"],
    slug: "background-repeat",
    values: {
      nr: "no-repeat",
      r: "repeat",
      ro: "round",
      rx: "repeat-x",
      ry: "repeat-y",
      s: "space",
    },
    variants: {
      ...standardSet,
    },
  },

  "background-size": {
    prefix: "bs",
    properties: ["background-size"],
    slug: "background-size",
    values: {
      auto: "auto",
      c: "cover",
      co: "contain",
    },
    variants: {
      ...standardSet,
    },
  },
};
