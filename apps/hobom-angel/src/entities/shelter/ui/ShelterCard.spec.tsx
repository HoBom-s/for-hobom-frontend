// @vitest-environment jsdom
// 보호소 카드가 커버 이미지 누락 시 공통 기본 이미지를 표시하는지 검증하는 테스트
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { ShelterCard } from "./ShelterCard";
import type { ShelterListItem } from "../model/shelter.model";

const shelter: ShelterListItem = {
  id: "shelter-1",
  name: "행복한 보호소",
  slug: "happy-shelter",
  region: "서울",
  status: "VERIFIED",
  trustTier: "A",
  coverImageUrl: null,
};

describe("ShelterCard", () => {
  it("uses the shared fallback image when coverImageUrl is null", () => {
    const { container } = render(
      <MemoryRouter>
        <ShelterCard shelter={shelter} />
      </MemoryRouter>,
    );

    const image = container.querySelector("img");

    expect(image?.getAttribute("src")).toContain("shelter-fallback.jpg");
    expect(image?.getAttribute("alt")).toBe("");
  });
});
