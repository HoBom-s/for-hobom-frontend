const HOBOM_ACCESS_TOKEN: string = "accessToken";

const getHoBomAccessTokenKey = (): string => HOBOM_ACCESS_TOKEN;

export const saveHoBomAccessToken = (token: string) => {
  if (token == null) throw new Error("Token must be exist");
  sessionStorage.setItem(getHoBomAccessTokenKey(), token);
};

export const getHoBomAccessToken = () => {
  return sessionStorage.getItem(getHoBomAccessTokenKey());
};
