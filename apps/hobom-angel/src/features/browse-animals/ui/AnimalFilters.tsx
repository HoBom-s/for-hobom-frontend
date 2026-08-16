import { useState, type FormEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { SearchOutlined } from "hobom-design-system/icons";
import { PLACEMENT_LABEL, SPECIES_LABEL } from "@/entities/animal";
import type { AnimalFilters as Filters, AnimalSpecies, PlacementType } from "@/entities/animal";
import { SortSelect } from "./SortSelect";
import { styles } from "./AnimalFilters.styles";
import type { AnimalView } from "../lib/animal-filter-params.lib";

const SPECIES: AnimalSpecies[] = ["DOG", "CAT", "OTHER"];
const PLACEMENTS: PlacementType[] = ["ADOPTION", "FOSTER"];

interface AnimalFiltersProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  view: AnimalView;
  onViewChange: (view: AnimalView) => void;
}

/**
 * §01 filter bar: full-width keyword search, a species segmented control, the
 * "입양가능만" toggle, sort, and the grid/map view toggle — all on design-system
 * primitives. (지역·나이·크기 dropdowns follow in later PRs.)
 */
export const AnimalFilters = ({ filters, onChange, view, onViewChange }: AnimalFiltersProps) => {
  const [keyword, setKeyword] = useState(filters.keyword ?? "");
  const availableOnly = filters.status === "AVAILABLE";

  const submitKeyword = (event: FormEvent) => {
    event.preventDefault();
    onChange({ ...filters, keyword: keyword.trim() || undefined });
  };

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.bar)}>
        <form {...stylex.props(styles.search)} onSubmit={submitKeyword} role="search">
          <Hb.TextField
            {...stylex.props(styles.searchField)}
            placeholder="이름 · 품종 · 지역으로 검색"
            aria-label="검색"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            slotProps={{ input: { startAdornment: <SearchOutlined fontSize="small" /> } }}
          />
          <Hb.Button type="submit" variant="primary">
            검색
          </Hb.Button>
        </form>

        <Hb.ToggleButtonGroup variant="segmented" aria-label="종">
          {SPECIES.map((species) => {
            const selected = filters.species === species;

            return (
              <Hb.ToggleButton
                key={species}
                variant="segmented"
                value={species}
                selected={selected}
                onChange={() => onChange({ ...filters, species: selected ? undefined : species })}
              >
                {SPECIES_LABEL[species]}
              </Hb.ToggleButton>
            );
          })}
        </Hb.ToggleButtonGroup>

        <Hb.ToggleButtonGroup variant="segmented" aria-label="신청 유형">
          {PLACEMENTS.map((placement) => {
            const selected = filters.placement === placement;

            return (
              <Hb.ToggleButton
                key={placement}
                variant="segmented"
                value={placement}
                selected={selected}
                onChange={() =>
                  onChange({ ...filters, placement: selected ? undefined : placement })
                }
              >
                {PLACEMENT_LABEL[placement]}
              </Hb.ToggleButton>
            );
          })}
        </Hb.ToggleButtonGroup>

        <Hb.ToggleButton
          value="available"
          selected={availableOnly}
          onChange={() => onChange({ ...filters, status: availableOnly ? undefined : "AVAILABLE" })}
        >
          입양가능만
        </Hb.ToggleButton>

        <div {...stylex.props(styles.right)}>
          <SortSelect
            value={filters.sort ?? "LATEST"}
            onChange={(sort) => onChange({ ...filters, sort })}
          />
          <Hb.ToggleButtonGroup variant="segmented" aria-label="보기 방식">
            <Hb.ToggleButton
              variant="segmented"
              value="grid"
              selected={view === "grid"}
              onChange={() => onViewChange("grid")}
            >
              그리드
            </Hb.ToggleButton>
            <Hb.ToggleButton
              variant="segmented"
              value="map"
              selected={view === "map"}
              onChange={() => onViewChange("map")}
            >
              지도
            </Hb.ToggleButton>
          </Hb.ToggleButtonGroup>
        </div>
      </div>
    </div>
  );
};
