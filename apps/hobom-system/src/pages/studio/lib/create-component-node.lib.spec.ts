import { describe, expect, it } from "vitest";
import { getManifest } from "@/entities/manifest";
import { createComponentNode } from "./create-component-node.lib";

const counter = () => {
  let n = 0;

  return () => `id_${n++}`;
};

const manifest = (key: string) => {
  const found = getManifest(key);

  if (!found) {
    throw new Error(`no manifest: ${key}`);
  }

  return found;
};

describe("createComponentNode", () => {
  it("매니페스트 기본 prop을 채운다", () => {
    const node = createComponentNode(manifest("Hb.Stack"), counter());

    expect(node.type).toBe("Hb.Stack");
    expect(node.props.direction).toBe("column");
    expect(node.props.gap).toBe(2);
  });

  it("slot이 text를 받으면 기본 텍스트 자식을 둔다", () => {
    const node = createComponentNode(manifest("Hb.Button"), counter());

    expect(node.children).toHaveLength(1);
    expect(node.children[0]).toMatchObject({ type: "text", value: "버튼" });
  });

  it("컨테이너(slot이 컴포넌트만 받음)는 빈 자식으로 둔다", () => {
    const node = createComponentNode(manifest("Hb.Card.Root"), counter());

    expect(node.children).toHaveLength(0);
  });
});
