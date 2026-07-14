import { describe, expect, it } from "vitest";
import { filtersFromParams, paramsFromFilters } from "./animal-filter-params.lib";

describe("filtersFromParams", () => {
  it("defaults to the AVAILABLE + LATEST view when the query is empty", () => {
    expect(filtersFromParams(new URLSearchParams())).toEqual({
      species: undefined,
      keyword: undefined,
      status: "AVAILABLE",
      sort: "LATEST",
      limit: 20,
    });
  });

  it("reads species, keyword, the explicit 'all' status, and the sort order", () => {
    const params = new URLSearchParams("species=DOG&q=콩이&status=all&sort=OLDEST");

    expect(filtersFromParams(params)).toEqual({
      species: "DOG",
      keyword: "콩이",
      status: undefined,
      sort: "OLDEST",
      limit: 20,
    });
  });

  it("ignores an unknown species", () => {
    expect(filtersFromParams(new URLSearchParams("species=DINOSAUR")).species).toBeUndefined();
  });

  it("treats a blank keyword as absent", () => {
    expect(filtersFromParams(new URLSearchParams("q=%20%20")).keyword).toBeUndefined();
  });
});

describe("paramsFromFilters", () => {
  it("omits defaults for the AVAILABLE + LATEST view", () => {
    expect(paramsFromFilters({ status: "AVAILABLE", sort: "LATEST", limit: 20 }).toString()).toBe("");
  });

  it("serializes a non-default sort order", () => {
    expect(paramsFromFilters({ status: "AVAILABLE", sort: "OLDEST", limit: 20 }).get("sort")).toBe(
      "OLDEST",
    );
  });

  it("serializes species and keyword", () => {
    const params = paramsFromFilters({ species: "CAT", keyword: "나비", status: "AVAILABLE", limit: 20 });

    expect(params.get("species")).toBe("CAT");
    expect(params.get("q")).toBe("나비");
  });

  it("marks the off state as status=all", () => {
    expect(paramsFromFilters({ limit: 20 }).get("status")).toBe("all");
  });

  it("round-trips through the query string", () => {
    const filters = filtersFromParams(new URLSearchParams("species=OTHER&q=토토&status=all"));

    expect(filtersFromParams(paramsFromFilters(filters))).toEqual(filters);
  });
});
