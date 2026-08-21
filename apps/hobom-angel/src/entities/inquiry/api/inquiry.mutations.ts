import { mutationOptions } from "hobom-data";
import { startInquiry } from "./inquiry.api";
import type { StartInquiryInput } from "./inquiry.type";

export const inquiryMutations = {
  start: () =>
    mutationOptions({
      mutationFn: (vars: { animalId: string; input: StartInquiryInput }) =>
        startInquiry(vars.animalId, vars.input),
    }),
} as const;
