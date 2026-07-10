import { createChart } from "./createChart";
import { lineChart } from "./renderers/line";
import { areaChart } from "./renderers/area";
import { barChart } from "./renderers/bar";
import { donutChart } from "./renderers/donut";

/** The built-in chart, pre-registered with line / area / bar / donut renderers. */
export const Chart = createChart({
  line: lineChart,
  area: areaChart,
  bar: barChart,
  donut: donutChart,
});

export { createChart };
export { lineChart, areaChart, barChart, donutChart };
export type {
  ChartConfig,
  ChartDatum,
  ChartMargin,
  ChartProps,
  ChartRegistry,
  ChartRenderContext,
  ChartRenderer,
} from "./types";
