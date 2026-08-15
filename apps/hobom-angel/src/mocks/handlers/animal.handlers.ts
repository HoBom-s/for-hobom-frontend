import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

const NAMES = [
  "콩이",
  "보리",
  "초코",
  "나비",
  "깜냥",
  "단추",
  "호두",
  "모카",
  "감자",
  "구름",
  "별이",
  "달이",
];
const SPECIES = ["DOG", "CAT", "OTHER"] as const;
const STATUSES = ["AVAILABLE", "AVAILABLE", "AVAILABLE", "RESERVED"] as const;
const SEXES = ["MALE", "FEMALE", "UNKNOWN"] as const;
const SIZES = ["SMALL", "MEDIUM", "LARGE"] as const;

// Spread animals across the located shelters so the map plots several badged
// pins (ids/slugs match the shelter markers in shelter.handlers).
const SHELTERS = [
  { id: "shelter-1", slug: "haengbok-shelter", name: "행복보호소", region: "서울", city: "강남구" },
  {
    id: "shelter-2",
    slug: "haengbok-maeum",
    name: "행복한마음보호소",
    region: "경기",
    city: "성남시",
  },
  {
    id: "shelter-3",
    slug: "incheon-anifriends",
    name: "인천반려동물보호소",
    region: "인천",
    city: "미추홀구",
  },
  {
    id: "shelter-4",
    slug: "busan-haeundae",
    name: "부산해운대보호소",
    region: "부산",
    city: "해운대구",
  },
  {
    id: "shelter-5",
    slug: "daegu-animal-love",
    name: "대구동물사랑센터",
    region: "대구",
    city: "수성구",
  },
];

// A mix across the roster: mostly both, with some foster-only and adoption-only.
// animal-1 (i=0) stays "both" so it remains a valid adoption/foster fixture.
const placementsFor = (i: number): string[] => {
  if (i % 5 === 2) return ["FOSTER"];
  if (i % 5 === 3) return ["ADOPTION"];

  return ["ADOPTION", "FOSTER"];
};

const ANIMALS = Array.from({ length: 42 }, (_, i) => {
  const shelter = SHELTERS[i % SHELTERS.length] as (typeof SHELTERS)[number];

  return {
    id: `animal-${i + 1}`,
    shelterId: shelter.id,
    name: `${NAMES[i % NAMES.length] ?? "친구"}${i >= NAMES.length ? ` ${Math.floor(i / NAMES.length) + 1}` : ""}`,
    species: SPECIES[i % SPECIES.length],
    description: "사람을 좋아하고 산책을 즐기는 아이예요. 실내 배변 교육이 되어 있어요.",
    status: STATUSES[i % STATUSES.length],
    eligiblePlacements: placementsFor(i),
    traits: {
      sex: SEXES[i % SEXES.length],
      size: SIZES[i % SIZES.length],
      ageMonths: (i % 6) * 6 + 3,
      weightKg: (i % 5) + 3,
      breed: "믹스",
      color: "아이보리",
      personality: "온순·사교적",
    },
    health: {
      neutered: i % 2 === 0,
      vaccinated: i % 3 !== 0,
      microchipId: i % 2 === 0 ? `410000000000${i}` : null,
      notes: i % 4 === 0 ? "특이사항 없음" : null,
    },
    intake: {
      intakeDate: `2026-0${(i % 9) + 1}-15`,
      rescueStory: "유기 구조",
      noticeNumber: `경기-2026-03${(i % 9) + 1}`,
    },
    photos: [1, 2, 3].map((n) => ({
      objectKey: `https://picsum.photos/seed/hobom${i + 1}-${n}/600/450`,
    })),
    shelter: {
      id: shelter.id,
      slug: shelter.slug,
      name: shelter.name,
      region: shelter.region,
      city: shelter.city,
    },
  };
});

interface AnimalRow {
  id: string;
  shelterId: string;
  name: string;
  species: string;
  description: string;
  status: string;
  eligiblePlacements: string[];
  traits: {
    sex: string;
    size: string;
    ageMonths: number | null;
    weightKg: number | null;
    breed: string | null;
    color: string | null;
    personality: string | null;
  };
  health: { neutered: boolean; vaccinated: boolean; microchipId: string | null; notes: string | null };
  intake: { intakeDate: string; rescueStory: string | null; noticeNumber: string | null };
  photos: { objectKey: string; caption?: string }[];
  shelter: { id: string; slug: string; name: string; region: string; city: string };
}

let nextAnimalId = ANIMALS.length + 1;

const requireSession = () =>
  mockSession.isActive() ? null : HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });

/** Animal domain mock handlers — search, detail, and the §07 console (roster,
 *  register, edit) sharing one animal store. */
export const animalHandlers = [
  http.get(mockUrl("/animals"), ({ request }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    const url = new URL(request.url);
    const species = url.searchParams.get("species");
    const status = url.searchParams.get("status");
    const placement = url.searchParams.get("placement");
    const keyword = url.searchParams.get("keyword");
    const sort = url.searchParams.get("sort");
    const limit = Number(url.searchParams.get("limit") ?? "20");
    const cursor = Number(url.searchParams.get("cursor") ?? "0");

    // ANIMALS is oldest-first; LATEST (default) shows newest first.
    let filtered = sort === "OLDEST" ? ANIMALS : [...ANIMALS].reverse();

    if (species) filtered = filtered.filter((a) => a.species === species);
    if (status) filtered = filtered.filter((a) => a.status === status);
    if (placement) filtered = filtered.filter((a) => a.eligiblePlacements.includes(placement));
    if (keyword) filtered = filtered.filter((a) => a.name.includes(keyword));

    const page = filtered.slice(cursor, cursor + limit);
    const nextIndex = cursor + limit;
    const hasNext = nextIndex < filtered.length;

    return ok({ items: page, nextCursor: hasNext ? String(nextIndex) : null, hasNext });
  }),

  http.get(mockUrl("/animals/:animalId"), ({ params }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    const animal = ANIMALS.find((candidate) => candidate.id === params.animalId);

    if (!animal) {
      return HttpResponse.json({ message: "동물을 찾을 수 없어요." }, { status: 404 });
    }

    return ok(animal);
  }),

  // §07 console — a shelter's roster, register, and edit (same animal store).
  http.get(mockUrl("/shelters/:shelterId/animals"), ({ params }) => {
    const denied = requireSession();

    if (denied) return denied;

    return ok(ANIMALS.filter((animal) => animal.shelterId === params.shelterId));
  }),

  http.post(mockUrl("/shelters/:shelterId/animals"), async ({ params, request }) => {
    const denied = requireSession();

    if (denied) return denied;

    const input = (await request.json()) as {
      name: string;
      species: string;
      description?: string;
      traits: {
        sex: string;
        size: string;
        ageMonths?: number;
        weightKg?: number;
        breed?: string;
        color?: string;
        personality?: string;
      };
      health: { neutered: boolean; vaccinated: boolean; microchipId?: string; notes?: string };
      intake: { intakeDate: string; rescueStory?: string; noticeNumber?: string };
      photos?: { objectKey: string; caption?: string }[];
    };
    const shelterId = String(params.shelterId);
    const shelter = SHELTERS.find((candidate) => candidate.id === shelterId);
    const id = `animal-${nextAnimalId}`;

    nextAnimalId += 1;

    ANIMALS.unshift({
      id,
      shelterId,
      name: input.name,
      species: input.species,
      description: input.description ?? "",
      status: "AVAILABLE",
      traits: {
        sex: input.traits.sex,
        size: input.traits.size,
        ageMonths: input.traits.ageMonths ?? null,
        weightKg: input.traits.weightKg ?? null,
        breed: input.traits.breed ?? null,
        color: input.traits.color ?? null,
        personality: input.traits.personality ?? null,
      },
      health: {
        neutered: input.health.neutered,
        vaccinated: input.health.vaccinated,
        microchipId: input.health.microchipId ?? null,
        notes: input.health.notes ?? null,
      },
      intake: {
        intakeDate: input.intake.intakeDate,
        rescueStory: input.intake.rescueStory ?? null,
        noticeNumber: input.intake.noticeNumber ?? null,
      },
      photos: (input.photos ?? []).map((photo) => ({ objectKey: photo.objectKey })),
      shelter: {
        id: shelter?.id ?? shelterId,
        slug: shelter?.slug ?? "",
        name: shelter?.name ?? "",
        region: shelter?.region ?? "",
        city: shelter?.city ?? "",
      },
    } as (typeof ANIMALS)[number]);

    return ok({ animalId: id });
  }),

  http.patch(mockUrl("/animals/:animalId"), async ({ params, request }) => {
    const denied = requireSession();

    if (denied) return denied;

    const input = (await request.json()) as {
      name: string;
      species: string;
      description?: string;
      traits: { sex: string; size: string; ageMonths?: number; breed?: string };
      health: { neutered: boolean; vaccinated: boolean; microchipId?: string };
    };
    const animal = ANIMALS.find((candidate) => candidate.id === params.animalId) as
      | AnimalRow
      | undefined;

    if (animal) {
      animal.name = input.name;
      animal.species = input.species;
      animal.description = input.description ?? "";
      animal.traits.sex = input.traits.sex;
      animal.traits.size = input.traits.size;
      animal.traits.ageMonths = input.traits.ageMonths ?? null;
      animal.traits.breed = input.traits.breed ?? null;
      animal.health.neutered = input.health.neutered;
      animal.health.vaccinated = input.health.vaccinated;
      animal.health.microchipId = input.health.microchipId ?? null;
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
