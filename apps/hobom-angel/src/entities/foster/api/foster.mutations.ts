import { mutationOptions } from "hobom-data";
import { submitFosterApplication } from "./foster.api";
import type { SubmitFosterRequest } from "./foster.type";

export const fosterMutations = {
  submit: (animalId: string) =>
    mutationOptions({
      mutationFn: (request: SubmitFosterRequest) => submitFosterApplication(animalId, request),
    }),
} as const;
