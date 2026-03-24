import { useState, useCallback } from "react";
import { useQuery } from "hobom-data";
import { analyticsQueries, toDateRange, DEFAULT_TIME_RANGE } from "@/entities/analytics";
import type { RequestSearchParams } from "@/entities/analytics";

const createInitialParams = (): RequestSearchParams => {
  const { from, to } = toDateRange(DEFAULT_TIME_RANGE);

  return { method: "", path: "", statusCode: undefined, from, to, page: 1, pageSize: 20 };
};

export const useRequestSearch = () => {
  const [params, setParams] = useState<RequestSearchParams>(createInitialParams);

  const { data, isLoading } = useQuery(analyticsQueries.requests(params));

  const search = useCallback((next: Partial<RequestSearchParams>) => {
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
