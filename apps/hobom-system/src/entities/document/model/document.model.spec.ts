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
  it("primary 버튼 1개와 텍스트 자식을 가진다", () => {
    const doc = createSampleDocument();

    expect(doc.children).toHaveLength(1);

    const [button] = doc.children;

    expect(isComponentNode(button)).toBe(true);
    if (!isComponentNode(button)) return;

    expect(button.type).toBe("Hb.Button");
    expect(button.props.variant).toBe("primary");
    expect(button.children).toHaveLength(1);
    expect(isTextNode(button.children[0])).toBe(true);
  });

  it("호출마다 동일한 트리를 반환한다(결정론적 id)", () => {
    expect(createSampleDocument()).toEqual(createSampleDocument());
  });
});
