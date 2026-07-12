import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { mockSession } from "./mock-session";

/** User domain mock handlers. `/users/me` reflects the mock session flag. */
export const userHandlers = [
  http.get(mockUrl("/users/me"), () => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return HttpResponse.json({
      id: "mock-user-1",
      nickname: "봄이네",
      email: "hobom@example.com",
      verifiedChannel: "EMAIL",
      roles: ["MEMBER"],
      shelterRoles: [],
      status: "ACTIVE",
    });
  }),
];
