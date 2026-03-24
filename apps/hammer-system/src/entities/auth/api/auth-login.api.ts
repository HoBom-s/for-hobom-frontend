import { userHttpClient, setAccessToken } from "@/shared/api";

export const postAuthLogin = async ({ email, password }: { email: string; password: string }) => {
  const res = await userHttpClient.post<{ accessToken: string }>("/auth/login", {
    email,
    password,
  });

  setAccessToken(res.accessToken);
};
