import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { StatusUpdateRequest } from './_models/status-update.request';
import { WorkerAuthGuard } from '../_shared/worker-auth.guard';
import { StatusService } from './status.service';
import { ok } from '../utils';
import { ClientAuthGuard } from '../_shared/client-auth.guard';

@Controller('status')
export class StatusController {

  constructor(private statusService: StatusService) {

  }

  @Put('/')
  @UseGuards(WorkerAuthGuard)
  async statusUpdate(@Body() body: StatusUpdateRequest) {
    const result = await this.statusService.save(body);
    console.log(result);
    return ok();
  }

  @Get('')
  @UseGuards(ClientAuthGuard)
  async read() {
    const result = await this.statusService.read();
    return result;
  }

}
