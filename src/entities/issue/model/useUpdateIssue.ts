import { useEntityMutation } from "@/shared/model";
import { issueMutations } from "../api/issue.mutations";
import { issueQueries } from "../api/issue.queries";

export const useUpdateIssue = () =>
  useEntityMutation({
    mutation: issueMutations.update(),
    invalidateKeys: [issueQueries.issues()],
    successMessage: "이슈를 수정했어요.",
    errorMessage: "이슈를 수정하지 못했어요.",
  });
