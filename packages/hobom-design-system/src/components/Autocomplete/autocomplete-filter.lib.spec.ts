import { describe, expect, it } from "vitest";
import { filterOptions, groupOptions } from "./autocomplete-filter.lib";

const fruit = ["Apple", "Banana", "Apricot", "Cherry"];
const label = (s: string) => s;

describe("filterOptions", () => {
  it("returns everything for an empty query", () => {
    expect(filterOptions(fruit, "  ", label)).toEqual(fruit);
  });

  it("matches case-insensitive substrings", () => {
    expect(filterOptions(fruit, "ap", label)).toEqual(["Apple", "Apricot"]);
  });

  it("returns nothing when no option matches", () => {
    expect(filterOptions(fruit, "xyz", label)).toEqual([]);
  });
});

describe("groupOptions", () => {
  it("buckets by group key, preserving first-seen group order", () => {
    const items = [
      { name: "a", kind: "letter" },
      { name: "1", kind: "digit" },
      { name: "b", kind: "letter" },
    ];

    expect(groupOptions(items, (i) => i.kind)).toEqual([
      { group: "letter", options: [items[0], items[2]] },
      { group: "digit", options: [items[1]] },
    ]);
  });
});
