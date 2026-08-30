// @vitest-environment jsdom
// 카드 본문의 성별·성격·배지 표시를 검증하는 테스트
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimalCard } from "./AnimalCard";

describe("AnimalCard", () => {
  it("shows the sex glyph, personality, badges, and footnote", () => {
    render(
      <AnimalCard
        name="흑미"
        status="입양가능"
        meta="리트리버 믹스 · 3살 · 대형"
        sex="MALE"
        personality="듬직하고 순해요"
        badges={["중성화 완료", "임보 가능"]}
        footnote="보호 113일째"
      />,
    );

    expect(screen.getByRole("img", { name: "수컷" }).textContent).toBe("♂");
    expect(screen.getByText("듬직하고 순해요")).toBeTruthy();
    expect(screen.getByText("중성화 완료")).toBeTruthy();
    expect(screen.getByText("임보 가능")).toBeTruthy();
    expect(screen.getByText("보호 113일째")).toBeTruthy();
  });

  it("omits the optional lines when the data is missing", () => {
    render(<AnimalCard name="나비" status="입양가능" meta="코숏 · 2살 · 소형" sex="UNKNOWN" />);

    expect(screen.queryByRole("img", { name: "미상" })).toBeNull();
    expect(screen.queryByText("중성화 완료")).toBeNull();
  });
});
