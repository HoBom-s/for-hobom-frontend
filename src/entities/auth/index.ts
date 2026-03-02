import {
  postAuthLogin,
  postAuthLogout,
  postAuthSignUp,
} from "./api/auth-login.api";
import { authQueries } from "./api/auth.queries";
import type {
  AuthLoginType,
  AuthTokenType,
  AuthSignUpType,
} from "./model/auth-login.type";

export { postAuthLogin, postAuthLogout, postAuthSignUp, authQueries };
export type { AuthLoginType, AuthTokenType, AuthSignUpType };
