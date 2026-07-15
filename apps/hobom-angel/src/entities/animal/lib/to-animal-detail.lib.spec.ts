import { describe, expect, it } from "vitest";
import { toAnimalDetail } from "./to-animal-detail.lib";
import type { RawAnimalDetail } from "../api/animal.type";

const raw: RawAnimalDetail = {
  id: "animal-1",
  shelterId: "shelter-1",
  name: "콩이",
  species: "DOG",
  description: "순한 아이",
  status: "AVAILABLE",
  traits: {
    sex: "FEMALE",
    size: "SMALL",
    ageMonths: 24,
    weightKg: 4,
    breed: "푸들",
    color: "아이보리",
    personality: "온순",
  },
  health: { neutered: true, vaccinated: true, microchipId: "410", notes: null },
  intake: { intakeDate: "2026-03-15", rescueStory: "유기 구조", noticeNumber: "경기-2026-031" },
  shelter: { id: "shelter-1", slug: "haengbok", name: "행복보호소", region: "서울", city: "강남구" },
  photos: [{ objectKey: "a.jpg" }, { objectKey: "b.jpg" }],
};

describe("toAnimalDetail", () => {
  it("flattens traits and keeps health/intake and the full photo set", () => {
    const detail = toAnimalDetail(raw);

    expect(detail).toMatchObject({
      id: "animal-1",
      name: "콩이",
      sex: "FEMALE",
      size: "SMALL",
      weightKg: 4,
      color: "아이보리",
      personality: "온순",
      photos: ["a.jpg", "b.jpg"],
      health: { neutered: true, vaccinated: true, microchipId: "410", notes: null },
      intake: { intakeDate: "2026-03-15", rescueStory: "유기 구조", noticeNumber: "경기-2026-031" },
      shelter: { id: "shelter-1", slug: "haengbok", name: "행복보호소", region: "서울", city: "강남구" },
    });
  });

  it("maps a missing shelter to null", () => {
    expect(toAnimalDetail({ ...raw, shelter: undefined }).shelter).toBeNull();
  });

  it("carries the first photo through as the card thumbnail", () => {
    expect(toAnimalDetail(raw).photoUrl).toBe("a.jpg");
  });
});
