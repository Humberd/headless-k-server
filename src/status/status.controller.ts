import { Body, Controller, Get, Put, Res, UseGuards } from '@nestjs/common';
import { StatusResponse, StatusUpdateRequest } from './_models/status.dto';
import { WorkerAuthGuard } from '../_shared/worker-auth.guard';
import { StatusService } from './status.service';
import { elapsedTimeSinceNow, ok, time } from '../utils';
import { ClientAuthGuard } from '../_shared/client-auth.guard';
import { Response } from 'express';

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
  async read(@Res() res: Response): Promise<StatusResponse> {
    const result = await this.statusService.read();

    if (!result) {
      // @ts-ignore
      return res.sendStatus(404);
    }

    if (elapsedTimeSinceNow(result.updatedAt.getTime(), time(5, 'minutes'))) {
      return {
        version: result.version,
        status: 'DISCONNECTED',
        updatedAt: result.updatedAt.getTime()
      };
    }
    return {
      version: result.version,
      status: result.status,
      updatedAt: result.updatedAt.getTime()
    };
  }

}
