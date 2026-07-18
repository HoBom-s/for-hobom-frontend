import { httpClient, parseResponse } from "@/shared/api";
import { submitFosterSchema } from "./foster.schema";
import type { SubmitFosterRequest, SubmitFosterResult } from "./foster.type";

const parse = parseResponse(submitFosterSchema, "POST /animals/:id/foster-applications");

/** Submit a foster (임시보호) application (with its survey answers) for an animal. */
export const submitFosterApplication = (
  animalId: string,
  request: SubmitFosterRequest,
): Promise<SubmitFosterResult> =>
  httpClient.post(`/animals/${animalId}/foster-applications`, request).then(parse);
