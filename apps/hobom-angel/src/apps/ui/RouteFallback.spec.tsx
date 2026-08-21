// 목록 경로별 로딩 스켈레톤이 실제 화면 구조를 유지하는지 검증하는 테스트
// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { ROUTES } from "@/shared/config";
import { RouteFallback } from "./RouteFallback";

const renderFallback = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <RouteFallback />
    </MemoryRouter>,
  );

describe("RouteFallback", () => {
  it("preserves the animal header, filters, result row, and 4:3 cards", () => {
    renderFallback(ROUTES.ANIMALS);

    expect(screen.getByRole("status", { name: "친구 목록 불러오는 중" })).not.toBeNull();
    expect(screen.getByTestId("animal-filter-skeleton")).not.toBeNull();
    expect(screen.getAllByTestId("animal-card-skeleton")).toHaveLength(8);
    expect(screen.getAllByTestId("animal-card-skeleton-media")[0]?.style.aspectRatio).toBe("4 / 3");
  });

  it("preserves the shelter header, registration banner, controls, and 16:9 cards", () => {
    renderFallback(ROUTES.SHELTERS);

    expect(screen.getByRole("status", { name: "보호소 목록 불러오는 중" })).not.toBeNull();
    expect(screen.getByTestId("shelter-banner-skeleton")).not.toBeNull();
    expect(screen.getAllByTestId("shelter-card-skeleton")).toHaveLength(6);
    expect(screen.getAllByTestId("shelter-card-skeleton-media")[0]?.style.aspectRatio).toBe(
      "16 / 9",
    );
  });

  it("uses the compact loader for non-list routes", () => {
    renderFallback(ROUTES.MY);

    expect(screen.getByRole("status").textContent).toContain("불러오는 중");
  });
});
