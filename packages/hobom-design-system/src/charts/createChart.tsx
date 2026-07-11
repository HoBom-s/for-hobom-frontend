import { useState } from "react";
import { ChartTooltip } from "./ChartTooltip";
import { useMeasure } from "./useMeasure";
import { formatNumber } from "./chart-lib";
import type { ChartHover, ChartProps, ChartRegistry } from "./types";

/**
 * Builds a `<Chart>` from a registry of renderers. The caller injects which
 * chart to draw via `type` and the data/styling via `config`; the factory owns
 * the responsive SVG frame and the hover tooltip. Extend the built-ins with
 * `createChart({ ...base, custom: myRenderer })`.
 */
export const createChart = <R extends ChartRegistry>(registry: R) => {
  type ChartType = keyof R & string;

  const Chart = ({
    type,
    data,
    config = {},
    height = 240,
    ariaLabel,
    className,
    style,
  }: ChartProps<ChartType>) => {
    const [ref, width] = useMeasure();
    const [hover, setHover] = useState<ChartHover | null>(null);
    const renderer = registry[type];

    return (
      <div ref={ref} className={className} style={{ position: "relative", width: "100%", ...style }}>
        {width > 0 && (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={ariaLabel}
            onMouseLeave={() => setHover(null)}
          >
            {renderer ? renderer({ data, config, width, height, hover, setHover }) : null}
          </svg>
        )}
        {hover && (
          <ChartTooltip
            x={hover.x}
            y={hover.y}
            label={hover.label}
            value={formatNumber(config, hover.value)}
          />
        )}
      </div>
    );
  };

  Chart.displayName = "Chart";

  return Chart;
};
