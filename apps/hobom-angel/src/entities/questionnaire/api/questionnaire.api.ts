import { HttpError, httpClient, parseResponse } from "@/shared/api";
import { questionnaireSchema } from "./questionnaire.schema";
import type {
  DefineQuestionnaireInput,
  Questionnaire,
  QuestionnairePurpose,
} from "../model/questionnaire.model";

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

/** Define or replace the shelter's survey for a purpose (staff). The server
 *  bumps the version; a 204 comes back with no body. */
export const defineQuestionnaire = (
  shelterId: string,
  purpose: QuestionnairePurpose,
  input: DefineQuestionnaireInput,
): Promise<void> =>
  httpClient
    .put(`/shelters/${shelterId}/questionnaires/${purpose}`, input)
    .then(() => undefined);
