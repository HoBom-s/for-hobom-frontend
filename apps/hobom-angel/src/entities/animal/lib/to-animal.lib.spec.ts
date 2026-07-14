import { describe, expect, it } from "vitest";
import { toAnimal } from "./to-animal.lib";

describe("toAnimal", () => {
  it("flattens traits and takes the first photo", () => {
    const animal = toAnimal({
      id: "a1",
      shelterId: "s1",
      name: "콩이",
      species: "DOG",
      description: "사람을 좋아해요",
      status: "AVAILABLE",
      traits: {
        sex: "MALE",
        size: "MEDIUM",
        ageMonths: 24,
        weightKg: 6,
        breed: "믹스",
        color: "갈색",
        personality: "활발",
      },
      photos: [{ objectKey: "cover.jpg" }, { objectKey: "second.jpg" }],
    });

    expect(animal).toEqual({
      id: "a1",
      shelterId: "s1",
      name: "콩이",
      species: "DOG",
      status: "AVAILABLE",
      sex: "MALE",
      size: "MEDIUM",
      ageMonths: 24,
      breed: "믹스",
      description: "사람을 좋아해요",
      photoUrl: "cover.jpg",
    });
  });

  it("leaves photoUrl undefined when there are no photos", () => {
    const animal = toAnimal({
      id: "a2",
      shelterId: "s1",
      name: "보리",
      species: "CAT",
      description: "",
      status: "RESERVED",
      traits: {
        sex: "FEMALE",
        size: "SMALL",
        ageMonths: null,
        weightKg: null,
        breed: null,
        color: null,
        personality: null,
      },
      photos: [],
    });

    expect(animal.photoUrl).toBeUndefined();
    expect(animal.ageMonths).toBeNull();
  });
});
