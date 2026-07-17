import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { mockSession } from "./mock-session";
import { ok } from "./ok";

// The signed-in account. Mutable so a nickname change shows on the next
// `/users/me` read (reset on reload, like a fresh session).
const profile = {
  id: "mock-user-1",
  nickname: "봄이네",
  email: "hobom@example.com",
  verifiedChannel: "EMAIL",
  roles: ["MEMBER"],
  shelterRoles: [] as { shelterId: string; role: string }[],
  status: "ACTIVE",
};

// Public nicknames for other members (authored content hydrates from these).
const PUBLIC_PROFILES: Record<string, string> = {
  "mock-user-1": "봄이네",
  "user-2": "초코대디",
  "user-3": "나비집사",
};

const unauthorized = () => HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
const noContent = () => new HttpResponse(null, { status: 204 });

/** User domain mock handlers — profile read, nickname change, withdrawal. */
export const userHandlers = [
  http.get(mockUrl("/users/me"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(profile);
  }),

  http.patch(mockUrl("/users/me/nickname"), async ({ request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const body = (await request.json()) as { nickname: string };

    profile.nickname = body.nickname;

    return noContent();
  }),

  http.post(mockUrl("/users/me/withdrawal"), () => {
    if (!mockSession.isActive()) return unauthorized();

    mockSession.close();

    return noContent();
  }),

  // Registered after /users/me so the literal path wins over the :userId param.
  http.get(mockUrl("/users/:userId"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const userId = params.userId as string;

    return ok({ id: userId, nickname: PUBLIC_PROFILES[userId] ?? "봉사자" });
  }),
];
