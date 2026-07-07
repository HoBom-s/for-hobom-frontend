import { describe, expect, it } from "vitest";
import { paginationRange } from "./pagination-range.lib";

describe("paginationRange", () => {
  it("returns all pages without ellipsis when the count is small", () => {
    expect(paginationRange({ count: 5, page: 3 })).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns a single page for count=1", () => {
    expect(paginationRange({ count: 1, page: 1 })).toEqual([1]);
  });

  it("returns an empty array for count=0", () => {
    expect(paginationRange({ count: 0, page: 1 })).toEqual([]);
  });

  it("shows one trailing ellipsis when the current page is near the start", () => {
    expect(paginationRange({ count: 10, page: 1 })).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
  });

  it("shows one leading ellipsis when the current page is near the end", () => {
    expect(paginationRange({ count: 10, page: 10 })).toEqual([1, "ellipsis", 6, 7, 8, 9, 10]);
  });

  it("shows two ellipses when the current page is in the middle", () => {
    expect(paginationRange({ count: 10, page: 5 })).toEqual([
      1,
      "ellipsis",
      4,
      5,
      6,
      "ellipsis",
      10,
    ]);
  });

  it("respects a larger siblingCount", () => {
    // Sibling window [3..7] leaves only page 2 hidden on the left, so the left
    // gap collapses to that single page instead of an ellipsis.
    expect(paginationRange({ count: 10, page: 5, siblingCount: 2 })).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      "ellipsis",
      10,
    ]);
  });

  it("respects a larger boundaryCount", () => {
    expect(paginationRange({ count: 11, page: 6, boundaryCount: 2 })).toEqual([
      1,
      2,
      "ellipsis",
      5,
      6,
      7,
      "ellipsis",
      10,
      11,
    ]);
  });

  it("renders a page number instead of an ellipsis when only one page is hidden", () => {
    expect(paginationRange({ count: 7, page: 4 })).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
