import { queryOptions } from "hobom-data";
import { getQuestionnaire } from "./questionnaire.api";
import type { QuestionnairePurpose } from "../model/questionnaire.model";

export const questionnaireQueries = {
  all: () => ["questionnaires"] as const,

  forShelter: (shelterId: string, purpose: QuestionnairePurpose) =>
    queryOptions({
      queryKey: [...questionnaireQueries.all(), shelterId, purpose] as const,
      queryFn: ({ signal }) => getQuestionnaire(shelterId, purpose, signal),
      staleTime: 5 * 60 * 1000,
    }),
} as const;
