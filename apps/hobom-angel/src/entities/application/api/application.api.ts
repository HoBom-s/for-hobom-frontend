import { httpClient, parseResponse } from "@/shared/api";
import { toQueryString } from "@/shared/lib";
import { applicationDetailSchema, applicationsPageSchema } from "./application.schema";
import { toDetail, toSummary } from "../lib/to-application.lib";
import type { DecideApplicationInput } from "./application.type";
import type { ApplicationDetail, ApplicationKind, ApplicationPage, ApplicationStatus } from "../model/application.model";

const parsePage = parseResponse(applicationsPageSchema, "GET /shelters/:id/:kind-applications");
const parseDetail = parseResponse(applicationDetailSchema, "GET /:kind-applications/:id");

const pathFor = (kind: ApplicationKind) =>
  kind === "ADOPTION" ? "adoption-applications" : "foster-applications";

/** A shelter's application queue for one kind, filtered by status (cursor page). */
export const getShelterApplications = (
  shelterId: string,
  kind: ApplicationKind,
  status?: ApplicationStatus,
  cursor?: string,
  signal?: AbortSignal,
): Promise<ApplicationPage> =>
  httpClient
    .get(
      `/shelters/${shelterId}/${pathFor(kind)}${toQueryString({ status, cursor, limit: 20 })}`,
      { signal },
    )
    .then(parsePage)
    .then((page) => ({
      applications: page.items.map((raw) => toSummary(raw, kind)),
      nextCursor: page.nextCursor,
      hasNext: page.hasNext,
    }));

/** The signed-in user's own applications of one kind (status filter, cursor). */
export const getMyApplications = (
  kind: ApplicationKind,
  status?: ApplicationStatus,
  cursor?: string,
  signal?: AbortSignal,
): Promise<ApplicationPage> =>
  httpClient
    .get(`/me/${pathFor(kind)}${toQueryString({ status, cursor, limit: 20 })}`, { signal })
    .then(parsePage)
    .then((page) => ({
      applications: page.items.map((raw) => toSummary(raw, kind)),
      nextCursor: page.nextCursor,
      hasNext: page.hasNext,
    }));

/** One application with its submitted answers. */
export const getApplicationDetail = (
  kind: ApplicationKind,
  id: string,
  signal?: AbortSignal,
): Promise<ApplicationDetail> =>
  httpClient
    .get(`/${pathFor(kind)}/${id}`, { signal })
    .then(parseDetail)
    .then((raw) => toDetail(raw, kind));

/** A shelter approves or rejects a pending application (§7.2 심사). */
export const decideApplication = (
  kind: ApplicationKind,
  id: string,
  input: DecideApplicationInput,
): Promise<void> =>
  httpClient.post(`/${pathFor(kind)}/${id}/decision`, input).then(() => undefined);
