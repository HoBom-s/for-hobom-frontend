import { useSuspenseQueries } from "hobom-data";
import { favoriteQueries, useFavoriteToggle } from "@/entities/favorite";
import { shelterQueries } from "@/entities/shelter";
import type { ShelterMarker } from "@/entities/shelter";

/** The viewer's followed shelters. Favorites store only shelter ids, so we join
 *  them against the shelter markers (id → name/slug/region) — both load in
 *  parallel under one suspense boundary. */
export const useFavoriteShelters = () => {
  const [{ data: favorites }, { data: markers }] = useSuspenseQueries({
    queries: [favoriteQueries.list("SHELTER"), shelterQueries.markers()],
  });
  const controls = useFavoriteToggle("SHELTER");
  const byId = new Map(markers.map((marker) => [marker.id, marker]));
  const shelters = favorites
    .map((favorite) => byId.get(favorite.targetRef))
    .filter((marker): marker is ShelterMarker => marker !== undefined);

  return { shelters, controls };
};
