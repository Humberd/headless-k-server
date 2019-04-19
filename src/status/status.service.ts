import { Injectable } from '@nestjs/common';
import { StatusRepositoryService } from './status-repository.service';
import { StatusUpdateRequest } from './_models/status.dto';

@Injectable()
export class StatusService {
  constructor(private repository: StatusRepositoryService) {

  }

  async save(data: StatusUpdateRequest) {
    return await this.repository.save(data);
  }

  async read() {
    return this.repository.read();
  }
}
