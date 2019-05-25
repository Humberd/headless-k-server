import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsController } from './jobsController';
import { JobStatusSchema } from './_models/job-status.dao';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Job', schema: JobStatusSchema}])],
  // providers: [DaysService],
  controllers: [JobsController],
})
export class JobsModule {}
