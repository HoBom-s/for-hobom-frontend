import { httpClient, parseResponse } from "@/shared/api";
import { submitAdoptionSchema } from "./adoption.schema";
import type { SubmitAdoptionRequest, SubmitAdoptionResult } from "./adoption.type";

const parse = parseResponse(submitAdoptionSchema, "POST /animals/:id/adoption-applications");

/** Submit an adoption application (with its survey answers) for an animal. */
export const submitAdoptionApplication = (
  animalId: string,
  request: SubmitAdoptionRequest,
): Promise<SubmitAdoptionResult> =>
  httpClient.post(`/animals/${animalId}/adoption-applications`, request).then(parse);
