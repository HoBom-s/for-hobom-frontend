import { mutationOptions } from "hobom-data";
import { resolveReport } from "./report.api";
import type { ResolveReportInput } from "./report.type";

export const reportMutations = {
  resolve: () =>
    mutationOptions({
      mutationFn: (vars: { reportId: string; input: ResolveReportInput }) =>
        resolveReport(vars.reportId, vars.input),
    }),
} as const;
