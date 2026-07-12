import { useMutation } from "hobom-data";
import { authMutations } from "@/entities/auth";

/** Login submission (email + password → session). */
export const useLogin = () => useMutation(authMutations.login());
