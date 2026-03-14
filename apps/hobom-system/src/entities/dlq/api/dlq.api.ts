import { httpClient, type HttpResponseType } from "@/shared/api";
import type { DlqListResponse, DlqDetailResponse, DlqRetryResponse } from "./dlq.type";

const BASE = "/dlq";

export const fetchDlqKeys = () => httpClient.get<HttpResponseType<DlqListResponse>>(BASE);

export const fetchDlqDetail = (key: string) =>
  httpClient.get<HttpResponseType<DlqDetailResponse>>(`${BASE}/${encodeURIComponent(key)}`);

export const retryDlqItem = (key: string) =>
  httpClient.post<HttpResponseType<DlqRetryResponse>>(
    `${BASE}/${encodeURIComponent(key)}/retry`,
    {},
  );
