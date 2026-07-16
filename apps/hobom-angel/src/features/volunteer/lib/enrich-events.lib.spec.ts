import { describe, expect, it } from "vitest";
import type { ShelterMarker } from "@/entities/shelter";
import type { VolunteerEvent } from "@/entities/volunteer-event";
import { enrichEvents } from "./enrich-events.lib";

const event = (id: string, shelterId: string): VolunteerEvent => ({
  id,
  shelterId,
  title: "봉사",
  description: "",
  startAt: "",
  endAt: "",
  capacity: 1,
  signedUpCount: 0,
  status: "OPEN",
  type: "GENERAL",
  transport: null,
  mySignupId: null,
  mySignupStatus: null,
});

const marker = (id: string, name: string): ShelterMarker => ({
  id,
  name,
  slug: `${id}-slug`,
  region: "서울",
  lat: null,
  lng: null,
});

describe("enrichEvents", () => {
  it("joins an event to its shelter marker by shelterId", () => {
    const [enriched] = enrichEvents([event("e1", "s1")], [marker("s1", "행복보호소")]);

    expect(enriched?.shelter).toEqual({ name: "행복보호소", region: "서울", slug: "s1-slug" });
  });

  it("leaves the shelter null when no marker matches", () => {
    const [enriched] = enrichEvents([event("e1", "missing")], [marker("s1", "행복보호소")]);

    expect(enriched?.shelter).toBeNull();
  });
});
