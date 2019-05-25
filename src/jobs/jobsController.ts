import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { WorkerAuthGuard } from '../_shared/worker-auth.guard';
import { JobStatusRequest } from './_models/job-status-request';
import { ok } from '../utils';

@Controller('jobs')
export class JobsController {

  @Put('/')
  @UseGuards(WorkerAuthGuard)
  async updateJobStatus(@Body() body: JobStatusRequest) {
    console.log(body);
    return ok();
  }
}
