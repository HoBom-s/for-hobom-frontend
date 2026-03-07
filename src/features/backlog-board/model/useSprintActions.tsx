import { useEntityMutation, useOverlay } from "@/shared/model";
import { issueQueries } from "@/entities/issue";
import {
  sprintQueries,
  sprintMutations,
  type SprintType,
} from "@/entities/sprint";
import { ConfirmDialog } from "@/shared/ui";

export const useSprintActions = (projectId: string, sprint: SprintType) => {
  const { onOpen } = useOverlay();

  const { mutate: startSprint, isPending: isStarting } = useEntityMutation({
    mutation: sprintMutations.start(),
    invalidateKeys: [sprintQueries.sprints()],
    successMessage: "스프린트를 시작했어요.",
    errorMessage: "스프린트를 시작하지 못했어요.",
  });

  const { mutate: completeSprint, isPending: isCompleting } = useEntityMutation(
    {
      mutation: sprintMutations.complete(),
      invalidateKeys: [sprintQueries.sprints(), issueQueries.issues()],
      successMessage: "스프린트를 완료했어요.",
      errorMessage: "스프린트를 완료하지 못했어요.",
    },
  );

  const handleStart = () => {
    onOpen(({ isOpen, onClose }) => (
      <ConfirmDialog
        open={isOpen}
        onClose={onClose}
        title="스프린트 시작"
        description={`"${sprint.name}" 스프린트를 시작하시겠어요?`}
        isPending={isStarting}
        onConfirm={() => {
          startSprint(
            { projectId, sprintId: sprint.id },
            { onSuccess: onClose },
          );
        }}
      />
    ));
  };

  const handleComplete = () => {
    onOpen(({ isOpen, onClose }) => (
      <ConfirmDialog
        open={isOpen}
        onClose={onClose}
        title="스프린트 완료"
        description={`"${sprint.name}" 스프린트를 완료하시겠어요? 완료되지 않은 이슈는 백로그로 이동합니다.`}
        isPending={isCompleting}
        onConfirm={() => {
          completeSprint(
            { projectId, sprintId: sprint.id },
            { onSuccess: onClose },
          );
        }}
      />
    ));
  };

  return { handleStart, handleComplete, isStarting, isCompleting };
};
