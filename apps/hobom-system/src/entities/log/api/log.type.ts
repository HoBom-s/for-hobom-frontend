export interface LogLevelCount {
  level: string;
  count: number;
}

export interface LogServiceCount {
  serviceType: string;
  count: number;
}

export interface LogStatusCount {
  statusCode: number;
  count: number;
}

export interface LogRequestCount {
  minute: string;
  totalRequests: number;
}

export interface LogEndpointError {
  path: string;
  httpMethod: string;
  totalCount: number;
  errorCount: number;
  errorRate: number;
}

export interface LogEntry {
  id: number;
  serviceType: string;
  level: string;
  traceId: string;
  message: string;
  httpMethod: string;
  path: string;
  statusCode: number;
  host: string;
  userId: string;
  payload: string;
  timestamp: string;
}

export interface LogSearchParams {
  serviceType?: string;
  httpMethod?: string;
  statusCode?: number;
  startedAt?: string;
  endedAt?: string;
  page?: number;
  size?: number;
}
