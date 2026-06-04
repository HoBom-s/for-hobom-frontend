import { describe, expect, it } from "vitest";
import { createSampleDocument, updateNodeProps, type StudioDocument } from "@/entities/document";
import { generateJsx } from "./generate-jsx.lib";

describe("generateJsx", () => {
  it("default와 같은 prop은 생략한다", () => {
    // variant=primary(default), disabled=false(default) → 둘 다 생략
    const doc: StudioDocument = {
      children: [
        {
          id: "b",
          type: "Hb.Button",
          props: { variant: "primary", disabled: false },
          children: [{ id: "t", type: "text", value: "저장" }],
        },
      ],
    };
    const code = generateJsx(doc);

    expect(code).toContain('import { Hb } from "hobom-design-system";');
    expect(code).toContain("<Hb.Button>저장</Hb.Button>");
    expect(code).not.toContain("variant");
    expect(code).not.toContain("disabled");
  });

  it("컨테이너(Stack/Card)와 자식을 중첩 코드로 생성한다", () => {
    const code = generateJsx(createSampleDocument());

    expect(code).toContain('<Hb.Text variant="h6">회원 가입</Hb.Text>');
    expect(code).toContain("<Hb.Card.Root>");
    expect(code).toContain('<Hb.TextField label="이름" />');
    expect(code).toContain('<Hb.Chip label="관리자" variant="outlined" />');
    expect(code).toContain("<Hb.Divider />");
    expect(code).toContain("<Hb.Button>저장</Hb.Button>");
    expect(code).toContain("</Hb.Card.Root>");
  });

  it("default와 다른 enum 값은 속성으로 출력한다", () => {
    const doc = updateNodeProps(createSampleDocument(), "n_btn", "variant", "danger");

    expect(generateJsx(doc)).toContain('<Hb.Button variant="danger">저장</Hb.Button>');
  });

  it("true boolean은 단축 속성으로 출력한다", () => {
    const doc = updateNodeProps(createSampleDocument(), "n_btn", "disabled", true);

    expect(generateJsx(doc)).toContain("<Hb.Button disabled>저장</Hb.Button>");
  });

  it("자식이 없으면 self-closing 태그", () => {
    const doc: StudioDocument = {
      children: [{ id: "b", type: "Hb.Button", props: { variant: "danger" }, children: [] }],
    };

    expect(generateJsx(doc)).toContain('<Hb.Button variant="danger" />');
  });

  it("미등록 컴포넌트는 주석으로 표시한다", () => {
    const doc: StudioDocument = {
      children: [{ id: "x", type: "Hb.Unknown", props: {}, children: [] }],
    };

    expect(generateJsx(doc)).toContain("{/* 미등록 컴포넌트: Hb.Unknown */}");
  });
});
