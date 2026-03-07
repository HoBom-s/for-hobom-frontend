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
