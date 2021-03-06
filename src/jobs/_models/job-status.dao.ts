import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { JobStatus } from './job-status-request';

export interface JobStatusDao extends Document {
  _id: string;
  name: string;
  timeInterval: number;
  status: JobStatus;
  lastSuccess?: Date;
  lastCheck?: Date;
  lastError?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const JobStatusSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true
  },
  timeInterval: {
    type: Number,
    required: true
  },
  status: {
    enum: Object.keys(JobStatus),
  },
  lastSuccess: Date,
  lastCheck: Date,
  lastError: Date
}, {timestamps: true});
