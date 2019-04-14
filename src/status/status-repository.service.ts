import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusDao } from './_models/status.dao';
import { StatusUpdateRequest } from './_models/status-update.request';

@Injectable()
export class StatusRepositoryService {
  private readonly WORKER_ID = 'worker';

  constructor(@InjectModel('Status') private readonly statusModel: Model<StatusDao>) {

  }

  async save(data: StatusUpdateRequest) {
    return this.statusModel.findByIdAndUpdate(
        this.WORKER_ID,
        {
          version: data.version,
          status: data.status
        } as StatusDao,
        {
          upsert: true,
        }
    );
  }

  async read() {
    return await this.statusModel.findById(this.WORKER_ID);
  }
}
