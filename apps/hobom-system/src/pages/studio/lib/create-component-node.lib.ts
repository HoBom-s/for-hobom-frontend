import { Bom } from "hobom-utils";
import type { ComponentManifest } from "@/entities/manifest";
import type { ComponentNode, NodeId, PropValue } from "@/entities/document";

/** slot이 text를 받는 컴포넌트의 기본 텍스트 자식 내용. */
const DEFAULT_TEXT: Record<string, string> = {
  "Hb.Button": "버튼",
  "Hb.Text": "텍스트",
};

/**
 * 매니페스트 기본값으로 새 컴포넌트 노드를 만든다.
 * slot이 text를 받으면 기본 텍스트 자식을 두고, 그 외 컨테이너는 빈 채로 둔다.
 */
export function createComponentNode(
  manifest: ComponentManifest,
  createId: () => NodeId,
): ComponentNode {
  const id = createId();

  const props: Record<string, PropValue> = Object.fromEntries(
    Bom.flatMap(Object.entries(manifest.props), ([name, spec]) =>
      spec.kind === "slot" ? [] : [[name, spec.default] as const],
    ),
  );

  const acceptsText = Bom.some(
    Object.values(manifest.props),
    (spec) => spec.kind === "slot" && spec.accepts.includes("text"),
  );

  const children = acceptsText
    ? [{ id: createId(), type: "text" as const, value: DEFAULT_TEXT[manifest.name] ?? "텍스트" }]
    : [];

  return { id, type: manifest.name, props, children };
}

/** 컴포넌트를 자식으로 받는 컨테이너인지(slot이 text 외의 노드를 허용). */
export const acceptsComponentChildren = (manifest: ComponentManifest): boolean =>
  Bom.some(
    Object.values(manifest.props),
    (spec) => spec.kind === "slot" && Bom.some(spec.accepts, (accept) => accept !== "text"),
  );
