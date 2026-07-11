import { scaleLinear, scalePoint } from "d3-scale";
import { curveMonotoneX, line as d3Line } from "d3-shape";
import { max } from "d3-array";
import { Axes } from "../Axes";
import { HoverOverlay, type HoverColumn } from "../HoverOverlay";
import { formatCategory, formatNumber, num, resolveMargin, resolveSeries, str } from "../chart-lib";
import type { ChartDatum, ChartRenderer } from "../types";

export const lineChart: ChartRenderer = ({ data, config, width, height, hover, setHover }) => {
  const margin = resolveMargin(config);
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const series = resolveSeries(config);
  const categories = data.map((d) => str(d, config.x));
  const xScale = scalePoint<string>().domain(categories).range([0, innerWidth]).padding(0.5);
  const yMax = max(data, (d) => Math.max(...series.map((s) => num(d, s.key)))) ?? 0;
  const yScale = scaleLinear().domain([0, yMax]).range([innerHeight, 0]).nice();

  const x = (d: ChartDatum) => xScale(str(d, config.x)) ?? 0;

  const paths = series.map((s) => ({
    color: s.color,
    d: d3Line<ChartDatum>().x(x).y((d) => yScale(num(d, s.key))).curve(curveMonotoneX)(data) ?? "",
  }));

  const columns: HoverColumn[] = data.map((d) => {
    const markers = series.map((s) => ({ cy: yScale(num(d, s.key)), color: s.color }));

    return {
      cx: x(d),
      anchorY: Math.min(...markers.map((m) => m.cy)),
      title: formatCategory(config, str(d, config.x)),
      entries: series.map((s) => ({ label: s.label, value: num(d, s.key), color: s.color })),
      markers,
    };
  });

  const xTicks = data.map((d) => ({
    x: margin.left + x(d),
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
        {paths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
        {series.length === 1 &&
          data.map((d, index) => (
            <circle
              key={index}
              cx={x(d)}
              cy={yScale(num(d, series[0]?.key))}
              r={4}
              fill={series[0]?.color}
              stroke="var(--hb-color-surface)"
              strokeWidth={2}
            />
          ))}
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
