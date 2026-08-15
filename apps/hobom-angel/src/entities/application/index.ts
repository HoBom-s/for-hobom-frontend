export { applicationQueries } from "./api/application.queries";
export { applicationMutations } from "./api/application.mutations";
export { KIND_LABEL, STATUS_LABEL, STATUS_COLOR } from "./model/application.model";
export type {
  ApplicationKind,
  ApplicationStatus,
  ApplicationSummary,
  ApplicationDetail,
  ApplicationAnswer,
  ApplicationPage,
} from "./model/application.model";
export type { DecideApplicationInput } from "./api/application.type";
