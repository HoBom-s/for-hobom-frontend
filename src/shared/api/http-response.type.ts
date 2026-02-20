export interface HttpResponseType<T> {
  success: boolean;
  message: string;
  timestamp: Date;
  items: T;
}
