import { httpClient, parseResponse } from "@/shared/api";
import { toQueryString } from "@/shared/lib";
import { inquiriesPageSchema, startInquiryResultSchema } from "./inquiry.schema";
import type { StartInquiryInput, StartInquiryResult } from "./inquiry.type";
import type { InquiryPage } from "../model/inquiry.model";

const parsePage = parseResponse(inquiriesPageSchema, "GET /me/inquiries");
const parseStarted = parseResponse(startInquiryResultSchema, "POST /animals/:animalId/inquiries");

/** Open an inquiry about an animal, seeding it with the first message. */
export const startInquiry = (
  animalId: string,
  input: StartInquiryInput,
): Promise<StartInquiryResult> =>
  httpClient.post(`/animals/${animalId}/inquiries`, input).then(parseStarted);

/** The viewer's own inquiries, newest first (cursor page). */
export const getMyInquiries = (cursor?: string, signal?: AbortSignal): Promise<InquiryPage> =>
  httpClient
    .get(`/me/inquiries${toQueryString({ cursor, limit: 20 })}`, { signal })
    .then(parsePage)
    .then((page) => ({
      inquiries: page.items,
      nextCursor: page.nextCursor,
      hasNext: page.hasNext,
    }));
