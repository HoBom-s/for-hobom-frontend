import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import type { UserType, AuthSignUpType } from "@/entities/auth/model/auth-login.type.ts";
import { usersSchema } from "./auth-login.schema";

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
