export interface HttpResponseType<T> {
  success: boolean;
  message: boolean;
  timestamp: Date;
  items: T;
}
