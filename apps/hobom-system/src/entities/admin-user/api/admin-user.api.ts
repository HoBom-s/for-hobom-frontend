import { httpClient, parseResponse } from "@/shared/api";
import type { HttpResponseType } from "@/shared/api";
import { pendingUsersSchema } from "./admin-user.schema";
import type { PendingUserType } from "./admin-user.type";

export const fetchPendingUsers = async (signal?: AbortSignal) => {
  const res = await httpClient.get<HttpResponseType<PendingUserType[]>>(`/admin/users/pending`, {
    signal,
  });

  return { ...res, items: parseResponse(pendingUsersSchema, "GET /admin/users/pending")(res.items) };
};

export const patchApproveUser = async ({ id }: { id: string }) =>
  await httpClient.patch(`/admin/users/${id}/approve`, {});

export const patchRejectUser = async ({ id }: { id: string }) =>
  await httpClient.patch(`/admin/users/${id}/reject`, {});
