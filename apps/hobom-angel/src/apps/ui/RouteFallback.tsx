import { useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { ListPageSkeleton, LoadingState } from "@/shared/ui";

const LIST_ROUTES = new Set<string>([ROUTES.ANIMALS, ROUTES.SHELTERS]);

/** Route-aware loading fallback: the list screens get a list skeleton, so a chunk
 *  or session probe resolves into a skeleton rather than a spinner; everything
 *  else falls back to the centered loader. */
export const RouteFallback = () => {
  const { pathname } = useLocation();

  if (LIST_ROUTES.has(pathname)) return <ListPageSkeleton />;

  return <LoadingState />;
};
