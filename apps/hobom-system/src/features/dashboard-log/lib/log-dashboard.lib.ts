import type { LogStatusCount } from "@/entities/log";

export const SERVICE_LABEL_MAP: Record<string, string> = {
  HOBOM_BACKEND: "Backend",
  HOBOM_SPACE: "HOBOM_SPACE",
};

export const getStatusColor = (code: number): string => {
  if (code < 300) return "#34d399";
  if (code < 400) return "#60a5fa";
  if (code < 500) return "#fb923c";

  return "#f87171";
};

export const getStatusLabel = (code: number): string => {
  if (code < 300) return "Success";
  if (code < 400) return "Redirect";
  if (code < 500) return "Client Error";

  return "Server Error";
};

interface KpiSummary {
  totalRequests: number;
  count4xx: number;
  count5xx: number;
  errorRate: string;
}

export const computeKpiSummary = (items: LogStatusCount[]): KpiSummary => {
  const totalRequests = items.reduce((s, d) => s + d.count, 0);
  const count4xx = items
    .filter((d) => d.statusCode >= 400 && d.statusCode < 500)
    .reduce((s, d) => s + d.count, 0);
  const count5xx = items.filter((d) => d.statusCode >= 500).reduce((s, d) => s + d.count, 0);
  const errorRate =
    totalRequests > 0 ? (((count4xx + count5xx) / totalRequests) * 100).toFixed(1) : "0.0";

  return { totalRequests, count4xx, count5xx, errorRate };
};
