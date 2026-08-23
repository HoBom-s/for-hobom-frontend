/** What a message thread is about. Each subject maps to its participants on the
 *  backend, so messaging stays ignorant of inquiry/adoption/foster internals. */
export type MessageSubjectType = "INQUIRY" | "ADOPTION" | "FOSTER";

/** Which side of the conversation a message came from. */
export type MessageSenderRole = "APPLICANT" | "SHELTER";

/** One message in a thread. */
export interface Message {
  id: string;
  senderId: string;
  senderRole: MessageSenderRole;
  body: string;
  sentAt: string | null;
}

export const SENDER_LABEL: Record<MessageSenderRole, string> = {
  APPLICANT: "나",
  SHELTER: "보호소",
};
