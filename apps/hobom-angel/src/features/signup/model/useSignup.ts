import { useMutation } from "hobom-data";
import { authMutations } from "@/entities/auth";

/** Signup submission (본인확인 receipt + profile → session). */
export const useSignup = () => useMutation(authMutations.signup());
