import { describe, expect, it } from "vitest";
import { isComponentNode, type DocumentNode, type StudioDocument } from "../model/document.model";
import { findNode, insertNode, removeNode  } from "./document-tree.lib";
import { createNodeId } from "./create-node-id.lib";

const button = (id: string): DocumentNode => ({ id, type: "Hb.Button", props: {}, children: [] });

const baseDoc = (): StudioDocument => ({
  children: [{ id: "stack", type: "Hb.Stack", props: {}, children: [button("a")] }],
});

describe("insertNode", () => {
  it("부모(컨테이너)의 자식 끝에 삽입한다", () => {
    const next = insertNode(baseDoc(), "stack", button("b"));
    const stack = findNode(next, "stack");

    expect(stack && isComponentNode(stack) && stack.children.map((c) => c.id)).toEqual(["a", "b"]);
  });

  it("parentId가 null이면 루트에 삽입한다", () => {
    const next = insertNode(baseDoc(), null, button("root2"));

    expect(next.children.map((c) => c.id)).toEqual(["stack", "root2"]);
  });

  it("원본은 불변", () => {
    const doc = baseDoc();

    insertNode(doc, "stack", button("b"));

    expect(findNode(doc, "b")).toBeUndefined();
  });
});

describe("removeNode", () => {
  it("중첩된 노드를 제거한다", () => {
    const next = removeNode(baseDoc(), "a");
    const stack = findNode(next, "stack");

    expect(stack && isComponentNode(stack) && stack.children).toHaveLength(0);
  });

  it("최상위 노드를 제거한다", () => {
    expect(removeNode(baseDoc(), "stack").children).toHaveLength(0);
  });
});

describe("createNodeId", () => {
  it("n_ 접두사 + 매번 고유", () => {
    const a = createNodeId();
    const b = createNodeId();

    expect(a.startsWith("n_")).toBe(true);
    expect(a).not.toBe(b);
  });
});
