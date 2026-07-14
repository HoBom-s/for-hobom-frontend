import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

const NAMES = ["콩이", "보리", "초코", "나비", "깜냥", "단추", "호두", "모카", "감자", "구름", "별이", "달이"];
const SPECIES = ["DOG", "CAT", "OTHER"] as const;
const STATUSES = ["AVAILABLE", "AVAILABLE", "AVAILABLE", "RESERVED"] as const;
const SEXES = ["MALE", "FEMALE", "UNKNOWN"] as const;
const SIZES = ["SMALL", "MEDIUM", "LARGE"] as const;

const ANIMALS = Array.from({ length: 42 }, (_, i) => ({
  id: `animal-${i + 1}`,
  shelterId: "shelter-1",
  name: `${NAMES[i % NAMES.length] ?? "친구"}${i >= NAMES.length ? ` ${Math.floor(i / NAMES.length) + 1}` : ""}`,
  species: SPECIES[i % SPECIES.length],
  description: "사람을 좋아하는 순한 아이예요.",
  status: STATUSES[i % STATUSES.length],
  traits: {
    sex: SEXES[i % SEXES.length],
    size: SIZES[i % SIZES.length],
    ageMonths: (i % 6) * 6 + 3,
    breed: "믹스",
    color: "갈색",
    personality: "활발",
  },
  health: {},
  intake: {},
  photos: [{ objectKey: `https://picsum.photos/seed/hobom${i + 1}/400/300` }],
}));

/** Animal domain mock handlers — cursor-paginated /animals with filtering. */
export const animalHandlers = [
  http.get(mockUrl("/animals"), ({ request }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    const url = new URL(request.url);
    const species = url.searchParams.get("species");
    const status = url.searchParams.get("status");
    const keyword = url.searchParams.get("keyword");
    const limit = Number(url.searchParams.get("limit") ?? "20");
    const cursor = Number(url.searchParams.get("cursor") ?? "0");

    let filtered = ANIMALS;

    if (species) filtered = filtered.filter((a) => a.species === species);
    if (status) filtered = filtered.filter((a) => a.status === status);
    if (keyword) filtered = filtered.filter((a) => a.name.includes(keyword));

    const page = filtered.slice(cursor, cursor + limit);
    const nextIndex = cursor + limit;
    const hasNext = nextIndex < filtered.length;

    return ok({ items: page, nextCursor: hasNext ? String(nextIndex) : null, hasNext });
  }),
];
