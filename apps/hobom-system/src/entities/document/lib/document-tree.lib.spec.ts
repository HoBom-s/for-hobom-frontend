import { describe, expect, it } from "vitest";
import { createSampleDocument, isComponentNode } from "../model/document.model";
import { findNode, updateNodeProps } from "./document-tree.lib";

describe("findNode", () => {
  const doc = createSampleDocument();

  it("최상위 노드를 찾는다", () => {
    expect(findNode(doc, "n_btn")?.id).toBe("n_btn");
  });

  it("중첩된 자식 노드를 찾는다", () => {
    expect(findNode(doc, "n_btn_label")?.id).toBe("n_btn_label");
  });

  it("없는 id는 undefined", () => {
    expect(findNode(doc, "nope")).toBeUndefined();
  });
});

describe("updateNodeProps", () => {
  const doc = createSampleDocument();

  it("대상 노드의 prop을 바꾼다", () => {
    const next = updateNodeProps(doc, "n_btn", "variant", "danger");
    const button = findNode(next, "n_btn");

    expect(button && isComponentNode(button) && button.props.variant).toBe("danger");
  });

  it("원본 문서는 불변(immutable)", () => {
    updateNodeProps(doc, "n_btn", "variant", "danger");
    const original = findNode(doc, "n_btn");

    expect(original && isComponentNode(original) && original.props.variant).toBe("primary");
  });

  it("없는 대상이면 값 변화 없이 새 트리를 반환한다", () => {
    const next = updateNodeProps(doc, "nope", "variant", "danger");

    expect(next).toEqual(doc);
    expect(next).not.toBe(doc);
  });
});
