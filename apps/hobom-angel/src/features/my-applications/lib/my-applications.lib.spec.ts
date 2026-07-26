import { describe, expect, it } from "vitest";
import type { ApplicationSummary } from "@/entities/application";
import { sortByRecent } from "./my-applications.lib";

const app = (id: string, createdAt: string | null): ApplicationSummary => ({
  id,
  kind: "ADOPTION",
  animalId: "a",
  shelterId: "s",
  applicantId: "u",
  status: "PENDING",
  questionnaireVersion: 1,
  plannedEndDate: null,
  createdAt,
});

describe("sortByRecent", () => {
  it("orders newest first", () => {
    const sorted = sortByRecent([
      app("old", "2026-06-01T00:00:00.000Z"),
      app("new", "2026-07-01T00:00:00.000Z"),
      app("mid", "2026-06-15T00:00:00.000Z"),
    ]);

    expect(sorted.map((a) => a.id)).toEqual(["new", "mid", "old"]);
  });

  it("sorts undated applications last", () => {
    const sorted = sortByRecent([app("none", null), app("dated", "2026-07-01T00:00:00.000Z")]);

    expect(sorted.map((a) => a.id)).toEqual(["dated", "none"]);
  });

  it("does not mutate the input", () => {
    const input = [app("a", "2026-06-01T00:00:00.000Z"), app("b", "2026-07-01T00:00:00.000Z")];

    sortByRecent(input);

    expect(input.map((a) => a.id)).toEqual(["a", "b"]);
  });
});
