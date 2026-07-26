import { mutationOptions } from "hobom-data";
import { defineQuestionnaire } from "./questionnaire.api";
import type {
  DefineQuestionnaireInput,
  QuestionnairePurpose,
} from "../model/questionnaire.model";

export const questionnaireMutations = {
  // shelterId/purpose change with the selected survey, so they ride in the
  // mutate vars rather than being bound at render time.
  define: () =>
    mutationOptions({
      mutationFn: (vars: {
        shelterId: string;
        purpose: QuestionnairePurpose;
        input: DefineQuestionnaireInput;
      }) => defineQuestionnaire(vars.shelterId, vars.purpose, vars.input),
    }),
} as const;
