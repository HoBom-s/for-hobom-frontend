import { useDataLot, useMutation, useSuspenseQuery } from "hobom-data";
import { reportMutations, reportQueries } from "@/entities/report";
import { useToast } from "@/shared/model";
import type { ResolveReportInput } from "@/entities/report";

/** §09 신고 처리 — the pending report queue plus resolve (dismiss / uphold). */
export const useReportQueue = () => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const options = reportQueries.pending();
  const { data: reports } = useSuspenseQuery(options);

  const resolve = useMutation({
    ...reportMutations.resolve(),
    onSuccess: () => {
      openSuccessToast({ message: "신고를 처리했어요." });
      void dataLot.invalidateQueries(options);
    },
    onError: (error: Error) => openErrorToast({ message: error.message || "처리에 실패했어요." }),
  });

  return {
    reports,
    resolve: (reportId: string, input: ResolveReportInput) => resolve.mutate({ reportId, input }),
    resolving: resolve.isPending,
  };
};
