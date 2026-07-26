import { useNavigate } from "react-router";
import { shelterPath } from "@/shared/config";
import { KoreaMap } from "@/shared/ui";
import type { AnimalFilters } from "@/entities/animal";
import { useAnimalMapMarkers } from "../model/useAnimalMapMarkers";

/** The map view of the adoption directory: shelters holding animals that match
 *  the filters, badged with the count. Selecting one opens its microsite. */
export const AnimalMapView = ({ filters }: { filters: AnimalFilters }) => {
  const navigate = useNavigate();
  const { markers } = useAnimalMapMarkers(filters);

  return (
    <KoreaMap
      markers={markers}
      onSelect={(slug) => void navigate(shelterPath(slug))}
      ariaLabel="입양 지도"
      emptyMessage="조건에 맞는 동물이 있는 보호소가 없어요."
    />
  );
};
