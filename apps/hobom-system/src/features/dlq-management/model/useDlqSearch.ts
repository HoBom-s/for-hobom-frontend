import { useQuery } from "hobom-data";
import { dlqQueries } from "@/entities/dlq";

export const useDlqList = () => {
  const { data, isLoading } = useQuery(dlqQueries.list());

  const items = data?.items.items ?? [];

  return { items, isLoading };
};
