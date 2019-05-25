import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsController } from './jobs.controller';
import { JobStatusSchema } from './_models/job-status.dao';
import { JobsService } from './jobs.service';
import { JobsRepositoryService } from './jobs-repository.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Job', schema: JobStatusSchema}])],
  controllers: [JobsController],
  providers: [JobsService, JobsRepositoryService],
})
export class JobsModule {}
