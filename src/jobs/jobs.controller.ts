import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { WorkerAuthGuard } from '../_shared/worker-auth.guard';
import { JobStatusRequest } from './_models/job-status-request';
import { ok } from '../utils';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {

  constructor(private jobsService: JobsService) {

  }

  @Put('/')
  @UseGuards(WorkerAuthGuard)
  async updateJobStatus(@Body() body: JobStatusRequest) {
    await this.jobsService.save(body);
    return ok();
  }
}
