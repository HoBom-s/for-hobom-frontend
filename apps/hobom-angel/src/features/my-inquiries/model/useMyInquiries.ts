import { useSuspenseQueries, useSuspenseQuery } from "hobom-data";
import { animalQueries } from "@/entities/animal";
import { inquiryQueries } from "@/entities/inquiry";
import type { AnimalDetail } from "@/entities/animal";

/** The viewer's inquiries, newest first, with each inquiry's animal hydrated for
 *  its name and thumbnail. */
export const useMyInquiries = () => {
  const { data: page } = useSuspenseQuery(inquiryQueries.mine());
  const inquiries = page.inquiries;

  const animalIds = [
    ...new Set(inquiries.map((inquiry) => inquiry.animalId).filter((id): id is string => id != null)),
  ];
  const animals = useSuspenseQueries({
    queries: animalIds.map((id) => animalQueries.detail(id)),
  });
  const animalById = new Map<string, AnimalDetail>(
    animals.map((result) => [result.data.id, result.data]),
  );

  return {
    inquiries,
    animal: (animalId: string | null) => (animalId ? animalById.get(animalId) : undefined),
  };
};
