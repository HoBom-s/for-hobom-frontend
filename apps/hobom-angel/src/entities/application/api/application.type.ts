import type { ApplicationStatus } from "../model/application.model";

export interface RawApplicationSummary {
  id: string;
  animalId: string;
  shelterId: string;
  applicantId: string;
  status: ApplicationStatus;
  questionnaireVersion: number;
  plannedEndDate?: string | null;
  createdAt: string | null;
}

export interface RawApplicationsPage {
  items: RawApplicationSummary[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface RawAnswer {
  questionId: string;
  values: string[];
}

export interface RawApplicationDetail extends RawApplicationSummary {
  answers: RawAnswer[];
  decidedReason?: string | null;
}

/** `POST /:kind-applications/:id/decision` — a shelter's approve/reject. */
export interface DecideApplicationInput {
  decision: "APPROVE" | "REJECT";
  reason?: string;
}
