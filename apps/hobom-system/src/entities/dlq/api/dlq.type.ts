export interface DlqListResponse {
  items: string[];
}

export interface DlqDetailResponse {
  key: string;
  payload: Record<string, unknown>;
}

export interface DlqRetryResponse {
  message: string;
}
