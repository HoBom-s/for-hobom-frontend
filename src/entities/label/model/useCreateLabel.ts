import { useMutation, useQueryClient } from "@tanstack/react-query";
import { labelQueries } from "../api/label.queries";
import { labelMutations } from "../api/label.mutations";

export const useCreateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...labelMutations.create(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: labelQueries.labels(),
      });
    },
  });
};
