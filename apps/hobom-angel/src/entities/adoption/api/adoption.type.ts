/** One submitted answer (values always a string array). */
export interface AdoptionAnswer {
  questionId: string;
  values: string[];
}

export interface SubmitAdoptionRequest {
  answers: AdoptionAnswer[];
}

/** `POST /animals/:id/adoption-applications` result. */
export interface SubmitAdoptionResult {
  applicationId: string;
  approvalId: string;
}
