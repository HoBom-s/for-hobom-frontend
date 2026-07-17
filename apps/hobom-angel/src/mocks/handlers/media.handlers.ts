import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

let uploads = 0;

/** Media presign mock — returns a picsum URL as the object key so the mock feed
 *  can display it directly (the real backend returns an R2 key + CDN publicUrl). */
export const mediaHandlers = [
  http.post(mockUrl("/media/upload-url"), () => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    uploads += 1;
    const url = `https://picsum.photos/seed/hobomupload${uploads}/600/450`;

    return ok({
      objectKey: url,
      uploadUrl: mockUrl("/media/_mock-put"),
      expiresInSeconds: 300,
      publicUrl: url,
    });
  }),

  http.put(mockUrl("/media/_mock-put"), () => new HttpResponse(null, { status: 200 })),
];
