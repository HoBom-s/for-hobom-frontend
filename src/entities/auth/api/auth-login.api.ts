import { httpClient, type HttpResponseType } from "@/shared/api";
import type {
  UserType,
  AuthSignUpType,
} from "@/entities/auth/model/auth-login.type.ts";

export const postAuthLogin = async ({
  nickname,
  password,
}: {
  nickname: string;
  password: string;
}) => {
  await httpClient.post(`/api/auth/login`, { nickname, password });
};

export const postAuthSignUp = async (data: AuthSignUpType) => {
  await httpClient.post(`/api/users`, data);
};

export const postAuthLogout = async () => {
  await httpClient.post("/api/auth/logout", {});
};

export const fetchUsers = async () =>
  await httpClient.get<HttpResponseType<UserType[]>>("/api/users");
