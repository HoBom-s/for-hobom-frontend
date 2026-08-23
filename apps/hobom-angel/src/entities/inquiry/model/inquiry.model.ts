/** A general shelter inquiry (문의) opened from an animal. The thread of messages
 *  lives under the conversation entity (subjectType INQUIRY, subjectRef inquiryId). */
export interface Inquiry {
  inquiryId: string;
  shelterId: string;
  inquirerId: string;
  /** The animal the inquiry is about — null for a shelter-level inquiry. */
  animalId: string | null;
  createdAt: string | null;
}

/** A cursor page of the viewer's inquiries. */
export interface InquiryPage {
  inquiries: Inquiry[];
  nextCursor: string | null;
  hasNext: boolean;
}
