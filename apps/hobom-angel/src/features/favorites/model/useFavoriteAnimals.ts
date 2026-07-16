import { useSuspenseQueries, useSuspenseQuery } from "hobom-data";
import { animalQueries } from "@/entities/animal";
import { favoriteQueries, useFavoriteToggle } from "@/entities/favorite";
import type { AnimalDetail } from "@/entities/animal";

/** The viewer's favorited animals, hydrated from their refs. The favorite refs
 *  and each animal's detail load in parallel; toggling unfavorites optimistically
 *  (which drops the card, since the refs drive the list). */
export const useFavoriteAnimals = () => {
  const { data: favorites } = useSuspenseQuery(favoriteQueries.list("ANIMAL"));
  const results = useSuspenseQueries({
    queries: favorites.map((favorite) => animalQueries.detail(favorite.targetRef)),
  });
  const controls = useFavoriteToggle("ANIMAL");
  const animals: AnimalDetail[] = results.map((result) => result.data);

  return { animals, controls };
};
