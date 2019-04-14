import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusSchema } from './_models/status.dao';
import { StatusRepositoryService } from './status-repository.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Status', schema: StatusSchema}])],
  controllers: [StatusController],
  providers: [
    StatusService,
    StatusRepositoryService
  ]
})
export class StatusModule {
}
