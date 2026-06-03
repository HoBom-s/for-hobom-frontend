// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createSampleDocument, type StudioDocument } from "@/entities/document";
import { Canvas } from "./Canvas";

describe("Canvas", () => {
  it("샘플 문서를 실제 Hb.Button으로 렌더한다", () => {
    render(<Canvas document={createSampleDocument()} />);

    const button = screen.getByRole("button", { name: "저장" });

    expect(button).toBeDefined();
  });

  it("variant 등 props가 실제 컴포넌트에 반영된다(MUI primary 클래스)", () => {
    render(<Canvas document={createSampleDocument()} />);

    const button = screen.getByRole("button", { name: "저장" });

    expect(button.className).toContain("MuiButton-containedPrimary");
  });

  it("미등록 컴포넌트는 경고 플레이스홀더로 렌더한다", () => {
    const doc: StudioDocument = {
      children: [{ id: "x", type: "Hb.Unknown", props: {}, children: [] }],
    };

    render(<Canvas document={doc} />);

    expect(screen.getByText(/미등록 컴포넌트/)).toBeDefined();
  });
});
