// @vitest-environment happy-dom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { DocumentNode } from "@/entities/document";
import { Inspector } from "./Inspector";

const buttonNode: DocumentNode = {
  id: "btn",
  type: "Hb.Button",
  props: { variant: "primary", disabled: false },
  children: [{ id: "btn_label", type: "text", value: "저장" }],
};

describe("Inspector", () => {
  it("선택된 노드가 없으면 안내 문구를 보여준다", () => {
    render(<Inspector node={undefined} onChange={vi.fn()} />);

    expect(screen.getByText("요소를 선택하세요")).toBeDefined();
  });

  it("매니페스트의 enum 옵션을 버튼으로 렌더한다", () => {
    render(<Inspector node={buttonNode} onChange={vi.fn()} />);

    for (const variant of ["primary", "secondary", "danger", "ghost"]) {
      expect(screen.getByRole("button", { name: variant })).toBeDefined();
    }
  });

  it("enum 옵션 클릭 시 onChange(prop, value)를 호출한다", () => {
    const onChange = vi.fn();

    render(<Inspector node={buttonNode} onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: "danger" }));

    expect(onChange).toHaveBeenCalledWith("variant", "danger");
  });

  it("boolean prop은 체크박스로 렌더한다", () => {
    render(<Inspector node={buttonNode} onChange={vi.fn()} />);

    expect(screen.getByRole("checkbox")).toBeDefined();
  });
});
