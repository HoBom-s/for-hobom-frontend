import { useParams } from "react-router";
import { ShelterMicrosite } from "@/features/shelter-microsite";
import { NotFoundState, RouteBoundary } from "@/shared/ui";

export const ShelterDetailPage = () => {
  const { shelterSlug } = useParams<{ shelterSlug: string }>();

  if (!shelterSlug) return <NotFoundState />;

  return (
    <RouteBoundary>
      <ShelterMicrosite slug={shelterSlug} />
    </RouteBoundary>
  );
};
