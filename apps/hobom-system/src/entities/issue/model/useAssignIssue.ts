import { useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import type { HttpResponseType } from "@/shared/api";
import { issueQueries } from "../api/issue.queries";
import { issueMutations } from "../api/issue.mutations";
import type { IssueType } from "../api/issue.type";

export const useAssignIssue = (projectId: string) => {
  const dataLot = useDataLot();
  const queryOption = issueQueries.listByProject(projectId);
  const { openErrorToast } = useToast();

  return useMutation({
    ...issueMutations.assign(),
    onMutate: async ({ issueId, assignee }) => {
      await dataLot.cancelQueries(queryOption);
      const previous = dataLot.getQueryData<HttpResponseType<IssueType[]>>(queryOption.queryKey);

      dataLot.setQueryData<HttpResponseType<IssueType[]>>(queryOption.queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          items: old.items.map((issue) => (issue.id === issueId ? { ...issue, assignee } : issue)),
        };
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        dataLot.setQueryData(queryOption.queryKey, context.previous);
      }
      openErrorToast({ message: "담당자를 변경하지 못했어요." });
    },
    onSettled: async () => {
      await dataLot.invalidateQueries({
        queryKey: issueQueries.issues(),
      });
    },
  });
};
