import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";

const TOKENS = { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" };

/**
 * Auth domain mock handlers. Reserved inputs exercise the error paths: email
 * "taken@example.com" or nickname "taken" → 409 on signup, password "wrongpass"
 * → 401 on login.
 */
export const authHandlers = [
  http.post(mockUrl("/auth/signup"), async ({ request }) => {
    const body = (await request.json()) as { email?: string; nickname?: string };

    if (body.email === "taken@example.com") {
      return HttpResponse.json({ message: "이미 가입된 이메일이에요." }, { status: 409 });
    }

    if (body.nickname === "taken") {
      return HttpResponse.json({ message: "이미 사용 중인 닉네임이에요." }, { status: 409 });
    }

    return HttpResponse.json({ userId: "mock-user-1", nickname: body.nickname ?? "봄이네", tokens: TOKENS });
  }),

  http.post(mockUrl("/auth/login"), async ({ request }) => {
    const body = (await request.json()) as { password?: string };

    if (body.password === "wrongpass") {
      return HttpResponse.json(
        { message: "이메일 또는 비밀번호가 올바르지 않아요." },
        { status: 401 },
      );
    }

    return HttpResponse.json(TOKENS);
  }),
];
