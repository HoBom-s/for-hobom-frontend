import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

/** Adoption domain mock — submitting an application opens an approval request. */
export const adoptionHandlers = [
  http.post(mockUrl("/animals/:animalId/adoption-applications"), () => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return ok({ applicationId: "application-1", approvalId: "approval-1" });
  }),
];
