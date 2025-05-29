import { httpClient } from "@/shared/http/model";

export const postAuthLogin = async ({
  nickname,
  password,
}: {
  nickname: string;
  password: string;
}) => {
  await httpClient.post(`/auth/login`, {
    nickname,
    password,
  });
};
