import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

/** Foster domain mock — submitting an application opens an approval request. */
export const fosterHandlers = [
  http.post(mockUrl("/animals/:animalId/foster-applications"), () => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return ok({ fosterApplicationId: "foster-application-1", approvalId: "approval-2" });
  }),
];
