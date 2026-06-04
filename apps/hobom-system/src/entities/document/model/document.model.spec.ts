import { describe, expect, it } from "vitest";
import {
  createSampleDocument,
  isComponentNode,
  isTextNode,
  type DocumentNode,
} from "./document.model";

const textNode: DocumentNode = { id: "t", type: "text", value: "x" };
const componentNode: DocumentNode = {
  id: "c",
  type: "Hb.Button",
  props: {},
  children: [],
};

describe("document.model 타입 가드", () => {
  it("isTextNode는 텍스트 노드만 참", () => {
    expect(isTextNode(textNode)).toBe(true);
    expect(isTextNode(componentNode)).toBe(false);
  });

  it("isComponentNode는 컴포넌트 노드만 참", () => {
    expect(isComponentNode(componentNode)).toBe(true);
    expect(isComponentNode(textNode)).toBe(false);
  });
});

describe("createSampleDocument", () => {
  it("Stack 루트에 카탈로그 컴포넌트들을 중첩해 담는다", () => {
    const doc = createSampleDocument();

    expect(doc.children).toHaveLength(1);

    const [root] = doc.children;

    expect(isComponentNode(root) && root.type).toBe("Hb.Stack");

    const types: string[] = [];
    const walk = (node: DocumentNode) => {
      if (!isComponentNode(node)) return;
      types.push(node.type);
      node.children.forEach(walk);
    };

    walk(root);

    expect(types).toEqual(
      expect.arrayContaining([
        "Hb.Stack",
        "Hb.Text",
        "Hb.Card.Root",
        "Hb.TextField",
        "Hb.Chip",
        "Hb.Divider",
        "Hb.Button",
      ]),
    );
  });

  it("호출마다 동일한 트리를 반환한다(결정론적 id)", () => {
    expect(createSampleDocument()).toEqual(createSampleDocument());
  });
});
