import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  errorEventQueries,
  type ErrorEventSearchParams,
  type ErrorType,
} from "@/entities/error-event";

const PAGE_SIZE = 20;

const INITIAL_FILTER = {
  errorType: "" as ErrorType | "",
  screen: "",
};

export const useErrorEventSearch = () => {
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [page, setPage] = useState(0);
  const deferredScreen = useDeferredValue(filter.screen);

  const searchParams = useMemo<ErrorEventSearchParams>(() => {
    const params: ErrorEventSearchParams = { page, size: PAGE_SIZE };
    if (filter.errorType) params.errorType = filter.errorType;
    if (deferredScreen) params.screen = deferredScreen;
    return params;
  }, [filter.errorType, deferredScreen, page]);

  const { data, isLoading } = useQuery(errorEventQueries.list(searchParams));

  const items = data?.items.items ?? [];
  const totalCount = data?.items.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleFilterChange = useCallback(
    (key: keyof typeof INITIAL_FILTER, value: string) => {
      setFilter((prev) => ({ ...prev, [key]: value }));
      setPage(0);
    },
    [],
  );

  const handleReset = useCallback(() => {
    setFilter(INITIAL_FILTER);
    setPage(0);
  }, []);

  return {
    filter,
    page,
    setPage,
    items,
    totalCount,
    totalPages,
    isLoading,
    handleFilterChange,
    handleReset,
  };
};
