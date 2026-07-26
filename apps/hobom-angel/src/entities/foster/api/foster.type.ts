/** One submitted answer (values always a string array). */
export interface FosterAnswer {
  questionId: string;
  values: string[];
}

export interface SubmitFosterRequest {
  answers: FosterAnswer[];
  /** ISO date the foster is planned to end; omitted means indefinite. */
  plannedEndDate?: string;
}

/** `POST /animals/:id/foster-applications` result. */
export interface SubmitFosterResult {
  fosterApplicationId: string;
  approvalId: string;
}
