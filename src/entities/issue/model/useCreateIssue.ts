import { useEntityMutation } from "@/shared/model";
import { issueMutations } from "../api/issue.mutations";
import { issueQueries } from "../api/issue.queries";

export const useCreateIssue = () =>
  useEntityMutation({
    mutation: issueMutations.create(),
    invalidateKeys: [issueQueries.issues()],
    successMessage: "이슈를 생성했어요.",
    errorMessage: "이슈를 생성하지 못했어요.",
  });
