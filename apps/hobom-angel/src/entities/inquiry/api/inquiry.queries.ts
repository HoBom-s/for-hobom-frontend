import { queryOptions } from "hobom-data";
import { getMyInquiries } from "./inquiry.api";

export const inquiryQueries = {
  all: () => ["inquiries"] as const,

  mine: () =>
    queryOptions({
      queryKey: [...inquiryQueries.all(), "mine"] as const,
      queryFn: ({ signal }) => getMyInquiries(undefined, signal),
    }),
} as const;
