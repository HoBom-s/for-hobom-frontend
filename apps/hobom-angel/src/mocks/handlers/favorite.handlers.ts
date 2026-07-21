import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

type TargetType = "ANIMAL" | "SHELTER";

interface StoredFavorite {
  targetType: TargetType;
  targetRef: string;
  favoritedAt: string;
}

// Seeded so the /favorites screen and card hearts have state on first load. The
// mock is single-user, so this array stands in for the viewer's favorites.
const FAVORITES: StoredFavorite[] = [
  { targetType: "ANIMAL", targetRef: "animal-1", favoritedAt: "2026-07-14T00:00:00.000Z" },
  { targetType: "ANIMAL", targetRef: "animal-3", favoritedAt: "2026-07-15T00:00:00.000Z" },
  { targetType: "SHELTER", targetRef: "shelter-1", favoritedAt: "2026-07-15T00:00:00.000Z" },
];

const unauthorized = () => HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
const noContent = () => new HttpResponse(null, { status: 204 });

/** §05·부록 favorites mock handlers — viewer's list, idempotent add, remove. */
export const favoriteHandlers = [
  http.get(mockUrl("/favorites"), ({ request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const targetType = new URL(request.url).searchParams.get("targetType");
    const items = targetType
      ? FAVORITES.filter((favorite) => favorite.targetType === targetType)
      : FAVORITES;

    return ok({ items, nextCursor: null, hasNext: false });
  }),

  http.post(mockUrl("/favorites"), async ({ request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const body = (await request.json()) as { targetType: TargetType; targetRef: string };
    const exists = FAVORITES.some(
      (favorite) => favorite.targetType === body.targetType && favorite.targetRef === body.targetRef,
    );

    if (!exists) {
      FAVORITES.unshift({ ...body, favoritedAt: "2026-07-16T00:00:00.000Z" });
    }

    return noContent();
  }),

  http.delete(mockUrl("/favorites/:targetType/:targetRef"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const index = FAVORITES.findIndex(
      (favorite) =>
        favorite.targetType === params.targetType && favorite.targetRef === params.targetRef,
    );

    if (index >= 0) FAVORITES.splice(index, 1);

    return noContent();
  }),
];
