import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusSchema } from './_models/status.dao';
import { StatusRepositoryService } from './status-repository.service';
import { TokensModule } from '../tokens/tokens.module';
import { NotificationService } from '../_shared/notification.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Status', schema: StatusSchema}]),
    TokensModule
  ],
  controllers: [StatusController],
  providers: [
    StatusService,
    StatusRepositoryService,
    NotificationService
  ]
})
export class StatusModule {
}
