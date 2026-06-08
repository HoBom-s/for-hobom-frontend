import { describe, expect, it } from "vitest";
import { isComponentNode, type DocumentNode, type StudioDocument } from "../model/document.model";
import { findNode, findParentId, getSiblings, reorderChildren } from "./document-tree.lib";

const leaf = (id: string): DocumentNode => ({ id, type: "Hb.Button", props: {}, children: [] });

const doc = (): StudioDocument => ({
  children: [
    {
      id: "stack",
      type: "Hb.Stack",
      props: {},
      children: [leaf("a"), leaf("b"), leaf("c")],
    },
  ],
});

describe("findParentId", () => {
  it("최상위 노드는 null", () => {
    expect(findParentId(doc(), "stack")).toBeNull();
  });

  it("중첩 노드는 부모 id", () => {
    expect(findParentId(doc(), "b")).toBe("stack");
  });

  it("없는 노드는 undefined", () => {
    expect(findParentId(doc(), "zzz")).toBeUndefined();
  });
});

describe("getSiblings", () => {
  it("부모의 직계 자식 목록", () => {
    expect(getSiblings(doc(), "stack").map((n) => n.id)).toEqual(["a", "b", "c"]);
  });

  it("null이면 루트 자식", () => {
    expect(getSiblings(doc(), null).map((n) => n.id)).toEqual(["stack"]);
  });
});

describe("reorderChildren", () => {
  it("자식 순서를 from→to로 바꾼다", () => {
    const next = reorderChildren(doc(), "stack", 0, 2);
    const stack = findNode(next, "stack");

    expect(stack && isComponentNode(stack) && stack.children.map((n) => n.id)).toEqual([
      "b",
      "c",
      "a",
    ]);
  });

  it("원본은 불변", () => {
    const base = doc();

    reorderChildren(base, "stack", 0, 2);
    const stack = findNode(base, "stack");

    expect(stack && isComponentNode(stack) && stack.children.map((n) => n.id)).toEqual([
      "a",
      "b",
      "c",
    ]);
  });
});
