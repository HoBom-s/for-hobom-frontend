/**
 * Document Model — Studio 캔버스가 편집하는 직렬화 가능한 노드 트리(scene graph).
 *
 * 이 트리 하나가 캔버스 렌더링과 코드 생성의 **공통 입력**이다.
 * "보이는 것 = 생성되는 코드"는, 두 렌더러가 같은 트리를 읽기 때문에 성립한다.
 *
 * 주의(FSD): 이 엔티티는 동일 레이어인 `entities/manifest`를 import할 수 없다.
 * 따라서 컴포넌트 키는 여기서 `string`(ComponentKey)으로만 다루고,
 * 매니페스트와 엮는 로직(렌더/검증)은 상위 레이어(widgets)에 둔다.
 */

export type NodeId = string;

/** 매니페스트의 ComponentKey와 같은 의미. 동일 레이어 의존 금지로 string 별칭만 둔다. */
export type ComponentKey = string;

/** prop 값으로 허용되는 원시 타입. (토큰 참조 등은 추후 확장) */
export type PropValue = string | boolean | number;

export type NodeProps = Record<string, PropValue>;

/** 원시 텍스트 노드. */
export interface TextNode {
  id: NodeId;
  type: "text";
  value: string;
}

/** 디자인 시스템 컴포넌트 노드. */
export interface ComponentNode {
  id: NodeId;
  type: ComponentKey;
  props: NodeProps;
  children: DocumentNode[];
}

export type DocumentNode = TextNode | ComponentNode;

/** 캔버스 한 장. v0 스켈레톤은 최상위에 단일 노드만 두지만, 구조상 여러 개를 허용한다. */
export interface StudioDocument {
  children: DocumentNode[];
}

export const isTextNode = (node: DocumentNode): node is TextNode => node.type === "text";

export const isComponentNode = (node: DocumentNode): node is ComponentNode =>
  node.type !== "text";

/**
 * 스켈레톤 검증용 샘플 문서: "저장" 라벨을 가진 primary 버튼 1개.
 * id는 결정론적으로 고정한다(테스트·스냅샷 안정성).
 */
export const createSampleDocument = (): StudioDocument => ({
  children: [
    {
      id: "n_btn",
      type: "Hb.Button",
      props: { variant: "primary", disabled: false },
      children: [{ id: "n_btn_label", type: "text", value: "저장" }],
    },
  ],
});
