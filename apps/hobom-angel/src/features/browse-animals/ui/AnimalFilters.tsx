import { useState, type FormEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { SearchOutlined } from "hobom-design-system/icons";
import { SPECIES_LABEL } from "@/entities/animal";
import type { AnimalFilters as Filters, AnimalSpecies } from "@/entities/animal";
import { SortSelect } from "./SortSelect";
import { styles } from "./AnimalFilters.styles";

const SPECIES: AnimalSpecies[] = ["DOG", "CAT", "OTHER"];

interface AnimalFiltersProps {
  filters: Filters;
  onChange: (next: Filters) => void;
}

/**
 * §01 filter bar: full-width keyword search, a species segmented control, and
 * the "입양가능만" toggle — all on design-system primitives. (지역·나이·크기
 * dropdowns, 정렬, 지도 토글 follow in later PRs.)
 */
export const AnimalFilters = ({ filters, onChange }: AnimalFiltersProps) => {
  const [keyword, setKeyword] = useState(filters.keyword ?? "");
  const availableOnly = filters.status === "AVAILABLE";

  const submitKeyword = (event: FormEvent) => {
    event.preventDefault();
    onChange({ ...filters, keyword: keyword.trim() || undefined });
  };

  return (
    <div {...stylex.props(styles.root)}>
      <form {...stylex.props(styles.searchRow)} onSubmit={submitKeyword} role="search">
        <Hb.TextField
          fullWidth
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

      <div {...stylex.props(styles.bar)}>
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

        <Hb.Divider orientation="vertical" style={{ height: 24, alignSelf: "center" }} />

        <Hb.ToggleButton
          value="available"
          selected={availableOnly}
          onChange={() => onChange({ ...filters, status: availableOnly ? undefined : "AVAILABLE" })}
        >
          입양가능만{availableOnly ? " ✓" : ""}
        </Hb.ToggleButton>

        <div {...stylex.props(styles.right)}>
          <SortSelect
            value={filters.sort ?? "LATEST"}
            onChange={(sort) => onChange({ ...filters, sort })}
          />
          {/* The grid/map toggle stays a placeholder until the map view lands. */}
          <Hb.ToggleButtonGroup variant="segmented" aria-label="보기 방식">
            <Hb.ToggleButton variant="segmented" value="grid" selected>
              그리드
            </Hb.ToggleButton>
            <Hb.ToggleButton variant="segmented" value="map">
              지도
            </Hb.ToggleButton>
          </Hb.ToggleButtonGroup>
        </div>
      </div>
    </div>
  );
};
