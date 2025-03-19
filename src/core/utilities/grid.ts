import { UtilityMap } from "@/interfaces";
import { createValues } from "@/core/helpers/create-values";
import { YMA_GAP } from "@/constants/variables";

export const gridUtils: UtilityMap = {
  "column-gap": {
    prefix: "cg",
    properties: ["column-gap"],
    slug: "column-gap",
    values: createValues({
      base: YMA_GAP,
      unit: "rem",
      min: 0,
      max: 100,
    }),
  },

  gap: {
    prefix: "g",
    properties: ["gap"],
    slug: "gap",
    values: createValues({
      base: YMA_GAP,
      unit: "rem",
      min: 0,
      max: 100,
    }),
  },

  "grid-auto-columns": {
    prefix: "gac",
    properties: ["grid-auto-columns"],
    slug: "grid-auto-columns",
    values: {
      auto: "auto",
      max: "max-content",
      min: "min-content",
    },
  },

  "grid-auto-flow": {
    prefix: "gaf",
    properties: ["grid-auto-flow"],
    slug: "grid-auto-flow",
    values: {
      c: "column",
      cd: "column dense",
      d: "dense",
      r: "row",
      rd: "row dense",
    },
  },

  "grid-auto-rows": {
    prefix: "gar",
    properties: ["grid-auto-rows"],
    slug: "grid-auto-rows",
    values: {
      auto: "auto",
      max: "max-content",
      min: "min-content",
    },
  },

  "grid-column": {
    prefix: "gc-s",
    properties: ["grid-column"],
    slug: "grid-column",
    values: {
      "1": "span 1 / span 1",
      "2": "span 2 / span 2",
      "3": "span 3 / span 3",
      "4": "span 4 / span 4",
      "5": "span 5 / span 5",
      "6": "span 6 / span 6",
      "7": "span 7 / span 7",
      "8": "span 8 / span 8",
      "9": "span 9 / span 9",
      "10": "span 10 / span 10",
      "11": "span 11 / span 11",
      "12": "span 12 / span 12",
      "13": "span 13 / span 13",
      "14": "span 14 / span 14",
      "15": "span 15 / span 15",
      "16": "span 16 / span 16",
    },
  },

  "grid-column-end": {
    prefix: "gce",
    properties: ["grid-column-end"],
    slug: "grid-column-end",
    values: createValues({
      base: 1,
      min: 1,
      max: 16,
    }),
  },

  "grid-column-start": {
    prefix: "gcs",
    properties: ["grid-column-start"],
    slug: "grid-column-start",
    values: createValues({
      base: 1,
      min: 1,
      max: 16,
    }),
  },

  "grid-row": {
    prefix: "gr-s",
    properties: ["grid-row"],
    slug: "grid-row",
    values: {
      "1": "span 1 / span 1",
      "2": "span 2 / span 2",
      "3": "span 3 / span 3",
      "4": "span 4 / span 4",
      "5": "span 5 / span 5",
      "6": "span 6 / span 6",
      "7": "span 7 / span 7",
      "8": "span 8 / span 8",
      "9": "span 9 / span 9",
      "10": "span 10 / span 10",
      "11": "span 11 / span 11",
      "12": "span 12 / span 12",
      "13": "span 13 / span 13",
      "14": "span 14 / span 14",
      "15": "span 15 / span 15",
      "16": "span 16 / span 16",
    },
  },

  "grid-row-end": {
    prefix: "gre",
    properties: ["grid-row-end"],
    slug: "grid-row-end",
    values: createValues({
      base: 1,
      min: 1,
      max: 16,
    }),
  },

  "grid-row-start": {
    prefix: "grs",
    properties: ["grid-row-start"],
    slug: "grid-row-start",
    values: createValues({
      base: 1,
      min: 1,
      max: 16,
    }),
  },

  "grid-template-columns": {
    prefix: "gtc",
    properties: ["grid-template-columns"],
    slug: "grid-template-columns",
    values: {
      "1": "repeat(1, minmax(0, 1fr))",
      "2": "repeat(2, minmax(0, 1fr))",
      "3": "repeat(3, minmax(0, 1fr))",
      "4": "repeat(4, minmax(0, 1fr))",
      "5": "repeat(5, minmax(0, 1fr))",
      "6": "repeat(6, minmax(0, 1fr))",
      "7": "repeat(7, minmax(0, 1fr))",
      "8": "repeat(8, minmax(0, 1fr))",
      "9": "repeat(9, minmax(0, 1fr))",
      "10": "repeat(10, minmax(0, 1fr))",
      "11": "repeat(11, minmax(0, 1fr))",
      "12": "repeat(12, minmax(0, 1fr))",
      "13": "repeat(13, minmax(0, 1fr))",
      "14": "repeat(14, minmax(0, 1fr))",
      "15": "repeat(15, minmax(0, 1fr))",
      "16": "repeat(16, minmax(0, 1fr))",
    },
  },

  "grid-template-rows": {
    prefix: "gtr",
    properties: ["grid-template-rows"],
    slug: "grid-template-rows",
    values: {
      "1": "repeat(1, minmax(0, 1fr))",
      "2": "repeat(2, minmax(0, 1fr))",
      "3": "repeat(3, minmax(0, 1fr))",
      "4": "repeat(4, minmax(0, 1fr))",
      "5": "repeat(5, minmax(0, 1fr))",
      "6": "repeat(6, minmax(0, 1fr))",
      "7": "repeat(7, minmax(0, 1fr))",
      "8": "repeat(8, minmax(0, 1fr))",
      "9": "repeat(9, minmax(0, 1fr))",
      "10": "repeat(10, minmax(0, 1fr))",
      "11": "repeat(11, minmax(0, 1fr))",
      "12": "repeat(12, minmax(0, 1fr))",
      "13": "repeat(13, minmax(0, 1fr))",
      "14": "repeat(14, minmax(0, 1fr))",
      "15": "repeat(15, minmax(0, 1fr))",
      "16": "repeat(16, minmax(0, 1fr))",
    },
  },

  "row-gap": {
    prefix: "rg",
    properties: ["row-gap"],
    slug: "row-gap",
    values: createValues({
      base: YMA_GAP,
      unit: "rem",
      min: 0,
      max: 100,
    }),
  },
};
