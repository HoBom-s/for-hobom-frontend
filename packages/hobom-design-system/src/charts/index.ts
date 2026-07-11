import { createChart } from "./createChart";
import { lineChart } from "./renderers/line";
import { areaChart } from "./renderers/area";
import { barChart } from "./renderers/bar";
import { donutChart } from "./renderers/donut";
import { radarChart } from "./renderers/radar";

/** The built-in chart, pre-registered with line / area / bar / donut / radar. */
export const Chart = createChart({
  line: lineChart,
  area: areaChart,
  bar: barChart,
  donut: donutChart,
  radar: radarChart,
});

export { createChart };
export { lineChart, areaChart, barChart, donutChart, radarChart };
export type {
  ChartConfig,
  ChartDatum,
  ChartHover,
  ChartHoverEntry,
  ChartMargin,
  ChartProps,
  ChartRegistry,
  ChartRenderContext,
  ChartRenderer,
  ChartSeries,
} from "./types";
