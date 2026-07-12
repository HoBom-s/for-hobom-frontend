import { authHandlers } from "./auth.handlers";
import { userHandlers } from "./user.handlers";

/** All MSW request handlers, aggregated per domain. Add new domains here. */
export const handlers = [...authHandlers, ...userHandlers];
