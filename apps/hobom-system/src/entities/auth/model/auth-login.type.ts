export interface AuthLoginType {
  nickname: string;
  password: string;
}

export interface AuthSignUpType {
  username: string;
  nickname: string;
  email: string;
  password: string;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  nickname: string;
}
