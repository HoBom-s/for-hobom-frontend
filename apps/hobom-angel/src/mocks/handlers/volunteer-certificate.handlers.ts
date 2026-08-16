import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { mockSession } from "./mock-session";
import { ok } from "./ok";

interface CertificateRow {
  certificateNo: string;
  volunteerNickname: string;
  issuedAt: string;
  totalCount: number;
  totalMinutes: number;
  totalHours: number;
  items: {
    eventTitle: string;
    shelterName: string;
    startAt: string;
    endAt: string;
    minutes: number;
  }[];
}

// The signed-in volunteer's issued certificates. Mutable so issuing appends one.
const CERTIFICATES: CertificateRow[] = [
  {
    certificateNo: "HB-2026-000418",
    volunteerNickname: "봄이네",
    issuedAt: "2026-07-30T02:00:00.000Z",
    totalCount: 3,
    totalMinutes: 450,
    totalHours: 7.5,
    items: [
      {
        eventTitle: "주말 산책 봉사",
        shelterName: "행복보호소",
        startAt: "2026-07-12T00:00:00.000Z",
        endAt: "2026-07-12T03:00:00.000Z",
        minutes: 180,
      },
      {
        eventTitle: "목욕·미용 봉사",
        shelterName: "행복보호소",
        startAt: "2026-07-19T00:00:00.000Z",
        endAt: "2026-07-19T02:30:00.000Z",
        minutes: 150,
      },
      {
        eventTitle: "입양 홍보 부스",
        shelterName: "인천반려동물보호소",
        startAt: "2026-07-26T00:00:00.000Z",
        endAt: "2026-07-26T02:00:00.000Z",
        minutes: 120,
      },
    ],
  },
];

const unauthorized = () => HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });

let issued = 0;

/** §05 내 봉사 확인서 — list and issue (from completed participations). */
export const volunteerCertificateHandlers = [
  http.get(mockUrl("/me/volunteer-certificates"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(CERTIFICATES);
  }),

  http.post(mockUrl("/me/volunteer-certificates"), () => {
    if (!mockSession.isActive()) return unauthorized();

    issued += 1;
    const fresh: CertificateRow = {
      certificateNo: `HB-2026-00050${issued}`,
      volunteerNickname: "봄이네",
      issuedAt: "2026-08-16T05:00:00.000Z",
      totalCount: 1,
      totalMinutes: 120,
      totalHours: 2,
      items: [
        {
          eventTitle: "급식소 청소 봉사",
          shelterName: "부산해운대보호소",
          startAt: "2026-08-09T00:00:00.000Z",
          endAt: "2026-08-09T02:00:00.000Z",
          minutes: 120,
        },
      ],
    };

    CERTIFICATES.unshift(fresh);

    return ok(fresh);
  }),
];
