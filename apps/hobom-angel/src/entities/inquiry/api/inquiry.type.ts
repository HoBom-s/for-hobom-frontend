export interface RawInquiry {
  inquiryId: string;
  shelterId: string;
  inquirerId: string;
  animalId: string | null;
  createdAt: string | null;
}

export interface RawInquiriesPage {
  items: RawInquiry[];
  nextCursor: string | null;
  hasNext: boolean;
}

/** `POST /animals/:animalId/inquiries` request — the first message. */
export interface StartInquiryInput {
  message: string;
}

/** `POST /animals/:animalId/inquiries` response. */
export interface StartInquiryResult {
  inquiryId: string;
}
