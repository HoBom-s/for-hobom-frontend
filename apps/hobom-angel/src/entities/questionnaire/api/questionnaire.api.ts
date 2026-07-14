import { HttpError, httpClient, parseResponse } from "@/shared/api";
import { questionnaireSchema } from "./questionnaire.schema";
import type { Questionnaire, QuestionnairePurpose } from "../model/questionnaire.model";

const parse = parseResponse(questionnaireSchema, "GET /shelters/:id/questionnaires/:purpose");

/**
 * The shelter's survey for a purpose. A shelter that hasn't defined one yields
 * `null` (the API 404s) — the application then needs no answers.
 */
export const getQuestionnaire = (
  shelterId: string,
  purpose: QuestionnairePurpose,
  signal?: AbortSignal,
): Promise<Questionnaire | null> =>
  httpClient
    .get(`/shelters/${shelterId}/questionnaires/${purpose}`, { signal })
    .then(parse)
    .catch((error: unknown) => {
      if (error instanceof HttpError && error.status === 404) return null;

      throw error;
    });
