import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

interface InquiryRow {
  inquiryId: string;
  shelterId: string;
  inquirerId: string;
  animalId: string | null;
  createdAt: string | null;
}

interface MessageRow {
  id: string;
  senderId: string;
  senderRole: "APPLICANT" | "SHELTER";
  body: string;
  sentAt: string | null;
}

const ME = "651f2a9c0b1d2e3f4a5b6c7d";
const SHELTER_STAFF = "shelter-staff-1";

// A seeded inquiry so the list and thread have content on first load.
const INQUIRIES: InquiryRow[] = [
  {
    inquiryId: "inquiry-1",
    shelterId: "shelter-1",
    inquirerId: ME,
    animalId: "animal-1",
    createdAt: "2026-08-18T04:00:00.000Z",
  },
];

const MESSAGES: Record<string, MessageRow[]> = {
  "inquiry-1": [
    {
      id: "msg-1",
      senderId: ME,
      senderRole: "APPLICANT",
      body: "이 아이는 아이들과 잘 지내나요? 방문 상담도 가능한지 궁금해요.",
      sentAt: "2026-08-18T04:00:00.000Z",
    },
    {
      id: "msg-2",
      senderId: SHELTER_STAFF,
      senderRole: "SHELTER",
      body: "네, 아이들과도 잘 지내요. 주말 오후에 방문 상담 가능합니다.",
      sentAt: "2026-08-18T05:12:00.000Z",
    },
  ],
};

let sequence = 100;
const nextId = (prefix: string) => `${prefix}-${(sequence += 1)}`;

const guard = () =>
  mockSession.isActive() ? null : HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });

/** §02/§05 consumer — animal inquiries and their message threads. */
export const inquiryHandlers = [
  // Open an inquiry from an animal, seeded with the first message.
  http.post(mockUrl("/animals/:animalId/inquiries"), async ({ params, request }) => {
    const denied = guard();

    if (denied) return denied;

    const body = (await request.json()) as { message: string };
    const inquiryId = nextId("inquiry");

    INQUIRIES.unshift({
      inquiryId,
      shelterId: "shelter-1",
      inquirerId: ME,
      animalId: typeof params.animalId === "string" ? params.animalId : null,
      createdAt: "2026-08-19T00:00:00.000Z",
    });
    MESSAGES[inquiryId] = [
      {
        id: nextId("msg"),
        senderId: ME,
        senderRole: "APPLICANT",
        body: body.message,
        sentAt: "2026-08-19T00:00:00.000Z",
      },
    ];

    return HttpResponse.json(
      { success: true, items: { inquiryId }, message: "OK", timestamp: "2026-08-19T00:00:00.000Z" },
      { status: 201 },
    );
  }),

  // The viewer's inquiries (newest first).
  http.get(mockUrl("/me/inquiries"), () => {
    const denied = guard();

    if (denied) return denied;

    return ok({ items: INQUIRIES, nextCursor: null, hasNext: false });
  }),

  // One conversation's messages, oldest first.
  http.get(mockUrl("/conversations/:subjectType/:subjectRef/messages"), ({ params }) => {
    const denied = guard();

    if (denied) return denied;

    const ref = typeof params.subjectRef === "string" ? params.subjectRef : "";

    return ok(MESSAGES[ref] ?? []);
  }),

  // Append a message to a conversation (the consumer is the applicant).
  http.post(mockUrl("/conversations/:subjectType/:subjectRef/messages"), async ({ params, request }) => {
    const denied = guard();

    if (denied) return denied;

    const ref = typeof params.subjectRef === "string" ? params.subjectRef : "";
    const body = (await request.json()) as { body: string };
    const messageId = nextId("msg");

    (MESSAGES[ref] ??= []).push({
      id: messageId,
      senderId: ME,
      senderRole: "APPLICANT",
      body: body.body,
      sentAt: "2026-08-19T01:00:00.000Z",
    });

    return HttpResponse.json(
      { success: true, items: { messageId }, message: "OK", timestamp: "2026-08-19T01:00:00.000Z" },
      { status: 201 },
    );
  }),
];
