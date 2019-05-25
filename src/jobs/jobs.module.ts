import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsController } from './jobsController';

@Module({
  // imports: [MongooseModule.forFeature([{name: 'Day', schema: DaySchema}])],
  // providers: [DaysService],
  controllers: [JobsController],
})
export class JobsModule {}
