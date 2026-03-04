import { httpClient, type HttpResponseType } from "@/shared/api";
import type { UserType } from "./user.type";

export const fetchMe = async () => {
  const res = await httpClient.get<HttpResponseType<UserType>>(`/api/auth/me`);
  return res.items;
};

export const fetchUsers = async () =>
  await httpClient.get<HttpResponseType<UserType[]>>(`/api/users`);

export const fetchUserById = async ({ id }: { id: string }) =>
  await httpClient.get<HttpResponseType<UserType>>(`/api/users/${id}`);
