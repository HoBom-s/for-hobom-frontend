const FutureMessageSendStatus = {
  PENDING: "PENDING",
  SENT: "SENT",
} as const;

export type FutureMessageSendStatusType = keyof typeof FutureMessageSendStatus;

export const isPendingMessageSendStatus = (
  status: FutureMessageSendStatusType,
) => FutureMessageSendStatus.PENDING === status;
