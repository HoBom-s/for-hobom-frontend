import { useState, useCallback } from "react";
import { useQuery } from "hobom-data";
import { analyticsQueries, toDateRange, DEFAULT_TIME_RANGE } from "@/entities/analytics";
import type { ErrorSearchParams } from "@/entities/analytics";

const createInitialParams = (): ErrorSearchParams => {
  const { from, to } = toDateRange(DEFAULT_TIME_RANGE);

  return { exceptionType: "", source: "", from, to, page: 1, pageSize: 20 };
};

export const useErrorSearch = () => {
  const [params, setParams] = useState<ErrorSearchParams>(createInitialParams);

  const { data, isLoading } = useQuery(analyticsQueries.errors(params));

  const search = useCallback((next: Partial<ErrorSearchParams>) => {
    setParams((prev) => ({ ...prev, ...next, page: next.page ?? 1 }));
  }, []);

  const reset = useCallback(() => {
    setParams(createInitialParams());
  }, []);

  const goToPage = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  return { params, data, isLoading, search, reset, goToPage };
};
