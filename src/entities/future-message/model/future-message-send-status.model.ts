const FutureMessageSendStatus = {
  PENDING: "PENDING",
  SENT: "SENT",
} as const;

export type FutureMessageSendStatusType = keyof typeof FutureMessageSendStatus;

export const isPendingMessageSendStatus = (
  status: FutureMessageSendStatusType,
) => FutureMessageSendStatus.PENDING === status;

export const convertStatusToMessage = (status: FutureMessageSendStatusType) => {
  switch (status) {
    case FutureMessageSendStatus.PENDING:
      return "발송 대기";

    case FutureMessageSendStatus.SENT:
      return "발송 완료";
  }
};
