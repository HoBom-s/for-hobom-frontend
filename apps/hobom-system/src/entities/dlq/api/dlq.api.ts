import { httpClient, type HttpResponseType } from "@/shared/api";
import type { DlqListResponse, DlqDetailResponse, DlqRetryResponse } from "./dlq.type";

const BASE = "/dlq";

export const fetchDlqKeys = (signal?: AbortSignal) =>
  httpClient.get<HttpResponseType<DlqListResponse>>(BASE, { signal });

export const fetchDlqDetail = (key: string, signal?: AbortSignal) =>
  httpClient.get<HttpResponseType<DlqDetailResponse>>(`${BASE}/${encodeURIComponent(key)}`, {
    signal,
  });

export const retryDlqItem = (key: string) =>
  httpClient.post<HttpResponseType<DlqRetryResponse>>(
    `${BASE}/${encodeURIComponent(key)}/retry`,
    {},
  );
