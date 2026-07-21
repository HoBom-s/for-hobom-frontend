import type { RawApplicationDetail, RawApplicationSummary } from "../api/application.type";
import type {
  ApplicationDetail,
  ApplicationKind,
  ApplicationSummary,
} from "../model/application.model";

/** The wire omits `kind` (it's in the path), so the caller supplies it. */
export const toSummary = (raw: RawApplicationSummary, kind: ApplicationKind): ApplicationSummary => ({
  id: raw.id,
  kind,
  animalId: raw.animalId,
  shelterId: raw.shelterId,
  applicantId: raw.applicantId,
  status: raw.status,
  questionnaireVersion: raw.questionnaireVersion,
  plannedEndDate: raw.plannedEndDate ?? null,
  createdAt: raw.createdAt,
});

export const toDetail = (raw: RawApplicationDetail, kind: ApplicationKind): ApplicationDetail => ({
  ...toSummary(raw, kind),
  answers: raw.answers.map((answer) => ({ questionId: answer.questionId, values: answer.values })),
});
