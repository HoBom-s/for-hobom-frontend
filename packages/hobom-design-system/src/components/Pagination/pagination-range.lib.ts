interface PaginationRangeParams {
  count: number;
  page: number;
  siblingCount?: number;
  boundaryCount?: number;
}

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;

  return length > 0 ? Array.from({ length }, (_, i) => start + i) : [];
};

/**
 * Resolves a gap between two page groups: an ellipsis when several pages are
 * hidden, the single hidden `page` when exactly one is, or nothing otherwise.
 */
const gapMarker = (hasEllipsis: boolean, hasSinglePage: boolean, page: number): (number | "ellipsis")[] => {
  if (hasEllipsis) return ["ellipsis"];
  if (hasSinglePage) return [page];

  return [];
};

/**
 * Builds the sequence of page numbers to render, inserting `"ellipsis"` markers
 * where gaps appear. Always shows the first and last `boundaryCount` pages plus
 * `siblingCount` pages on each side of the current `page`. A gap of exactly one
 * page collapses to that page number rather than an ellipsis.
 */
export const paginationRange = ({
  count,
  page,
  siblingCount = 1,
  boundaryCount = 1,
}: PaginationRangeParams): (number | "ellipsis")[] => {
  if (count <= 0) return [];

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const firstEndPage = endPages[0];
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    firstEndPage !== undefined ? firstEndPage - 2 : count - 1,
  );

  const startGap = gapMarker(
    siblingsStart > boundaryCount + 2,
    boundaryCount + 1 < count - boundaryCount,
    boundaryCount + 1,
  );
  const endGap = gapMarker(
    siblingsEnd < count - boundaryCount - 1,
    count - boundaryCount > boundaryCount,
    count - boundaryCount,
  );

  return [
    ...startPages,
    ...startGap,
    ...range(siblingsStart, siblingsEnd),
    ...endGap,
    ...endPages,
  ];
};
