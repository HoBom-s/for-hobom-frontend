import { useSuspenseQueries } from "hobom-data";
import { applicationQueries } from "@/entities/application";
import { questionnaireQueries } from "@/entities/questionnaire";
import type { ApplicationKind } from "@/entities/application";
import { answerRows } from "../lib/application-format.lib";

/** One application's detail plus its answers joined to the questionnaire prompts. */
export const useApplicationDetail = (shelterId: string, kind: ApplicationKind, id: string) => {
  const [{ data: detail }, { data: questionnaire }] = useSuspenseQueries({
    queries: [applicationQueries.detail(kind, id), questionnaireQueries.forShelter(shelterId, kind)],
  });

  return { detail, rows: answerRows(detail.answers, questionnaire?.questions ?? []) };
};
