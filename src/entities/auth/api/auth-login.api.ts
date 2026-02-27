import { httpClient, type HttpResponseType } from "@/shared/api";
import type {
  AuthTokenType,
  UserType,
} from "@/entities/auth/model/auth-login.type.ts";

export const postAuthLogin = async ({
  nickname,
  password,
}: {
  nickname: string;
  password: string;
}) => {
  const response = await httpClient.post<HttpResponseType<AuthTokenType>>(
    `/auth/login`,
    {
      nickname,
      password,
    },
  );

  return response.items;
};

export const postAuthLogout = async () => {
  await httpClient.post("/auth/logout", {});
};

export const fetchUsers = async () =>
  await httpClient.get<HttpResponseType<UserType[]>>("/users");
