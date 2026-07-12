import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_META, ROUTE_META } from "@/shared/config";

const setMetaTag = (name: string, content: string) => {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }

  tag.content = content;
};

/**
 * Sync document title + description + robots to the current route. CSR ships one
 * static <head>, so per-route metadata has to be set at runtime for crawlers and
 * shared-link previews.
 */
export const useRouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? DEFAULT_META;

    document.title = meta.title;
    if (meta.description) setMetaTag("description", meta.description);
    setMetaTag("robots", meta.noindex ? "noindex, nofollow" : "index, follow");
  }, [pathname]);
};
