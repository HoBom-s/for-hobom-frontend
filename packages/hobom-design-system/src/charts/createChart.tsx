import { useMeasure } from "./useMeasure";
import type { ChartProps, ChartRegistry } from "./types";

/**
 * Builds a `<Chart>` from a registry of renderers. The caller injects which
 * chart to draw via `type` and the data/styling via `config`; the factory owns
 * the responsive SVG frame. Extend the built-ins with `createChart({ ...base,
 * custom: myRenderer })`.
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
    const renderer = registry[type];

    return (
      <div ref={ref} className={className} style={{ width: "100%", ...style }}>
        {width > 0 && (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={ariaLabel}
          >
            {renderer ? renderer({ data, config, width, height }) : null}
          </svg>
        )}
      </div>
    );
  };

  Chart.displayName = "Chart";

  return Chart;
};
