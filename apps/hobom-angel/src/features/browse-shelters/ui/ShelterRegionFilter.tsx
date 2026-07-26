import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { SHELTER_REGIONS } from "../lib/shelter-region.lib";
import { styles } from "./ShelterRegionFilter.styles";

interface ShelterRegionFilterProps {
  region: string | undefined;
  onChange: (region: string | undefined) => void;
}

/** §3.5 region filter: a segmented "전체 지역" + one toggle per known region. */
export const ShelterRegionFilter = ({ region, onChange }: ShelterRegionFilterProps) => (
  <div {...stylex.props(styles.root)}>
    <Hb.ToggleButtonGroup variant="segmented" aria-label="지역">
      <Hb.ToggleButton
        variant="segmented"
        value="all"
        selected={region === undefined}
        onChange={() => onChange(undefined)}
      >
        전체 지역
      </Hb.ToggleButton>
      {SHELTER_REGIONS.map((value) => {
        const selected = region === value;

        return (
          <Hb.ToggleButton
            key={value}
            variant="segmented"
            value={value}
            selected={selected}
            onChange={() => onChange(selected ? undefined : value)}
          >
            {value}
          </Hb.ToggleButton>
        );
      })}
    </Hb.ToggleButtonGroup>
  </div>
);
