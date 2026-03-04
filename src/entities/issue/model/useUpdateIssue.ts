import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { issueMutations } from "../api/issue.mutations";
import { issueQueries } from "../api/issue.queries";

export const useUpdateIssue = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...issueMutations.update(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: issueQueries.issues() });
      openSuccessToast({ message: "이슈를 수정했어요." });
    },
    onError: () => {
      openErrorToast({ message: "이슈를 수정하지 못했어요." });
    },
  });
};
