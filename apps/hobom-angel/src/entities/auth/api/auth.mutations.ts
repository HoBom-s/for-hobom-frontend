import { mutationOptions } from "hobom-data";
import { postSignup } from "./auth.api";

export const authMutations = {
  all: () => ["auth"] as const,

  signup: () =>
    mutationOptions({
      mutationKey: [...authMutations.all(), "signup"] as const,
      mutationFn: postSignup,
    }),
} as const;
