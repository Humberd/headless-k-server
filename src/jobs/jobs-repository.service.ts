import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobStatusDao } from './_models/job-status.dao';
import { JobStatus, JobStatusRequest } from './_models/job-status-request';

@Injectable()
export class JobsRepositoryService {
  constructor(@InjectModel('Job') private readonly jobStatusModel: Model<JobStatusDao>) {

  }

  async saveSuccess(data: JobStatusRequest) {
    return this.jobStatusModel.findByIdAndUpdate(
        data.jobId,
        {
          name: data.jobName,
          timeInterval: data.timeInterval,
          status: JobStatus.SUCCESS,
          lastSuccess: new Date(),
          lastCheck: new Date()
        } as JobStatusDao,
        {
          upsert: true,
        }
    );
  }

  async saveAlreadyDone(data: JobStatusRequest) {
    return this.jobStatusModel.findByIdAndUpdate(
        data.jobId,
        {
          name: data.jobName,
          timeInterval: data.timeInterval,
          status: JobStatus.ALREADY_DONE,
          lastCheck: new Date()
        } as JobStatusDao,
        {
          upsert: true,
        }
    );
  }

  async saveError(data: JobStatusRequest) {
    return this.jobStatusModel.findByIdAndUpdate(
        data.jobId,
        {
          name: data.jobName,
          timeInterval: data.timeInterval,
          status: JobStatus.SUCCESS,
          lastError: new Date()
        } as JobStatusDao,
        {
          upsert: true,
        }
    );
  }

  async readAll() {
    return this.jobStatusModel.find();
  }
}
