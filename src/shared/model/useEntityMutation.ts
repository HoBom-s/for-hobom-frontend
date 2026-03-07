import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MutationOptions } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { getErrorMessage } from "../lib/get-error-message.lib";

interface EntityMutationConfig<TData, TVariables> {
  mutation: MutationOptions<TData, Error, TVariables>;
  invalidateKeys: readonly (readonly unknown[])[];
  successMessage?: string | null;
  errorMessage?: string | null;
}

export const useEntityMutation = <TData, TVariables>({
  mutation,
  invalidateKeys,
  successMessage,
  errorMessage,
}: EntityMutationConfig<TData, TVariables>) => {
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();

  return useMutation({
    ...mutation,
    onSuccess: async () => {
      await Promise.all(
        invalidateKeys.map((key) =>
          queryClient.invalidateQueries({ queryKey: key }),
        ),
      );
      if (successMessage) openSuccessToast({ message: successMessage });
    },
    onError: (error) => {
      if (errorMessage) {
        openErrorToast({ message: getErrorMessage(error, errorMessage) });
      }
    },
  });
};
