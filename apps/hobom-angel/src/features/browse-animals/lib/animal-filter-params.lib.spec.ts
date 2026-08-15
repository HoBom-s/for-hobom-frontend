import { describe, expect, it } from "vitest";
import { filtersFromParams, paramsFromFilters } from "./animal-filter-params.lib";

describe("filtersFromParams", () => {
  it("defaults to the AVAILABLE + LATEST + grid view when the query is empty", () => {
    expect(filtersFromParams(new URLSearchParams())).toEqual({
      species: undefined,
      keyword: undefined,
      status: "AVAILABLE",
      sort: "LATEST",
      limit: 20,
      view: "grid",
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
      view: "grid",
    });
  });

  it("reads the map view, defaulting to the grid otherwise", () => {
    expect(filtersFromParams(new URLSearchParams("view=map")).view).toBe("map");
    expect(filtersFromParams(new URLSearchParams("view=list")).view).toBe("grid");
  });

  it("ignores an unknown species", () => {
    expect(filtersFromParams(new URLSearchParams("species=DINOSAUR")).species).toBeUndefined();
  });

  it("reads a valid placement and ignores an unknown one", () => {
    expect(filtersFromParams(new URLSearchParams("placement=FOSTER")).placement).toBe("FOSTER");
    expect(filtersFromParams(new URLSearchParams("placement=ADOPTION")).placement).toBe("ADOPTION");
    expect(filtersFromParams(new URLSearchParams("placement=RENT")).placement).toBeUndefined();
  });

  it("treats a blank keyword as absent", () => {
    expect(filtersFromParams(new URLSearchParams("q=%20%20")).keyword).toBeUndefined();
  });
});

describe("paramsFromFilters", () => {
  it("omits defaults for the AVAILABLE + LATEST + grid view", () => {
    expect(
      paramsFromFilters({
        status: "AVAILABLE",
        sort: "LATEST",
        limit: 20,
        view: "grid",
      }).toString(),
    ).toBe("");
  });

  it("serializes a non-default sort order", () => {
    expect(
      paramsFromFilters({ status: "AVAILABLE", sort: "OLDEST", limit: 20, view: "grid" }).get(
        "sort",
      ),
    ).toBe("OLDEST");
  });

  it("serializes species and keyword", () => {
    const params = paramsFromFilters({
      species: "CAT",
      keyword: "나비",
      status: "AVAILABLE",
      limit: 20,
      view: "grid",
    });

    expect(params.get("species")).toBe("CAT");
    expect(params.get("q")).toBe("나비");
  });

  it("marks the off state as status=all", () => {
    expect(paramsFromFilters({ limit: 20, view: "grid" }).get("status")).toBe("all");
  });

  it("serializes the placement filter", () => {
    expect(
      paramsFromFilters({ placement: "FOSTER", status: "AVAILABLE", limit: 20, view: "grid" }).get(
        "placement",
      ),
    ).toBe("FOSTER");
  });

  it("serializes the map view and omits it for the grid", () => {
    expect(paramsFromFilters({ limit: 20, view: "map" }).get("view")).toBe("map");
    expect(paramsFromFilters({ limit: 20, view: "grid" }).has("view")).toBe(false);
  });

  it("round-trips through the query string", () => {
    const filters = filtersFromParams(
      new URLSearchParams("species=OTHER&q=토토&status=all&view=map"),
    );

    expect(filtersFromParams(paramsFromFilters(filters))).toEqual(filters);
  });
});
