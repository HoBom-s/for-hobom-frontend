/**
 * HTTP 응답 에러. `status`는 HTTP 상태 코드, `serverMessage`는 응답 body의 `message` 필드.
 * `Error.message`에 `serverMessage`가 있으면 그 값을, 없으면 `"HTTP error! status: {code}"`를 넣는다.
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
