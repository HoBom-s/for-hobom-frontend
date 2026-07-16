import { useDataLot, useMutation, useQuery } from "hobom-data";
import { useToast } from "@/shared/model";
import { addFavorite, removeFavorite } from "../api/favorite.api";
import { favoriteQueries } from "../api/favorite.queries";
import { applyFavoriteToggle, isFavorited } from "../lib/toggle-favorite.lib";
import type { Favorite, FavoriteTargetType } from "../model/favorite.model";

interface ToggleVariables {
  targetRef: string;
  next: boolean;
}

interface ToggleContext {
  previous: Favorite[] | undefined;
}

/** Read the viewer's favorites of one type and toggle them optimistically: the
 *  heart flips instantly (onMutate patches the cache), rolls back on error, and
 *  reconciles with the server on settle. Call once per screen and pass
 *  `isFavorited`/`toggle` down to the presentational buttons. */
export const useFavoriteToggle = (targetType: FavoriteTargetType) => {
  const dataLot = useDataLot();
  const { openErrorToast } = useToast();
  const options = favoriteQueries.list(targetType);
  const { data } = useQuery(options);
  const favorites = data ?? [];

  const mutation = useMutation<void, Error, ToggleVariables, ToggleContext>({
    mutationFn: ({ targetRef, next }) =>
      next ? addFavorite(targetType, targetRef) : removeFavorite(targetType, targetRef),
    onMutate: async ({ targetRef, next }) => {
      await dataLot.cancelQueries(options);
      const previous = dataLot.getQueryData<Favorite[]>(options.queryKey);

      dataLot.setQueryData<Favorite[]>(options.queryKey, (old) =>
        applyFavoriteToggle(old ?? [], targetType, targetRef, next),
      );

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) dataLot.setQueryData(options.queryKey, context.previous);
      openErrorToast({ message: "잠시 후 다시 시도해 주세요." });
    },
    onSettled: () => {
      void dataLot.invalidateQueries(options);
    },
  });

  return {
    isFavorited: (targetRef: string) => isFavorited(favorites, targetRef),
    toggle: (targetRef: string) =>
      mutation.mutate({ targetRef, next: !isFavorited(favorites, targetRef) }),
  };
};
