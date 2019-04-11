import { Body, Controller, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { StatusUpdateRequest } from './_models/status-update.request';
import { WorkerAuthGuard } from '../worker-auth.guard';

@UseGuards(WorkerAuthGuard)
@Controller('status')
export class StatusController {

  @Put('/')
  statusUpdate(@Body() body: StatusUpdateRequest) {
    console.log(body);
    return body;
  }

}
