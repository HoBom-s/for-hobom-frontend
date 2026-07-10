import { httpClient, parseResponse, type HttpResponseType } from "@/shared/api";
import { userSchema, usersSchema } from "./user.schema";
import type { UserType } from "./user.type";

export const fetchMe = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<UserType>>(`/auth/me`, { signal });

  return parseResponse(userSchema, "GET /auth/me")(res.items);
};

export const fetchUsers = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<UserType[]>>(`/users`, { signal });

  return { ...res, items: parseResponse(usersSchema, "GET /users")(res.items) };
};

export const fetchUserById = async ({ id }: { id: string }, signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<UserType>>(`/users/${id}`, { signal });

  return { ...res, items: parseResponse(userSchema, "GET /users/:id")(res.items) };
};
