// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { AnimalDetail } from "@/entities/animal";
import { ApplyCard } from "./ApplyCard";

const animal = (status: AnimalDetail["status"]): AnimalDetail => ({
  id: "animal-1",
  shelterId: "shelter-1",
  name: "콩이",
  species: "DOG",
  status,
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
});

const button = (name: string) => screen.getByRole("button", { name });

describe("ApplyCard", () => {
  it("offers apply + foster for an available animal", () => {
    render(<ApplyCard animal={animal("AVAILABLE")} />);

    expect(button("입양 신청하기").hasAttribute("disabled")).toBe(false);
    expect(screen.queryByRole("button", { name: "임시보호 신청" })).not.toBeNull();
  });

  it("disables the CTA and hides foster once adopted", () => {
    render(<ApplyCard animal={animal("ADOPTED")} />);

    expect(button("입양 완료").hasAttribute("disabled")).toBe(true);
    expect(screen.queryByRole("button", { name: "임시보호 신청" })).toBeNull();
  });

  it("toggles the bookmark on click", () => {
    render(<ApplyCard animal={animal("AVAILABLE")} />);
    const bookmark = button("관심 동물");

    expect(bookmark.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(bookmark);

    expect(bookmark.getAttribute("aria-pressed")).toBe("true");
  });
});
