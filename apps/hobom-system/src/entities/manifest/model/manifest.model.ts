/**
 * 컴포넌트 매니페스트 — 디자인 시스템 컴포넌트(`Hb.*`)의 "기계가 읽는 계약".
 *
 * 하나의 매니페스트가 Studio의 여러 레이어를 동시에 구동한다:
 *  - Insert 팔레트  : 무엇을 놓을 수 있는가(`category`)
 *  - Inspector      : 어떤 prop을 어떤 컨트롤로 편집하는가(`PropSpec.kind`)
 *  - 코드 생성       : 어떤 prop이 default라 생략 가능한가(`default`)
 *  - 유효성 검증     : slot이 어떤 자식을 허용하는가(`accepts`)
 */

/** prop 한 개의 편집/생성 스펙. `kind`로 구분되는 discriminated union. */
export type PropSpec =
  | { kind: "enum"; values: readonly string[]; default: string }
  | { kind: "boolean"; default: boolean }
  | { kind: "slot"; accepts: readonly NodeKind[] };

/** Document 노드가 가질 수 있는 종류. 컴포넌트 키이거나 원시 텍스트. */
export type NodeKind = ComponentKey | "text";

/** 매니페스트가 식별하는 컴포넌트 키. 예: `"Hb.Button"`. */
export type ComponentKey = string;

export interface ComponentManifest {
  /** Document 노드·레지스트리가 참조하는 고유 키. 예: `"Hb.Button"`. */
  name: ComponentKey;
  /** 코드 생성 시 사용할 import 정보. */
  import: { source: string; access: string };
  /** Insert 팔레트 분류. */
  category: string;
  /** prop 이름 → 스펙. `children`는 slot으로 표현한다. */
  props: Record<string, PropSpec>;
}
