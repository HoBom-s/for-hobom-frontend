import { httpClient, type HttpResponseType } from "@/shared/api";
import type { UserType } from "./user.type";

export const fetchMe = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<UserType>>(`/auth/me`, { signal });

  return res.items;
};

export const fetchUsers = async (signal?: AbortSignal) =>
  await httpClient.get<HttpResponseType<UserType[]>>(`/users`, { signal });

export const fetchUserById = async ({ id }: { id: string }, signal?: AbortSignal) =>
  await httpClient.get<HttpResponseType<UserType>>(`/users/${id}`, { signal });
