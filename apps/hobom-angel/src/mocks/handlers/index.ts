import { authHandlers } from "./auth.handlers";
import { userHandlers } from "./user.handlers";
import { animalHandlers } from "./animal.handlers";
import { questionnaireHandlers } from "./questionnaire.handlers";
import { adoptionHandlers } from "./adoption.handlers";

/** All MSW request handlers, aggregated per domain. Add new domains here. */
export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...animalHandlers,
  ...questionnaireHandlers,
  ...adoptionHandlers,
];
