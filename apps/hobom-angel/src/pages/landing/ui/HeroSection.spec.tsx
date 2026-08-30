// 랜딩 히어로의 반응형 이미지와 핵심 행동을 검증하는 테스트
// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { HERO } from "../model/landing.fixtures";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  it("renders a reserved responsive hero image with high loading priority", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    );

    const image = screen.getByRole("img", { name: HERO.imageAlt });

    expect(image.getAttribute("width")).toBe("1200");
    expect(image.getAttribute("height")).toBe("900");
    expect(image.getAttribute("srcset")).toContain("720w");
    expect(image.getAttribute("srcset")).toContain("1200w");
    expect(image.getAttribute("fetchpriority")).toBe("high");
  });

  it("keeps both adoption and foster actions visible", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: HERO.primary })).not.toBeNull();
    expect(screen.getByRole("button", { name: HERO.secondary })).not.toBeNull();
  });

  it("renders the waiting count in the text badge without repeating it over the image", () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(new RegExp(HERO.waitingCount.toLocaleString())),
    ).not.toBeNull();
    expect(
      screen.queryByLabelText(`${HERO.waitingCount.toLocaleString()}마리 대기 중`),
    ).toBeNull();
    expect(screen.getByRole("img", { name: HERO.imageAlt }).getAttribute("alt")).not.toContain(
      String(HERO.waitingCount),
    );
  });
});
