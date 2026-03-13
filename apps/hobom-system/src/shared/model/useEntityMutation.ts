import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { getErrorMessage } from "../lib/get-error-message.lib";
import type { MutationOptions } from "@tanstack/react-query";

interface EntityMutationConfig<TData, TVariables> {
  mutation: MutationOptions<TData, Error, TVariables>;
  /** mutation 성공 시 자동 무효화할 쿼리 키 목록 */
  invalidateKeys: readonly (readonly unknown[])[];
  /** 성공 토스트 메시지. `null`이면 토스트를 표시하지 않는다. */
  successMessage?: string | null;
  /** 실패 토스트 메시지. `null`이면 토스트를 표시하지 않는다. 서버 메시지가 있으면 우선 표시. */
  errorMessage?: string | null;
}

/**
 * React Query `useMutation` 래퍼. mutation 성공 시 자동으로 `invalidateKeys`에 해당하는
 * 쿼리를 무효화하고, 토스트 메시지를 표시한다.
 *
 * - 호출자의 `mutation.onSuccess`/`onError`가 먼저 실행된 뒤 래퍼 로직이 체이닝된다.
 * - `successMessage: null`이면 성공 토스트를 생략한다.
 *
 * @example
 * ```ts
 * const { mutate } = useEntityMutation({
 *   mutation: { mutationFn: createIssue },
 *   invalidateKeys: [issueKeys.all],
 *   successMessage: "이슈가 생성되었습니다",
 *   errorMessage: "이슈 생성 실패",
 * });
 * ```
 */
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
    onSuccess: async (...args) => {
      await mutation.onSuccess?.(...args);
      await Promise.all(
        invalidateKeys.map((key) =>
          queryClient.invalidateQueries({ queryKey: key }),
        ),
      );
      if (successMessage) openSuccessToast({ message: successMessage });
    },
    onError: (...args) => {
      mutation.onError?.(...args);
      if (errorMessage) {
        openErrorToast({ message: getErrorMessage(args[0], errorMessage) });
      }
    },
  });
};
