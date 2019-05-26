import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { WorkerAuthGuard } from '../_shared/worker-auth.guard';
import { JobStatusRequest } from './_models/job-status-request';
import { ok, toUnixTimestamp } from '../utils';
import { JobsService } from './jobs.service';
import { ClientAuthGuard } from '../_shared/client-auth.guard';
import { JobStatusDto } from './_models/job-status.dto';

@Controller('jobs')
export class JobsController {

  constructor(private jobsService: JobsService) {

  }

  @Get('/')
  @UseGuards(ClientAuthGuard)
  async getJobsStatuses(): Promise<JobStatusDto[]> {
    return (await this.jobsService.readAll())
        .map(it => ({
          id: it.id,
          name: it.name,
          status: it.status,
          timeInterval: it.timeInterval,
          lastSuccess: toUnixTimestamp(it.lastSuccess),
          lastCheck: toUnixTimestamp(it.lastCheck),
          lastError: toUnixTimestamp(it.lastError)
        } as JobStatusDto));
  }

  @Put('/')
  @UseGuards(WorkerAuthGuard)
  async updateJobStatus(@Body() body: JobStatusRequest) {
    await this.jobsService.save(body);
    return ok();
  }
}
