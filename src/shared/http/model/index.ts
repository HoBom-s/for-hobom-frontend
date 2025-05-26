import { HttpClient } from "./http-client";

const httpClient = HttpClient.of(
  import.meta.env.VITE_APP_HOBOM_API_GATEWAY_URL,
);

export { httpClient };
