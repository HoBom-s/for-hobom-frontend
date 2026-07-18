import type {
  AnimalDetail,
  AnimalSex,
  AnimalSize,
  AnimalSpecies,
  AnimalTraitsInput,
  RegisterAnimalInput,
  UpdateAnimalInput,
} from "@/entities/animal";

/** The editable animal fields shared by register and edit. */
export interface AnimalFormValues {
  name: string;
  species: AnimalSpecies;
  sex: AnimalSex;
  size: AnimalSize;
  breed: string;
  ageMonths: string;
  neutered: boolean;
  vaccinated: boolean;
  microchip: string;
  description: string;
}

export const EMPTY_ANIMAL_FORM: AnimalFormValues = {
  name: "",
  species: "DOG",
  sex: "UNKNOWN",
  size: "MEDIUM",
  breed: "",
  ageMonths: "",
  neutered: false,
  vaccinated: false,
  microchip: "",
  description: "",
};

/** Prefill the form from a loaded animal detail (edit mode). */
export const animalFormFromDetail = (animal: AnimalDetail): AnimalFormValues => ({
  name: animal.name,
  species: animal.species,
  sex: animal.sex,
  size: animal.size,
  breed: animal.breed ?? "",
  ageMonths: animal.ageMonths != null ? String(animal.ageMonths) : "",
  neutered: animal.health.neutered,
  vaccinated: animal.health.vaccinated,
  microchip: animal.health.microchipId ?? "",
  description: animal.description,
});

const toTraits = (values: AnimalFormValues): AnimalTraitsInput => ({
  sex: values.sex,
  size: values.size,
  breed: values.breed.trim() || undefined,
  ageMonths: values.ageMonths.trim() ? Number(values.ageMonths) : undefined,
});

/** Build the PATCH body (profile only) from the form. */
export const toUpdateInput = (values: AnimalFormValues): UpdateAnimalInput => ({
  name: values.name.trim(),
  species: values.species,
  description: values.description.trim() || undefined,
  traits: toTraits(values),
  health: {
    neutered: values.neutered,
    vaccinated: values.vaccinated,
    microchipId: values.microchip.trim() || undefined,
  },
});

/** Build the register body, adding the intake date and any uploaded photos. */
export const toRegisterInput = (
  values: AnimalFormValues,
  intakeDate: string,
  photoKeys: string[],
): RegisterAnimalInput => ({
  ...toUpdateInput(values),
  intake: { intakeDate },
  photos: photoKeys.length > 0 ? photoKeys.map((objectKey) => ({ objectKey })) : undefined,
});
