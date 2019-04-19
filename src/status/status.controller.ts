import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Put, Res, UseGuards } from '@nestjs/common';
import { StatusResponse, StatusUpdateRequest } from './_models/status.dto';
import { WorkerAuthGuard } from '../_shared/worker-auth.guard';
import { StatusService } from './status.service';
import { elapsedTimeSince, ok, time } from '../utils';
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
    return ok();
  }

  @Get('/')
  @UseGuards(ClientAuthGuard)
  async read(): Promise<StatusResponse> {
    const result = await this.statusService.read();

    if (result) {
      throw new NotFoundException();
    }

    if (elapsedTimeSince(result.updatedAt.getTime(), time(1, 'minutes'))) {
      return {
        version: result.version,
        status: 'DISCONNECTED',
        updatedAt: result.updatedAt.getTime()
      };
    }
    return {
      version: result.version,
      status: result.status.toUpperCase(),
      updatedAt: result.updatedAt.getTime()
    };
  }

}
