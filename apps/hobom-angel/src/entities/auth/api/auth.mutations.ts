import { mutationOptions } from "hobom-data";
import { postLogin, postSignup } from "./auth.api";

export const authMutations = {
  all: () => ["auth"] as const,

  signup: () =>
    mutationOptions({
      mutationKey: [...authMutations.all(), "signup"] as const,
      mutationFn: postSignup,
    }),

  login: () =>
    mutationOptions({
      mutationKey: [...authMutations.all(), "login"] as const,
      mutationFn: postLogin,
    }),
} as const;
