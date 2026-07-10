import { spaceHttpClient } from "@/shared/api";
import type { HttpResponseType, PaginatedItems } from "@/shared/api";
import type { ErrorEventDto, ErrorEventSearchParams } from "./error-event.type";

const BASE = "/api/v1/errors";

export const fetchErrorEvents = (params: ErrorEventSearchParams, signal?: AbortSignal) => {
  const query = new URLSearchParams();

  if (params.errorType) query.set("errorType", params.errorType);
  if (params.screen) query.set("screen", params.screen);
  if (params.page != null) query.set("page", String(params.page));
  if (params.size != null) query.set("size", String(params.size));

  return spaceHttpClient.get<HttpResponseType<PaginatedItems<ErrorEventDto>>>(
    `${BASE}?${query.toString()}`,
    { signal },
  );
};

export const fetchErrorEventById = (id: number, signal?: AbortSignal) =>
  spaceHttpClient.get<HttpResponseType<ErrorEventDto>>(`${BASE}/${id}`, { signal });
