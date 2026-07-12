/**
 * An HTTP response error. `status` is the HTTP status code, `serverMessage` the
 * response body's `message` field. `Error.message` uses `serverMessage` when
 * present, otherwise `"HTTP error! status: {code}"`.
 */
export class HttpError extends Error {
  readonly status: number;
  readonly serverMessage?: string;

  constructor(status: number, serverMessage?: string) {
    super(serverMessage ?? `HTTP error! status: ${status}`);
    this.name = "HttpError";
    this.status = status;
    this.serverMessage = serverMessage;
  }
}
