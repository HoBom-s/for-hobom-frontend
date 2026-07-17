import type { KeyboardEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import { KOREA_MAP } from "../lib/korea-map.lib";
import { styles } from "./ShelterMap.styles";
import type { LocatedMarker } from "../lib/locatable-markers.lib";

interface ShelterMapProps {
  markers: LocatedMarker[];
  /** Route to the shelter microsite (SPA navigation). */
  onSelect: (slug: string) => void;
  /** The active region filter — its province is highlighted, if any. */
  activeRegion?: string;
}

const activate = (event: KeyboardEvent<SVGGElement>, onSelect: () => void) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onSelect();
  }
};

/** A hand-drawn South Korea map (§3.5) — province outlines with a shelter pin
 *  per located marker, each routing to its microsite. Pure SVG projected from
 *  vendored boundaries: no map SDK, tiles, or network. */
export const ShelterMap = ({ markers, onSelect, activeRegion }: ShelterMapProps) => (
  <svg
    viewBox={KOREA_MAP.viewBox}
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-label="보호소 지도"
    {...stylex.props(styles.map)}
  >
    <g>
      {KOREA_MAP.provinces.map((province) => (
        <path
          key={province.name}
          d={province.d}
          {...stylex.props(
            styles.province,
            Boolean(activeRegion) && province.name.startsWith(activeRegion ?? "") && styles.active,
          )}
        />
      ))}
    </g>

    <g>
      {markers.map((marker) => {
        const point = KOREA_MAP.project(marker.lng, marker.lat);

        if (!point) return null;

        const [x, y] = point;
        const select = () => onSelect(marker.slug);

        return (
          <g
            key={marker.id}
            role="button"
            tabIndex={0}
            aria-label={marker.name}
            {...stylex.props(styles.pinGroup)}
            onClick={select}
            onKeyDown={(event) => activate(event, select)}
          >
            <circle cx={x} cy={y} r={6} {...stylex.props(styles.pin)} />
            <text x={x} y={y - 11} textAnchor="middle" {...stylex.props(styles.label)}>
              {marker.name}
            </text>
          </g>
        );
      })}
    </g>
  </svg>
);
