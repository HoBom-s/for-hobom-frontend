import { useNavigate } from "react-router";
import { shelterPath } from "@/shared/config";
import { KoreaMap } from "@/shared/ui";
import type { KoreaMarker } from "@/shared/ui";
import { useShelterMarkers } from "../model/useShelterMarkers";

/** The map view of the directory: located shelters as markers, each routing to
 *  its microsite. Reads the same region filter as the grid. */
export const ShelterMapView = ({ region }: { region?: string }) => {
  const navigate = useNavigate();
  const { markers } = useShelterMarkers(region);

  const points: KoreaMarker[] = markers.map((marker) => ({
    id: marker.slug,
    lng: marker.lng,
    lat: marker.lat,
    label: marker.name,
  }));

  return (
    <KoreaMap
      markers={points}
      onSelect={(slug) => void navigate(shelterPath(slug))}
      activeRegion={region}
      ariaLabel="보호소 지도"
      emptyMessage="이 지역에는 지도로 표시할 보호소가 없어요."
    />
  );
};
