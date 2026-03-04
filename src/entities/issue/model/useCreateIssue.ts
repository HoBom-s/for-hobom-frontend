import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { issueQueries } from "../api/issue.queries";
import { issueMutations } from "../api/issue.mutations";

export const useCreateIssue = () => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...issueMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: issueQueries.issues(),
      });
      openSuccessToast({ message: "이슈를 생성했어요." });
    },
    onError: () => {
      openErrorToast({ message: "이슈를 생성하지 못했어요." });
    },
  });
};
