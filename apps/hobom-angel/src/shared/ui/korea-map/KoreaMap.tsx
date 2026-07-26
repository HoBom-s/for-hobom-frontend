import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent, WheelEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import { EmptyState } from "hobom-design-system";
import { KOREA_MAP } from "./korea-map.lib";
import { styles } from "./KoreaMap.styles";

export interface KoreaMarker {
  id: string;
  lng: number;
  lat: number;
  label: string;
  /** Optional count bubble riding on the pin (e.g. matching results). */
  badge?: string;
}

type Box = [x: number, y: number, w: number, h: number];

const [BX, BY, BW, BH] = KOREA_MAP.viewBox.split(" ").map(Number) as Box;
const MIN_W = BW / 8; // deepest zoom-in

const clamp = (value: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, value));

/** Keep the view box no larger than the country and panned within its bounds. */
const clampBox = (x: number, y: number, w: number, h: number): Box => {
  const cw = Math.min(w, BW);
  const ch = Math.min(h, BH);

  return [clamp(x, BX, BX + BW - cw), clamp(y, BY, BY + BH - ch), cw, ch];
};

interface KoreaMapProps {
  markers: KoreaMarker[];
  /** Called with the selected marker's id. */
  onSelect: (id: string) => void;
  /** The active region filter — its province is highlighted, if any. */
  activeRegion?: string;
  /** Accessible name for the map. */
  ariaLabel?: string;
  /** Shown over the map when there are no plottable markers. */
  emptyMessage?: string;
}

/** A hand-drawn South Korea map — province outlines with a pin per located
 *  marker (optionally badged), each selectable. Pure SVG projected from vendored
 *  boundaries (no map SDK, tiles, or network), with wheel zoom and drag-to-pan
 *  driven by the view box. Shared across the shelter and adoption directories. */
export const KoreaMap = ({
  markers,
  onSelect,
  activeRegion,
  ariaLabel = "지도",
  emptyMessage,
}: KoreaMapProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; y: number; box: Box } | null>(null);
  const [box, setBox] = useState<Box>([BX, BY, BW, BH]);

  const zoomBy = (factor: number) =>
    setBox(([x, y, w, h]) => {
      const nw = clamp(w / factor, MIN_W, BW);
      const nh = nw * (h / w);
      const cx = x + w / 2;
      const cy = y + h / 2;

      return clampBox(cx - nw / 2, cy - nh / 2, nw, nh);
    });

  const onWheel = (event: WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    zoomBy(event.deltaY < 0 ? 1.2 : 1 / 1.2);
  };

  // Panning starts only on the map background — a press that begins on a pin
  // stops here (see the marker's onPointerDown), so taps still route cleanly.
  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    drag.current = { x: event.clientX, y: event.clientY, box };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const start = drag.current;
    const svg = svgRef.current;

    if (!start || !svg) return;

    const rect = svg.getBoundingClientRect();
    const scale = Math.min(rect.width / start.box[2], rect.height / start.box[3]);
    const dx = (event.clientX - start.x) / scale;
    const dy = (event.clientY - start.y) / scale;

    setBox(clampBox(start.box[0] - dx, start.box[1] - dy, start.box[2], start.box[3]));
  };

  const endDrag = () => {
    drag.current = null;
  };

  const activateMarker = (event: KeyboardEvent<SVGGElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(id);
    }
  };

  const zoomedOut = box[2] >= BW;

  // Project once; keep only markers that land on the map.
  const plotted = markers.flatMap((marker) => {
    const point = KOREA_MAP.project(marker.lng, marker.lat);

    return point ? [{ marker, x: point[0], y: point[1] }] : [];
  });

  return (
    <div {...stylex.props(styles.wrap)}>
      <svg
        ref={svgRef}
        viewBox={box.join(" ")}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={ariaLabel}
        {...stylex.props(styles.map, !zoomedOut && styles.grabbing)}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
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

        {/* Interactive pins. Each group's box is centered on its pin (halo is
            symmetric, non-interactive), so a click always lands on the pin. */}
        <g>
          {plotted.map(({ marker, x, y }) => (
            <g
              key={marker.id}
              role="button"
              tabIndex={0}
              aria-label={marker.label}
              {...stylex.props(styles.pinGroup)}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => onSelect(marker.id)}
              onKeyDown={(event) => activateMarker(event, marker.id)}
            >
              <circle cx={x} cy={y} r={13} {...stylex.props(styles.halo)} />
              <circle cx={x} cy={y} r={7} {...stylex.props(styles.pin)} />
              {marker.badge !== undefined && (
                <>
                  <circle cx={x + 9} cy={y - 9} r={7} {...stylex.props(styles.badge)} />
                  <text x={x + 9} y={y - 9} {...stylex.props(styles.badgeText)}>
                    {marker.badge}
                  </text>
                </>
              )}
            </g>
          ))}
        </g>

        {/* Labels sit above the pins but never intercept clicks. */}
        <g {...stylex.props(styles.labelLayer)}>
          {plotted.map(({ marker, x, y }) => (
            <text key={marker.id} x={x} y={y - 13} textAnchor="middle" {...stylex.props(styles.label)}>
              {marker.label}
            </text>
          ))}
        </g>
      </svg>

      <div {...stylex.props(styles.zoom)}>
        <button
          type="button"
          aria-label="확대"
          {...stylex.props(styles.zoomButton)}
          onClick={() => zoomBy(1.4)}
        >
          +
        </button>
        <button
          type="button"
          aria-label="축소"
          {...stylex.props(styles.zoomButton)}
          onClick={() => zoomBy(1 / 1.4)}
        >
          −
        </button>
        <button
          type="button"
          aria-label="전체 보기"
          {...stylex.props(styles.zoomButton)}
          disabled={zoomedOut}
          onClick={() => setBox([BX, BY, BW, BH])}
        >
          ⤢
        </button>
      </div>

      {plotted.length === 0 && emptyMessage !== undefined && (
        <div {...stylex.props(styles.overlay)}>
          <EmptyState message={emptyMessage} />
        </div>
      )}
    </div>
  );
};
