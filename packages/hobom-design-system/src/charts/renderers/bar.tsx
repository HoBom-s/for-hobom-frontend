import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { Axes } from "../Axes";
import { HoverOverlay, type HoverColumn } from "../HoverOverlay";
import {
  colorFromDatum,
  formatCategory,
  formatNumber,
  gradientId,
  num,
  resolveMargin,
  resolveSeries,
  roundedRightRect,
  roundedTopRect,
  str,
} from "../chart-lib";
import type { ChartConfig, ChartDatum, ChartRenderContext, ChartRenderer } from "../types";

/** Unique fill colors in draw order, so each gets exactly one gradient def. */
const uniqueColors = (colors: readonly string[]): string[] => [...new Set(colors)];

/** A `<defs>` of one vertical/horizontal gradient per color (full → faded). */
const BarGradients = ({ colors, horizontal }: { colors: string[]; horizontal: boolean }) => (
  <defs>
    {colors.map((color) => (
      <linearGradient
        key={color}
        id={gradientId("bar", color)}
        x1="0"
        y1="0"
        x2={horizontal ? "1" : "0"}
        y2={horizontal ? "0" : "1"}
      >
        <stop offset="0%" stopColor={color} stopOpacity={1} />
        <stop offset="100%" stopColor={color} stopOpacity={0.6} />
      </linearGradient>
    ))}
  </defs>
);

const fillFor = (color: string, gradient: boolean): string =>
  gradient ? `url(#${gradientId("bar", color)})` : color;

/** Series values as tooltip rows; used by both orientations. */
const rowsFor = (d: ChartDatum, config: ChartConfig, series: ReturnType<typeof resolveSeries>) =>
  series.map((s) => ({
    label: s.label,
    value: num(d, s.key),
    color: colorFromDatum(d, config) ?? s.color,
  }));

const verticalBar = ({ data, config, width, height, hover, setHover }: ChartRenderContext) => {
  const margin = resolveMargin(config);
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const series = resolveSeries(config);
  const stacked = config.stacked === true && series.length > 1;
  const gradient = config.gradient !== false;
  const categories = data.map((d) => str(d, config.x));

  const band = scaleBand<string>().domain(categories).range([0, innerWidth]).padding(0.3);
  const sub = scaleBand<string>()
    .domain(series.map((s) => s.key))
    .range([0, band.bandwidth()])
    .padding(0.15);
  const yMax =
    (stacked
      ? max(data, (d) => series.reduce((sum, s) => sum + num(d, s.key), 0))
      : max(data, (d) => Math.max(...series.map((s) => num(d, s.key))))) ?? 0;
  const yScale = scaleLinear().domain([0, yMax]).range([innerHeight, 0]).nice();

  const bars = data.flatMap((d, categoryIndex) => {
    const bandStart = band(str(d, config.x)) ?? 0;
    let accum = 0;

    return series.map((s, seriesIndex) => {
      const value = num(d, s.key);
      const color = colorFromDatum(d, config) ?? s.color;
      const isTop = seriesIndex === series.length - 1;

      const x = stacked ? bandStart : bandStart + (sub(s.key) ?? 0);
      const w = stacked ? band.bandwidth() : sub.bandwidth();
      const y = stacked ? yScale(accum + value) : yScale(value);
      const h = stacked ? yScale(accum) - yScale(accum + value) : innerHeight - yScale(value);

      accum += value;

      const r = (stacked ? isTop : true) ? Math.min(4, w / 2, h) : 0;

      return { key: `${categoryIndex}-${seriesIndex}`, d: roundedTopRect(x, y, w, h, r), color };
    });
  });

  const colors = uniqueColors(bars.map((bar) => bar.color));

  const columns: HoverColumn[] = data.map((d) => ({
    cx: (band(str(d, config.x)) ?? 0) + band.bandwidth() / 2,
    anchorY: stacked
      ? yScale(series.reduce((sum, s) => sum + num(d, s.key), 0))
      : Math.min(...series.map((s) => yScale(num(d, s.key)))),
    title: formatCategory(config, str(d, config.x)),
    entries: rowsFor(d, config, series),
    markers: [],
  }));

  const xTicks = data.map((d) => ({
    x: margin.left + (band(str(d, config.x)) ?? 0) + band.bandwidth() / 2,
    label: formatCategory(config, str(d, config.x)),
  }));

  return (
    <>
      {gradient && <BarGradients colors={colors} horizontal={false} />}
      <Axes
        yScale={yScale}
        xTicks={xTicks}
        margin={margin}
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        formatY={(v) => formatNumber(config, v)}
      />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {bars.map((bar, index) => (
          <path
            key={bar.key}
            d={bar.d}
            fill={fillFor(bar.color, gradient)}
            fillOpacity={hover !== null && hover.index !== Math.floor(index / series.length) ? 0.5 : 1}
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

const AXIS_COLOR = "var(--hb-color-border)";
const LABEL_COLOR = "var(--hb-color-text-secondary)";

const horizontalBar = ({ data, config, width, height, hover, setHover }: ChartRenderContext) => {
  const margin = resolveMargin(config);
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const series = resolveSeries(config);
  const gradient = config.gradient !== false;
  const categories = data.map((d) => str(d, config.x));

  const band = scaleBand<string>().domain(categories).range([0, innerHeight]).padding(0.3);
  const sub = scaleBand<string>()
    .domain(series.map((s) => s.key))
    .range([0, band.bandwidth()])
    .padding(0.15);
  const xMax = max(data, (d) => Math.max(...series.map((s) => num(d, s.key)))) ?? 0;
  const xScale = scaleLinear().domain([0, xMax]).range([0, innerWidth]).nice();

  const bars = data.flatMap((d, categoryIndex) => {
    const bandStart = band(str(d, config.x)) ?? 0;

    return series.map((s, seriesIndex) => {
      const value = num(d, s.key);
      const color = colorFromDatum(d, config) ?? s.color;
      const y = bandStart + (sub(s.key) ?? 0);
      const h = sub.bandwidth();
      const w = xScale(value);

      return { categoryIndex, key: `${categoryIndex}-${seriesIndex}`, color, y, h, w, datum: d };
    });
  });

  const colors = uniqueColors(bars.map((bar) => bar.color));

  return (
    <>
      {gradient && <BarGradients colors={colors} horizontal />}
      <g>
        {xScale.ticks(4).map((tick) => (
          <line
            key={tick}
            x1={margin.left + xScale(tick)}
            x2={margin.left + xScale(tick)}
            y1={margin.top}
            y2={margin.top + innerHeight}
            stroke={AXIS_COLOR}
            strokeOpacity={0.5}
          />
        ))}
        {categories.map((category, index) => (
          <text
            key={`${category}-${index}`}
            x={margin.left - 10}
            y={margin.top + (band(category) ?? 0) + band.bandwidth() / 2}
            textAnchor="end"
            dominantBaseline="central"
            fontSize={11}
            fontFamily="'Inter', system-ui, sans-serif"
            fill={LABEL_COLOR}
          >
            {formatCategory(config, category)}
          </text>
        ))}
      </g>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {bars.map((bar) => (
          <path
            key={bar.key}
            d={roundedRightRect(0, bar.y, bar.w, bar.h, Math.min(4, bar.h / 2, bar.w))}
            fill={fillFor(bar.color, gradient)}
            fillOpacity={hover !== null && hover.index !== bar.categoryIndex ? 0.5 : 1}
            onMouseEnter={() =>
              setHover({
                index: bar.categoryIndex,
                x: margin.left + bar.w,
                y: margin.top + bar.y + bar.h / 2,
                title: formatCategory(config, str(bar.datum, config.x)),
                entries: rowsFor(bar.datum, config, series),
              })
            }
          />
        ))}
      </g>
    </>
  );
};

export const barChart: ChartRenderer = (ctx) =>
  ctx.config.horizontal === true ? horizontalBar(ctx) : verticalBar(ctx);
