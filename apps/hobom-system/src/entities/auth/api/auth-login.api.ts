import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import { usersSchema } from "./auth-login.schema";
import type { UserType, AuthSignUpType } from "../model/auth-login.type";

export const postAuthLogin = async ({
  nickname,
  password,
}: {
  nickname: string;
  password: string;
}) => {
  await httpClient.post(`/auth/login`, { nickname, password });
};

export const postAuthSignUp = async (data: AuthSignUpType) => {
  await httpClient.post(`/users`, data);
};

export const postAuthLogout = async () => {
  await httpClient.post("/auth/logout", {});
};

export const fetchUsers = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<UserType[]>>("/users", { signal });

  return { ...res, items: parseResponse(usersSchema, "GET /users")(res.items) };
};
