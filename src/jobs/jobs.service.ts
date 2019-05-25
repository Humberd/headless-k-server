import { BadRequestException, Injectable } from '@nestjs/common';
import { JobStatus, JobStatusRequest } from './_models/job-status-request';
import { JobsRepositoryService } from './jobs-repository.service';

@Injectable()
export class JobsService {

  constructor(private repository: JobsRepositoryService) {

  }

  async save(data: JobStatusRequest) {
    switch (data.status) {
      case JobStatus.SUCCESS:
        return this.repository.saveSuccess(data);
      case JobStatus.ALREADY_DONE:
        return this.repository.saveAlreadyDone(data);
      case JobStatus.ERROR:
        return this.repository.saveError(data);
      default:
        return new BadRequestException(`${JSON.stringify(data)} has invalid status`);
    }
  }
}
