import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { logQueries, type LogSearchParams } from "@/entities/log";

const PAGE_SIZE = 20;

const INITIAL_FILTER = {
  serviceType: "",
  httpMethod: "",
  statusCode: "",
};

export const useLogSearch = () => {
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [page, setPage] = useState(0);

  const searchParams = useMemo<LogSearchParams>(() => {
    const params: LogSearchParams = { page, size: PAGE_SIZE };

    if (filter.serviceType) params.serviceType = filter.serviceType;
    if (filter.httpMethod) params.httpMethod = filter.httpMethod;
    if (filter.statusCode) {
      const code = Number(filter.statusCode);

      if (!Number.isNaN(code) && code >= 100 && code < 600) {
        params.statusCode = code;
      }
    }

    return params;
  }, [filter, page]);

  const { data, isLoading } = useQuery(logQueries.search(searchParams));

  const items = data?.items.items ?? [];
  const totalCount = data?.items.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleFilterChange = useCallback((key: keyof typeof INITIAL_FILTER, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }, []);

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
