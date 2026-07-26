import { useParams } from "react-router";
import { AnimalDetail } from "@/features/animal-detail";
import { NotFoundState } from "@/shared/ui";

export const AnimalDetailPage = () => {
  const { animalId } = useParams<{ animalId: string }>();

  if (!animalId) return <NotFoundState />;

  return <AnimalDetail animalId={animalId} />;
};
