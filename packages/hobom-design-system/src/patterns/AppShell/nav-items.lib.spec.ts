import { describe, expect, it } from "vitest";
import {
  flattenNavEntries,
  flattenNavItems,
  isSection,
  resolveActiveItem,
  type AppShellNavItem,
  type NavEntry,
} from "./nav-items.lib";

const item = (value: string, path: string, children?: AppShellNavItem[]): AppShellNavItem => ({
  value,
  label: value,
  path,
  icon: null,
  children,
});

describe("isSection", () => {
  it("distinguishes a section from a plain item", () => {
    expect(isSection({ section: "s", label: "S", items: [] })).toBe(true);
    expect(isSection(item("a", "/a"))).toBe(false);
  });
});

describe("flattenNavItems", () => {
  it("inlines children after their parent", () => {
    const parent = item("p", "/p", [item("c1", "/p/1"), item("c2", "/p/2")]);

    expect(flattenNavItems([parent, item("q", "/q")]).map((i) => i.value)).toEqual([
      "p",
      "c1",
      "c2",
      "q",
    ]);
  });
});

describe("flattenNavEntries", () => {
  it("flattens sections and standalone items alike", () => {
    const entries: NavEntry[] = [
      { section: "s", label: "S", items: [item("a", "/a"), item("b", "/b", [item("b1", "/b/1")])] },
      item("c", "/c"),
    ];

    expect(flattenNavEntries(entries).map((i) => i.value)).toEqual(["a", "b", "b1", "c"]);
  });
});

describe("resolveActiveItem", () => {
  const entries: NavEntry[] = [
    { section: "s", label: "S", items: [item("dash", "/"), item("issues", "/issues")] },
    item("board", "/board", [item("kanban", "/board/kanban")]),
  ];

  it("picks the longest matching path prefix", () => {
    expect(resolveActiveItem(entries, undefined, "/board/kanban/123")?.value).toBe("kanban");
    expect(resolveActiveItem(entries, undefined, "/issues/42")?.value).toBe("issues");
  });

  it("does not let a shorter prefix shadow a longer one", () => {
    // "/" matches everything, but "/board" is the longer, more specific match.
    expect(resolveActiveItem(entries, undefined, "/board")?.value).toBe("board");
  });

  it("also considers bottom items", () => {
    const bottom = [item("settings", "/settings")];

    expect(resolveActiveItem(entries, bottom, "/settings")?.value).toBe("settings");
  });

  it("falls back to the first item when nothing matches", () => {
    const noRoot: NavEntry[] = [item("board", "/board"), item("issues", "/issues")];

    expect(resolveActiveItem(noRoot, undefined, "/unknown")?.value).toBe("board");
  });

  it("falls back to the first item inside a leading section", () => {
    expect(resolveActiveItem(entries, undefined, "/nope")?.value).toBe("dash");
  });
});
