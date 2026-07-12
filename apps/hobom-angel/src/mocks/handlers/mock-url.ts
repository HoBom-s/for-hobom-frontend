import { env } from "@/shared/config";

/** Resolve a backend path to its full mocked URL (gateway + API prefix). */
export const mockUrl = (path: string) => `${env.API_BASE_URL}${path}`;
