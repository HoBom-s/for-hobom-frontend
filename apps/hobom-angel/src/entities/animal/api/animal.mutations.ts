import { mutationOptions } from "hobom-data";
import { registerAnimal, updateAnimal } from "./animal.api";
import type { RegisterAnimalInput, UpdateAnimalInput } from "./animal.type";

export const animalMutations = {
  register: (shelterId: string) =>
    mutationOptions({
      mutationFn: (input: RegisterAnimalInput) => registerAnimal(shelterId, input),
    }),

  update: () =>
    mutationOptions({
      mutationFn: (vars: { animalId: string; input: UpdateAnimalInput }) =>
        updateAnimal(vars.animalId, vars.input),
    }),
} as const;
