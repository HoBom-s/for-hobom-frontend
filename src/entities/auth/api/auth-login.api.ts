import { httpClient, type HttpResponseType } from "@/shared/http";
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

export const fetchUsers = async () =>
  await httpClient.get<HttpResponseType<UserType[]>>("/users");
