// @vitest-environment jsdom
// 보호소 상세 헤더가 커버 이미지 누락 시 공통 기본 이미지를 표시하는지 검증하는 테스트
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Shelter } from "@/entities/shelter";
import { ShelterHeader } from "./ShelterHeader";

vi.mock("./FollowButton", () => ({
  FollowButton: () => <button type="button">팔로잉</button>,
}));

const shelter: Shelter = {
  id: "shelter-1",
  slug: "hope-shelter",
  name: "희망 쉼터",
  status: "VERIFIED",
  trustTier: "A",
  addressVisibility: "FULL",
  address: { region: "부산", city: "해운대구", roadAddress: null, lat: null, lng: null },
  facilityPhotos: [],
  intro: null,
  operatingSince: null,
  representativeName: null,
  visitGuide: null,
  supportGuide: null,
  coverImageUrl: null,
};

describe("ShelterHeader", () => {
  it("uses the shared fallback image when coverImageUrl is null", () => {
    const { container } = render(<ShelterHeader shelter={shelter} />);

    const image = container.querySelector("img");

    expect(image?.getAttribute("src")).toContain("shelter-fallback.jpg");
    expect(image?.getAttribute("alt")).toBe("");
  });
});
