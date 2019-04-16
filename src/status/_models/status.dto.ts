export interface StatusUpdateRequest {
  version: string;
  status: string;
}

export interface StatusResponse {
  version: string;
  status: 'DISCONNECTED' | string;
  updatedAt: number;
}
