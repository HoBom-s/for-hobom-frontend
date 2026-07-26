import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

interface ReportRow {
  id: string;
  reporterId: string;
  targetType: string;
  targetRef: string;
  reason: string;
  detail: string;
  status: string;
  resolution: string | null;
  resolvedAt: string | null;
}

const REPORTS: ReportRow[] = [
  {
    id: "report-1",
    reporterId: "651f2a9c0b1d2e3f4a5b6c7d",
    targetType: "SHELTER",
    targetRef: "shelter-3",
    reason: "FAKE_SHELTER",
    detail: "등록된 주소에 실제 보호소가 없다는 제보가 있어요. 확인이 필요합니다.",
    status: "PENDING",
    resolution: null,
    resolvedAt: null,
  },
  {
    id: "report-2",
    reporterId: "651f2a9c0b1d2e3f4a5b6c99",
    targetType: "ANIMAL",
    targetRef: "animal-8",
    reason: "INAPPROPRIATE_CONTENT",
    detail: "프로필 사진이 아이와 무관한 부적절한 이미지예요.",
    status: "PENDING",
    resolution: null,
    resolvedAt: null,
  },
  {
    id: "report-3",
    reporterId: "651f2a9c0b1d2e3f4a5babcd",
    targetType: "USER",
    targetRef: "user-42",
    reason: "USER_MISCONDUCT",
    detail: "입양 상담 중 반복적으로 무례한 언행을 했다는 신고입니다.",
    status: "PENDING",
    resolution: null,
    resolvedAt: null,
  },
];

/** Report domain mock — the operator's moderation queue (§09 신고 처리). */
export const reportHandlers = [
  http.get(mockUrl("/reports/pending"), () => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return ok(REPORTS.filter((report) => report.status === "PENDING"));
  }),

  http.post(mockUrl("/reports/:reportId/resolution"), async ({ params, request }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    const input = (await request.json()) as { resolution: string };
    const report = REPORTS.find((row) => row.id === params.reportId);

    if (report) {
      report.status = "RESOLVED";
      report.resolution = input.resolution;
      report.resolvedAt = "2026-07-24T00:00:00.000Z";
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
