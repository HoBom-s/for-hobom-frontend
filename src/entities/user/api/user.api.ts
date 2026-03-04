import { httpClient, type HttpResponseType } from "@/shared/api";
import type { UserType } from "./user.type";

export const fetchUsers = async () =>
  await httpClient.get<HttpResponseType<UserType[]>>(`/users`);

export const fetchUserById = async ({ id }: { id: string }) =>
  await httpClient.get<HttpResponseType<UserType>>(`/users/${id}`);
