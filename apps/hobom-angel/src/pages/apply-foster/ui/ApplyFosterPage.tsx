import { useParams } from "react-router-dom";
import { ApplyPlacement } from "@/features/apply-placement";
import { NotFoundState } from "@/shared/ui";

export const ApplyFosterPage = () => {
  const { animalId } = useParams<{ animalId: string }>();

  if (!animalId) return <NotFoundState />;

  return <ApplyPlacement animalId={animalId} purpose="FOSTER" />;
};
