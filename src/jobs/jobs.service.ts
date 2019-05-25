import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JobStatus, JobStatusRequest } from './_models/job-status-request';
import { JobsRepositoryService } from './jobs-repository.service';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private repository: JobsRepositoryService) {

  }

  async save(data: JobStatusRequest) {
    this.logger.log(data);
    switch (data.status) {
      case JobStatus.SUCCESS:
        return this.repository.saveSuccess(data);
      case JobStatus.ALREADY_DONE:
        return this.repository.saveAlreadyDone(data);
      case JobStatus.ERROR:
        return this.repository.saveError(data);
      default:
        throw new BadRequestException(`${JSON.stringify(data)} has invalid status`);
    }
  }

  async readAll() {
    return this.repository.readAll();
  }
}
