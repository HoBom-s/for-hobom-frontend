import { describe, expect, it } from "vitest";
import type { AnimalDetail } from "@/entities/animal";
import { animalFormFromDetail, toRegisterInput, toUpdateInput } from "./animal-form.lib";
import type { AnimalFormValues } from "./animal-form.lib";

const values: AnimalFormValues = {
  name: "  콩이 ",
  species: "DOG",
  sex: "FEMALE",
  size: "SMALL",
  breed: " 푸들 ",
  ageMonths: "24",
  neutered: true,
  vaccinated: false,
  description: "  온순해요 ",
};

describe("toUpdateInput", () => {
  it("trims text, drops empty optionals, and nests traits/health", () => {
    expect(toUpdateInput(values)).toEqual({
      name: "콩이",
      species: "DOG",
      description: "온순해요",
      traits: { sex: "FEMALE", size: "SMALL", breed: "푸들", ageMonths: 24 },
      health: { neutered: true, vaccinated: false },
    });
  });

  it("omits blank description, breed, and age", () => {
    const bare = toUpdateInput({ ...values, breed: "  ", ageMonths: "", description: "" });

    expect(bare.description).toBeUndefined();
    expect(bare.traits.breed).toBeUndefined();
    expect(bare.traits.ageMonths).toBeUndefined();
  });
});

describe("toRegisterInput", () => {
  it("adds the intake date and maps photo keys", () => {
    const input = toRegisterInput(values, "2026-08-01", ["k1", "k2"]);

    expect(input.intake).toEqual({ intakeDate: "2026-08-01" });
    expect(input.photos).toEqual([{ objectKey: "k1" }, { objectKey: "k2" }]);
  });

  it("omits photos when none were uploaded", () => {
    expect(toRegisterInput(values, "2026-08-01", []).photos).toBeUndefined();
  });
});

describe("animalFormFromDetail", () => {
  it("prefills the form from a loaded detail", () => {
    const detail = {
      name: "초코",
      species: "CAT",
      sex: "MALE",
      size: "MEDIUM",
      breed: null,
      ageMonths: null,
      description: "장난꾸러기",
      health: { neutered: false, vaccinated: true },
    } as AnimalDetail;

    expect(animalFormFromDetail(detail)).toEqual({
      name: "초코",
      species: "CAT",
      sex: "MALE",
      size: "MEDIUM",
      breed: "",
      ageMonths: "",
      neutered: false,
      vaccinated: true,
      description: "장난꾸러기",
    });
  });
});
