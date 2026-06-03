import { describe, expect, it } from "vitest";
import { createSampleDocument, updateNodeProps, type StudioDocument } from "@/entities/document";
import { generateJsx } from "./generate-jsx.lib";

describe("generateJsx", () => {
  it("default와 같은 prop은 생략한다", () => {
    // 샘플: variant=primary(default), disabled=false(default) → 둘 다 생략
    const code = generateJsx(createSampleDocument());

    expect(code).toContain('import { Hb } from "hobom-design-system";');
    expect(code).toContain("<Hb.Button>저장</Hb.Button>");
    expect(code).not.toContain("variant");
    expect(code).not.toContain("disabled");
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
