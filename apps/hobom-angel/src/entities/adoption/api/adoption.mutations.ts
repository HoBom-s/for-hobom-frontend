import { mutationOptions } from "hobom-data";
import { submitAdoptionApplication } from "./adoption.api";
import type { SubmitAdoptionRequest } from "./adoption.type";

export const adoptionMutations = {
  submit: (animalId: string) =>
    mutationOptions({
      mutationFn: (request: SubmitAdoptionRequest) => submitAdoptionApplication(animalId, request),
    }),
} as const;
