import { useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { EmptyState } from "hobom-design-system";
import { shelterPath } from "@/shared/config";
import { useShelterMarkers } from "../model/useShelterMarkers";
import { ShelterMap } from "./ShelterMap";
import { styles } from "./ShelterMapView.styles";

/** The map view of the directory: located shelters as markers, each routing to
 *  its microsite. Reads the same region filter as the grid. */
export const ShelterMapView = ({ region }: { region?: string }) => {
  const navigate = useNavigate();
  const { markers } = useShelterMarkers(region);

  return (
    <div {...stylex.props(styles.root)}>
      <ShelterMap
        markers={markers}
        onSelect={(slug) => void navigate(shelterPath(slug))}
        activeRegion={region}
      />
      {markers.length === 0 && (
        <div {...stylex.props(styles.overlay)}>
          <EmptyState message="이 지역에는 지도로 표시할 보호소가 없어요." />
        </div>
      )}
    </div>
  );
};
