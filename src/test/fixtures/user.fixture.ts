import type { UserType } from "@/entities/user";

export const makeUser = (overrides: Partial<UserType> = {}): UserType => ({
  id: "user-1",
  username: "user",
  nickname: "유저",
  email: "user@test.com",
  friends: [],
  ...overrides,
});
