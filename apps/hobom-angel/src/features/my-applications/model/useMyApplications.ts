import { useSuspenseQueries } from "hobom-data";
import { animalQueries } from "@/entities/animal";
import { applicationQueries } from "@/entities/application";
import type { AnimalDetail } from "@/entities/animal";
import { sortByRecent } from "../lib/my-applications.lib";

/** The viewer's adoption + foster applications, merged newest-first, with each
 *  application's animal hydrated for its name and photo. */
export const useMyApplications = () => {
  const [{ data: adoption }, { data: foster }] = useSuspenseQueries({
    queries: [applicationQueries.mine("ADOPTION"), applicationQueries.mine("FOSTER")],
  });
  const applications = sortByRecent([...adoption.applications, ...foster.applications]);

  const animalIds = [...new Set(applications.map((application) => application.animalId))];
  const animals = useSuspenseQueries({
    queries: animalIds.map((id) => animalQueries.detail(id)),
  });
  const animalById = new Map<string, AnimalDetail>(
    animals.map((result) => [result.data.id, result.data]),
  );

  return { applications, animal: (animalId: string) => animalById.get(animalId) };
};
