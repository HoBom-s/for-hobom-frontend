import { useMemo } from "react";
import { useSuspenseQuery } from "hobom-data";
import { animalQueries } from "@/entities/animal";

/** Resolve a shelter's animal ids to names (from the roster; cached/deduped). */
export const useAnimalNames = (shelterId: string) => {
  const { data: animals } = useSuspenseQuery(animalQueries.byShelter(shelterId));

  return useMemo(() => {
    const nameById = new Map(animals.map((animal) => [animal.id, animal.name]));

    return (animalId: string) => nameById.get(animalId) ?? "이름 미상";
  }, [animals]);
};
