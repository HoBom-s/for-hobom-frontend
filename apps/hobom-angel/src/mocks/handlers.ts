import { http, HttpResponse } from "msw";
import { env } from "@/shared/config";

const url = (path: string) => `${env.VITE_APP_HOBOM_API_GATEWAY_URL}${path}`;

/**
 * Auth mock handlers. They let the signup flow run end to end without the live
 * backend (whose 본인확인 vendor is still stubbed). A nickname of "taken"
 * simulates the 409 conflict so the error path stays exercised.
 */
export const handlers = [
  http.post(url("/auth/signup"), async ({ request }) => {
    const body = (await request.json()) as { nickname?: string };

    if (body.nickname === "taken") {
      return HttpResponse.json({ message: "이미 사용 중인 닉네임이에요." }, { status: 409 });
    }

    return HttpResponse.json({
      userId: "mock-user-1",
      nickname: body.nickname ?? "봄이네",
      tokens: { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" },
    });
  }),
];
