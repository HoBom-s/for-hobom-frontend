import { useParams } from "react-router-dom";
import { ApplyAdoption } from "@/features/apply-adoption";
import { NotFoundState } from "@/shared/ui";

export const ApplyAdoptionPage = () => {
  const { animalId } = useParams<{ animalId: string }>();

  if (!animalId) return <NotFoundState />;

  return <ApplyAdoption animalId={animalId} />;
};
