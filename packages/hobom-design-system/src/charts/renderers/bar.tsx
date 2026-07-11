import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { Axes } from "../Axes";
import { HoverOverlay, type HoverColumn } from "../HoverOverlay";
import {
  formatCategory,
  formatNumber,
  num,
  resolveMargin,
  resolveSeries,
  roundedTopRect,
  str,
} from "../chart-lib";
import type { ChartRenderer } from "../types";

export const barChart: ChartRenderer = ({ data, config, width, height, hover, setHover }) => {
  const margin = resolveMargin(config);
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const series = resolveSeries(config);
  const categories = data.map((d) => str(d, config.x));
  const xScale = scaleBand<string>().domain(categories).range([0, innerWidth]).padding(0.3);
  const xSub = scaleBand<string>()
    .domain(series.map((s) => s.key))
    .range([0, xScale.bandwidth()])
    .padding(0.15);
  const yMax = max(data, (d) => Math.max(...series.map((s) => num(d, s.key)))) ?? 0;
  const yScale = scaleLinear().domain([0, yMax]).range([innerHeight, 0]).nice();

  const columns: HoverColumn[] = data.map((d) => ({
    cx: (xScale(str(d, config.x)) ?? 0) + xScale.bandwidth() / 2,
    anchorY: Math.min(...series.map((s) => yScale(num(d, s.key)))),
    title: formatCategory(config, str(d, config.x)),
    entries: series.map((s) => ({ label: s.label, value: num(d, s.key), color: s.color })),
    markers: [],
  }));

  const xTicks = data.map((d) => ({
    x: margin.left + (xScale(str(d, config.x)) ?? 0) + xScale.bandwidth() / 2,
    label: formatCategory(config, str(d, config.x)),
  }));

  return (
    <>
      <Axes
        yScale={yScale}
        xTicks={xTicks}
        margin={margin}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        formatY={(v) => formatNumber(config, v)}
      />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map((d, categoryIndex) => {
          const bandX = xScale(str(d, config.x)) ?? 0;
          const dimmed = hover !== null && hover.index !== categoryIndex;

          return series.map((s, seriesIndex) => {
            const barY = yScale(num(d, s.key));
            const barX = bandX + (xSub(s.key) ?? 0);
            const w = xSub.bandwidth();
            const h = Math.max(0, innerHeight - barY);
            const r = Math.min(4, w / 2, h);

            return (
              <path
                key={`${categoryIndex}-${seriesIndex}`}
                d={roundedTopRect(barX, barY, w, h, r)}
                fill={s.color}
                fillOpacity={dimmed ? 0.5 : 1}
              />
            );
          });
        })}
      </g>
      <HoverOverlay
        columns={columns}
        margin={margin}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        hover={hover}
        setHover={setHover}
      />
    </>
  );
};
