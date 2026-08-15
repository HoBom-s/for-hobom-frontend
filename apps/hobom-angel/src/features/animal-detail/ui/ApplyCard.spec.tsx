// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import type { AnimalDetail, PlacementType } from "@/entities/animal";
import { ApplyCard } from "./ApplyCard";

const renderCard = (
  detail: AnimalDetail,
  favorited = false,
  onToggleFavorite: () => void = vi.fn(),
) =>
  render(
    <MemoryRouter>
      <ApplyCard animal={detail} favorited={favorited} onToggleFavorite={onToggleFavorite} />
    </MemoryRouter>,
  );

const animal = (
  status: AnimalDetail["status"],
  eligiblePlacements: PlacementType[] = ["ADOPTION", "FOSTER"],
): AnimalDetail => ({
  id: "animal-1",
  shelterId: "shelter-1",
  name: "콩이",
  species: "DOG",
  status,
  eligiblePlacements,
  sex: "FEMALE",
  size: "SMALL",
  ageMonths: 24,
  breed: "푸들",
  description: "순한 아이",
  photoUrl: "a.jpg",
  photos: ["a.jpg"],
  weightKg: 4,
  color: "아이보리",
  personality: "온순",
  health: { neutered: true, vaccinated: true, microchipId: "410", notes: null },
  intake: { intakeDate: "2026-03-15", rescueStory: "유기 구조", noticeNumber: "경기-2026-031" },
  shelter: { id: "shelter-1", slug: "haengbok", name: "행복보호소", region: "서울", city: "강남구" },
});

const button = (name: string) => screen.getByRole("button", { name });

describe("ApplyCard", () => {
  it("offers apply + foster for an available animal", () => {
    renderCard(animal("AVAILABLE"));

    expect(button("입양 신청하기").hasAttribute("disabled")).toBe(false);
    expect(screen.queryByRole("button", { name: "임시보호 신청" })).not.toBeNull();
  });

  it("disables the CTA and hides foster once adopted", () => {
    renderCard(animal("ADOPTED"));

    expect(button("입양 완료").hasAttribute("disabled")).toBe(true);
    expect(screen.queryByRole("button", { name: "임시보호 신청" })).toBeNull();
  });

  it("makes 임보 the primary action for a foster-only animal", () => {
    renderCard(animal("AVAILABLE", ["FOSTER"]));

    expect(button("임시보호 신청하기").hasAttribute("disabled")).toBe(false);
    expect(screen.queryByRole("button", { name: "입양 신청하기" })).toBeNull();
    expect(screen.queryByRole("button", { name: "임시보호 신청" })).toBeNull();
  });

  it("reflects the favorited state and calls onToggleFavorite on click", () => {
    const onToggleFavorite = vi.fn();

    renderCard(animal("AVAILABLE"), false, onToggleFavorite);
    const bookmark = button("콩이 찜하기");

    expect(bookmark.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(bookmark);

    expect(onToggleFavorite).toHaveBeenCalledOnce();
  });

  it("shows the filled heart when favorited", () => {
    renderCard(animal("AVAILABLE"), true);

    expect(button("콩이 찜하기").getAttribute("aria-pressed")).toBe("true");
  });
});
