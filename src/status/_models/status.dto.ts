export enum AppStatus {
  OK = 'OK',
  FATAL_ERROR = 'FATAL_ERROR',
}

export interface StatusUpdateRequest {
  version: string;
  status: AppStatus;
  message?: string;
}

export interface StatusResponse {
  version: string;
  status: 'DISCONNECTED' | string;
  updatedAt: number;
  message?: string;
}
