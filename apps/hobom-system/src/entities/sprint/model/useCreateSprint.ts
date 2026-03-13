import { useEntityMutation } from "@/shared/model";
import { sprintMutations } from "../api/sprint.mutations";
import { sprintQueries } from "../api/sprint.queries";

export const useCreateSprint = () =>
  useEntityMutation({
    mutation: sprintMutations.create(),
    invalidateKeys: [sprintQueries.sprints()],
    successMessage: "스프린트를 생성했어요.",
    errorMessage: "스프린트를 생성하지 못했어요.",
  });
