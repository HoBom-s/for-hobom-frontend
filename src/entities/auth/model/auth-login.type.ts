export interface AuthLoginType {
  nickname: string;
  password: string;
}

export interface AuthTokenType {
  accessToken: string;
  refreshToken: string;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  nickname: string;
}
