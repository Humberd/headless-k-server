import { JobStatus } from './job-status-request';

export interface JobStatusDto {
  id: string;
  name: string;
  status: JobStatus;
  timeInterval: number;
  lastSuccess?: number;
  lastCheck?: number;
  lastError?: number;
}
