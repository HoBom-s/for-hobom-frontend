import { useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import { projectMutations } from "../api/project.mutations";
import { projectQueries } from "../api/project.queries";

export const useRemoveMember = () => {
  const dataLot = useDataLot();
  const { openSuccessToast } = useToast();

  return useMutation({
    ...projectMutations.removeMember(),
    onSuccess: (_, variables) => {
      dataLot.invalidateQueries(projectQueries.detail(variables.projectId));
      openSuccessToast({ message: "멤버를 제거했어요" });
    },
  });
};
