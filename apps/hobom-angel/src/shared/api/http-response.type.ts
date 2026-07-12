export interface HttpResponseType<T> {
  success: boolean;
  message: string;
  timestamp: Date;
  items: T;
}

export interface PaginatedItems<T> {
  items: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
