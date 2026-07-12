import { HttpResponse } from "msw";

/** Wrap a mock payload in the backend's success envelope ({ success, items, … }). */
export const ok = (items: unknown) =>
  HttpResponse.json({
    success: true,
    items,
    message: "OK",
    timestamp: "2026-07-13T00:00:00.000Z",
  });
