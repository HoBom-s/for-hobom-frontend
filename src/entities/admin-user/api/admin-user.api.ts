import { httpClient, type HttpResponseType } from "@/shared/api";
import type { PendingUserType } from "./admin-user.type";

export const fetchPendingUsers = async () =>
  await httpClient.get<HttpResponseType<PendingUserType[]>>(
    `/admin/users/pending`,
  );

export const patchApproveUser = async ({ id }: { id: string }) =>
  await httpClient.patch(`/admin/users/${id}/approve`, {});

export const patchRejectUser = async ({ id }: { id: string }) =>
  await httpClient.patch(`/admin/users/${id}/reject`, {});
