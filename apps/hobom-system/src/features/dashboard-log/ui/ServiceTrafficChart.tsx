import { Chart } from "hobom-design-system/charts";
import { CHART_COLORS } from "@/entities/dashboard";
import type { LogServiceCount } from "@/entities/log";
import { Hb } from "@/shared/ui";
import { SERVICE_LABEL_MAP } from "../lib/log-dashboard.lib";

interface ServiceTrafficChartProps {
  data: LogServiceCount[];
}

export const ServiceTrafficChart = ({ data }: ServiceTrafficChartProps) => {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <Hb.Box>
      <Hb.Text
        variant="body2"
        fontWeight={600}
        style={{
          marginBottom: 16,
        }}
      >
        서비스별 트래픽
      </Hb.Text>
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <Hb.Box style={{ width: 180, flexShrink: 0 }}>
          <Chart
            type="donut"
            data={data}
            config={{
              label: "serviceType",
              value: "count",
              colors: CHART_COLORS,
              legend: false,
              formatValue: (v) => v.toLocaleString(),
            }}
            height={180}
            ariaLabel="서비스별 트래픽"
          />
        </Hb.Box>
        <Hb.Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {data.map((entry, i) => {
            const pct = total > 0 ? (entry.count / total) * 100 : 0;
            const color = CHART_COLORS[i % CHART_COLORS.length];

            return (
              <Hb.Box
                key={entry.serviceType}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Hb.Box
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 12,
                    backgroundColor: `${color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Hb.Box
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: color,
                    }}
                  />
                </Hb.Box>
                <Hb.Box
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Hb.Text
                    variant="body2"
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {SERVICE_LABEL_MAP[entry.serviceType] ?? entry.serviceType}
                  </Hb.Text>
                  <Hb.Text
                    variant="caption"
                    color="text.secondary"
                    style={{
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {entry.count.toLocaleString()} · {pct.toFixed(1)}%
                  </Hb.Text>
                </Hb.Box>
              </Hb.Box>
            );
          })}
        </Hb.Box>
      </Hb.Box>
    </Hb.Box>
  );
};
