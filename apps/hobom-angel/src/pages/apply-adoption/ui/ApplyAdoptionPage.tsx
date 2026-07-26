import { useParams } from "react-router";
import { ApplyPlacement } from "@/features/apply-placement";
import { NotFoundState } from "@/shared/ui";

export const ApplyAdoptionPage = () => {
  const { animalId } = useParams<{ animalId: string }>();

  if (!animalId) return <NotFoundState />;

  return <ApplyPlacement animalId={animalId} purpose="ADOPTION" />;
};
