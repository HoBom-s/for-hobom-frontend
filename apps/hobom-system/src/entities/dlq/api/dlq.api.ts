import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import { dlqListSchema } from "./dlq.schema";
import type { DlqListResponse, DlqDetailResponse, DlqRetryResponse } from "./dlq.type";

const BASE = "/dlq";

export const fetchDlqKeys = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<DlqListResponse>>(BASE, { signal });

  return { ...res, items: parseResponse(dlqListSchema, "GET /dlq")(res.items) };
};

export const fetchDlqDetail = (key: string, signal?: AbortSignal) =>
  httpClient.get<HttpResponseType<DlqDetailResponse>>(`${BASE}/${encodeURIComponent(key)}`, {
    signal,
  });

export const retryDlqItem = (key: string) =>
  httpClient.post<HttpResponseType<DlqRetryResponse>>(
    `${BASE}/${encodeURIComponent(key)}/retry`,
    {},
  );
