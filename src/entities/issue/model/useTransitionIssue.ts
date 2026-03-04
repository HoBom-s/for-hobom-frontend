import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/shared/model";
import { issueQueries } from "../api/issue.queries";
import { issueMutations } from "../api/issue.mutations";
import { STATUS_ID_TO_CATEGORY } from "./issue.model";
import type { HttpResponseType } from "@/shared/api";
import type { IssueType } from "../api/issue.type";

export const useTransitionIssue = (projectId: string) => {
  const queryClient = useQueryClient();
  const queryOption = issueQueries.listByProject(projectId);
  const { openErrorToast } = useToast();

  return useMutation({
    ...issueMutations.transition(),
    onMutate: async ({ issueId, statusId }) => {
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
              issue.id === issueId
                ? {
                    ...issue,
                    status: statusId,
                    statusCategory:
                      STATUS_ID_TO_CATEGORY[statusId] ?? issue.statusCategory,
                  }
                : issue,
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
      openErrorToast({ message: "이슈 상태를 변경하지 못했어요." });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: issueQueries.issues(),
      });
    },
  });
};
