import { env } from "@/shared/config";

/**
 * Preconnect (+ dns-prefetch fallback) to the API origin so the first backend
 * request skips DNS/TLS setup. No-op when the API is same-origin or relative.
 */
export const warmApiOrigin = () => {
  let origin: string;

  try {
    origin = new URL(env.API_BASE_URL, window.location.origin).origin;
  } catch {
    return;
  }

  if (origin === window.location.origin) return;

  for (const rel of ["preconnect", "dns-prefetch"]) {
    const link = document.createElement("link");

    link.rel = rel;
    link.href = origin;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
};
