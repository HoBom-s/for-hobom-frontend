import { Bom } from "@/packages/bom";

export const DailyTodoCompleteStatusModel = {
  COMPLETED: "COMPLETED",
  PROGRESS: "PROGRESS",
} as const;

type StatusType = keyof typeof DailyTodoCompleteStatusModel;

export const isCompleteStatus = (status: StatusType): boolean =>
  status === DailyTodoCompleteStatusModel.COMPLETED;
export const isProgressStatus = (status: StatusType): boolean =>
  status === DailyTodoCompleteStatusModel.PROGRESS;

export const changeCompleteStatus = (status: StatusType): StatusType => {
  const changedStatus = Bom.conditional(
    status,
    [isCompleteStatus, () => DailyTodoCompleteStatusModel.PROGRESS],
    [isProgressStatus, () => DailyTodoCompleteStatusModel.COMPLETED],
  );

  if (changedStatus == null) {
    throw new Error(`Invalid complete status: ${status}`);
  }

  return changedStatus;
};
