import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { issueQueries } from "../api/issue.queries";
import { issueMutations } from "../api/issue.mutations";
import type { HttpResponseType } from "@/shared/api";
import type { IssueType } from "../api/issue.type";

export const useAssignIssue = (projectId: string) => {
  const queryClient = useQueryClient();
  const queryOption = issueQueries.listByProject(projectId);
  const { openErrorToast } = useToast();

  return useMutation({
    ...issueMutations.assign(),
    onMutate: async ({ issueId, assignee }) => {
      await queryClient.cancelQueries(queryOption);
      const previous = queryClient.getQueryData<HttpResponseType<IssueType[]>>(
        queryOption.queryKey,
      );

      queryClient.setQueryData<HttpResponseType<IssueType[]>>(
        queryOption.queryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.map((issue) =>
              issue.id === issueId ? { ...issue, assignee } : issue,
            ),
          };
        },
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryOption.queryKey, context.previous);
      }
      openErrorToast({ message: "담당자를 변경하지 못했어요." });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: issueQueries.issues(),
      });
    },
  });
};
