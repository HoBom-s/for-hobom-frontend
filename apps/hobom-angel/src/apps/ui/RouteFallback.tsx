import { useLocation } from "react-router";
import { BrowseAnimalsSkeleton } from "@/features/browse-animals";
import { BrowseSheltersSkeleton } from "@/features/browse-shelters";
import { ROUTES } from "@/shared/config";
import { LoadingState } from "@/shared/ui";

/** Route-aware loading fallback: the list screens get a list skeleton, so a chunk
 *  or session probe resolves into a skeleton rather than a spinner; everything
 *  else falls back to the centered loader. */
export const RouteFallback = () => {
  const { pathname } = useLocation();

  if (pathname === ROUTES.ANIMALS) return <BrowseAnimalsSkeleton />;
  if (pathname === ROUTES.SHELTERS) return <BrowseSheltersSkeleton />;

  return <LoadingState />;
};
