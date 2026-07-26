const KEY = "hobom_mock_session";

/**
 * Stateful flag for the mock backend, persisted so `/users/me` reflects
 * login/signup across reloads — mimicking the real session cookie.
 */
export const mockSession = {
  isActive: () => localStorage.getItem(KEY) === "1",
  open: () => localStorage.setItem(KEY, "1"),
  close: () => localStorage.removeItem(KEY),
};
