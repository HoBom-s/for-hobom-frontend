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
type ComponentKey = string;

/** prop 값으로 허용되는 원시 타입. (토큰 참조 등은 추후 확장) */
export type PropValue = string | boolean | number;

type NodeProps = Record<string, PropValue>;

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
 * 샘플 문서: 카탈로그 전반을 보여주는 회원가입 카드 폼.
 * Stack 중첩(세로/가로) · Card · Text · TextField · Chip · Divider · Button 변형을 포함한다.
 * id는 결정론적으로 고정한다(테스트·스냅샷 안정성).
 */
export const createSampleDocument = (): StudioDocument => ({
  children: [
    {
      id: "n_root",
      type: "Hb.Stack",
      props: { direction: "column", gap: 3 },
      children: [
        {
          id: "n_title",
          type: "Hb.Text",
          props: { variant: "h6" },
          children: [{ id: "n_title_text", type: "text", value: "회원 가입" }],
        },
        {
          id: "n_card",
          type: "Hb.Card.Root",
          props: { variant: "outlined" },
          children: [
            {
              id: "n_card_body",
              type: "Hb.Stack",
              props: { direction: "column", gap: 2 },
              children: [
                { id: "n_name", type: "Hb.TextField", props: { label: "이름" }, children: [] },
                {
                  id: "n_email",
                  type: "Hb.TextField",
                  props: { label: "이메일", placeholder: "you@example.com" },
                  children: [],
                },
                { id: "n_div", type: "Hb.Divider", props: {}, children: [] },
                {
                  id: "n_chips",
                  type: "Hb.Stack",
                  props: { direction: "row", gap: 1 },
                  children: [
                    {
                      id: "n_chip_role",
                      type: "Hb.Chip",
                      props: { label: "관리자", variant: "outlined" },
                      children: [],
                    },
                    {
                      id: "n_chip_status",
                      type: "Hb.Chip",
                      props: { label: "활성", variant: "filled" },
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "n_actions",
          type: "Hb.Stack",
          props: { direction: "row", gap: 1 },
          children: [
            {
              id: "n_cancel",
              type: "Hb.Button",
              props: { variant: "ghost" },
              children: [{ id: "n_cancel_label", type: "text", value: "취소" }],
            },
            {
              id: "n_btn",
              type: "Hb.Button",
              props: { variant: "primary", disabled: false },
              children: [{ id: "n_btn_label", type: "text", value: "저장" }],
            },
          ],
        },
      ],
    },
  ],
});
