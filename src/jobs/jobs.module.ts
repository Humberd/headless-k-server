import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { DaySchema } from './models/day.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Day', schema: DaySchema}])],
  providers: [DaysService],
  controllers: [DaysController],
})
export class JobsModule {}
