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
];
