import { authHandlers } from "./auth.handlers";

/** All MSW request handlers, aggregated per domain. Add new domains here. */
export const handlers = [...authHandlers];
