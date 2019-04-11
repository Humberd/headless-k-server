import { Document } from 'mongoose';

export interface Day extends Document {
  day: number;
  jobs: {
    [key: string]: Job;
  };
}

export interface Job {
  jobId: string;
  lastSuccess: number;
  status: JobStatus;
}

export enum JobStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  UNKNOWN = 'UNKNOWN',
}
