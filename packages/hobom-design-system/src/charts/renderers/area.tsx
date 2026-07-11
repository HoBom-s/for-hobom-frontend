import { scaleLinear, scalePoint } from "d3-scale";
import { area as d3Area, curveMonotoneX, line as d3Line } from "d3-shape";
import { max } from "d3-array";
import { Axes } from "../Axes";
import { HoverOverlay } from "../HoverOverlay";
import { PRIMARY_COLOR, formatCategory, formatNumber, num, resolveMargin, str } from "../chart-lib";
import type { ChartDatum, ChartRenderer } from "../types";

export const areaChart: ChartRenderer = ({ data, config, width, height, hover, setHover }) => {
  const margin = resolveMargin(config);
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const categories = data.map((d) => str(d, config.x));
  const xScale = scalePoint<string>().domain(categories).range([0, innerWidth]).padding(0.5);
  const yMax = max(data, (d) => num(d, config.y)) ?? 0;
  const yScale = scaleLinear().domain([0, yMax]).range([innerHeight, 0]).nice();

  const color = config.color ?? PRIMARY_COLOR;
  const x = (d: ChartDatum) => xScale(str(d, config.x)) ?? 0;
  const y = (d: ChartDatum) => yScale(num(d, config.y));

  const areaPath = d3Area<ChartDatum>().x(x).y0(innerHeight).y1(y).curve(curveMonotoneX)(data) ?? "";
  const linePath = d3Line<ChartDatum>().x(x).y(y).curve(curveMonotoneX)(data) ?? "";

  const xTicks = data.map((d) => {
    const category = str(d, config.x);

    return { x: margin.left + (xScale(category) ?? 0), label: formatCategory(config, category) };
  });

  const gradientId = `hb-area-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.28} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Axes
        yScale={yScale}
        xTicks={xTicks}
        margin={margin}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        formatY={(v) => formatNumber(config, v)}
      />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
      <HoverOverlay
        points={data.map((d) => ({
          cx: xScale(str(d, config.x)) ?? 0,
          anchorY: yScale(num(d, config.y)),
          label: formatCategory(config, str(d, config.x)),
          value: num(d, config.y),
        }))}
        margin={margin}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        color={color}
        hover={hover}
        setHover={setHover}
      />
    </>
  );
};
